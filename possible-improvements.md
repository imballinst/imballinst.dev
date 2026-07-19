# Possible Improvements — "Engineering Notes from Building Atoyr"

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

## TL;DR of the suggestions

1. The closing recap lists the stack/infra but skips the article's actual heart — the AI-assisted-dev reflections.
2. "Tasting AI-assisted development" bundles ~4 orthogonal ideas under one heading.
3. "Hosting, CI/CD, and release" is oversized (3 distinct concerns) and "release" is never delivered.
4. The SSE-vs-WebSocket call — the strongest engineering decision — is buried as a third paragraph inside "Locking the stack."
5. The reader never sees Atoyr itself: no in-game screenshot, no game-loop description beyond the opening one-liner.
6. Title promises "engineering notes" but the center of gravity is AI-dev workflow + infra — either retitle or rebalance.

---

## 1. Closing recap skips the article's actual heart

The recap (lines 125–130) lists six bullets: stack migration, final stack, prioritization + manual/AI mixing, OVHcloud, GitHub Actions minutes + Coolify registry, and Google Analytics. It omits almost everything the middle of the article actually argues: the LLM-driven-dev learning concern ("Tasting AI-assisted development," lines 27–39), the cook/PR-review analogies, the SSE-vs-WebSocket decision, the GORM→manual-migrations call, the OpenAPI codegen setup, and the analytics-vs-dashboard two-source rationale. As written, the recap reads like a stack checklist, not a summary of the post's thesis, and a skim-only reader would conclude the article was about hosting when it is really about working with LLMs.

**Concrete options to fix it:**
- Re-group the recap into two clusters — "On AI-assisted development" and "On the build/infra" — so the thematic balance mirrors the body.
- Scope it explicitly: open the recap with "On the stack and infra side, I…" so the AI-dev reflections are signaled as the body's takeaway rather than a bullet.
- Trim to three bullets and link to the section headings instead of restating infra that's already a list above.

---

## 2. "Tasting AI-assisted development" bundles ~4 orthogonal ideas

This section (lines 27–39) chains: over-scoping via wide-net prompts → loss of appetite (¶1–2) → the blandness of LLM-finished code and the college tutorial-books analogy (¶3–4) → the decision-making/learning concern (¶4) → the cook analogy (¶5) → the token-usage / "on the clock 24/7" caveat (¶6) → the PR-review analogy and fine-tuning the LLM peer (¶7). They hang together only because they're all "about AI"; there is no load-bearing transition between, say, the scope-creep beat and the learning-from-diffs beat. A reader has to re-acquire the thread at every paragraph boundary.

**Concrete options to fix it:**
- Split into two sections: "Scope creep from easy AI" (¶1–2, tying back to "lost my spark") and "How much do you learn from reviewing AI code?" (¶3–7).
- Keep one section but open with a one-sentence map ("Two problems emerged: I over-scoped because AI made it cheap, and I learned less than I thought I would.") so the reader knows there are two threads.
- Move the PR-review / "treat the LLM as a peer" beat (¶7) into "Taking more control," since it's about actively engaging with LLM output — which is that section's actual subject.

---

## 3. "Hosting, CI/CD, and release" is oversized and "release" never lands

The section (lines 59–90) packs the Hetzner price rant (with a 3-paragraph `<details>` tangent), the OVHcloud decision, a DNS detour, the Coolify + Traefik intro, the CI mode choice (Git vs. Docker image), a four-option Docker registry comparison, the final pipeline, and the Watchtower aside. That's ~10 paragraphs across three distinct concerns: hosting, the CI build mode, and the registry choice. The heading also promises "release," but there is no release-day narrative — no smoke test, no first-deploy verification, nothing about what "released it properly last week" (line 15) actually involved.

**Concrete options to fix it:**
- Split into "Hosting" (incl. DNS) and "CI/CD" (incl. the registry comparison); drop "release" from the heading or actually add a short "going live" paragraph.
- Move the Hetzner-vs-OVHprice comparison (and its rant) into an aside/callout so the main flow reads "chose a host → chose CI → chose registry → pipeline."
- If you keep one section, rename to "Hosting and CI/CD" to match what's actually in it.

---

## 4. The SSE-vs-WebSocket decision is buried inside "Locking the stack"

The second paragraph of "Locking the stack" (line 57) is the single most substantive engineering decision in the post: SSE for session ticks, why not WebSocket (submit-lost-on-reconnect complexity), and the inactive-SSE reconnection approach. But it shares one H2 with GORM auto-migration → manual SQL and the OpenAPI codegen setup, so a reader skimming headings would miss the decision entirely. For a post literally titled "Engineering Notes," the one hard architectural trade-off deserves top billing rather than paragraph three.

**Concrete options to fix it:**
- Promote SSE to its own H2 ("Real-time updates: SSE, not WebSocket") either inside "Locking the stack" as an H3 or as a sibling section.
- Pull SSE (and any other non-trivial architectural choices) into a short "Architecture decisions" section so trade-offs are grouped and findable.
- At minimum, open the SSE paragraph with the decision ("I chose SSE over WebSocket for session ticks") instead of burying the choice mid-sentence.

---

## 5. The reader never sees Atoyr itself

The hero image alt text (line 6) describes "one of the screenshots of the game Atoyr," but the only images in the body are a Google Analytics screenshot (line 96), a server dashboard screenshot (line 104), and a CI/CD architecture diagram (line 88). There is no in-game screenshot and no description of the game's UI or round flow beyond the one-line mechanic in the opening paragraph (line 13). For a post titled after the game, the subject of the post is unanchored — the reader can form no image of what was built.

**Concrete options to fix it:**
- Add a screenshot of the game (scrambled word + live 30-second timer mid-round) immediately after the opening paragraph.
- Add a short "What Atoyr is" H2 as the first section (mechanic, round flow, win/lose, where the dictionary/definitions come from) before "The beginning."
- At the least, surface the hero screenshot inline in the body instead of leaving it visible only via frontmatter rendering.

---

## 6. Title promises "engineering notes"; the center of gravity is AI-dev workflow + infra

The title "Engineering Notes from Building Atoyr" sets up the expectation of notes about the game's own engineering — game loop, dictionary source, definition source, scramble algorithm, scoring, timer correctness. What the body actually delivers is (a) reflections on AI-assisted development (the thematic spine, lines 19–49) and (b) the hosting/CI/CD stack (lines 53–90). The game's own engineering is essentially absent. That's not a flaw of the content — it's a mismatch between title and content, and it's cheap to fix.

**Concrete options to fix it:**
- Retitle to flag the two real themes, e.g. "Engineering Notes from Building Atoyr: AI-Assisted Dev and a Self-Hosted Stack," so the reader knows what they're getting.
- Keep the title and add one short "The game itself" H2 covering dictionary/definition source, scramble, and scoring — enough to justify "engineering notes."
- Split into two posts (one on the AI-dev reflections, one on the self-hosted Go+React stack), since each theme is already post-length.

---

## What's working well (don't touch)

- **The cook analogy (line 35)** — "you won't know unless you supervise it and you know what you are doing" — is a genuinely fresh and memorable frame for the "LLM output looks good but you can't verify the ingredients" problem; it does more work than the usual "trust but verify" phrasing.
- **Gating the Hetzner/PC-parts rant behind a `<details>` block (lines 63–71)** keeps the hosting thread readable while letting the tangent exist — exactly the right structural instinct, and a good model for the other potential asides in the post.
- **The self-critical "bland LLM-finished code" admission (line 29)** is the beat that gives the AI-dev section credibility; it reads as neither hype nor backlash, which is rare for this genre of post.
- **Link-dense, concrete infra detail** — real service names, real prices, real URLs (Hetzner press statements, OVHcloud VPS, Coolify, oapi-codegen, openapi-react-query, the four registry options) — turns the infra section into actual follow-up rabbit holes for the reader rather than a brand-name list.