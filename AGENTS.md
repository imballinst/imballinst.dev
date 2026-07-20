# Project-Level Instructions for imballinst.dev

## Em-dash convention

Use unspaced em-dashes: `word—word` not `word — word` or `word -- word`.

## Blog frontmatter images

The `image` field in frontmatter is **automatically rendered** at the top of every blog post by `src/components/BlogPostHeader.astro` (called from `src/layouts/BlogPost.astro`). It displays as a full-width `<figure>` with a linked `<img>` (max-height 400px, responsive srcset).

**Review implication:** Suggestions that tell the author to "surface the hero screenshot inline in the body" are invalid — the image is already visible to every reader at the top of the post. In-game screenshots beyond the hero image still require explicit markdown in the body.
