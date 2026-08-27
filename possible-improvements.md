# Possible Improvements — "Simple Web UX Knowledge in 2026" (Review Round 2)

## Grammar fixes

Several fixes from the prior round are now visible in the article and not re-listed here (the 16 edits from round 1, plus the author's own edit that dropped the unverifiable "50% more CPU usage" claim and added the navigation recap bullet).

Applied directly to the article in place via the `edit` tool. Logged here so the pattern of mistakes is visible and learnable.

| # | Line | Category | Before → After | Reason |
|---|------|----------|---------------|--------|
| 1 | L13 | Agreement | "these kind of tools" → "these kinds of tools" | "These" is plural; the noun must be "kinds" (and "of" carries the singular). |
| 2 | L25 | Redundancy / word choice | "uses way more CPU usage" → "uses way more CPU" | "CPU usage" repeated the noun; "uses … CPU" is the correct collocation. |
| 3 | L29 | Subject-verb agreement | "Are these animation required?" → "Are these animations required?" | Plural determiner "these" needs plural noun "animations". |
| 4 | L93 | Preposition | "similar like above" → "similar to above" | The fixed phrase is "similar to", not "similar like". |
| 5 | L93 | Proper noun | "Norman Nielsen Group" → "Nielsen Norman Group" | The firm's name order is "Nielsen Norman Group" (the other three references get it right). |
| 6 | L105 | Subject-verb agreement | "here are my tier list" → "here is my tier list" | "Tier list" is singular; verb must be "is". |
| 7 | L109 | Uncountable noun / article | "I recall a customer feedback" → "I recall customer feedback" | "Feedback" is uncountable; drop the article "a". |
| 8 | L117 | Preposition | "in this site" → "on this site" | We are "on" a website, not "in" it. |
| 9 | L129 | Word form | "the right HTML semantic" → "the right HTML semantics" | "Semantic" is an adjective; the noun form is "semantics". |
| 10 | L131 | Article | "With button, I have to click" → "With a button, I have to click" | Singular countable noun needs the article "a". |
| 11 | L133 | Article | "You use button to register" → "You use a button to register" | Singular countable noun needs the article "a". |
| 12 | L149 | Article + punctuation | "Use button for actions that may, or may not produce navigation as side-effect." → "Use a button for actions that may, or may not, produce navigation as a side-effect." | Article "a" before "button"; "as a side-effect" needs the article; comma pairs off the parenthetical. |

**Notes for the author:**
- Recurring this round: missing articles before singular countable nouns ("a button" twice, "a side-effect"). Easy to miss on a fast pass — watch for "use button / with button" phrases specifically.
- Two name/phrase errors (Nielsen Norman order, "similar to") suggest a slow read of proper nouns and fixed phrases would catch most of these before publish.

---

## Flow and content suggestions

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose. Round 1's two structural points (recap skipping Navigation; unverifiable 50% CPU claim) were acted on by the author — the recap now includes Navigation and the specific number was dropped. What follows is what still needs work.

### TL;DR of the suggestions

1. (High) The agentic-development premise is still the hook but still isn't demonstrated; the new connecting sentence is also garbled ("swept on") and doesn't show the mechanism.
2. (Medium) The landing-page CPU comparison still points to an unnamed, unlinked page, so even the vague "way more CPU" claim can't be checked.
3. (Medium) The "Forms being hard to use" section bundles date pickers, which the intro's "small clickable area" promise never foreshadows — the section reads as two topics under one heading.

### 1. The agentic premise is still asserted, not shown — and the new bridge sentence is broken (high)

- **Issue:** Round 1 flagged that the intro's agentic-engineering hook ("you'd think UX would be better, but nope") is never paid off. The author added a bridge sentence (L13): "It doesn't mean that LLMs produce bad UX, no, but rather, with these kinds of tools existing, suboptimal UX should be able to be swept on." Two problems remain. First, the phrase "should be able to be swept on" is not a real English idiom — it's unclear whether you mean suboptimal UX *should be swept away* (we ought to fix it) or *can be swept away* (it's now easy to fix). The ambiguity undercuts the very thesis the sentence exists to support. Second, and more importantly, the body still contains zero concrete example of agentic tooling *producing* the bad UX it describes — no quote of an agent's output, no "the agent added three animation libraries by default" moment. The premise is still a billboard with no building behind it.
- **Impact:** A reader arriving for the agentic angle (the description literally leads with "With agentic development…") still gets timeless generic UX tips. The new sentence tries to honor the premise but confuses it instead, so the article's distinguishing claim is both unsubstantiated *and* now muddy.
- **Suggestions:**
  1. Rewrite the bridge sentence for clarity first: pick one meaning — e.g. "…but with these tools around, there's no excuse for leaving suboptimal UX in place" (swept away) — and drop "swept on".
  2. Add at least one concrete agentic example per section: e.g. for landing pages, "the agent reached for a heavy animation library instead of CSS"; for navigation, "the agent emitted a `<button onclick=location.href>` instead of an `<a>`". This is what converts the hook from assertion to argument.
  3. If no such example exists, drop the agentic framing from the title/description/intro and sell the piece as "simple web UX reminders" — which is what the body honestly is.

### 2. The CPU comparison still names no page (medium)

- **Issue:** The landing-page section's evidence is still "the landing page that I mentioned above … uses way more CPU compared to Apple's Macbook Air page when idle" (L25). The author wisely dropped the specific "50%" after round 1, but the comparison still rests on "the landing page that I mentioned above" — which was only vaguely referenced in the intro as one app "created in recent times" (L19). The page is never named, described, or linked, so even the softened "way more CPU" claim is unverifiable by the reader.
- **Impact:** The strongest "show the data" moment in the article still can't be checked by anyone, which quietly erodes trust in a piece that is otherwise built on demonstrable, interactive proof.
- **Suggestions:**
  1. Name and link the page (or a public profiling result / screenshot of the CPU trace) so readers can see the comparison.
  2. If it can't be shared, swap the private result for a reproducible public one (e.g. profile a demo page) so the claim stands on its own.
  3. At minimum, identify what "the landing page" is the first time it appears, so the reader isn't guessing which of "various web/native apps" it is.

### 3. The Forms section bundles date pickers the intro never promised (medium)

- **Issue:** The intro's form promise is narrow: "Forms are hard to use because of a small clickable area" (L16). The "Forms being hard to use" section then delivers three subsections — Checkboxes (clickable area ✓), Select dropdowns (clickable area ✓), and **Date pickers** (L99–113), which is about scroll-vs-calendar input *tiers*, not clickable area at all. The date-picker material is good, but it isn't foreshadowed by the intro's framing, so the section reads as two topics (clickable-area forms + date-input UX) sharing one umbrella heading.
- **Impact:** A reader tracking the intro's three promises hits an unannounced fourth topic inside "forms", which slightly blurs the article's tidy one-promise-per-section structure that you explicitly set up ("I'll admit that each solution doesn't warrant a section, but I'll do it just so it's nice and tidy", L21).
- **Suggestions:**
  1. Widen the intro form bullet to match the body, e.g. "Forms are hard to use — tiny click targets, misleading dropdowns, awkward date pickers."
  2. Or reframe the section heading as "Form controls being hard to use" and let the intro bullet list the three control types, so the promise exactly matches the delivery.
  3. Or spin date pickers into their own top-level section if you want to give them equal weight with landing pages and navigation.

---

## What's working well (don't touch)

- **You acted on the round-1 recap gap.** The closing "takeaways" now includes the Navigation bullet (L149) and the date-picker bullet is correctly promoted to a top-level item — the recap now mirrors the intro's three promises. That responsiveness is exactly the loop a review is for.
- **The interactive demos** (checkbox and dropdown "Show me the difference" toggles) remain the article's strongest device; they make the abstract clickable-area point physically demonstrable. Keep this format for future posts.
- **The consistent Nielsen Norman Group references** at the end of each section still lend outside authority without bloating the prose. Keep the pattern.
- **The date-picker tier list** (combo → calendar → scrollable) is still a crisp, opinionated summary that lands the section in one glance. The ranked framing is worth repeating.
