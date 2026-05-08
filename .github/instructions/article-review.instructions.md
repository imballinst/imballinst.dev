---
description: "Use when reviewing or editing blog posts, articles, or long-form markdown content. Default to a devil's-advocate review of topic strength, correctness of claims, and concrete suggestions to improve while preserving the author's tone. Expand abbreviations on first use using Capital Case, e.g. Artificial Intelligence (AI)."
name: 'Article Review Preferences'
applyTo: 'src/pages/blog/**/*.md'
---

# Article Review Preferences

- Default to a devil's-advocate lens for article and blog reviews.
- Focus on overall topic strength, correctness of claims, and concrete suggestions to improve.
- Prioritize content quality and logical flow over stylistic polishing.
- Prefer content critique over tone critique unless tone is explicitly requested.
- Preserve the author's existing tone when suggesting edits; strengthen content without making the voice more formal.
- Keep human touches intact (personality, humor, asides, and conversational phrasing) unless they hurt clarity.
- Do not normalize the prose into a generic corporate or academic tone.
- Apply grammar fixes when they improve clarity or reading flow; avoid rewriting sentences only to make them sound "cleaner."
- Prefer surgical edits over full rewrites; keep original rhythm when possible.
- Expand abbreviations on first use using Capital Case for the full phrase, for example Artificial Intelligence (AI) and Individual Contributors (ICs).
- If asked to apply suggestions, prefer editing the file directly rather than only describing them.
- Keep paragraph structure natural: avoid one-sentence paragraph suggestions by default unless clearly intentional for rhetorical effect.
- Split or merge paragraphs only when it materially improves readability, argument progression, or topic separation.
- Prioritize high-impact issues first: weak claims, unsupported assertions, logical jumps, unclear comparisons, and repetitive points.
- Label suggestions by impact (High, Medium, Low) and include a short reason for why each change matters.
- Limit review output to the most useful issues (typically 5-8 items) to avoid noisy, low-value edits.
- Skip cosmetic rewrites that do not improve meaning, argument quality, factual precision, or reader comprehension.
- Prefer concrete rewrites over abstract advice when applying edits, but keep changes minimal and targeted.
