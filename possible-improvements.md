# Possible Improvements — "Engineering Notes from Building Atoyr"

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

Note: several issues from the previous review have been addressed in this revision (retitled to a postmortem framing, mechanics anchored in the intro, placeholder comments replaced with real images, "Taking more control" no longer bundles four topics, rant moved into a collapsible `<details>` block). The suggestions below are the remaining structural issues in the current version.

## TL;DR of the suggestions

1. Closing recap covers only the first half of the article; the back half (hosting, registry, CI/CD, analytics, staging) is unsummarized.
2. The "lost appetite → ruthless prioritization" arc is split across two sections with only a passing cross-reference; the strongest narrative beat lands twice and weaker for it.
3. "Final touches" heading promises more than its single paragraph delivers (only the staging environment + tag workflow).
4. The `### Objective` subheading inside "Analytics and dashboard" is mismatched with its content and only one paragraph thick.
5. The SSE-vs-WebSocket rationale is buried at the end of "Locking the stack" after a "To rehash" wrap-up line — it reads as an afterthought despite being a load-bearing technical decision.
6. Duplicate closer — "That's all for this post." opens both the recap and the final paragraph.

---

## 1. Closing recap covers only the first half

The recap in "Closing words" lists three bullets: the backend-option journey, the final React Router + Go/Gin/GORM stack, and "took more control via prioritization + manual/AI mix." That's effectively everything up through the "Taking more control" section — roughly the first half of the body. The second half (OVH hosting choice, Coolify Docker Registry decision, GitHub Actions CI, Google Analytics + server dashboard, staging/prod tag split) gets zero recap.

The article has a frontmatter description that promises "engineering notes," and ~60% of the word count is deployment/infra/analytics work. A recap that summarizes only the language-and-process decisions quietly tells the reader the infra half didn't matter.

**Options to fix:**

- Extend the recap to one bullet per major section (stack, hosting/CI/CD, registry, analytics, staging) — keeps the structure parallel with the body.
- Keep the recap short but scope it explicitly ("Stack and process decisions") and add a one-sentence ack that the deployment and analytics work was the bulk of the project.

---

## 2. "Lost appetite → ruthless prioritization" cause-effect arc is split

The strongest narrative beat in the piece is the AI cycle: cast a wide requirements net because everything felt possible → finish per the prompt → feel nothing → lose the spark → come back and ruthlessly cut. Right now that arc is told in two passes:

- In "Tasting AI-assisted development": the wide-net requirements and the bland finish ("I got the 'joy' of finishing it... but it was... bland").
- In "Taking more control": "I mentioned in the previous section that I made too many requirements and lost my appetite in the process. When I got back to it recently, I made a resolution..."

The cause lives in section 2, the resolution lives in section 3, and they're connected only by "I mentioned in the previous section." The reader is asked to re-assemble the beat across a section boundary. Telling it once, end-to-end — either fully in section 2 (ending on the resolve to cut) with section 3 picking up at "ruthlessly prioritize," or fully in section 3 with section 2 stopping at "I lost my appetite" — would let the strongest beat land without being narrated twice.

**Options to fix:**

- Keep the wide-net story in section 2 but move the "so I resolved to ruthlessly prioritize" pivot to the end of section 2; open section 3 directly at the cut (user accounts + itemization).
- Or compress section 2's appetite-loss to one beat and let section 3 fully re-tell the cause (wide net → bland → cut) end-to-end, dropping the "as I mentioned" back-reference.

---

## 3. "Final touches" heading is broader than its content

The section is one paragraph covering exactly one topic: introducing a staging environment and updating the GitHub workflow to build distinct `staging` vs tag-and-`latest` Docker image tags. The plural "Final touches" implies a list of last-minute polish items, but the section delivers a single decision.

Either there were other final-touch decisions (analytics auth, dashboard UI, DNS/HTTPS) that belong here and weren't surfaced, or the heading should scope down.

**Options to fix:**

- Rename to "Staging and production split" (or "Staging environment") so the heading matches the content.
- Or, if there were genuinely other final touches, add them; if the only one was staging, the plural heading over-promises.

---

## 4. The `### Objective` subheading is mismatched and thin

Inside "Analytics and dashboard" there's a `### Objective` subsection containing a single paragraph. The paragraph actually does three things: explains the goal of having two data sources, mentions GA-driven improvements to be shared in a future post, and notes that dashboard access is gated by Google auth and the dashboard UI was largely LLM-generated. None of that is really an "objective" — it's implementation notes. The corporate-doc heading ("Objective") also clashes with the otherwise conversational register of the post.

**Options to fix:**

- Drop the `###` subheading entirely and let the paragraph flow as the closing prose of "Analytics and dashboard." The subheading buys nothing.
- Or rename it to something that matches the content ("Access and implementation") and add one or two more sentences so the subheading earns its existence.

---

## 5. The SSE-vs-WebSocket rationale is buried after a "To rehash" wrap-up

"Locking the stack" runs: GORM auto-migration → manual SQL → oapi-codegen/OpenAPI codegen → "To rehash, the stack is..." (which is the section's natural summary line) → and then keeps going into a substantive SSE-vs-WebSocket rationale. Because "To rehash" reads as the section's closing summary, the SSE paragraph that follows reads like an afterthought tacked on past the wrap-up — even though it's actually the most load-bearing technical decision in the section (it drives the connection-drop handling described later in analytics).

The SSE choice deserves more prominence than "thing mentioned after the recap."

**Options to fix:**

- Move the "To rehash" sentence to be the actual last sentence of the section, and put the SSE-vs-WebSocket rationale before it (so the section is: tooling choices → transport choice → "to rehash, the stack is X, transport is SSE because Y").
- Or split the SSE decision into its own short subsection ("Transport: SSE over WebSocket") so it gets its own heading and the reader registers it as a real decision rather than a tag-on.

---

## 6. Duplicate closer

The closing section opens with "That's all for this post. To recap:" (line 128), runs the recap bullets, then opens the final paragraph with "That's all for this post. Hopefully it is useful, and see you on the next one!" (line 134). The phrase bookends the same three-line block, which reads as a copy-paste residue rather than a deliberate framing.

**Options to fix:**

- Drop the second occurrence and end on "Hopefully it is useful, and see you on the next one!".
- Or scope the first one to "To recap:" only, and let "That's all for this post." serve as the closer once.

---

## What's working well (don't touch)

- The **anchored intro** now does real work: the game's mechanics, the name's origin, and the 30-seconds gameplay loop are all stated in the first paragraph, so every later decision (cutting user accounts, what "sessions" mean in analytics) has a referent. This is the most important improvement over the prior version — preserve it.
- The **AI-assisted-dev reflection** (the cook metaphor, the tutorial-book comparison, the "ask the LLM to clarify intent" loop) is still the strongest writing in the piece — specific, honest, and earns its length.
- The **decisions-with-alternatives pattern** (backend options, Docker registry options, CI modes, hosting) is the most useful part for a reader who's weighing the same tradeoffs. Keep listing the rejected options with one-line reasons.
- The **`<details>` collapsible rant** is a good structural compromise — it preserves the author's voice and the personal stance on AI/open-weight vendors without letting three paragraphs of unrelated hardware-price commentary break the CI/CD narrative. Keep this pattern.