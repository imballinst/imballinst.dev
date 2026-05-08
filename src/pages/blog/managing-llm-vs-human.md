---
title: Managing LLMs vs Managing Humans
description: As software engineers spend more time steering LLM tools, the gap between managing agents and managing people becomes more important.
publishDate: 2026-04-04T05:16:56.276Z
image: /assets/blog/managing-llm-vs-human/managing-llm-vs-human.png
imageAlt: An image illustrating a joystick connected to a human (or rather, cat) and a robot. My wife drew this for me!
imageCaption: An image illustrating a joystick connected to a human (or rather, cat) and a robot. My wife drew this for me!
tags: software engineering, ai
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hey, there! Back again with the most saturated topic nowadays: Artificial Intelligence (AI) stuff. But luckily, I won't be writing about lines of code, the number of Pull Requests (PRs) I open per day, or how I no longer look at my Integrated Development Environment (IDE) when I develop. Instead, I want to talk about the differences between managing humans and managing Large Language Model (LLM) agents. I think this gets overlooked when people focus only on "the output" and not "the process," even though things are usually more nuanced than that.

To me, both look similar on the surface because both involve delegation, review, and feedback. However, the differences matter more than they first appear.

## The "traditional" way

Before AI-assisted development became popular, it was all (or perhaps, still is) pretty straightforward. Individual Contributors (ICs) contribute, managers manage. But it's not only those two ends, because some people do both (either by necessity or by choice), like managers who still contribute individually.

A manager helps ICs grow by giving direction, creating room for ownership, and making sure good work is visible to the right people (you can read more here: [#](manager-stories.md)). In doing so, ICs become more experienced, and then they can choose whether to stay on the IC track or move toward the managerial track. That is how capability compounds inside a team: not just through delivery, but through repeated coaching, trust, and decision-making.

## The "nowadays" way

Now, ICs can use LLMs to assist with development, and the same goes for managers who still contribute technically. I have lived both sides, so here's what I think.

As a rough starting point, current LLM agents can usually generate and scan code faster than humans, while humans still bring things agents do not: motivation, accountability, and independent judgment. Those differences make this comparison interesting to me.

### Management style

When managing humans, it depends on the person. Some people need very little supervision because they have the judgment and context to move well on their own. Others need more structure, either because the task is ambiguous or the stakes are high, which is to say: they are still developing.

On the other hand, managing agents tends to look much closer to task design and constraint-setting. You are not coaching a mind that grows through reflection; you are packaging context, defining guardrails, and checking whether the output is actually aligned with your intent. In practice, that often means instructions, repository conventions, tool access, and repeated feedback loops.

If I had to simplify the difference, it would be this:

- Humans may forget details, but they accumulate judgment, trust, and context over time. The best ones eventually need less supervision, not more.
- Agents usually arrive with broad prior knowledge but very little project-specific context. If you care about consistency, you have to supply that context explicitly and keep it current as the codebase evolves. That does not guarantee one-shot success on complex work, but it does reduce the amount of back-and-forth needed to get usable output.

Both still share one pattern: if you do not understand the underlying work, you cannot evaluate the output well. At that point, you are not really directing anything. You are just approving whatever comes back. Addy Osmani has an interesting article about [Cognitive Surrender](https://addyosmani.com/blog/cognitive-surrender/); I think it is especially relevant these days.

Once you do understand the work, you are in a much better position to intervene precisely. With humans, though, I still recommend doing that carefully. Too much control may reduce mistakes in the short term, but it can also reduce ownership, confidence, and growth. For LLMs, you can intervene any time since they do not have feelings. No, I don't have AI psychosis, yet.

![It's alive!](/assets/blog/managing-llm-vs-human/managing-llm-vs-human.png)

I can understand why some people would rather steer agents than manage humans. I was there once too (or probably still am). But I wouldn't even be good at steering agents if other people had not helped me develop first. So I kind of think this is my chance to give back.

### Experience

Experience matters because it shapes future judgment. When a task gets done, someone usually learns from it. But the learning is not evenly distributed. The person doing the hardest thinking, making the tradeoffs, and dealing with the consequences tends to gain the most.

Let's compare them (the example below assumes the human pulls their weight):

- In terms of "getting" experience
  - When a human completes difficult work, the learning becomes part of their own judgment and can often transfer across jobs, projects, and domains.
  - When an agent completes similar work, whatever was learned is usually much more limited. It may persist in the current conversation, workspace setup, or product-specific memory, but it is not the same thing as a person internalizing judgment.
- In terms of "applying" experience
  - Humans apply experience through memory, pattern recognition, and judgment under ambiguity.
  - Agents apply experience through a mix of pretrained patterns, current context, available tools, and whatever instructions or examples they are given. Their usefulness depends heavily on the quality and completeness of those inputs.

I do think agents can sometimes approximate the surface expression of experience, especially when the task is narrow and the relevant context is easy to retrieve. But that is not the same thing as having human judgment. Under ordinary conditions, I still trust humans more as decision-makers, especially when the work is ambiguous or the tradeoffs are social, organizational, or long-term.

Where agents may have an edge is rapid context retrieval: they can scan a repository for relevant patterns, trace interoperability across multiple codebases, or pick up a previous conversation thread faster than a human who is juggling multiple priorities at once.

### Availability

Humans _usually_ only work 8 hours a day, while some go beyond that. I am not going to discuss right or wrong; it depends on the situation. LLMs, like any software, do not need rest. They are available 24/7 unless the platform is down. For example, [Claude](https://status.claude.com/) has had visible uptime issues before, and [GitHub's uptime](https://mrshu.github.io/github-statuses/) has had rough periods too... but I digress.

Compared to humans, who may have many availability constraints (health, family matters, life matters), LLM availability from the user point of view is mainly reduced by two things: platform incidents and rate limits.

So, in my opinion, LLMs are ahead on raw availability.

## Bottom line

The core tradeoff is this: agents can absorb and recall context faster than most humans, but humans accumulate judgment in a way agents do not. Leaning too far toward agents speeds up execution while quietly eroding the depth of understanding on the team.

Speaking about understanding, just recently I saw someone said something along the lines of, _"Delegate your thinking, not your understanding"_. I am sorry? From my experience in playing games, even if I understand something, I still have to think because things are happening dynamically and I have to react. There will be times where you understand something but since you don't think, it becomes an oversight instead.

So, I'll end with a few questions:

1. One of a manager's long-term goals is to help a team operate well without constant intervention. Do LLMs make that easier by reducing execution cost, or harder by weakening how judgment gets built?
2. When a direct report finishes a task with heavy LLM assistance, where does the real learning happen? In the person, in the surrounding workflow, or mostly in the prompt and review loop?
3. Considering LLMs are _generally_ more affordable than humans right now, will that hold in the long run? When does the cost of using LLMs hit a breakeven point, and at that point, is it still a worthwhile tradeoff to use LLMs instead of humans?
