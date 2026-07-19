# Possible Improvements — "Engineering Notes from Building Atoyr"

## Grammar fixes

Applied directly to the article in place via the `edit` tool. The prior round applied 2 fixes (`a SPA` → `an SPA`; `$6.5` → `$6.50 per month`) which are visible in the article and not re-listed. This round's new fixes:

| # | Line | Category | Before → After | Reason |
|---|------|----------|---------------|--------|
| 1 | L45 | Tense | "the first one is the user account, and the second one is itemization" → "the first one was the user account, and the second one was itemization" | Past narrative ("There were 2 features…") shifts to present mid-sentence; both verbs want past to match the framing. |
| 2 | L82 | Article | "There is only 1 private repository limit" → "There is only a 1-private-repository limit" | Missing article before a singular noun phrase; hyphenating "1-private-repository" makes it the compound modifier it is. |
| 3 | L94 | Missing object | "I decided to split up into 2 key sources" → "I decided to split this into 2 key sources" | "split up" needs an object or a "we"; "split this" supplies the implied antecedent. |

---

## Flow and content suggestions

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

### TL;DR of the suggestions

1. (high) Atoyr is never shown or described; the subject of a post titled after the game is unanchored.
2. (medium) "Tasting AI-assisted development" bundles ~4 orthogonal ideas under one H2; the reader re-acquires the thread at every paragraph boundary.
3. (medium) "Hosting and CI/CD" packs ~10 paragraphs across 3 concerns (hosting, CI mode, registry choice).

### 1. Atoyr is never shown or described (high)

- **Issue:** The hero image alt (L6) promises a screenshot of the game, but no in-game screenshot appears in the body — only a Google Analytics screenshot (L96), a server dashboard (L104), and a CI/CD diagram (L88). The game's mechanic gets one sentence in the opening paragraph (L13) and nothing after: no dictionary source, no scramble approach, no round/win/lose flow, no scoring.
- **Impact:** Readers can't form an image of what was built. For a post titled "Engineering Notes *from Building* Atoyr," the built thing is unanchored — every later section talks around a subject the reader has never met.
- **Suggestions:**
  1. Drop an in-game screenshot (scrambled word + 30-second timer mid-round) right after the opening paragraph — the hero image is already shown at the top via the layout.
  2. Add a short "What Atoyr is" H2 as the first section — mechanic, round flow, win/lose, dictionary/definition source — before "The beginning."
  3. Retitle to "Engineering Notes from Building Atoyr: AI-Assisted Dev and a Self-Hosted Stack" so the title matches what the body actually delivers and the missing-game-anchor pressure is removed.

### 2. "Tasting AI-assisted development" still bundles ~4 ideas (medium)

- **Issue:** The section (L27–41) opens with a helpful one-sentence map (L27: "There were 2 things that I faced…"), but the body still chains the two threads (over-scoping, learning-from-diffs) without a transition between them. After the map the paragraphs run: over-scope → loss of appetite → college tutorial-books → learning concern → cook analogy → token-usage caveat → PR-review/LLM peer analogy. The two promised threads don't get clean boundaries; the map promises structure that the paragraphs don't deliver.
- **Impact:** The map sets an expectation of organization, but the section still reads as stream-of-consciousness under each thread. The strongest insight (you learn little from reviewing diffs) still gets buried mid-block.
- **Suggestions:**
  1. Split into two H2s — "Scope creep from easy AI" (L27–31) and "How much do you learn from reviewing AI code?" (L33–41) — to honor the map you already wrote.
  2. Keep one H2 but add an H3 or horizontal rule between the two threads so the reader feels the pivot.
  3. Move the PR-review/"treat the LLM as a peer" beat (L41) into "Taking more control," since that's the section actually about actively engaging with LLM output.

### 3. "Hosting and CI/CD" is still one oversized section (medium)

- **Issue:** The section (L61–92) packs the Hetzner price rant (with a `<details>` tangent), the OVHcloud decision, a DNS detour, the Coolify + Traefik intro, the CI mode choice, a four-option Docker registry comparison, the final pipeline, and the Watchtower aside — ~10 paragraphs across hosting, CI mode, and registry choice. The heading no longer promises "release" (dropped), so the section promise now matches, but the section is still three concerns in one.
- **Impact:** Three concerns competing for the same H2 means each gets less attention than it deserves; a reader interested only in hosting or only in CI/CD has to parse the whole block.
- **Suggestions:**
  1. Split into "Hosting" (incl. DNS) and "CI/CD" (incl. the registry comparison), each with their own H2.
  2. Keep one section but use H3 subheadings — "Choosing a host," "CI build mode," "CD: choosing a registry" — so a skimmer can jump to the right subsection.
  3. Move the Hetzner judgment ("I ended up with OVHcloud…") and the DNS detour out of the long paragraph and into their own beats, so the reader isn't doing sentence-level thread-tracking in a dense block.

---

## What's working well (don't touch)

- **The cook analogy (L35)** — "you won't know unless you supervise it and you know what you are doing" — does more work than the usual "trust but verify" phrasing; it's a genuinely fresh frame for the "LLM output looks good but you can't verify the ingredients" problem.
- **Gating the Hetzner/PC-parts rant behind a `<details>` block (L63–71)** keeps the hosting thread readable while letting the tangent exist — exactly the right structural instinct, and a good model for other potential asides.
- **The self-critical "bland LLM-finished code" admission (L29)** gives the AI-dev section credibility; it reads as neither hype nor backlash, which is rare for this genre of post.
- **Link-dense, concrete infra detail** — real service names, real prices, real URLs (Hetzner press statements, OVHcloud VPS, Coolify, oapi-codegen, openapi-react-query, the four registry options) — turns the infra section into actual follow-up rabbit holes rather than a brand-name list.