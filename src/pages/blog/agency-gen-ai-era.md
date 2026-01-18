---
title: The Power of Agency in a World Driven by Generated Content
description: When we defer a decision to an LLM instead of ourselves, we no longer have agency, and that is probably a bad thing.
publishDate: 2026-01-18T14:31:30.641Z
image: /assets/blog/agency-gen-ai-era/agency-gen-ai-era.png
imageAlt: An image illustrating someone with an umbrella representing agency amidst of generated content rain.
imageCaption: An image illustrating someone with an umbrella representing agency amidst of generated content rain.
tags: software engineering, life
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello! How are you doing? I hope you are doing well. If you feel like you have seen this kind of title somewhere, it's actually inspired by [Susan Cain's "Quiet: The Power of Introverts in a World That Can't Stop Talking"](https://www.goodreads.com/book/show/8520610-quiet). It's a really good book! If you see yourself as an introvert, I recommend reading that book.

Now, before I stray further from the main topic, let's get back on track. What's this post all about? Well, it's none other than the state-of-the-art Generative AI in software engineering.

If we are not careful, we might lose our agency as humans to do critical thinking.

## The search for best practices

We are in the early times of agent-based development. I often heard that we are all starting from 0. We don't know what the best practices are when working with a Large Language Model (LLM).

Technologies evolve very quickly. Just a few months ago, all we cared about were [Model Context Protocol (MCP)](https://opencode.ai/docs/mcp-servers/) and context window sizes. Now, we have something called [agent skills](https://opencode.ai/docs/skills/) and [beads](https://github.com/steveyegge/beads). **It's the gold rush all over again.**

I saw in my Twitter timeline that some people were using it normally (e.g., with Claude Code Pro, ~$17-20/month) for work/personal projects, and they shared how cool the capability of Claude Opus 4.5 was. That was fine.

However, some other people (maybe a loud minority) were using it _abnormally_ (e.g., with Claude Code Max, ~$100-200/month), running multiple agents for the entire day or night, and then they shared how the agents were able to finish the tasks when they were sleeping. I have 2 problems with this.

### Fear of missing out and unfair advantage

**Firstly, I think it gives a kind of Fear of Missing Out (FOMO) feeling to those who don't have that "powerful" limit.** I said this before: I really like GitHub Codespaces and other similar products because it gives someone, even with [a potato PC](https://www.quora.com/What-is-a-potato-PC), the capability to develop software. Using a PC with 4GB RAM, you can develop in a 16GB RAM machine inside GitHub Codespaces, which is really amazing. Yeah, you still need a PC and internet (very important!), but unless you are living in a very remote place, there should be a public place with free Wi-Fi that you can use for this purpose.

This is not the case for AI tools. Yes, GitHub is very gracious with the GitHub Copilot free tier, so those who can't afford an AI subscription can still try it, but it's not comparable to those who subscribe to the Claude Max x20 tier.

_"AI democratizes knowledge"_ is correct, but if the power levels differ based on the money someone uses to subscribe, I think it's an unfair advantage. For reference, OpenAI Codex [starts at $20/month](https://chatgpt.com/pricing/). Claude Code [starts at $17/month](https://claude.com/pricing). GitHub Copilot [starts at $10/month](https://github.com/features/copilot/plans).

It reminds me of when someone bought a fully-geared character account in an MMORPG.

Players with worse gear _can_ still beat them, but it is an uphill battle by default. The worst thing is, it's not a well-deserved uphill battle. It's **"pay to win"**. Imagine you are a fresh graduate. Not only do you have to compete with other experienced people, but you also have to compete with their crazy AI subscription, too (which, you may not have the money for). It's a vicious cycle: you need money to earn money.

**Unfortunately, this is not something that we can really control. Internet availability varies per region/government, and AI availability varies per provider.**

### Deferring of agency

**The second reason is that, if we have LLM running continuously during our sleep, we are also "offloading" our agency to the LLM.** I often saw people complaining about pull request (PR) review. I mean, who doesn't? Especially if the PR doesn't describe what the PR is all about, doesn't describe the logic/thoughtflow behind it, and then suddenly, _"Boom! Here are 3k line changes, please review them."_

Yeah, we have specifications that we can use for the LLM so it doesn't stray from its path. I have also tried the "plan" approach, where we provide the LLM with a thorough requirement and ask it to create a technical specification, including questions if there are things unclear. After providing the answers, the AI was able to generate a really good code and, more importantly, it worked!

_However_, there were still things that I needed to tweak. Perhaps that was because I wasn't thorough enough in the technical specification, maybe there was a configuration that I was missing, maybe it was because I wasn't using a best-in-class AI model, I don't know. But the key point is, I did not take what the AI wrote at face value.

AI models are very smart, I do not deny that. However, just because the AI models are very smart, **it doesn't mean you should always follow what they say**. Still with me? An easy example is parent-child dynamics. Parents tend to have way more experience and knowledge than their children, so they _most often_ will have better decision-making. However, does that mean you should _always_ follow what they say without objection? I don't think so. At least, we should have our own thinking. _"Is it right? Is it wrong? Why is it right? Why is it wrong?"_

The same goes when we work with an LLM. If we always say "yes" to what the LLM says, then we lose our agency to do critical thinking. Whenever it gives a solution, try to follow-up prompt (or do it from the get-go) to provide the source of their reasoning. That way, we can cross-check the veracity of the solution the LLM provided.

**This is something that we can control. Be it to humans or LLMs, keep honing our critical thinking skills.**

## What can possibly go wrong?

I started off as a Frontend Engineer. You know, converting design to HTML/CSS/JS and stuff. I know a bit of backend, but I would be lying if I know every corner of what a real Backend Engineer knows.

What do you think will happen when I prompt about backend stuff? Yes, I will prompt with very general terms because I don't know what the actual terms are. **General prompt yields general response, which might not be the correct answer.** Given the same problem, a real Backend Engineer would likely prompt with better keywords than I do, resulting in a better response.

That is not to say you can't prompt something outside your expertise. Of course, you are allowed to, but come on, let's repeat after me.

:::
Do not take what LLM says at face value. Do not take what LLM says at face value. Do not take what LLM says at face value.
:::

By not taking what LLM says at face value, you will be able to ask follow-up questions to prove the veracity of the response. This way, even though you are not the expert, you can _somewhat_ verify the response yourself.

You wouldn't jump over a cliff if the LLM asks you to, because that is too "drastic" and we know it's a crazy response. However, when the response "just looks right", this is where critical thinking plays an important part. **We can make the "just looks right" into "actually right".**

It's a bit off topic, but it's one of the good things that [Kapa.ai](https://www.kapa.ai/) does. Check out the [Temporal docs](https://docs.temporal.io/), then use the "Ask AI" on the top-right of the navigation bar. When you ask a question, it will give you an answer AND it will give you the source, which will help you to verify the answer yourself.

## Closing words

To recap what was written above:

1. **We are in the gold-rush phase of agent-based development, so mind your sanity.** Unfortunately, the current situation requires new entrants to have more resources (to subscribe to AI tools) to compete with other candidates, on top of a PC and an internet connection.
2. **Do not take what LLM says at face value.** Even though LLM may know a lot more than us, it is not always correct. We are humans, and we should have more agency rather than just being a "yes person" to LLM.
3. **The quality of LLM's response is determined by the quality of the prompt.** A general prompt will result in a general response. Always verify and clarify further to obtain an optimal result.

That's all for this post, I hope this is useful. Stay safe, stay healthy, and stay human!
