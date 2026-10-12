// Run with: npm run test:claims   (node's built-in test runner; no dependencies)
import test from 'node:test';
import assert from 'node:assert/strict';
import { checkRule, evaluate, findAnnotatedIds } from './verify-claims.mjs';

const plans = {
  starter: {
    limits: { aiSuggestionsPerMonth: 200, proactiveNudgesPerMonth: 100 },
    features: { aiFollowUpScanner: true, aiClientSummary: true, aiReviewRequests: false },
  },
  pro: {
    limits: { aiSuggestionsPerMonth: 600, proactiveNudgesPerMonth: 200 },
    features: { aiFollowUpScanner: true, aiClientSummary: true, aiReviewRequests: true },
  },
};

test('limit: true when equal, false (with both numbers in the message) when the app changed', () => {
  assert.equal(checkRule({ type: 'limit', key: 'aiSuggestionsPerMonth', equals: 200 }, 'starter', plans).ok, true);
  const bad = checkRule({ type: 'limit', key: 'aiSuggestionsPerMonth', equals: 300 }, 'starter', plans);
  assert.equal(bad.ok, false);
  assert.match(bad.detail, /is 200, claim says 300/);
});

test('feature: claims a feature the plan lacks -> false; "enabled:false" gates work', () => {
  assert.equal(checkRule({ type: 'feature', key: 'aiReviewRequests', enabled: true }, 'starter', plans).ok, false);
  assert.equal(checkRule({ type: 'feature', key: 'aiReviewRequests', enabled: false }, 'starter', plans).ok, true);
  assert.equal(checkRule({ type: 'feature', key: 'aiReviewRequests' }, 'pro', plans).ok, true); // default enabled:true
});

test('a rule may target another plan (prose claims)', () => {
  assert.equal(checkRule({ type: 'feature', plan: 'pro', key: 'aiReviewRequests', enabled: true }, null, plans).ok, true);
});

test('superset ("Everything in Starter"): fails if Pro loses a Starter feature or drops below a Starter limit', () => {
  assert.equal(checkRule({ type: 'superset', of: 'starter' }, 'pro', plans).ok, true);

  const lostFeature = structuredClone(plans);
  lostFeature.pro.features.aiClientSummary = false;
  const r1 = checkRule({ type: 'superset', of: 'starter' }, 'pro', lostFeature);
  assert.equal(r1.ok, false);
  assert.match(r1.detail, /lacks feature aiClientSummary/);

  const lowerLimit = structuredClone(plans);
  lowerLimit.pro.limits.aiSuggestionsPerMonth = 150;
  assert.match(checkRule({ type: 'superset', of: 'starter' }, 'pro', lowerLimit).detail, /aiSuggestionsPerMonth 150 < starter's 200/);
});

test('static rules are reported UNVERIFIED, never silently OK', () => {
  assert.deepEqual(checkRule({ type: 'static', why: 'store availability' }, 'starter', plans), { unverified: true, detail: 'store availability' });
});

test('missing plan / unknown rule type fail loudly instead of passing', () => {
  assert.equal(checkRule({ type: 'limit', key: 'x', equals: 1 }, 'enterprise', plans).ok, false);
  assert.equal(checkRule({ type: 'nope' }, 'starter', plans).ok, false);
});

test('evaluate: a compound bullet fails if ANY rule fails; statuses are ok/FAIL/unverified', () => {
  const claims = {
    plans: { starter: { bullets: [
      { id: 'a', verify: [{ type: 'limit', key: 'proactiveNudgesPerMonth', equals: 100 }, { type: 'feature', key: 'aiFollowUpScanner', enabled: true }] },
      { id: 'b', verify: [{ type: 'limit', key: 'proactiveNudgesPerMonth', equals: 100 }, { type: 'feature', key: 'aiReviewRequests', enabled: true }] },
      { id: 'c', verify: { type: 'static', why: 'n/a' } },
    ] } },
    prose: [{ id: 'p', verify: { type: 'feature', plan: 'pro', key: 'aiReviewRequests', enabled: true } }],
  };
  const byId = Object.fromEntries(evaluate(claims, plans).map((r) => [r.id, r.status]));
  assert.deepEqual(byId, { a: 'ok', b: 'FAIL', c: 'unverified', p: 'ok' });
});

test('findAnnotatedIds reads {/* claim: a, b */} comments only', () => {
  const src = `<p>x</p>{/* claim: prose.one, prose.two */}\n{/* just a comment */}\n<!-- claim: not.this -->`;
  assert.deepEqual(findAnnotatedIds(src), ['prose.one', 'prose.two']);
});
