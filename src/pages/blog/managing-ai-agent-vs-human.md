---
title: Managing Agents vs Managing Humans
description: As software engineers spend more time steering AI tools, the gap between managing agents and managing people becomes more important.
publishDate: 2026-04-04T05:16:56.276Z
image: /assets/blog/managing-ai-agent-vs-human/managing-ai-agent-vs-human.png
imageAlt: An image illustrating a joystick connected to a human (or rather, cat) and a robot. My wife drew this for me!
imageCaption: An image illustrating a joystick connected to a human (or rather, cat) and a robot. My wife drew this for me!
tags: software engineering, ai
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hey, there! Back again with the most saturated topic nowadays: Artificial Intelligence (AI) stuff! But luckily, I won't be writing about lines of code, the number of Pull Requests (PRs) I open per day, or how I no longer look at my Integrated Development Environment (IDE) when I develop. Instead, I'll be writing about the differences between managing humans and managing agents. I think it's often overlooked these days when people are more focused on "the output" and not "the process", whereas it may be more nuanced than that.

To me, the 2 look similar on the surface because both involve delegation, review, and feedback—but the differences matter more than they first appear.

## The "traditional" way

Before AI-assisted development became popular, it was all (or perhaps, still is) more familiar. Individual Contributors (ICs) contribute, managers manage. It isn't only these 2 spectrums, though, as there are also some opting to do both (either by necessity or by their own choosing), such as managers that still do individual contribution.

A manager helps ICs grow by giving direction, creating room for ownership, and making sure good work is visible to the right people (you can read more here: [#](manager-stories.md)). In doing so, the individual contributors become more experienced, and then they can choose whether they want to stay on the IC track or move toward management. That is how capability compounds inside a team: not just through delivery, but through repeated coaching, trust, and decision-making.

## The "nowadays" way

Now, ICs can use AI to assist with development, and the same goes for managers who still contribute technically. I have experienced both spectrums, so here is what I think, though the comparison is only useful if we are precise about where the analogy breaks.

As a rough starting point, current AI agents can usually generate and scan code faster than humans, while humans still bring something agents do not: motivation, accountability, and independent judgment. That asymmetry is what makes the comparison interesting to me.

### Management style

When managing humans, it depends on the person. Some people need very little oversight because they have the judgment and context to move well on their own. Others need more structure, either because the task is ambiguous, the stakes are high, or they are still developing.

On the other hand, managing agents tends to look much closer to task design and constraint-setting. You are not coaching a mind that grows through reflection; you are packaging context, defining guardrails, and checking whether the output is actually aligned with your intent.

In practice, that often means instructions, repository conventions, tool access, and repeated feedback loops. Unlike with humans, this setup is not really a one-time investment. It has to be maintained as the codebase, tools, and expectations change.

So, if I had to simplify the difference, it would be this:

- Humans may forget details, but they accumulate judgment, trust, and context over time. The best ones eventually need less supervision, not more.
- Agents usually arrive with broad prior knowledge but very little project-specific context. If you care about consistency, you have to supply that context explicitly and keep it current as the codebase evolves. That does not guarantee one-shot success on complex work, but it does reduce the amount of back-and-forth needed to get usable output.

Both still have one shared pattern: if you do not understand the underlying work, you cannot evaluate the output well. At that point, you are not really directing anything. You are just approving whatever comes back.

Once you do understand the work, you are in a better position to intervene precisely. With humans, though, I still recommend using that carefully. Too much control may reduce mistakes in the short term, but it can also reduce ownership, confidence, and growth.

I can understand why some people would rather steer agents than manage humans. I was once, too (or probably I still am). But I would not even be good at steering agents if other people had not helped me build judgment first. So, I kinda think this is also my chance to give back.

### Experience

Experience matters because it shapes future judgment. When a task gets done, someone usually learns from it. But the learning is not evenly distributed. The person doing the hardest thinking, making the tradeoffs, and dealing with the consequences tends to gain the most.

Let's compare them (the example below assumes the human pulls their weight):

- In terms of "getting" experience
  - When a human completes difficult work, the learning becomes part of their own judgment and can often transfer across jobs, projects, and domains.
  - When an agent completes similar work, whatever was learned is usually much more limited. It may persist in the current conversation, workspace setup, or product-specific memory, but it is not the same thing as a person internalizing judgment.
- In terms of "applying" experience
  - Humans apply experience through memory, pattern recognition, and judgment under ambiguity.
  - Agents apply experience through a mix of pretrained patterns, current context, available tools, and whatever instructions or examples they are given. Their usefulness depends heavily on the quality and completeness of those inputs.

I do think agents can sometimes approximate the surface expression of experience, especially when the task is narrow and the relevant context is easy to retrieve, but that is not the same thing as having human judgment. Under ordinary conditions, I still trust humans more as decision-makers, especially when the work is ambiguous or the tradeoffs are social, organizational, or long-term.

Where agents may have an edge is rapid context retrieval: they can scan a repository for relevant patterns, trace interoperability across multiple codebases, or pick up a previous conversation thread faster than a human who is juggling multiple priorities at once.

## Bottom line

The core tradeoff is this: agents can absorb and recall context faster than most humans, but humans accumulate judgment in a way agents do not. Leaning too far toward agents speeds up execution while quietly eroding the depth of understanding on the team.

So, I'll end with a few questions:

1. One of a manager's long-term goals is to help a team operate well without constant intervention. Does AI make that easier by reducing execution cost, or harder by weakening how judgment gets built?
2. When a direct report finishes a task with heavy AI assistance, where does the real learning happen? In the person, in the surrounding workflow, or mostly in the prompt and review loop?
