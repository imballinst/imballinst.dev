# Possible Improvements — "Engineering Notes from Building Atoyr"

## Grammar fixes

Applied directly to the article in place via the `edit` tool. Logged here so the pattern of mistakes is visible and learnable. Quotes are kept short — just enough to identify the change in the article.

| # | Line | Category | Before → After | Reason |
|---|------|----------|---------------|--------|
| 1 | L57 | Hyphenation / typo | "Server Sent-Events" → "Server-Sent Events" | The hyphen belongs between "Server" and "Sent"; the canonical term is "Server-Sent Events". Placing the hyphen after "Sent" makes it read as "Sent-Events", which is not the technology's name. |
| 2 | L121 | Article | "feel lack of 'appetite'" → "feel a lack of 'appetite'" | "Lack" used as a noun requires an article ("a lack of"), the same way one writes "a lack of time" or "a lack of clarity". |

**Notes for the author:** Both this round's fixes are in newly-added or restructured sentences (the SSE bridge paragraph and the rewritten closing opener) — i.e. fresh prose, not lingering patterns. The older paragraphs of the article are mechanically clean.

---

## Flow and content suggestions

These are structural and flow-level suggestions, not line-edits. The goal is to make the article's point land harder, not to polish prose.

### TL;DR of the suggestions

1. The closing removed its recap entirely — the article now ends on just the personal payoff paragraph. That's a defensible stylistic choice, but it walks back the single biggest structural fix from prior rounds.
2. The "CI/CD and release" heading technically under-promises on what the section actually covers (hosting choice + collapsed rant + DNS detour + CI/CD pipeline).
3. The closing paragraph still opens with a back-reference to the spark/appetite problem rather than the resolution — less acute than prior rounds now that "I also mentioned" became "I mentioned that I began to feel…", but the strongest version of the beat still leads with the win.

---

### 1. The recap was removed entirely — name the tradeoff

The previous version of "Closing words" ran a bulleted recap (stack choices, hosting, CI/CD, analytics split, staging split) followed by the personal-payoff paragraph. This revision deletes the recap entirely; the section now consists of a single personal-payoff paragraph plus the one-line goodbye.

Ending on the personal beat is a legitimate stylistic choice and arguably the strongest emotional close. But it walks back the single biggest structural fix from prior rounds, where the recap was specifically extended to cover the full body. As it stands, a reader who came for the engineering content gets no end-of-article summary — they have to mentally reconstruct the takeaway from ~3000 words across 7 sections. The article's title is "Engineering Notes from Building Atoyr," which implies a postmortem, and postmortems usually leave the reader with the technical decisions, not just the author's emotional state.

**Options to fix:**

- Bring back a short recap (3–4 bullets, one per body section) and place it before the personal paragraph. Restore the prior structure: recap → payoff → goodbye. The recap primes the reader; the payoff lands last.
- Or keep the closing personal-only and scope the article's framing: change the title or the frontmatter description to signal the post is personal-essay-leaning rather than a postmortem recap, so the missing recap doesn't read as an omission to a reader who expected one.
- Or split the difference: keep one short "engineering takeaway" sentence in the personal paragraph itself — e.g., "the mix of manual coding and AI-assisted development, an HTTP+JSON+oapi-codegen contract, SSE for the timer, OVH for hosting, GA+server-side for analytics" — so the reader gets the technical arc grounded inside the emotional close.

---

### 2. "CI/CD and release" heading under-promises on hosting

The "CI/CD and release" section (lines 59–90) opens with the Hetzner-vs-OVH hosting decision, incorporates a collapsed rant about AI hyperscaling and PC parts prices, walks through the DNS detour (Netlify vs Squarespace name servers), introduces Coolify, then covers the actual CI options and Docker registry decision. Only the second half of the section (~lines 75–90) is about CI/CD itself. The first half is hosting infrastructure.

A reader scanning section headings and looking for "where's the hosting discussion?" would not find it under "CI/CD and release" — that heading promises continuous integration and deployment, not VPS selection.

**Options to fix:**

- Rename the section to "Hosting, CI/CD, and release" (or "Hosting and CI/CD") so the heading covers everything the section actually delivers.
- Or split: cut a top-level "### Hosting" subsection out of the current section and let "CI/CD and release" cover only the CI mode choice, registry choice, and pipeline. The rant folds under Hosting since it's triggered by Hetzner's price hike.

---

### 3. The closing payoff still opens with a back-reference

The closing paragraph was rewritten from "I also mentioned my lack of…" to "I mentioned that I began to feel a lack of 'appetite' for software engineering. After adjusting my workflow… I got my excitement over the project back." The new version is cleaner prose, but the rhetorical shape is unchanged: the first sentence is still a callback to the problem the reader is expected to remember from the intro, and the actual win ("I got my excitement over the project back") still lands mid-paragraph as a consequence of "After adjusting my workflow…".

The strongest version of this beat would lead with the resolution; the reader already remembers the problem — they don't need to be re-told it before getting the payoff. This now overlaps with suggestion 1 (the recap vs. personal-only tradeoff), since if you bring back a short recap, the personal paragraph can open more directly.

**Options to fix:**

- Drop the back-reference entirely: open with "After adjusting my workflow to mix AI-assisted and manual coding, I got my excitement over the project back. I learned a lot from this project, and that was what mattered to me…" — let the intro do the setup so the closing doesn't have to.
- Or keep the reference but invert its position: state the win first ("I got my excitement over the project back"), then briefly trace why ("adjusting my workflow from pure LLM-led to a mix was what did it. I'd mentioned at the start I'd lost my spark — that's what came back."). The contrast lands without back-loading the win.

---

## What's working well (don't touch)

- The **new "Locking the stack" structure now reads as a single narrative**: HTTP+JSON statement → oapi-codegen for contract sync → SSE bridge via "In addition to 'normal' send request and receive response". The new opener line on L55 ("Communication between client/server is via HTTP with JSON as the primary format") plus the SSE bridge sentence does what the prior round's suggestion asked for — the section no longer reads as stacked independent notes.
- The **personal-payoff paragraph in the closing** is preserved through all the restructuring. It explicitly closes the loop on the "lost my spark" intro hook. The structural notes in suggestions 1 and 3 are about how it's framed, not whether it should exist — keep the content.
- The **AI-assisted-dev reflection** (cook metaphor, tutorial-book comparison, PR-review analogy) remains the strongest writing and the most transferable content to readers in any language/stack. Keep its length and the conversational register.
- The **decisions-with-alternatives pattern** (backend language options, Docker registry options, CI modes) remains the most practically useful part of the article for a reader weighing the same tradeoffs. Keep listing rejected options with one-line reasons.