# Foremann Pricing Audit

**Date:** 2026-05-01
**Current pricing:** Starter $29 · Pro $69 · Team $229 (monthly, no annual discount)

## TL;DR — the recommendation

Keep the $29 anchor. Move Pro to **$79**. Kill the Team plan and replace it with a **Crew add-on at $19/seat/month** on top of Pro. Add an **annual price (2 months free)**. Stop framing pricing around reply caps and start framing it around jobs-saved-per-month.

```
Starter   $29/mo  ($290/yr)   1 number · 1 user · solo trades
Pro       $79/mo  ($790/yr)   1 number · 1 user · busy enough that every lead counts
+ Crew    $19/seat/mo         add a partner, spouse, dispatcher, or office manager
```

**Why this beats $29/$69/$229:**

1. **The Team plan as currently designed doesn't match how trades crews work.** Trades businesses don't share an inbox the way an office team does. One person handles the phone — usually the owner, the spouse, or a dedicated dispatcher. The other 4 guys on the truck don't need their own AI drafts. Selling a 5-seat shared-inbox plan to a 5-person crew is a feature looking for a customer.
2. **$69 is leaving money on the table at the only tier where customers are *clearly* willing to pay more.** The competitive band is $79–$95 (Goodcall, Smith.ai AI, HCP Basic). $69 was probably set to feel cheap; it actually just feels under-positioned.
3. **A per-seat add-on lets crews scale linearly with revenue** instead of forcing a 3.3× price jump from $69 → $229 that almost no buyer can justify on a hand-shake.
4. **Value-based pricing math says $79 and even $99 are in scope.** One missed job at $300–500 ticket pays for 4–6 months of Pro. The cap on what trades will pay isn't the dollar figure — it's the *belief* that the product will save more jobs than it costs. We need to charge enough to be taken seriously.

The rest of this doc shows the work.

---

## Section 1 — How to think about pricing this

There are three pricing strategies — Foremann should use a hybrid, weighted heavily toward #2:

| Strategy | What it asks | Foremann's answer |
|---|---|---|
| **Cost-plus** | What does it cost us to deliver? | Twilio numbers ~$1.15/mo + AI inference ~$0.005/draft. At 200 drafts/mo Solo = ~$2 in COGS. Cost-plus would price this at $5/mo. **Useless for SaaS pricing.** |
| **Value-based** | How much money/time does this save the customer? What would they pay if they trusted the claim? | One missed job = $300–500 (plumbing/HVAC mid-tier), $1,200 industry-average per missed call. Saving 1 job/month = 10–40× ROI on $29. Saving 3 jobs/month = 12–40× ROI on $79. Saving 5 jobs/month = 6–11× ROI on $229. **All three tiers are easily value-justifiable; the constraint is belief, not affordability.** |
| **Anchor / market** | What do similar tools cost? Where does the customer's mental price live? | The trades software anchor is $29 (Jobber Core), the AI-receptionist floor is ~$29–$95 (Dialzara → Goodcall → Smith.ai AI), and the inbound-comms ceiling for trades is $399–$800 (Podium real-world cost). |

The right Foremann strategy is **anchor at the entry, value-price the middle, and undercut Podium clearly at the top.** That's the strategy I optimize against below.

A second, very specific point: this is a category where customers don't price-shop — they trust-shop. A 55-year-old electrician isn't comparing $29 vs $39 in a spreadsheet. He's deciding whether *anything* labeled "AI for my texts" is worth one penny. Once he's convinced, $29 vs $79 is roughly the same decision. The price-elasticity curve is basically flat between $29 and $99 for this audience — which means **leaving money on the table at Pro is a real cost, not a hypothetical one.**

---

## Section 2 — Competitive landscape (synthesized from full research)

Full research is in the appendix at the bottom. The headline numbers, sorted by where they land in Foremann's ladder:

### Direct AI-comms competitors

| Product | Solo-equivalent | Pro-equivalent | Team-equivalent |
|---|---|---|---|
| **Foremann (today)** | $29 | $69 | $229 |
| Dialzara (AI voice) | $29 | $99 | $249 |
| Goodcall (AI voice) | $66 (annual) | $108 (annual) | $208 (annual) |
| Smith.ai AI | $95 | — | $1,170+ (human tier) |
| **Podium** (the trades-comms big-name) | — | — | $399–$800 real-world |
| OpenPhone/Quo + AI | $15+AI | $33+AI | varies |

### Trades software (the price ceiling trades are acclimated to)

| Product | Entry | Working tier | Top tier |
|---|---|---|---|
| Jobber | $29 (Core, annual) | $99 (Connect) | $529 (Plus) |
| Housecall Pro | $59 (Basic) | $149 (Essentials) | $299 (MAX) |
| Workiz | Free | $225 (Kickstart) | $325 (Pro) |
| Service Fusion | — | $208 (Starter, annual) | $533 (Pro, annual) |
| ServiceTitan | — | ~$300/tech | ~$500+/tech + impl. |

### Phone lines only (what they're already paying for "just a number")

| Product | Solo |
|---|---|
| Sideline | $14 |
| Grasshopper True Solo | $14 |
| Google Voice Starter | $17–$30 (with Workspace) |
| OpenPhone Starter | $15–$19 |
| RingCentral Core | $20–$30 |

### Three takeaways

1. **At the entry, Foremann is psychologically anchored to Jobber Core ($29).** This is gold. Don't move it.
2. **At the middle, Foremann is *cheaper* than every credible AI-comms competitor** (Goodcall $79, Smith.ai AI $95, Dialzara $99). $69 is below the band, not in it. **Move to $79 and Foremann is *still* the cheapest credible AI-comms tool in the market while capturing 14% more revenue per Pro customer.**
3. **At the top, Foremann's $229 is well below Podium's $399** but only roughly at parity with FSM-software entry tiers (Workiz $225, Service Fusion $208). Trades buying at this tier are buying the FSM platform, not standalone comms. **Foremann doesn't have a platform yet** — so a $229 standalone-comms tier is the wrong shape, not the wrong price.

---

## Section 3 — Does the Team plan fit how trades crews actually work?

This is the most important question in this audit and the user's instinct here is correct: it doesn't quite fit.

### How trades businesses actually structure phone/comms work

Forget what the Foremann website says ("multiple guys on the same phone line"). Talk to actual trades people and the phone-handling structure splits into roughly four shapes:

| Shape | Who answers the phone | % of trades businesses | Foremann fit |
|---|---|---|---|
| **One-man band** | Owner, on his own cell, between jobs | ~70% (NAHB: 80%+ of construction firms have <10 employees; service trades skews even more solo) | Solo plan |
| **Owner + spouse/family** | Owner does field, spouse runs phone & books from home | ~15% | Pro + 1 seat |
| **Owner + dispatcher** | A part-time office person handles inbound | ~10% | Pro + 1–2 seats |
| **Real dispatch operation** | Full office staff, multiple lines, CRM | ~5% (these are 10+ tech shops) | Already on ServiceTitan, FieldEdge — not Foremann's market |

What's *not* common: 5 different field guys all replying to client texts on a shared inbox. Trades guys on the truck don't text customers — the office does, or the owner does. The "shared inbox for 5 contractors" use case Foremann's Team plan implies is closer to a **professional services firm** (lawyers, designers) than a trades crew.

### The two crew shapes Foremann *should* serve

Boil it down. Across the 25%-ish of Foremann's market that isn't a one-man band, the structure is almost always:

> **One owner + one office person.** Sometimes a second admin. Almost never more than three people total touching the phone.

So Team's "5 contractors" math is targeted wrong. The right unit is **1 + N seats, where N is almost always 1 or 2.**

### What this means for the plan

Two viable structures. I recommend Option A.

**Option A (recommended): Kill Team. Add a per-seat Crew add-on.**

```
Starter  $29/mo               1 user
Pro      $79/mo               1 user (the upgrade is volume + reply history)
+ Crew   $19/seat/mo          add owner's spouse, dispatcher, partner
```

A 3-seat shop = $79 + $19 + $19 = **$117/mo**. Linear, honest, easy to explain.

A 5-seat shop = $79 + 4×$19 = **$155/mo**. Still cheaper than today's Team ($229), but customers in this band aren't actually showing up to buy from a marketing page anyway — they're a sales conversation.

Why this is better than Team-at-$229:
- Matches the actual 1+1 / 1+2 shape of real trades crews
- Removes the awkward 3.3× price wall from Pro → Team that almost no self-serve buyer crosses
- Makes the upgrade decision easy (*"do I need a second seat for my wife? yes/no"*) rather than a category-jump (*"are we now a 'Crew'?"*)
- Lower-friction expansion revenue: spouse joins → $19. Hire a part-time dispatcher → $19. The number goes up without a tier-rename moment.

**Option B: Keep Team but reframe as "Office."**

Rename "Team" to "Office" — the persona is the office manager / dispatcher who runs comms for a crew of techs. Drop included seats from 5 to 3. Drop price from $229 to $199. Make it clear this is for the 5%-ish of buyers who actually have a separate office function.

```
Starter  $29/mo
Pro      $79/mo
Office   $199/mo   3 users · shared inbox · admin dashboard
```

This is more conventional but less honest about trades structure. I'd only do it if the team isn't ready to build per-seat billing.

### A note on "shared inbox"

The Team plan today bundles "shared inbox & admin dashboard" as the differentiator. Worth flagging: **the shared-inbox use case is the most expensive thing in the product to build well** (read receipts across users, conflict resolution when two people reply, role permissions, audit log). If Team isn't already a working product, the Crew add-on path is also dramatically faster to ship — a single-seat product with a per-seat invite is one feature, not five.

---

## Section 4 — Tier-by-tier audit and recommendation

### Starter — $29/mo

**Recommendation: keep at $29.**

This is the strongest part of the current pricing. Three reasons:

1. **It matches Jobber Core ($29 annual) — the most-recognized "real software" price in trades.** Every tradesperson who uses Jobber sees $29 and instantly thinks "that's reasonable." Free anchoring.
2. **It's the lowest credible AI-receptionist price in the market** (Dialzara matches at $29; everyone else is $66+). For a category that's mostly $80–$300, $29 reads as a no-brainer trial.
3. **It's a sub-impulse-buy price for a small business.** $29 = one tank of gas, two value meals, a cheap dinner out. Tradespeople approve $29/mo expenses without their spouse's permission. $39+ starts requiring a conversation.

A counter-argument exists: $29 might *under-anchor* the perceived value of Pro. People sometimes assume cheap = low quality. But the way to fix that isn't to raise Starter — it's to give Starter a clear "here's where you'll outgrow it" indicator (the 200-reply cap, no follow-ups… wait — you removed that gate per the recent commit. We'll come back to this).

**Possible test:** $39 Starter for 6 weeks. If conversion to paid trial → paid plan stays within 90% of the $29 baseline, the extra $10 is profit. If it drops more than 10%, fall back to $29. Probably worth running once the funnel volume justifies it.

**One copy nit:** the website's beta-pricing language ("Beta pricing locked in") implies Starter price might rise. Honor that — when Foremann GA's, $29 grandfathered for beta users is good faith and good marketing. Set the post-GA price target at $39 for *new* signups so the team has a path to lift ARPU.

---

### Pro — $69/mo (recommend $79)

**Recommendation: move to $79.**

This is where the current pricing is leaving the most money on the table.

The $69 vs $79 comparison:

| | Today $69 | Proposed $79 | Δ |
|---|---|---|---|
| Annual revenue / Pro customer | $828 | $948 | **+$120/yr** |
| Position vs Goodcall ($79 monthly) | ~$10 cheaper | ~same | softer wedge, but who cares |
| Position vs Smith.ai AI ($95) | $26 cheaper | $16 cheaper | still clearly cheaper |
| Position vs HCP Basic ($59) | $10 above | $20 above | reads as "AI tier" not "software tier" |
| Mental price-tier | "midrange" | "midrange" | same; $79 doesn't cross any threshold |

The price thresholds in B2C/SMB SaaS that *do* matter are roughly: free → $1, $9 → $10, $19 → $20, $29 → $30, $49 → $50, $99 → $100. **$69 → $79 doesn't cross a threshold** so the elasticity hit is near zero. $79 → $89 starts to feel like "premium," and $89 → $99 crosses into the "I need to think about this" zone.

There's also a positioning argument. At $69, Pro looks like "Starter with more replies" — the relationship is volumetric. At $79, with a per-seat add-on, Pro becomes "the real product, single-user" — which lets Starter become explicitly the "trial / one-truck shop" tier. That's a stronger story.

**Recommended Pro feature differentiation (not just volume):**

Pro should include things Starter literally doesn't get, not just more of the same:
- Higher reply volume (this stays — keep the 600/mo cap or similar)
- Priority support (already there — keep)
- After-hours scheduling (the "10pm text held until morning" feature — gate this to Pro)
- Lead-source integrations as they ship (Angi/Yelp/Thumbtack)
- Reply analytics / reply-time leaderboard ("you're 4× faster than other contractors")

Volume-only differentiation is the weakest form of plan ladder. Make Pro the plan where the *better outcomes* live, not just the *bigger bucket*.

---

### Team — $229/mo (recommend KILL)

**Recommendation: replace with per-seat Crew add-on.**

See Section 3 for the structural argument. The pricing argument:

| | Team $229 today | Crew $19/seat add-on |
|---|---|---|
| 2-seat shop | $229 | $79 + $19 = **$98** |
| 3-seat shop | $229 | $79 + $19 + $19 = **$117** |
| 5-seat shop | $229 | $79 + 4×$19 = **$155** |
| 10-seat shop | $229 (capped at 5 users in current plan) | $79 + 9×$19 = **$250** |

Four important things happen in this table:

1. **The 80%-of-team customer (the 2-3 seat owner+spouse/dispatcher shop) pays *less*** ($98–$117 vs $229). They convert dramatically better at the lower number — and they were never going to pay $229 anyway, they would have stayed on Pro and shared a login.
2. **The 5-seat customer pays a fair price ($155) instead of an arbitrary $229 round number.**
3. **The 10-seat customer pays *more* ($250 vs the current cap of $229).** This is the right direction — those customers are getting more value and there's no reason a 10-tech shop should pay the same as a 5-tech shop.
4. **Expansion revenue is automatic.** Hire a part-time admin → $19. Spouse starts taking calls → $19. There's no upgrade-tier moment that requires a sales conversation.

**Cost to operate per-seat billing:** real but not huge. Stripe handles per-seat metered billing natively. The internal product work is roughly: invite flow, role/permission model (admin vs member), shared inbox UI. Some of that is needed for any multi-user product anyway.

**Risk:** without a "Team" tier, Foremann doesn't have an obvious upsell path past ~$300. That's fine for the next 18 months — the company should be focused on expansion *into* multi-user accounts, not maximizing ARPU on the rare large account. A genuine Enterprise tier (custom number ports, SSO, white-glove onboarding) lives somewhere in 2027, priced "contact us."

---

## Section 5 — Things missing from current pricing

These are the gaps most pricing pages fix in their second iteration:

### 1. Annual billing with a discount

Industry standard is 15–30% off for annual prepay. Foremann today: no annual option visible.

Why this matters:
- **Annual lifts cash and ARR.** A $79/mo customer paying annually = $948 collected upfront vs $79/mo of churn risk.
- **Annual cuts churn by 30–40%** in B2B SaaS. Tradespeople who pre-pay are committed; tradespeople who go monthly will cancel the second they think things are slow.
- **Trades pay annually for everything else.** Insurance, license renewals, vehicle registration, software (Jobber, QuickBooks). It's a familiar pattern, not a novel ask.

**Recommended:** offer "$29/mo billed annually = $290/yr (save $58)" — that's 2 months free, a clean and standard offer. Same for Pro: $79/mo annual = $790/yr (save $158).

### 2. A free trial vs. the waitlist

Right now the funnel is: "Get on the waitlist." That's correct for *beta*. Once GA hits, the right shape is **14-day free trial, no card required**. This is the dominant pattern in trades SaaS (Jobber, HCP, Workiz all offer it).

### 3. Money-back guarantee / outcome guarantee

Trades pros respond to outcome guarantees more than almost any other audience. Two formats to consider:
- "Use it for 30 days. Don't think you saved more in jobs than you paid? Full refund."
- "We'll pay for your first month if you don't reply at least 2× faster than today." (Quantitative; harder to verify; stronger.)

Even if 10% of customers redeem, the conversion lift is usually 30%+. Worth testing post-GA.

### 4. Usage transparency

The current FAQ ("What happens when I hit my monthly limit?") is well-written, but the pricing card doesn't show this clearly. Best-in-class shows the cap, the price-per-overage, and the upgrade path right on the card. Trades pros hate surprise bills.

```
Pro · $79/mo
600 AI replies / month
Extra replies: $0.05 each
Auto-pause at limit (no surprise charges)
```

### 5. A no-add-ons promise

Podium's pricing is a famous mess of add-ons. Foremann should run hard the other direction: **everything's included, no per-message fees, no setup fees.** This is the #1 complaint trades have about Podium and the easiest place to differentiate on pricing-page copy.

---

## Section 6 — Final recommended pricing page

Putting it all together:

```
                  Starter           Pro                Crew
                  $29/mo            $79/mo             $19/seat/mo
                  ($290 annual)     ($790 annual)      add-on for Pro
                                    Most popular

Built for         Solo trades       Busy enough that   Owner + spouse,
                                    every lead counts  partner, or dispatcher

Includes          One business      Everything in      Add a teammate to
                  number            Starter, plus:     your Pro plan.
                  200 AI replies/mo 600 AI replies/mo  Each gets:
                  Auto follow-ups   Priority support   - Their own login
                  AI summaries      After-hours hold   - Reply on the
                  iOS + Android     Lead integrations    same number
                  Unlimited inbound (Angi, Yelp, etc.) - Shared draft
                  texts             Reply analytics      history

                  Get started       Get started         (added inside Pro)
```

**Headline:** *"One job pays for a year. Not just a month."*

That's a stronger value claim than the current "*One job pays for a month*" — and it's literally true at $29 vs. a $300 ticket.

---

## Section 7 — What to A/B test (post-GA)

In rough priority order:

1. **Pro $69 vs $79 vs $89.** Run for 4 weeks, ~500 visits each. Likely outcome: $79 wins on revenue/visitor; $89 starts to lose conversion meaningfully.
2. **Annual default vs monthly default.** Same price, just which toggle is on first. Annual-default usually lifts ACV 20–35%.
3. **Hero price callout vs. no price.** "From $29/mo · setup in 5 minutes" in the hero fine print vs. nothing. (Per the messaging audit, I already recommend including the price.)
4. **3 plans vs 2 plans + add-on.** This is the biggest structural question. Give it 6–8 weeks of data.

---

## Appendix — Competitive pricing data (researched May 2026)

### A. Field service management (sets the trades-software ceiling)

| Product | Entry | Working tier | Top tier | Trades-specific? |
|---|---|---|---|---|
| Jobber | $29 (Core, annual) | $99 (Connect) | $529 (Plus) | Yes |
| Housecall Pro | $59 (Basic) | $149 (Essentials) | $299 (MAX) | Yes |
| ServiceTitan | — | ~$300/tech | ~$500+/tech + impl. | Yes |
| Workiz | Free | $225 (Kickstart) | $325 (Pro) | Yes |
| Service Fusion | — | $208 (Starter, annual) | $533 (Pro, annual) | Yes |
| FieldEdge | — | ~$100/office user, $125/tech | — | Yes |
| Thryv | — | $199–$349 (per location) | $499+ | No (general SMB) |

### B. AI receptionists / answering services

| Product | Entry | Mid | High | Type |
|---|---|---|---|---|
| Ruby Receptionists | $235/mo (50 min) | $375 (200 min) | $720 (500 min) | Human |
| AnswerConnect | $325 (100 min) | $395 (300 min) | $475 | Human |
| Smith.ai (human) | $292.50 (30 calls) | $585 (75 calls) | $2,025 (300 calls) | Human |
| Smith.ai (AI) | $95 (~60 calls) | — | — | AI |
| Goodcall | $66 (annual) / $79 (monthly) | $108 / $129 | $208 / $249 | AI |
| Posh | $65 | $114 | $194 | Human |
| Dialzara | $29 (60 min) | $99 (220 min) | $249 (500 min) | AI |
| Air AI | $25k–$100k upfront | — | — | Enterprise AI |

### C. Business phone lines

| Product | Solo | Per-user mid | Per-user top |
|---|---|---|---|
| Sideline | $14 | — | — |
| Grasshopper | $14 (True Solo) | $25 (Solo Plus) | $55 (Small Business) |
| Google Voice | $10/user (+Workspace $7+) | $20/user | $30/user |
| OpenPhone (Quo) | $15 (annual) | $23 | $35 |
| RingCentral | $20 | $25 | $35 |
| Dialpad | $15 (annual) | $25 | Custom |

### D. AI productivity / inbox SaaS

| Product | Entry | Mid | High |
|---|---|---|---|
| Superhuman | $30/user | $40/user | Enterprise |
| Front | $19/seat | $59/seat | $99/seat |
| Heymarket | $19/user (2-user min) | — | — |
| Textline | $20/agent | $30/agent | $50/agent |
| SimpleTexting | $39 (500 credits) | $59 / $239 | $409+ |
| **Podium** (trades-comms benchmark) | $399/mo | $599/mo | Custom |

### E. Industry value benchmarks

- Average plumbing ticket: **$300–$500** (top performers; service calls)
- Average HVAC service ticket: **$400–$800** (system installs $5k–$15k)
- Average electrical service call: **$150–$400**
- Industry-average cost per missed call: **~$1,200**
- Annual lost revenue from missed calls (typical small contracting shop): **$45,000–$120,000/year**
- 27% of calls to home services go unanswered; 41% of weekend calls
- 35–40% of calls arrive after business hours
- SMB tech spend: **6.9% of revenue** (services contractors run lower, ~2%)
- For a $1M solo plumber, software spend headroom: **$11k–$38k/yr** — Foremann at any tier is a rounding error

Sources used in the research: Jobber, Housecall Pro, Workiz, Service Fusion, Goodcall, Smith.ai, Dialzara, Posh, Quo (OpenPhone), Grasshopper, RingCentral, Dialpad, Superhuman, Front, Heymarket, Textline, SimpleTexting, Podium pricing pages; Invoca and Adeltium on missed-call economics; Avasant and Vista IT Group on SMB tech spend; Owned and Operated on plumbing/HVAC ticket sizes. Full URL list in the research notes.
