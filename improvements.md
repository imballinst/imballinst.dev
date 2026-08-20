# Possible Improvements — "Trust the Process"

## Grammar fixes

Applied directly to the article in place via the `edit` tool. Logged here so the pattern of mistakes is visible and learnable. Quotes are kept short — just enough to identify the change in the article.

Three of the four suggestions from the prior round were applied to the article (the framing paragraphs at L15-17, the removal of the "AI art is ass" aside, and the new 4th summary bullet on SME burnout). This round's table covers what was still mechanical after those changes.

| # | Line | Category | Before → After | Reason |
|---|------|----------|----------------|--------|
| 1 | L15 | Article | "but then same fate" → "but then the same fate" | The author is referencing the previously-mentioned sacking; back-reference to a specific fate needs "the". |
| 2 | L17 | Article | "at the end of 2025-26 season" → "at the end of the 2025-26 season" | A specific referenced season needs the definite article. |
| 3 | L53 | Punctuation | "I too, had mine" → "I, too, had mine" | A sentence-level adverbial parenthetical like "too" must be set off by commas on both sides. |
| 4 | L141 | Subject-verb agreement | "every one of us... and in turn, add rules" → "every one of us... and in turn, adds rules" | "Every one of us" is singular; the surrounding verbs ("cares", "has done", "has already experienced") all agree with it, but "add" slipped into plural. |
| 5 | L163 | Preposition | "puts more burden to the software engineers" → "puts more burden on the software engineers" | "Burden on" is the standard collocation; "burden to" doesn't exist. |
| 6 | L163 | Subject-verb agreement | "all that contributes to the 'process' have to be" → "...has to be" | "All that contributes" is a singular relative construction; the verb must agree. |

**Notes for the author:**
- Three of the six fixes (rows 4, 5, 6) sit in the same paragraph — one was a pre-existing issue from the prior version that escaped review (row 4), and two came in fresh with the new summary bullet (rows 5, 6). Worth treating any newly added prose with the same self-check pass the rest of the article got, not skipping it because it "just got added."
- Rows 1 and 2 are both missing definite articles in the new framing paragraphs — "the same fate" and "the 2025-26 season" — which is the same article pattern the prior round already flagged in other places. Worth a targeted pass for "Xth fate / Xth season / Xth [back-referenced noun]" constructions in any future draft.

---

## Flow and content suggestions

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

### TL;DR of the suggestions

1. "What's the takeaway?!" still bundles five-to-six distinct sub-arguments under one heading despite the prior trim. (medium)
2. The 2024-25 Spurs tangent (Europa League win + near-relegation) still doesn't tie back to the main thread. (medium)

The prior round's High-severity "football/thesis disconnected until the end" item is no longer a separate issue — the new framing paragraphs at L15-17 give the recap its "trust the process" lens upfront, and the SE/AI bridge in the takeaway now reads as a deliberate payoff rather than an abrupt pivot. The prior "summary doesn't cover threads" item is also resolved — the 4th bullet on SME burnout closes the gap.

### 1. "What's the takeaway?!" still bundles several distinct sub-arguments (medium)

- **Issue:** Even after removing the "AI art is ass" aside, the section still moves through: the Arteta/firing analogy (L111), a personal stance on AI-assisted development (L113), the "outcome-oriented" critique with rhetorical questions about incentives and space (L115), the code example (L117-125), the burnout/brain-work argument (L127), and the AI-rules-in-markdown aside (L141) — six sub-topics under one heading with only light connective tissue between them.
- **Impact:** The core claim (leaders should value process, not just outcome) still gets diluted across too many threads in a single block, making the section feel like a stream-of-consciousness rather than a structured argument.
- **Suggestions:**
  1. Split the section into two subheadings — one for the process argument itself (Arteta analogy + code example) and one for its cost to engineers (burnout + AI-rules-in-markdown aside) — so the two threads don't compete for the reader's attention in one block.
  2. Add a one-sentence transition before the code example explicitly linking it back to the "outcome-oriented" critique, so the example arrives as a demonstration of the prior paragraph's point rather than as a fresh thought.
  3. Consider folding the rhetorical questions about incentives (L115's "Have we given them...") into the new 4th summary bullet about SME burnout, since both are about the human cost of process-ignoring leadership — keeping one clear place in the body for that argument.

### 2. The 2024-25 Spurs tangent still doesn't tie back to the main thread (medium)

- **Issue:** L93-95 is a three-paragraph excursion about Spurs winning the Europa League while finishing 16th-17th, then nearly getting relegated the following season. The point seems to be "even winning a trophy didn't satisfy the owner; they sacked the manager anyway, and it got worse" — but this connection to the "trust the process" thesis is left implicit, and the "spoiler" near-relegation aside adds another sentence of Spurs content that doesn't cash in either.
- **Impact:** The Spurs tangent sits between the 2024-25 trophyless season and the climactic 2025-26 title run-in, pushing the payoff farther away and forcing the reader to do extra work to connect it to anything. Now that the framing paragraphs at L15-17 have made the "trust the process" lens explicit upfront, this orphaned tangent reads even more starkly.
- **Suggestions:**
  1. Cut the entire Spurs tangent and use that space to give the 2024-25 season itself more breathing room — the season's injuries, red cards, and Merino-substitution goals deserve more narrative weight before the title win anyway.
  2. If the Spurs material is kept, make the connection to the thesis explicit in one sentence (e.g., "And yet the Spurs example shows the opposite failure mode: an owner who looked at the trophy and forgot the league position still ended up sacked when the league position kept slipping") so the reader doesn't have to infer it.
  3. Either remove the "I didn't really want to talk about this season" meta-commentary (L81) or reframe it as part of the process argument — e.g., "this season had plenty of moments that tested the process" — instead of authorial dissatisfaction that breaks the narrative voice.

---

## Implementation examples (concrete)

Drafts for each suggestion's options, written close to the article's voice. Treat these as starting points, not final prose — the call to keep things in your own voice still applies.

### 1. Bundled takeaway section

**Option A — Split into two subheadings** (replace the existing `## What's the takeaway?!` body with this structure):

```markdown
## What's the takeaway?!

All that blabber above, for what?! For this: lately, I saw posts in the software engineering
industry that say things like (paraphrased): _"Software engineers have a hard time using
AI agents because they are not accustomed to outcome-oriented (building a product)"_.
I think it's bulls****. If you are always outcome-oriented, then you'd fire Arteta before
he won the Premier League title, because you only look at the results and not at the
details. You won't trust the process, because you only see what trophies were there at
the end of the season and not how each match progressed in its own circumstances.

I don't disagree that the goal of a software engineer is to build a good product. Good
here meaning good UX-wise, humane to its users, and reliable. That is why I am not
entirely opposed to AI-assisted development, because I see value in it and I _can_ feel
empowered because of it. At least, in software engineering.

Here's a small example of what I'm talking about.

[existing code block + explanation stays here]

### What this costs engineers

People always say that AI makes us more productive in software engineering. But we rarely
talk about _how much brain work_ we have to do in a day. All that contributes to this...
"outcome-oriented" product. But at what cost? Sure, there are a lot of people who are
"outcome-oriented" and can withstand years of compacted 9-5 work. But it's not realistic
if that expectation is applied to everyone in an instant, especially without proper
incentives.

It's a very simplified and out-of-the-world example, I'm sure, but I think every one of
us who cares about the process and has done AI-assisted development has already
experienced this before, and in turn, adds rules/instructions to a Markdown file so
that future agents won't repeat it again. Those who don't care about the process won't
care, as long as the outcome is correct.

So, yeah, that should be all. In summary:
```

**Option B — Add a one-sentence transition before the code example** (insert before L117):

```markdown
...Have we given them the space they need to take a step back, rest, and recover?

Here's a small example of what I'm talking about.

Let's say we have these code blocks. Both have the same result, and theoretically,
the same outcome.
```

**Option C — Fold the rhetorical questions into the 4th summary bullet** (replace L115 with a short bridge, and beef up the existing 4th bullet):

```markdown
However, when a leader says something-something "outcome-oriented", it just leaves a bad
taste in my mouth. We always talk about the result, the outcome, yada-yada. But we often
forget about the process — and the people who do it.
```

Then expand the 4th bullet:

```markdown
- We often see arguments of using AI to increase productivity in software engineering. It
  speeds things up, yes. Unfortunately, it also puts more burden on the software engineers
  who act as Subject Matter Experts (SMEs). When we put too much emphasis on the outcome
  (the product, what it looks like from the outside), what's inside may quickly become an
  oversight. Have we given them the incentives and space to grow? Have we given them the
  space to take a step back, rest, and recover? Burnout, oversight, exhaustion, stress...
  all that contributes to the "process" has to be taken care of, not only the "outcome".
```

This pulls the rhetorical questions down into the bullet where the SME/burnout argument
already lives, giving the body one clear place for the human-cost thread.

### 2. 2024-25 Spurs tangent

**Option A — Delete L93-95 entirely.** Use the freed space to expand the 2024-25 season itself (more on the Merino substitution, the Real Madrid CL run, the second-place finish) before the 2025-26 payoff.

**Option B — Rewrite the Spurs block so the thesis connection is explicit** (replace L93-95):

```markdown
The punditry also didn't help with this, especially since Arsenal's city rival Spurs won
Europa League 1-0 against Manchester United despite finishing 16th-17th in the league —
a reminder that an outcome-only lens can flip either way: sometimes you get a trophy
and the noise is still loud. Spurs' owner sacked Postecoglou anyway. The following
season, Spurs finished 17th and only escaped relegation on the final day.
```

This cuts the "spoiler: it didn't get better" framing and lands on a clean pivot into the next season.

**Option C — Reframe the L81 meta-commentary:**

Replace:
```markdown
I didn't really want to talk about this season because there was so much bull**** in it.
```

With:
```markdown
This season had plenty of moments that tested the process — the kind that make fans
and pundits reach for the panic button.
```

Same information, but the "bull****" framing now does the work of "look, even when the
process throws ugly stuff at you, you keep going" — which is the whole article.

---

## What's working well (don't touch)

- The new framing paragraphs at L15-17 are a clear upgrade — they now state the "trust the process" lens upfront, compare Arsenal's patience to the sack-the-manager reflex of other clubs, and pre-payoff the title win, which lets the season-by-season recap be read as a demonstration rather than a setup. This was the highest-impact item from the prior round and the fix landed well.
- The voice is still distinctive and consistent throughout: casual asides ("Now that I glazed Liverpool enough already"), rhetorical fragments, and the occasional profanity all read as intentional and give the piece personality without crowding out the argument.
- The `console.log("a\nb\nc\nd\ne")` vs. `["abcde"].split("").forEach(...)` code example remains a strong, concrete illustration of "same outcome, different process" — it's the clearest bridge to the software-engineering point in the whole piece and is worth keeping front and center in the takeaway section.
- The Josh Kroenke thread (introduced quietly in 2020-21, paid off across 2021-22 / 2022-23 / 2025-26) is a well-executed long-range setup and payoff — it gives the recap a throughline beyond just match results and is exactly the kind of "trust the process in the people" structure the article argues for.
- The new 4th summary bullet (SME burnout, oversight, etc.) closes the prior gap where the body argued the human-cost point but the summary skipped it. With this bullet in place the summary now matches the body for the first time.
