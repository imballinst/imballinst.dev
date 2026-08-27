# Project-Level Instructions for imballinst.dev

## Em-dash convention

Use unspaced em-dashes: `word—word` not `word — word` or `word -- word`.

## Typography

- Headings (`h1`–`h6`): `Fira Sans` (`src/styles/globals.css:56`, loaded in `src/layouts/base/Head.astro:35`) — sans-serif for clear visual hierarchy from body text.
- Body/UI: `Lora` (`src/styles/globals.css:30`) — serif for paragraphs and general content.

Intent: easier differentiation between headings and paragraphs.

## Blog frontmatter images

The `image` field in frontmatter is **automatically rendered** at the top of every blog post by `src/components/BlogPostHeader.astro` (called from `src/layouts/BlogPost.astro`). It displays as a full-width `<figure>` with a linked `<img>` (max-height 400px, responsive srcset).

**Review implication:** Suggestions that tell the author to "surface the hero screenshot inline in the body" are invalid — the image is already visible to every reader at the top of the post. In-game screenshots beyond the hero image still require explicit markdown in the body.

## Article review — thorough grammar pass

When reviewing blog posts (e.g. via the article-review skill), always do a **thorough grammar pass**: re-scan the entire document and fix every mechanical error rather than a surface pass. Watch specifically for: typos and duplicate words, missing/extra articles before singular countable nouns, subject-verb agreement, preposition and idiom slips (e.g. "in our phones" → "on our phones", "like usual" → "as usual"), capitalization of proper nouns (`MacBook`, `Nielsen Norman Group`), uncountable-noun articles (e.g. "a feedback" → "feedback"), repeated words, and missing nouns. Log each fix in `possible-improvements.md`, which is kept out of git via `.gitignore`.
