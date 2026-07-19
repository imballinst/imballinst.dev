---
name: article-review
description: Use when the user asks for a structural/flow review of a blog post or article (e.g. "review this post", "what can be improved here", "critique this article"). Fixes grammar directly in the article, logs every grammar change with before/after and reason in the same review file as flow suggestions. Use ONLY for prose/article critique, not for code reviews.
---

# Article structural review

Produce a review of a long-form article or blog post with two tracks, both delivered in a single review file:

- **Grammar — apply directly, and log in the review file.** Use the `edit` tool to fix grammar, typos, and obvious mechanical errors in the article file itself. Also record every change (before / after / line / reason) in a "Grammar fixes" section of `possible-improvements.md` so the author can learn from the pattern of mistakes.
- **Flow and overall content — write as suggestions, in the same review file.** Structural and flow-level critique goes in the "Flow and content suggestions" section of `possible-improvements.md`. The goal is to make the article's point land harder, **not** to rewrite prose. Suggestions describe the problem and offer fix options; the author writes the fix.

The two tracks have different bar standards (see "Anti-nitpick guardrails"): grammar can be nitpicked, flow cannot. They live in the same file but as distinct sections so the author can scan them separately.

## Input

A single markdown file (the article). The user will typically attach it with `@`.

## Output

1. **Grammar fixes:** applied directly to the article file using the `edit` tool, one edit per change.
2. **Review file:** written to `possible-improvements.md` at the repository root (or the path the user specifies). It contains two sections: "Grammar fixes" (a table of every edit, with before/after/category/reason) and "Flow and content suggestions" (structural entries). The grammar-fixes table comes first; the flow suggestions follow; the "What's working well" section closes the file.

Do not paste either deliverable into the chat — the in-place edits and the review file are the deliverables. Summaries go in the closing message only (see "After writing the file").

## Method

1. **Read the entire article once** before forming any opinions. Note the central claim, the intended audience, and the narrative arc the author seems to be going for.
2. **Grammar pass.** Re-read for mechanical errors: typos, subject-verb agreement, articles, tense, punctuation, capitalization, dangling modifiers, run-ons, comma splices, clear word choice errors. **Apply each fix with the `edit` tool directly in the article, and add a row to the "Grammar fixes" table in `possible-improvements.md` for every edit you apply.** Preserve the author's voice, dialect, and stylistic choices (e.g. Oxford comma preference, contractions, italics for emphasis). Do not "improve" prose that is already grammatical. See "Grammar scope" below for the boundary.
3. **Structure pass.** Track: section promises vs. section delivery, tangents, bundled points, cause-effect splits, placeholders/TODOs, and whether the closing recap actually covers the body. These become entries in the "Flow and content suggestions" section of `possible-improvements.md`.
4. **Validate each structural criticism against the article's actual purpose.** Before including a point, ask: "Does this serve the reader, or am I applying a generic checklist?" Drop anything that's generic best-practice noise with no concrete handle in this article.
5. **End the review file with a "What's working well" section** listing 2–4 things the author should not touch. This is non-negotiable — a review that only lists problems is demoralizing and unbalanced.

## Review file format

```markdown
# Possible Improvements — "<article title>"

## Grammar fixes

Applied directly to the article in place via the `edit` tool. Logged here so the pattern of mistakes is visible and learnable. Quotes are kept short — just enough to identify the change in the article.

| # | Line | Category | Before → After | Reason |
|---|------|----------|---------------|--------|
| 1 | L37 | Article | "in real world" → "in the real world" | Missing article "the" before singular noun phrase. |
| 2 | L135 | Subject-verb agreement | "Google Analytics were used" → "Google Analytics was used" | "Google Analytics" treated as a singular service, not a countable plural. |

(If no grammar edits were needed, write "No grammar fixes applied — the article was mechanically clean." and skip the table.)

**Notes for the author** (optional, only when a pattern is worth surfacing):
- <1–3 bullets calling out repeated patterns, e.g. "Several subject-verb agreement slips around collective-noun services (Google Analytics, the dashboard) — worth watching for in future drafts.">

---

## Flow and content suggestions

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

### TL;DR of the suggestions

1. <one-line per suggestion, ordered by impact>

### 1. <suggestion heading — describes the problem, not the fix>

<2–4 sentences explaining the problem, with concrete paragraph/section references>
**Concrete options to fix it**, as a short bulleted list of 2–3 alternatives.

(Repeat for each suggestion, numbered.)

---

## What's working well (don't touch)

- <2–4 bullets calling out the strongest writing/structure, with concrete references>
```

Notes:

- The "Grammar fixes" section comes first so the author sees the mechanical changes up front; the "Flow and content suggestions" section follows; "What's working well" closes the file.
- Grammar-log Category values come from the list in "Grammar scope" below (typo, subject-verb agreement, article, tense, punctuation, capitalization, dangling modifier, preposition, conjunction, repeated word, etc.). Reason is one short sentence — it teaches the rule, it doesn't justify the edit.
- Do not include paragraphs of analysis per grammar row. The point of the table is scan-ability: the author sees their recurring mistake categories at a glance.
- When a prior review round led to author edits, start the "Grammar fixes" section with a one-line note acknowledging fixes already applied in earlier rounds (e.g. "Several fixes from the prior round are now visible in the article and not re-listed here."), so the user understands why this round's table is shorter than expected.

## What to look for (use only the ones that apply)

Run through this list mentally. Most articles trip on 3–5 of these, not all of them. **Never include a point just because the checklist has it** — only include the ones where the article actually has the problem.

- **Title vs. content alignment** — does the title promise what the body delivers? If not, suggest either retitling or adding the missing content.
- **Missing anchor** — is the subject of the article (the product, the technique, the person) ever actually described, or is it assumed?
- **Section promise vs. delivery** — does the section heading describe what the section actually covers? Watch for headings that are promises the section doesn't keep.
- **Tangents that dilute the main thread** — multi-paragraph excursions that break a load-bearing transition. Quantify the cost (how many paragraphs, where it sits in the flow).
- **Bundled unrelated points under one heading** — a section that packs N orthogonal topics under one umbrella title. Suggest splits.
- **Split cause-effect threads** — a cause (e.g. "scope exploded") told in one section and its effect/resolution told in another, with the connection only referenced in passing. Suggest merging or cross-linking.
- **Placeholder comments / TODOs left in** — `<!-- ... -->` comments, "TODO", "TK", "coming soon" that signal unfinished sections.
- **Closing recap that doesn't cover the body** — a recap that summarizes only the first half, or that lists bullets not actually argued in the article. Either extend it or scope it explicitly.
- **Duplicated closers / repeated framing** — e.g. two paragraphs opening with the same line.
- **Argument that never gets a payoff** — a setup in an early section that the later sections don't cash in.

## Grammar scope (what to fix directly vs. leave alone)

**Fix directly in the article** — clear, mechanical errors:

- Typos and misspelled words (including homophone errors: their/there/they're, its/it's, your/you're).
- Subject-verb agreement.
- Wrong or missing articles (a/an/the).
- Tense errors and tense shifts within a sentence or paragraph that aren't intentional.
- Punctuation: missing or misplaced commas, apostrophes in contractions vs. possessives, run-on sentences, comma splices, sentence fragments that aren't stylistic.
- Capitalization errors (start of sentence, proper nouns).
- Dangling or misplaced modifiers.
- Clear preposition or conjunction errors.
- Repeated words ("the the") and obvious copy-paste residue.

**Leave alone** — stylistic choices that are grammatically valid:

- The author's preferred dialect (US vs. UK spelling, Oxford comma preference).
- Contractions, sentence fragments used for emphasis, italics for stress.
- Voice, register, and casual/conversational tone (this is a blog post, not a thesis).
- Bold formatting choices like starting sentences with "And" or "But", or one-word sentences for rhythm.
- Repetition used for rhetorical effect.

When in doubt about whether something is a stylistic choice or an error, **leave it alone**. The bar for a direct edit is "this is unambiguously wrong," not "I would write it differently."

**Do not apply edits inside fenced code blocks or frontmatter** unless the frontmatter value is clearly prose with a typo.

## Anti-nitpick guardrails

These govern the **Flow and content suggestions** section of `possible-improvements.md` — grammar, by contrast, is allowed to be nitpicked (see "Grammar scope") and has its own "Grammar fixes" section in the same file. Keep grammar critique in the grammar table and structural critique in the flow suggestions; don't mix the two.

- **Never** list prose-level concerns (word choice, sentence rhythm) as their own flow suggestions. If wording breaks comprehension in a way that is a grammar error, fix it directly and log it in the "Grammar fixes" table; if it's a structural/clarity issue, fold it into a structural point in the flow suggestions.
- **Never** suggest rewrites of specific sentences in the suggestions file. Describe the structural problem and let the author write the fix.
- **Never** include more than ~8 flow/content suggestions. If you have more, you're nitpicking — cut the low-impact ones. Quality over quantity.
- **Never** include a flow/content suggestion without a concrete paragraph or section reference, and without at least two fix options. Vague advice ("could be tighter") is useless.
- Do not editorialize about the author's voice or personality unless it directly affects the argument landing.

## Tone

Direct, specific, opinionated. Name the strongest 3–5 problems clearly. The author asked for critique, not flattery — but balance it with the "working well" section so they know what to preserve.

## After writing the file

Tell the user concisely:

1. How many grammar fixes were applied directly to the article, and where the review file was written (one line, e.g. "Applied 6 grammar fixes in place; review file at `possible-improvements.md`.").
2. The 2–3 highest-impact flow/content suggestions, in a single sentence each.

Do not paste the contents of the review file into the chat. Do not enumerate every grammar edit in the chat — the grammar-fixes table in the file and the diffs in the article speak for themselves. If a short "Notes for the author" pattern observation is worth surfacing (e.g. "you consistently slipped on subject-verb agreement around collective-noun services"), one sentence in the closing message is fine; the full table stays in the file.