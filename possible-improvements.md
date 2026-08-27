# Possible Improvements — "Simple Web UX Knowledge in 2026"

## Grammar fixes

Applied directly to the article in place via the `edit` tool. Logged here so the pattern of mistakes is visible and learnable. Quotes are kept short — just enough to identify the change in the article.

| # | Line | Category | Before → After | Reason |
|---|------|----------|---------------|--------|
| 1 | L13 | Word choice | "by extent" → "by extension" | Idiom is "by extension" (carrying the logic forward), not "by extent". |
| 2 | L15 | Sentence fragment | "because too many animations and moving parts." → "because of too many animations and moving parts." | "Because" clause needs a verb; the phrase had none (dangling cause). |
| 3 | L16 | Article | "because of small clickable area" → "because of a small clickable area" | Singular countable noun needs the article "a". |
| 4 | L17 | Article | "an anchor links" → "anchor links" | Plural noun takes no article; "an" is a leftover singular marker. |
| 5 | L19 | Tense + comma splice | "perfect, I still sometimes (if not often) fell into" → "perfect, but I still sometimes (if not often) fall into" | Present-tense narration needs "fall"; two fused independent clauses need a conjunction. |
| 6 | L25 | Verb form | "despite is more text-heavy" → "despite being more text-heavy" | "Despite" is a preposition and requires a gerund, not a finite verb. |
| 7 | L27 | Subject-verb agreement | "Below are the list" → "Below is the list" | Subject "list" is singular; the verb must be "is". |
| 8 | L29 | Verb form | "turn out not being a" → "turn out not to be a" | "Turn out" takes an infinitive ("to be"), not a gerund. |
| 9 | L30 | Article | "such as JavaScript library" → "such as a JavaScript library" | Singular countable noun needs the article "a". |
| 10 | L32 | Word choice | "morale of the story" → "moral of the story" | "Moral" = the lesson; "morale" = team spirit. Wrong word. |
| 11 | L58 | Typo | "clicking he" → "clicking the" | Homophone slip; "he" should be the article "the". |
| 12 | L93 | Subject-verb agreement | "the menu have to be clicked" → "the menu has to be clicked" | Subject "menu" is singular; verb must be "has". |
| 13 | L105 | Word choice / preposition | "scroll many years before, I'd just scroll the year" → "scroll back many years, I'd just scroll through the years" | "Scroll the year" is not idiomatic; you scroll *through* the years, and "before" should be "back". |
| 14 | L133 | Typo | "for naviation?" → "for navigation?" | Misspelling of "navigation". |
| 15 | L147 | Typo / acronym | "What You See is What You Get (WYSWYG)" → "What You See Is What You Get (WYSIWYG)" | Standard expansion capitalizes "Is"; acronym is "WYSIWYG". |
| 16 | L149 | Placeholder / formatting | stray empty bullet "  - " removed | Leftover empty list item from an unfinished recap. |

**Notes for the author:**
- Two recurring slips: (a) missing/extra articles before singular countable nouns ("a JavaScript library", "a small clickable area", "an anchor links"); (b) verb-form errors after prepositions/phrases ("despite is", "turn out not being", "scroll the year"). Both are easy to catch on a slow read-through.
- Watch the "moral" vs. "morale" homophone — it's a common one that spell-check won't flag.

---

## Flow and content suggestions

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

### TL;DR of the suggestions

1. (High) The "agentic development" premise is the hook but is never substantiated or paid off — the body is generic UX advice with no agentic-specific cause, example, or guidance.
2. (Medium) The closing recap omits the entire Navigation links section, which was the third of the three promises made in the intro.
3. (Medium) The author's own landing page is the central CPU-usage benchmark but is never named or linked, so the key data point can't be verified.

### 1. The agentic-development hook is raised and then abandoned (high)

- **Issue:** The intro (L13) and the description/frontmatter frame the piece around a 2026, agentic-engineering premise: "you would have thought that with the rise of agentic engineering, the UX … would be better … but nope." That is a specific, interesting claim — that the *mode of development* is causing UX regression. But the body never returns to it. The three sections (landing pages, forms, navigation) are timeless, general UX tips with no connection to agentic tooling, no example of an agent producing the bad output, and no agentic-specific guidance. The only callback is the single closing bullet about "Using agentic development doesn't guarantee you UX best practices" (L145), which restates the premise without ever demonstrating it.
- **Impact:** A reader who clicks for the agentic-angle (the distinctive promise of the title/description) gets generic UX advice instead. The article's differentiating thesis evaporates, and the piece reads as if the framing were bolted on for timeliness rather than earned by the content.
- **Suggestions:**
  1. Either commit to the premise — add at least one concrete example where agentic development *produced* the bad UX (e.g. "the agent generated a `<button>` for navigation" or "the agent added three animation libraries by default"), tying each section back to how the agentic workflow leads there.
  2. Or drop the agentic framing from the title/description and intro, and sell the piece as plain "simple web UX reminders" — which is honestly what the body delivers.
  3. At minimum, make the closing bullet (L145) show the *mechanism* ("agentic tools skip UX because they optimize for 'it works'"), not just assert that they "don't guarantee" it.

### 2. The closing recap skips the Navigation section (medium)

- **Issue:** The intro (L15–17) lays out exactly three promises: CPU-heavy landing pages, hard-to-use forms, and non-power-user-friendly navigation. The body delivers all three. But the closing "takeaways" (L145–148) cover only landing pages, forms/clickable areas, and date pickers — the entire **Navigation links** section (L115–139) is absent from the recap. A reader who skims the ending will leave thinking navigation was never part of the argument.
- **Impact:** The recap doesn't mirror the body, so one of the three equal-weight pillars looks unearned or forgotten. It also wastes the article's own setup, where navigation was explicitly promised as the third point.
- **Suggestions:**
  1. Add a closing bullet distilling the navigation section: use real `<a>` links for navigation (semantics, visible destination, new-tab/middle-click), and only use `<button>` when navigation is a side effect of an action.
  2. If you consider navigation less essential than the other two, scope the intro's three-bullet promise explicitly ("the first two are the big ones; navigation is a shorter bonus") so the recap's narrower focus is intentional rather than an omission.

### 3. The central CPU claim rests on an unnamed, unlinked page (medium)

- **Issue:** The landing-page section's headline evidence is a comparison: "the landing page that I mentioned above … has 50% more CPU usage compared to Apple's Macbook Air page when idle" (L25). But "the landing page that I mentioned above" was only vaguely referenced in the intro as "one of them being created in recent times" (L19) — the author's own page is never named, described, or linked. The whole CPU argument hinges on this unverifiable benchmark.
- **Impact:** The single most quantitative claim in the article (50% more CPU) is the one readers are least able to check. It undercuts the credibility of the section that is otherwise the strongest "show the data" moment.
- **Suggestions:**
  1. Name and link the page (or its source/measurements) so readers can see the comparison for themselves.
  2. If it can't be shared, generalize the evidence — cite a public, reproducible measurement (e.g. a profiled demo page) instead of a privately-held result.
  3. At minimum, clarify what "the landing page" is the first time it appears, so the reader isn't left guessing which of "various web/native apps" it is.

---

## What's working well (don't touch)

- **The interactive demos** (the checkbox "Show me the difference" and the dropdown click-area toggles, L42–91) are the article's best teaching device — they make the abstract "clickable area" point physically demonstrable. Keep building future posts around this kind of live proof.
- **The consistent NN/G (Nielsen Norman Group) references** at the end of each section (L58, L93, L111, L137) lend outside authority to every claim without bloating the prose. Keep that pattern.
- **The date-picker tier list** (combo → calendar → scrollable, L107–109) is a crisp, opinionated summary that lands the section's point in one glance. The ranked framing is exactly the kind of memorable structure worth repeating.
- **The plain, conversational voice** ("I'll admit", "I digress", "everyone and their mother") is engaging and on-brand for a blog. Don't let the grammar pass tamp it into formality — the voice is a strength.
