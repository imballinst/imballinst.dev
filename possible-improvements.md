# Possible Improvements — "Building a Word Arcade Game"

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

## TL;DR of the suggestions

1. Anchor the reader with a short "What is Atoyr?" before the engineering journey.
2. Match the title to what the article is actually about — or shift the content to match the title.
3. Re-cut "Overall architecture" — it currently promises architecture but delivers hosting + a price tangent.
4. Move or cut the PC-gaming / hardware-price tangent; it dilutes the main thread.
5. Split "Taking more control" — it bundles four unrelated points under one heading.
6. Merge the "too many requirements → lost appetite" story so cause and effect land in one place.
7. Flesh out or remove the HTML-comment placeholders (architecture image, GTM/dashboard, staging).
8. Bring the closing recap in sync with the actual article body.

---

## 1. Anchor the reader: what is Atoyr?

The article is framed around building a "word arcade game," but the game itself is never described. The name "Atoyr" only appears in the frontmatter image alt text, and the mechanics, gameplay loop, and "why a word game" all stay off-page. A reader reaches the closing recap without a clear picture of the product being built.

A 2–3 sentence "What is Atoyr?" paragraph right after the intro would give every later decision (Cutting user accounts, cutting itemization, what "sessions" mean in analytics) a concrete anchor. Without it, the architecture and analytics sections float in the abstract.

## 2. Title vs. content alignment

The title is "Building a Word Arcade Game," but the bulk of the article is about:

- AI-assisted development reflections
- Backend language-choice journey (Koa → NestJS → Go)
- Hosting, CI/CD, Docker registry selection
- Analytics setup
- Staging/prod split

That's a software-engineering postmortem wearing a game-dev title. Either:

- **Lean into the postmortem framing** with a subtitle like "Engineering notes from building Atoyr," so readers know what they're getting, or
- **Add a short "The game itself" section** (mechanics, screenshots, the gameplay loop) so the title earns itself.

Right now the title promises something the body only gestures at.

## 3. "Overall architecture" doesn't describe the architecture

The section opens with `<!-- Architecture image -->` and then immediately pivots to Hetzner vs OVH pricing. There is no textual description of the architecture the image presumably shows. The actual stack (React Router SPA prerendered, Go + Gin, GORM, Postgres/(?), Coolify/Traefik, Coolify Docker Registry, GitHub Actions) is only reconstructable from scattered comments in later paragraphs.

Two options:

- **Make the section match its heading.** Lead with a plain-text architecture summary — "Frontend: React Router SPA, prerendered. Backend: Go + Gin + GORM. Deployed on OVH VPS via Coolify, Traefik routing, images pulled from Coolify's Docker Registry, CI on GitHub Actions." Then let the image reinforce it. Then go into hosting/CI/CD.
- **Or rename the section** to what it actually covers (e.g., "Hosting and deployment") and drop the "architecture" framing.

The current heading is a promise the section doesn't keep.

## 4. The PC-gaming / hardware-price tangent dilutes the main thread

Paragraphs 59–61 (the RAM prices, PC parts, console vs mobile gaming, "please remind me about this post") are three paragraphs of unrelated rant in the middle of a hosting decision. They live between "Hetzner got expensive" and "I went with OVHcloud," and they break exactly the transition the reader needs.

This is the single biggest dilution in the article. Either:

- Cut it entirely, or
- Reduce it to one aside sentence ("And don't get me started on PC parts prices…") and move the rest to a footnote or a separate "personal ramble" post.

The author's personality is part of the piece, but this tangent costs more than it gives here.

## 5. "Taking more control" bundles four unrelated points

The section packs:

1. Ruthlessly prioritizing features (cutting user accounts + itemization)
2. Mixing manual coding with AI-assisted development
3. Switching GORM auto-migration to manual SQL migrations
4. Adopting oapi-codegen for OpenAPI → Go/TypeScript codegen

Points 1 and 2 are genuinely about "taking control" — they belong together. Points 3 and 4 are tooling decisions that flow from the same mindset but are a different topic. Consider a short sibling section like "Tightening up the stack" or "Type-safety and tooling" for the GORM + oapi-codegen moves, leaving "Taking more control" to do what its heading says.

## 6. Merge the "too many requirements → lost appetite" thread

The cause-effect pair is split across sections:

- Section 2 ("Tasting AI-assisted development"): "I lost my appetite for developing it. I got the 'joy' of finishing it according to my prompt, but it was... bland."
- Section 3 ("Taking more control"): "I mentioned in the previous section that I made too many requirements and lost my appetite in the process."

The cause (cast too wide a requirements net because everything felt possible with LLMs) lives in section 2. The effect (lost the spark) also lives in section 2. But the resolution (ruthless prioritization, cutting accounts + items) lives in section 3, where the cause is only referenced in passing. Telling the cause-effect-resolution in one connected arc — either fully in section 3, or fully in section 2 with section 3 picking up at "ruthlessly prioritize" — would make the strongest narrative beat in the article hit harder instead of being told twice.

## 7. HTML-comment placeholders signal unfinished sections

Three placeholder comments suggest sections that didn't get finished:

- `<!-- Architecture image -->` (line 55) — no textual architecture description follows.
- `<!-- Setting up GTM, simple dashboard -->` (line 82) — the section jumps straight to a metrics bullet list; GTM setup and the dashboard itself get one hand-wave sentence each ("throwaway feature that I almost fully relied on LLMs to create").
- `<!-- Separating staging and production environments -->` (line 104) — the section is the shortest and thinnest in the article.

Either flesh these out so the placeholders are no longer load-bearing, or remove the placeholders. As-is, they read as TODOs published by accident.

## 8. The closing recap only covers the first half

The recap lists three bullets:

- Backend choice journey (Koa → NestJS → Go)
- Final stack (React Router + Go/Gin/GORM)
- Taking more control via prioritization + manual/AI mix

That's the first ~half of the article. The second half — hosting/CI/CD, the Docker-registry decision, analytics, staging/prod — is unsummarized. Either:

- Extend the recap to cover the full journey (one bullet per section), or
- Scope the recap explicitly ("Stack decisions" recap) and add a one-liner acknowledging the deployment and analytics work separately.

As-is, the recap quietly tells the reader the second half didn't matter.

## 9. Minor: duplicate closer

Line 113 and line 119 both open with "That's all for this post." Drop one.

---

## What's working well (don't touch)

- The **AI-assisted-dev reflection** (the cook metaphor, the tutorial-book comparison, "LLMs may feel amazing at a job we aren't familiar with") is the strongest writing in the piece. It's specific, honest, and earns its length.
- The **vulnerability about losing the spark** and reviving it is what makes the article more than a stack rundown. Keep that thread intact through any restructuring.
- The **decisions-with-alternatives pattern** (Docker registry options, backend options) is great — keep listing the rejected options with one-line reasons. That's the most useful part for a reader.