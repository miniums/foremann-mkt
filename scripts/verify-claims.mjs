#!/usr/bin/env node
// Verifies the site's checkable public claims against the app's ENTITLEMENTS.
//
//   node scripts/verify-claims.mjs [--source <url|file.json>] [--strict]
//
// Fetches GET /api/v1/_meta/plans (default https://app.foremann.app/api/v1/_meta/plans,
// override with --source or $CLAIMS_SOURCE — a local file works for testing),
// then checks every `verify` rule in src/data/claims.json plus every
// `{/* claim: <id> */}` annotation in the site source.
//
// Exit codes: 1 = a claim is false / an annotation references an unknown claim;
// 0 = all good. If the API is unreachable (or the endpoint isn't deployed yet) it
// WARNS and exits 0 — the build must not depend on the API being up — unless
// --strict (used by the daily Action, where "can't check" should alert).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_SOURCE = 'https://app.foremann.app/api/v1/_meta/plans';

const asArray = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);
const onFeatures = (p) => Object.entries(p.features || {}).filter(([, v]) => v).map(([k]) => k);

// Evaluate one rule for `plan` against the plans payload. Returns
// { ok, detail } or { unverified, detail } for static rules.
export function checkRule(rule, plan, plans) {
  const planKey = rule.plan || plan;
  const p = plans?.[planKey];
  if (rule.type === 'static') return { unverified: true, detail: rule.why || 'not machine-checkable' };
  if (!p) return { ok: false, detail: `plan "${planKey}" not in /_meta/plans` };

  if (rule.type === 'limit') {
    const actual = p.limits?.[rule.key];
    return actual === rule.equals
      ? { ok: true, detail: `${planKey}.${rule.key} = ${actual}` }
      : { ok: false, detail: `${planKey}.${rule.key} is ${actual}, claim says ${rule.equals}` };
  }
  if (rule.type === 'feature') {
    const want = rule.enabled !== false;
    const actual = Boolean(p.features?.[rule.key]);
    return actual === want
      ? { ok: true, detail: `${planKey}.${rule.key} = ${actual}` }
      : { ok: false, detail: `${planKey}.${rule.key} is ${actual}, claim says ${want}` };
  }
  if (rule.type === 'superset') {
    const base = plans?.[rule.of];
    if (!base) return { ok: false, detail: `base plan "${rule.of}" not in /_meta/plans` };
    const problems = [];
    for (const f of onFeatures(base)) if (!p.features?.[f]) problems.push(`lacks feature ${f}`);
    for (const [k, v] of Object.entries(base.limits || {})) {
      if (typeof v === 'number' && !(p.limits?.[k] >= v)) problems.push(`${k} ${p.limits?.[k]} < ${rule.of}'s ${v}`);
    }
    return problems.length
      ? { ok: false, detail: `${planKey} is not a superset of ${rule.of}: ${problems.join('; ')}` }
      : { ok: true, detail: `${planKey} includes everything ${rule.of} does` };
  }
  return { ok: false, detail: `unknown rule type "${rule.type}"` };
}

// -> [{ id, status: 'ok' | 'FAIL' | 'unverified', details: string[] }]
export function evaluate(claims, plans) {
  const results = [];
  const run = (id, plan, verify) => {
    const rules = asArray(verify);
    const outs = rules.map((r) => checkRule(r, plan, plans));
    const failed = outs.filter((o) => o.ok === false);
    const status = failed.length ? 'FAIL' : outs.every((o) => o.unverified) ? 'unverified' : 'ok';
    results.push({ id, status, details: (failed.length ? failed : outs).map((o) => o.detail) });
  };
  for (const [plan, def] of Object.entries(claims.plans || {})) {
    for (const b of def.bullets || []) run(b.id, plan, b.verify);
  }
  for (const c of claims.prose || []) run(c.id, null, c.verify);
  return results;
}

// `{/* claim: a.b, c.d */}` annotations in Astro source.
export function findAnnotatedIds(text) {
  const ids = [];
  for (const m of text.matchAll(/\{\/\*\s*claim:\s*([\w.\-]+(?:\s*,\s*[\w.\-]+)*)\s*\*\/\}/g)) {
    ids.push(...m[1].split(',').map((s) => s.trim()));
  }
  return ids;
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const f = join(dir, n);
    return statSync(f).isDirectory() ? walk(f) : f.endsWith('.astro') ? [f] : [];
  });
}

async function loadPlans(source) {
  let raw;
  if (/^https?:/i.test(source)) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 8000);
    try {
      const res = await fetch(source, { signal: ctl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      raw = await res.text();
    } finally { clearTimeout(t); }
  } else {
    raw = readFileSync(source, 'utf8');
  }
  const json = JSON.parse(raw);
  if (!json?.plans || typeof json.plans !== 'object') throw new Error('response has no "plans" object');
  return json.plans;
}

async function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const i = args.indexOf('--source');
  const source = (i >= 0 && args[i + 1]) || process.env.CLAIMS_SOURCE || DEFAULT_SOURCE;
  const claims = JSON.parse(readFileSync(join(ROOT, 'src/data/claims.json'), 'utf8'));

  // 1. Annotations must reference real claims (works offline).
  const known = new Set([
    ...Object.values(claims.plans || {}).flatMap((p) => (p.bullets || []).map((b) => b.id)),
    ...(claims.prose || []).map((c) => c.id),
  ]);
  const referenced = new Map();
  const unknownRefs = [];
  for (const f of walk(join(ROOT, 'src'))) {
    for (const id of findAnnotatedIds(readFileSync(f, 'utf8'))) {
      referenced.set(id, f.replace(ROOT + '/', ''));
      if (!known.has(id)) unknownRefs.push(`${f.replace(ROOT + '/', '')}: claim "${id}" is not in src/data/claims.json`);
    }
  }
  for (const c of claims.prose || []) {
    if (!referenced.has(c.id)) console.warn(`warn: prose claim "${c.id}" is defined but no page references it with {/* claim: ${c.id} */}`);
  }

  // 2. Verify against the app.
  let plans;
  try {
    plans = await loadPlans(source);
  } catch (err) {
    const msg = `could not read ${source}: ${err.message}`;
    if (unknownRefs.length) { console.error(unknownRefs.join('\n')); process.exit(1); }
    if (strict) { console.error(`FAIL (strict): ${msg}`); process.exit(1); }
    console.warn(`warn: ${msg} — claims NOT verified this run (not failing the build).`);
    return;
  }

  const results = evaluate(claims, plans);
  const w = Math.max(...results.map((r) => r.id.length));
  for (const r of results) {
    console.log(`${r.status === 'ok' ? '✓' : r.status === 'FAIL' ? '✗' : '?'} ${r.id.padEnd(w)}  ${r.status === 'unverified' ? 'UNVERIFIED — ' : ''}${r.details.join(' | ')}`);
  }
  const failed = results.filter((r) => r.status === 'FAIL');
  const unverified = results.filter((r) => r.status === 'unverified').length;
  console.log(`\n${results.length - failed.length - unverified} verified, ${unverified} unverified (static), ${failed.length} FAILED  (source: ${source})`);
  if (unknownRefs.length) console.error('\n' + unknownRefs.join('\n'));
  if (failed.length || unknownRefs.length) {
    console.error('\nA public claim is not true of the app (or points at nothing). Fix the copy in src/data/claims.json / the page — see CLAUDE.md.');
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
