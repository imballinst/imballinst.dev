# Possible Improvements — "Trust the Process"

## Grammar fixes

Applied directly to the article in place via the `edit` tool. Logged here so the pattern of mistakes is visible and learnable. Quotes are kept short — just enough to identify the change in the article.

Two of the prior round's suggestions were applied to the article (the explicit thesis tie-in to the Spurs tangent at L95, and the rewrite of the code-example block into prose at L117-118). The "Bundled takeaway section" suggestion is still outstanding. This round's grammar table covers the three mechanical errors that came in (or stayed) with those edits.

| # | Line | Category | Before → After | Reason |
|---|------|----------|----------------|--------|
| 1 | L95 | Comma + missing verb | "It served as an example that, what seemingly a success" → "It served as an example that what seemingly was a success" | The "that" introduces a content clause; a comma after "that" wrongly splits the clause from its complement, and "what seemingly a success" needs the verb "was" to form the relative clause. |
| 2 | L117 | Punctuation | "is that, _'Good code is relative'_" → "is that: _'Good code is relative'_" | A comma between the complementizer "that" and its quoted content is ungrammatical; a colon introduces the quote cleanly. |
| 3 | L118 | Preposition | "blind spots on the current implementation" → "blind spots in the current implementation" | "Blind spots in" is the standard collocation; "blind spots on" doesn't exist. |

**Notes for the author:**
- Two of the three fixes (rows 1, 3) sit in the same line — both came in fresh with the new L95 / L118 sentences you added this round. This matches the pattern from the prior round's note: newly added prose skipped the self-check pass the rest of the article got. Worth a "new prose = same proofreading bar" rule going forward.
- Row 1 is the same kind of broken clause-attachment structure as the prior round's rows 6, 10, 17 — long sentences where the connective tissue (a comma, a "that") is in the wrong place and the surrounding clauses don't parse. If you do one targeted pass on long sentences with a comma or "that" in them, you'll catch most of these.

---

## Flow and content suggestions

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

### TL;DR of the suggestions

1. "What's the takeaway?!" still bundles four distinct sub-arguments under one heading with thin transitions between them, even after the prior round's trim and this round's code-example rewrite. (medium)

The prior round's two Medium items have been addressed. The 2024-25 Spurs tangent now has an explicit thesis tie-in at L95 ("foundations weren't laid well"), which closes the structural gap. The summary's coverage gap is fully closed.

### 1. "What's the takeaway?!" still bundles several distinct sub-arguments (medium)

- **Issue:** Even after the "AI art is ass" trim and the rewrite of the code-example block into prose, the section still moves through four distinct blocks under one heading: the Arteta/firing analogy (L111), a personal stance on AI-assisted development (L113), the "outcome-oriented" critique with rhetorical questions about incentives and space (L115), and a four-part sub-argument covering "good code is relative", small-decision regret, the markdown-rules pattern, and "blind spots in the implementation" (L117-118) — with only light connective tissue between them.
- **Impact:** The core claim (leaders should value process, not just outcome) still gets diluted across too many threads in a single block, and the new prose rewrite at L117-118 actually *increases* the count of sub-topics inside that block (it absorbed the code example and added the "blind spots" point), making the bundling slightly worse, not better.
- **Suggestions:**
  1. Split the section into two subheadings — one for the process argument itself (Arteta analogy + "good code is relative" + small-decision regret) and one for its cost to engineers (blind spots + markdown-rules pattern + SME burnout from the 4th summary bullet) — so the two threads don't compete for the reader's attention in one block.
  2. Move the rhetorical questions about incentives and space (L115's "Have we given them...") out of the body and into the existing 4th summary bullet on SME burnout, since both are about the human cost of process-ignoring leadership — keeping one clear place in the piece for that argument instead of two.
  3. Add a one-sentence bridge at the top of L117 ("Here's a small example of what I'm talking about" or similar) so the four-part sub-argument reads as a demonstration of the outcome-oriented critique in L115, not as a fresh thought arriving from nowhere.

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

One argument that I hear for AI-assisted development for an area that we don't excel at
is that: _"Good code is relative"_. If we are too outcome oriented and don't care about
the process, we will probably be whatever to the differences above. But, at some point,
those small decisions that we have been ignoring will come to bite us back at some point.
_"Why did we do it using X instead of Y?"_

### What this costs engineers

I'm sure every one of us who has tried AI-assisted development and cares about the
process has already experienced this before, and in turn, adds rules/instructions to a
Markdown file so that agents won't repeat it again in the future. Those who don't care
about the process won't care, as long as the outcome is correct.

Until we realize there are blind spots in the current implementation of outcome, which
we missed because we don't have enough expertise and understanding.

So, yeah, that should be all. In summary:
```

This pulls the "rules-in-markdown" and "blind spots" sub-points out of the same
paragraph as the "good code is relative" argument, giving the cost-to-engineers thread
its own heading instead of competing for attention inside a single block.

**Option B — Fold the rhetorical questions into the 4th summary bullet** (trim L115 and beef up the existing 4th bullet):

Replace L115:

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
already lives, giving the body one clear place for the human-cost thread instead of two.

**Option C — One-sentence bridge before the L117 sub-argument** (insert just before L117):

```markdown
...Have we given them the space they need to take a step back, rest, and recover?

Here's a small example of what I'm talking about.

One argument that I hear for AI-assisted development...
```

---

## What's working well (don't touch)

- The new L95 sentence ("It served as an example that what seemingly was a success in a short term didn't necessarily translate into success in the long term if the foundations weren't laid well") is exactly the explicit thesis tie-in the Spurs tangent needed — it now reads as a deliberate demonstration of "trust the process" instead of an orphaned digression. This was the cleanest single fix from the prior round.
- The voice is still distinctive and consistent throughout: casual asides ("Now that I glazed Liverpool enough already"), rhetorical fragments, and the occasional profanity all read as intentional and give the piece personality without crowding out the argument.
- The new "blind spots in the current implementation of outcome, which we missed because we don't have enough expertise and understanding" sentence at L118 is a sharp, under-discussed insight — it extends the process argument past "trust the people" into "the people also can't see what they don't know", which is exactly the kind of nuance an AI-era tech audience needs.
- The Josh Kroenke thread (introduced quietly in 2020-21, paid off across 2021-22 / 2022-23 / 2025-26) is still a well-executed long-range setup and payoff — it gives the recap a throughline beyond just match results and is exactly the kind of "trust the process in the people" structure the article argues for.
