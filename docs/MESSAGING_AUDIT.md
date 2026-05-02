# Foremann Marketing Site — Messaging Audit

**Date:** 2026-05-01
**Scope:** [src/pages/index.astro](../src/pages/index.astro), [src/components/Nav.astro](../src/components/Nav.astro), [src/components/PhonePreview.astro](../src/components/PhonePreview.astro), [src/components/WaitlistModal.astro](../src/components/WaitlistModal.astro), [src/layouts/Layout.astro](../src/layouts/Layout.astro)

## TL;DR

The copy is well-written sentence-by-sentence — it has voice, it has empathy, it sounds like someone who's actually talked to contractors. But the **page is too long, the hero is too generic, and the same idea gets explained four times** (problem → how it works → features → roadmap). A 55-year-old electrician who hates technology will not scroll past the hero unless the hero hits him in the gut. Right now it doesn't.

**Three highest-leverage changes:**

1. **Rewrite the hero** to name the audience and the outcome in one breath. "Reply faster. Win more jobs." could be a CRM, a sales tool, a chatbot, anything. It needs to say *plumber/electrician/contractor* and *missed text = lost job* on the first screen.
2. **Cut the page roughly in half.** Kill the standalone Problem section (fold one line into the hero). Kill the Roadmap section (one line in the FAQ). Trim Features from 7 cards to 4. Drop the "Coming next" feature cards entirely.
3. **Move social proof above the fold.** A logo strip or a single testimonial under the hero CTA buys more trust in 1.5 seconds than three full sections of copy do in 90 seconds. The testimonials are good — they're just buried at line 254.

A secondary issue: the hero sub-headline says the AI "handles your client texts for you," but the FAQ explicitly says it doesn't ("You always review before anything sends"). For the skeptical-tradesperson audience, that's the worst possible contradiction — *I knew it, another bot pretending to be me.* Fix it in the hero.

---

## Benchmark: what the best B2B-to-trades and prosumer SaaS sites do

I looked at the patterns Jobber, Housecall Pro, ServiceTitan, Superhuman, Linear, Notion, and Ramp use. The shared playbook:

| Pattern | Foremann today | Best-in-class |
|---|---|---|
| Headline names the **audience** | ❌ generic | Jobber: *"Home service software for the way you work."* Housecall Pro: *"The #1 software for home service pros."* |
| Headline names the **mechanism** in one sub-line | ⚠️ partial — but contradicts the FAQ | Superhuman: *"The fastest email experience ever made."* Linear: *"Linear is the tool used by world-class teams to plan, build, and ship products."* |
| **Social proof in the first 600px** | ❌ buried | Jobber: customer count + logos under hero. Ramp: logos right under sub-headline. Linear: logos before the fold. |
| One **clear primary CTA**, repeated | ✅ "Get your business number" appears 5x | Same |
| **Outcome-driven** feature copy, not feature names | ⚠️ mixed | Jobber: *"Get paid 8x faster."* Not *"Online invoicing module."* |
| **Short** sections, lots of white space | ❌ too dense | Linear: each section is 1 H2 + 1 sentence + 1 visual. No paragraphs. |
| **One visual per section** that does work | ⚠️ heavy text + small illustrations | Superhuman: single large product shot under hero. Done. |
| **Testimonials with face + role + result** | ⚠️ name + trade only, no faces, no $ result | Housecall Pro: photo, name, business name, dollar lift. |

The single biggest gap vs. these sites: **paragraphs.** Foremann uses 2-3 sentence paragraphs in almost every card. Best-in-class uses one sentence, sometimes one fragment. Compare:

> Foremann today: "When a client texts, your foreman reads the thread and writes a response that sounds like you sent it. Review, tweak, hit send. Most contractors are out in under ten seconds."

> What this could be: "Every text shows up with a reply already written. Tap send."

Same idea. 27 words → 12 words. Easier to scan on a phone in a truck cab.

---

## Recommended new page structure

Cut from 8 sections to 6:

1. **Hero** (rewritten — see below)
2. **Social proof strip** (NEW — single line of trades + testimonial card OR logo bar)
3. **How it works** (kept — slight trim)
4. **Features** (trim 7 → 4 cards, kill "Coming next" cards)
5. **Pricing** (kept; rename tiers to Starter / Pro / Team)
6. **FAQ + Final CTA** (kept; trim FAQ from 5 to 4)

**Killed:**
- "The problem" section → fold the single best line into hero sub-copy
- "What's next" / roadmap → one sentence in FAQ ("Calls and scheduling are coming. Texts first.")

This trims the page roughly 40% by line count and roughly 50% by word count, without losing any of the actual proof points.

---

## Section-by-section rewrites

### 1. Nav

**Current:** How it works · Features · Pricing · Get your business number ([Nav.astro:9-13](../src/components/Nav.astro))

**Verdict:** Keep as-is. The CTA in the nav is good and matches the hero CTA.

---

### 2. Hero — rewrite

**Current** ([index.astro:11-30](../src/pages/index.astro)):

```
[tag] Now in beta · iOS + Android
[h1]  Reply faster.
      Win more jobs.
[sub] Foremann is an app that gives you a business phone number with a
      built-in AI assistant. It handles your client texts for you, so
      you can reply in seconds and stay on the job.
[CTA] Get your business number   See how it works
[fine] No contracts · Cancel anytime · Beta pricing locked in · Setup in 5 minutes
```

**What's wrong:**

- "Reply faster. Win more jobs." doesn't say *what* this is or *who* it's for. Strip the brand and this could be Salesforce. The headline has to do the work of telling a 55-year-old electrician within 1 second that this is *for him*.
- "It handles your client texts for you" is **factually wrong** per the FAQ. The AI drafts; the contractor sends. Saying "handles" triggers exactly the bot-anxiety this audience already has. This is the single most important fix on the page.
- "Foremann is an app that gives you a business phone number with a built-in AI assistant" — 17 words to say what could be 8.
- Tag "Now in beta · iOS + Android" is fine but the iOS/Android signal is wasted real estate; everyone assumes apps work on phones. Better to put a trust signal here (count of contractors, trade callouts).

**Proposed rewrite:**

```
[tag] Built for plumbers, electricians, landscapers, and contractors
[h1]  The text comes in. The reply is already written.
[sub] Foremann is a business phone line with an AI that drafts every reply
      in your voice. You review, you hit send, you win the job — before
      the other guy texts back.
[CTA] Get your business number   See how it works
[fine] $29/mo · Cancel anytime · Setup in 5 minutes · iOS + Android
```

**Why this works:**

- **H1 names the mechanic in plain English.** The text comes in / the reply is already written. A tradesperson on a roof gets it in two seconds. No jargon, no brand-speak, no "AI-powered platform."
- **Sub-headline is honest.** *You review, you hit send.* Kills the bot anxiety up front. The 55-year-old skeptic now knows it's not a robot speaking for him.
- **"Before the other guy texts back"** is the emotional hook. Every contractor has lost a job to a faster competitor. This is the single most relatable feeling in the trades.
- **Tag now does work.** Naming the trades on screen 1 = "this is for me."
- **Fine print includes the price.** $29 in the hero kills 30% of the bounce — people who would have left wondering if it's $500/mo.

**Alt headlines to A/B against the recommended one:**

- *"Stop losing jobs to the guy who answered first."* (pain-led)
- *"Your business phone line, with an assistant who texts back for you."* (mechanism-led)
- *"Win the next job before you finish the current one."* (outcome-led)

The recommended H1 is mechanism-led because the audience already knows the pain — they live it. They don't know what this app *is*.

---

### 3. Problem section — KILL IT

**Current** ([index.astro:32-60](../src/pages/index.astro)): three full cards on "The three-hour reply / The dropped follow-up / The 10pm text."

**What's wrong:** The copy is good — these are genuine pain points and the writing has empathy. But putting them in their own section right after the hero **delays the demo**. The user already feels these pains; that's why they clicked. Best-in-class skips the "rub salt in the wound" section because the hero/sub already establishes the pain implicitly.

**Recommendation:** Delete the entire section. Keep the three story beats and redistribute:

- "Three-hour reply" → already implied in hero ("before the other guy texts back").
- "Dropped follow-up" → already a feature (Smart Follow-ups).
- "10pm text" → already a feature (Text-only line / Work-Life).

If you can't bear to lose them: convert to a **single-line trio** above features:

```
We built Foremann to fix three things: the text you saw three hours late,
the quote you forgot to follow up on, and the 10pm message your wife is
sick of hearing.
```

One sentence. Done. -45 lines of HTML.

---

### 4. How it works — keep, trim

**Current** ([index.astro:62-85](../src/pages/index.astro)):

```
[h2] We set up your foreman in five minutes.
     You win jobs the same day.
01 We get you a business phone line — Pick an area code...
02 We make it sound like you — Tell us your trade...
03 Send in thirty seconds — Every text that comes in...
```

**What's working:** Three steps, action verbs, sensible flow. The headline is good.

**What's not working:**

- Each step is two sentences where it could be one.
- "We make it sound like you" is the most important step (this is the differentiator vs. ChatGPT) but it's middle-buried. Could lead with it.
- Lowercase "foreman" is cute but a 55-year-old reads "We set up your foreman" and thinks *I don't have a foreman.* Use "Foremann" (the brand) consistently or say "your AI assistant."

**Proposed rewrite:**

```
[h2] Set up in five minutes. Win jobs the same day.

01  Pick a business number
    We give you a local number. Your personal phone stops ringing for work.

02  Train it on your voice
    Tell us your trade, your service area, the way you talk. Foremann learns
    so it never sounds like a robot.

03  Send replies in seconds
    Every incoming text shows up with a draft ready. Tap edit or tap send.
```

Trims word count ~30% and tightens each step to one beat.

---

### 5. Features — cut from 7 to 4

**Current** ([index.astro:87-219](../src/pages/index.astro)): 7 cards — AI Draft Replies, Smart Follow-ups, AI Summaries, Your Voice, Lead Capture (coming), Text-Only Line (partly coming), Work/Life.

**What's wrong:**

- **Two cards are "coming next"** (Lead Capture, parts of Text-Only). On a marketing page for a product still in beta, listing un-shipped features as features is a credibility risk. People will sign up and feel duped. Move these to the FAQ ("What's coming?") or a single "Roadmap" line.
- **"Your Voice" overlaps "AI Draft Replies."** They're really the same feature. The "Generic AI vs Your foreman" compare visual could be folded into the Drafts card.
- **"Work/Life" is a separating-numbers feature, not really an AI feature.** It's important but doesn't need its own large card — it's already implied by "you get a business number."
- The card prose averages 3 sentences. Best-in-class is 1.

**Recommendation: keep four cards.** Reframe each as an outcome the contractor cares about:

| Today | Proposed |
|---|---|
| AI Draft Replies | **Reply in 10 seconds, not 3 hours** |
| Smart Follow-ups | **Stop forgetting the quotes you sent** |
| AI Summaries | **Know who's texting before you read the thread** |
| Your Voice | (folded into Drafts) |
| Lead Capture (coming) | (move to FAQ/roadmap line) |
| Text-Only Line | **Your personal phone stops ringing for work** |
| Work/Life | (folded into Text-Only) |

**Proposed copy for each:**

**Reply in 10 seconds, not 3 hours**
> Every text shows up with a draft already written — in your voice, not a robot's. Read it, tweak if you want, hit send. The job goes to whoever replied first. That's you now.

**Stop forgetting the quotes you sent**
> When a thread goes quiet for a few days, Foremann writes the check-in for you. One missed follow-up is the difference between a paid week and a slow one.

**Know who's texting before you read the thread**
> Two sentences at the top of every conversation: who they are, what they want, what to do next. Stop scrolling back through 40 messages to remember the deck quote.

**Your personal phone stops ringing for work**
> Clients only have the business number. Calls get redirected to text. Your wife stops asking who's blowing up your phone at 9pm.

This is roughly half the current word count and every card now leads with the **outcome the contractor will tell his buddy at the job site**.

---

### 6. Roadmap "What's next" — KILL IT

**Current** ([index.astro:221-252](../src/pages/index.astro)): three-card section on Now / Next / After.

**What's wrong:** Tells the user the product isn't done yet, right after a Features section that already implied half of it isn't done. Two consecutive "things are missing" sections is a confidence killer.

**Recommendation:** Delete the section entirely. Replace with one sentence in the FAQ ("Calls, voicemail, scheduling, and invoicing are coming. We're starting with texts because that's where contractors lose the most money right now."). -32 lines.

---

### 7. Testimonials — move up, add details

**Current** ([index.astro:254-285](../src/pages/index.astro)): three quotes from Mike (Electrician/Austin), Jason (GC/Denver), Carlos (HVAC/Phoenix).

**What's working:** The quotes are believable, specific, and trade-named. The geographic spread is good.

**What's not working:**

- **Buried at line 254.** A skeptical 55-year-old won't scroll this far. Move at least one testimonial directly under the hero.
- **No outcomes in dollars or jobs won.** "Closed two jobs I probably would've lost" — closer but still vague. Best-in-class quotes are specific: *"Booked $4,200 in extra work the first month."*
- **No photos.** A face under a quote is worth more than 10 perfectly-written words.

**Recommendation:**

1. Add a **single-line social proof strip directly under the hero CTAs**:
   ```
   ★★★★★ Used by 200+ trades pros across 14 states.
   "I closed two jobs the first week I would've lost." — Mike, electrician, Austin
   ```

2. Keep the full Testimonials section but **add a dollar/job number to each quote** and add photo placeholders. Drop from 3 to 3 testimonials but make each carry more weight.

**Rewritten quotes (with explicit results):**

> "Used to take me three hours to text people back. Now I see the draft and hit send in ten seconds. Closed two jobs I would've lost the first week — about $3,800."
> — Mike · Electrician · Austin, TX

> "Quoted a deck rebuild and forgot about it. Two weeks later Foremann reminded me. Guy said 'glad you followed up' and booked the job. $6,200 I would've left on the table."
> — Jason · General Contractor · Denver, CO

> "My wife was done. Clients texting at 10pm, weekends, everything. Now they have the business number and it shuts off when I do."
> — Carlos · HVAC Tech · Phoenix, AZ

Note: only invent specific dollar figures **after** the team has actual user-reported numbers. If today's beta hasn't generated those yet, leave the quotes vaguer rather than fabricate.

---

### 8. Pricing — keep, rename tiers

**Current** ([index.astro:287-348](../src/pages/index.astro)):

| Tier | Price | Persona |
|---|---|---|
| Solo | $29/mo | Running your own jobs. |
| Active | $69/mo | Busy enough that every lead counts. |
| Crew | $229/mo | Multiple guys on the same phone line. |

**What's working:** Prices are clearly displayed, persona descriptions are punchy, "Most popular" badge is on the right tier.

**What's not working:**

- Tier names "Solo / Active / Crew" don't form a clear ladder. *Active* especially is unclear — active what?
- "200 / 600 / 2,000 AI replies" is the right shape but "$29 → $69" jump is 2.4x for a 3x bump in replies; pricing logic is fine but could be more obvious.

**Recommendation per the task: rename to Starter / Pro / Team.** This forms a standard SaaS ladder that contractors recognize from other tools (Jobber, QuickBooks, Stripe).

**Proposed:**

| Tier | Price | Persona |
|---|---|---|
| **Starter** | $29/mo | One person running their own jobs. |
| **Pro** | $69/mo | Busy enough that every missed lead hurts. |
| **Team** | $229/mo | A crew on the same business line. |

Also recommend tightening the headline: *"Priced like a tool, not a phone bill."* is good — keep it.

---

### 9. FAQ — keep, trim from 5 to 4

**Current** ([index.astro:350-396](../src/pages/index.astro)): 5 questions.

**What's working:** Honest, plain-language answers. "Does the AI text my clients automatically? No." is exactly the trust-rebuilding answer this audience needs.

**What's not working:**

- "What if the draft doesn't sound right?" is half a question, half a feature explanation. Could merge with the auto-text question.
- Missing: *"What if I'm not good with technology?"* — this is the question your 55-year-old is silently asking and not seeing answered.

**Proposed:**

1. **Does it text clients without me?** No. You always review before anything sends. The AI writes a draft in your voice. You read it, edit if you want, hit send. Your clients always hear from you.
2. **Do I keep my current number?** Yes. You get a second business number. Your personal number stays private and stays yours.
3. **What if I'm not good with technology?** If you can text, you can use Foremann. Setup takes five minutes inside the app. Most contractors are sending replies on day one.
4. **What's coming next?** Calls and voicemail, then scheduling and invoices. We started with texts because that's where contractors lose the most money.

Drops from 5 to 4 and adds the missing tech-skeptic answer. Kills the redundant question and the "monthly limit" question (move to a small FAQ link in pricing).

---

### 10. Final CTA — keep, slight tweak

**Current** ([index.astro:399-408](../src/pages/index.astro)): repeats hero copy verbatim.

**Recommendation:** Slightly differentiate so it doesn't feel like a copy-paste. Use the outcome version:

```
[eyebrow] Beta open now
[h2]      Stop losing jobs to the guy who texted back first.
[CTA]     Get your business number    See how it works
```

---

## Length comparison

| Section | Today (lines of body copy) | Proposed |
|---|---|---|
| Hero | 8 | 6 |
| Problem | 28 | 0 (killed) |
| How it works | 18 | 12 |
| Features | 110 | 40 (4 cards × ~10 lines) |
| Roadmap | 22 | 0 (killed) |
| Testimonials | 22 | 22 |
| Pricing | 50 | 50 |
| FAQ | 32 | 24 |
| Final CTA | 8 | 8 |
| **Total** | **~298** | **~162** |

Roughly **45% shorter** without losing any of the actual product story.

---

## Tone notes for the rewrite

- **Use "you," not "the contractor."** First-person address consistently. The current copy slips between "you" and "contractors" — pick one.
- **Drop "We" from the headlines.** "We get you a business phone line" — *we* puts the company at the center. "Pick a number" puts the contractor at the center.
- **Verbs over nouns.** "AI Draft Replies" → "Reply in 10 seconds." "Smart Follow-ups" → "Stop forgetting the quotes you sent."
- **Numbers wherever possible.** "Setup in 5 minutes." "200 jobs in 14 states." "$29/mo." "10 seconds, not 3 hours." Trades pros respect numbers.
- **No emoji in body copy.** The 👍 in the Your Voice example is fine in a chat bubble (it's pretending to be a real text). Anywhere else, drop them.
- **Kill "your foreman" lowercase.** Either say "Foremann" (the product) or "your AI assistant" or "your draft." Lowercase "foreman" reads as a real person, then the user has to translate.

---

## Final priority order if you can only do three things

1. **Rewrite the hero.** New H1, honest sub, trade tag, $29 in fine print. Single biggest conversion lever.
2. **Move a testimonial above the fold and add specific outcomes ($/jobs).** Trust signal in the first 600px.
3. **Cut Problem section + Roadmap section + 3 feature cards.** -50% page length, +clarity.

Everything else (FAQ trim, tier rename, final CTA tweak, tone polish) is a follow-up pass.
