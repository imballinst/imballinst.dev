# Possible Improvements — "Simple Web UX Knowledge in 2026" (Review Round 3 — thorough pass)

## Grammar fixes

Fixes from rounds 1 and 2 are already in the article and are not re-listed here. This round is a thorough re-scan of the full document (including the author's newer edits) and caught the items below, applied directly via the `edit` tool.

| # | Line | Category | Before → After | Reason |
|---|------|----------|---------------|--------|
| 1 | L13 | Preposition | "apps in our phones" → "apps on our phones" | Apps live *on* a phone, not *in* it. |
| 2 | L13 | Redundancy | "would be better in terms of UX" → "would be better" | "UX" is already the subject; restating it is redundant. |
| 3 | L19 | Collocation | "fall into some silly mistakes" → "make some silly mistakes" | The idiom is "make mistakes"; "fall into" takes a trap/habit, not a mistake. |
| 4 | L19 | Article | "has smaller screen size" → "has a smaller screen size" | Singular countable noun needs the article "a". |
| 5 | L21 | Article | "identifying above issues" → "identifying the above issues" | Specific previously-mentioned items need "the". |
| 6 | L25 | Article | "built by government" → "built by the government" | Singular definite noun needs "the". |
| 7 | L25 | Capitalization | "Macbook" → "MacBook" | Apple's product is spelled "MacBook" (capital B). |
| 8 | L107 | Missing noun | "preferably a calendar-like" → "preferably a calendar-like picker" | "Calendar-like" is an adjective; it needs a noun to attach to. |
| 9 | L108 | Repeated word | "just leave the user with just a calendar" → "leave the user with just a calendar" | Two "just"s in one clause; drop one. |
| 10 | L108 | Article | "Select certain month" → "Select a certain month" | Singular countable noun needs "a". |
| 11 | L108 | Hyphen | "Zoom-out into year ranges" → "Zoom out into year ranges" | As an imperative verb it's two words; hyphenate only as a noun/adjective. |
| 12 | L109 | Article | "because of reasons above" → "because of the reasons above" | Specific previously-mentioned reasons need "the". |
| 13 | L109 | Pronoun agreement | "customer feedback … that they were a bit frustrated" → "customer feedback … where customers were a bit frustrated" | "They" can't refer to singular "feedback"; name the people (customers). |
| 14 | L109 | Article | "select date using calendar, but time using scrollable time picker" → "select a date using a calendar, but time using a scrollable time picker" | Both noun phrases need their articles. |
| 15 | L143 | Idiom | "like usual" → "as usual" | Fixed phrase is "as usual", not "like usual". |
| 16 | L147 | Uncountable noun | "is a nice feedback" → "is nice feedback" | "Feedback" is uncountable; drop "a". |
| 17 | L148 | Article | "restrict it to only calendar" → "restrict it to only a calendar" | Singular countable noun needs "a". |

**Notes for the author:**
- The two recurring patterns across all rounds are (a) missing articles before singular countable nouns ("a smaller screen size", "a certain month", "a calendar", "the government", "the reasons above") and (b) preposition slips ("in our phones" → "on", "like usual" → "as usual"). A slow read that pauses on every singular noun and every fixed phrase would catch most of these pre-publish.
- "MacBook" and "Nielsen Norman Group" are proper nouns worth copy-pasting rather than retyping — both have been misspelled across rounds.

---

## Flow and content suggestions

Fresh structural assessment after the author's edits. Several earlier points are now resolved by the author: the recap covers Navigation (round 1), the 50% CPU number was dropped and the page-choice explained (round 2), and the Forms section now previews date pickers at L36 (round 2). What follows is what still warrants attention.

### TL;DR of the suggestions

1. (Medium) The landing-page CPU evidence doesn't support its own thesis — you compare a text-heavy page to Apple's rich page "when idle," but idle CPU isn't driven by the animations you're blaming, and the pages aren't comparable.
2. (Medium) The agentic-development hook is still never cashed in with a concrete example anywhere in the body; the premise remains a billboard (acknowledging the author has now tried twice to address it).
3. (Medium) The intro's three-promise bullet (L16) still says forms are hard "because of a small clickable area," which only foreshadows checkboxes and dropdowns — not the date pickers that take a third of the Forms section.

### 1. The CPU evidence undercuts its own thesis (medium)

- **Issue:** The landing-page section's core claim is "too many animations / heavy JS make pages CPU-heavy" (L15, L29–30), but the only data point is "my text-heavy page uses way more CPU than Apple's MacBook Air page **when idle**" (L25). Two problems. First, the comparison is apples-to-oranges: your page is described as text-heavy while Apple's is a rich, animated marketing page, so "way more CPU" for the text page is already surprising for the wrong reasons. Second, and more damaging, you measure **when idle** — but animations and JS bundles consume CPU while *running* (on scroll, on interaction), not at rest. So the measurement can't actually demonstrate that "too many animations" are the cause. The evidence and the thesis are mismatched.
- **Impact:** A technical reader will notice the benchmark doesn't isolate the variable you're blaming, which quietly weakens the most quantitative moment in an otherwise demo-driven, credible piece.
- **Suggestions:**
  1. Measure during interaction (scroll/animate) rather than idle, or compare your page's idle CPU to a *similarly-scoped* text page so the gap is meaningful.
  2. Reframe the claim to match the evidence: "my page pegs the CPU even when idle, which shouldn't happen for a mostly-text page" — that's defensible without blaming animations you haven't measured.
  3. Or drop the cross-site comparison entirely and keep it qualitative ("idle CPU was high enough to spin up the fans"), which still makes the point without inviting a methodology challenge.

### 2. The agentic hook is still never demonstrated (medium)

- **Issue:** The intro now asserts "LLMs don't produce bad UX" and "suboptimal UX should be able to be easily detected and fixed" (L13), and the closing bullet says "agentic development doesn't guarantee you UX best practices" (L145). But no section ever shows an agent *producing* the bad pattern — no quoted agent output, no "the agent reached for a heavy animation library," no "the agent emitted `<button onclick=location.href>` instead of `<a>`." The distinguishing premise is stated three times and exemplified zero times.
- **Impact:** Readers who arrive for the "2026 / agentic" angle (the description leads with it) still get timeless generic UX advice. The hook earns attention it doesn't repay. This is carried over from rounds 1–2; the author has tried to address it in prose twice, but the missing piece is always the *concrete example*, not the framing sentence.
- **Suggestions:**
  1. Add one short "here's what the agent actually generated" snippet per section (a bad checkbox markup, a `<button>` nav, a scrollable date picker) — even one would convert the hook from assertion to argument.
  2. If no such example exists in your work, retire the agentic framing from title/description/intro and sell the piece as "simple web UX reminders" — which is what the body honestly is.
  3. At minimum, make L145 name the *mechanism* ("agents optimize for 'it works', not for touch targets") so the claim isn't a bare assertion.

### 3. The intro's form promise is narrower than the Forms section (medium)

- **Issue:** The intro's three-promise bullet says "Forms are hard to use because of a small clickable area" (L16). That foreshadows the Checkboxes and Select dropdowns subsections (both about click targets) but not the **Date pickers** subsection (L99–113), which is about scroll-vs-calendar input tiers and takes roughly a third of the Forms section. The section-level preview at L36 now lists "tiny click targets, misleading dropdowns, and awkward date pickers," so the mismatch is only in the top-level intro bullet, not the section itself.
- **Impact:** A reader tracking the tidy "three promises" structure hits an unannounced fourth topic inside "forms," which slightly blurs the one-promise-per-section discipline you set up explicitly ("I'll do it just so it's nice and tidy", L21).
- **Suggestions:**
  1. Widen the L16 bullet to match the body, e.g. "Forms are hard to use — tiny click targets, misleading dropdowns, awkward date pickers."
  2. Or keep L16 specific and add a fourth intro bullet for date pickers so the promise count matches the delivery.
  3. Or label date pickers a "bonus" the first time they appear, so the reader knows it's beyond the original promise.

---

## What's working well (don't touch)

- **The author's responsiveness is itself a strength.** This round you turned the unnamed-page weakness into a deliberate, transparent choice ("I won't name and shame since it's not built by government", L25) and widened the forms preview at L36 — both directly answer prior review points without being asked twice. That loop is exactly what a review is for.
- **The interactive demos** (checkbox / dropdown "Show me the difference" toggles) remain the article's best device; they make the abstract clickable-area point physically demonstrable. Keep this format.
- **The consistent Nielsen Norman Group references** at the end of each section still lend outside authority without bloating the prose. Keep the pattern.
- **The date-picker tier list** (combo → calendar → scrollable) is still a crisp, opinionated summary that lands the section in one glance. The ranked framing is worth repeating in future posts.
