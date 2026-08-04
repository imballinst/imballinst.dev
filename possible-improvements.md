# Possible Improvements — "A Test of Your Reflexes (Atoyr)"

> Scope note: this is a short project landing page (frontmatter + intro paragraph + video embed + 5 bullets), not a long-form article. The grammar pass still applies; the flow pass is necessarily thin — most of the long-form checklist (closing recap, section promises, tangents) doesn't map onto a page with no section headings.

## Grammar fixes

Applied directly to the article in place via the `edit` tool. Logged here so the pattern of mistakes is visible and learnable. Quotes are kept short — just enough to identify the change in the article.

| # | Line | Category | Before → After | Reason |
|---|------|----------|---------------|--------|
| 1 | L8 | Article | "made it an arcade-like" → "made it arcade-like" | "Arcade-like" is a predicate adjective, not a countable noun; the article "an" is wrong. |
| 2 | L8 | Tense | "where you had 30 seconds to play and you guess" → "where you have 30 seconds to play and you guess" | Tense shift within one clause (past "had" next to present "guess"); the game still exists, so present is consistent. |
| 3 | L12 | Dangling modifier | "the engineering notes that I wrote, containing the 'journey' of developing it here:" → "the engineering notes that I wrote—containing the 'journey' of developing it—here:" | "Here" was attaching to "developing it" instead of "see," making the sentence read as if the journey happened *here*; em-dashes isolate the parenthetical so "here" binds to "see." |

---

## Flow and content suggestions

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

### TL;DR of the suggestions

1. The title's "Reflexes" framing is never earned by the body — a word-guessing game isn't self-evidently a reflex test. (medium)

### 1. Title promises a reflex test; the body delivers a word game (medium)

- **Issue:** The title "A Test of Your Reflexes (Atoyr)" sets up an expectation of twitch/action gameplay, but the intro paragraph describes a Wordle-like word game played against a 30-second clock. Nothing in the body explains what makes this a "reflexes" game rather than a vocabulary/speed game — the framing is asserted by the title and dropped by L8.
- **Impact:** A reader arriving from the title alone may expect a different genre and bounce when the video/embed reveals word guessing; the title is doing load-bearing work the body doesn't support.
- **Suggestions:**
  1. Add one clause to L8 naming what's reflex-like — e.g. the time pressure on word recall, or the arcade "as many as you can" loop — so the title's claim is grounded in the gameplay described.
  2. Soften the title's claim (e.g. "A Test of Your Word Recall") if the reflex framing isn't actually the point.

---

## What's working well (don't touch)

- The YouTube embed right under the intro gives an immediate, visceral sense of the game without the page having to describe it — appropriate for a project landing page where a video is worth far more than prose.
- The "In short" bulleted stack summary is correctly scoped: it tells a technical reader the architecture in five scannable lines and defers the depth to the linked engineering-notes post instead of duplicating it.
- The intro paragraph earns the bullets: the "I had to learn (and re-learn) all of the deployment stuff" motivation sets up why a simple game needs Docker + Coolify + CI, so the infra-heavy bullet list doesn't feel over-engineered for a word game.