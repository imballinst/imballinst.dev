---
title: Managing Agent vs Managing Human
description: Software engineers (individual contributors) shifted from writing code to managing agents. Managers, on the other hand, may now have double jobs.
publishDate: 2026-04-04T05:16:56.276Z
image: /assets/blog/managing-ai-agent-vs-human/managing-ai-agent-vs-human.png
imageAlt: An image illustrating a joystick connected to a human (or rather, cat) and a robot. My wife drew this for me!
imageCaption: An image illustrating a joystick connected to a human (or rather, cat) and a robot. My wife drew this for me!
tags: software engineering, ai
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hey, there! Back again with the most saturated topic nowadays: AI stuff! But luckily, I won't be writing about lines of code, the number of PRs I open per day, or how I no longer look at my IDE when I develop. Instead, I'll be writing about the differences between managing humans and managing agents. I think it's often overlooked these days when people are more focused on "the output" and not "the process", whereas it may be more nuanced than that.

## The "traditional" way

Before AI-assisted development became popular, it was all (or perhaps, still is) _quite_ simple. Individual contributors (ICs) contribute, managers manage. It isn't only these 2 spectrums, though, as there are also some opting to be the middle of it (either by necessity or by their own choosing), such as managers that still do individual contribution.

Managers will help individual contributors by guiding them to a path where they can grow, as well as platforming their work so it is visible to the higher-ups (you can read more here: [#](manager-stories.md)). In doing so, the individual contributors become more experienced, and then they can choose whether they want to stay on the IC track or change into the managerial track.
That's how the "knowledge passing" happens, rinse and repeat.

## The "nowadays" way

Now, ICs can utilize AI to assist the development (for better or worse). The same goes for managers who still contribute. I have experienced both spectrums, so here is what I _think_. Oh, just to add, I am not going to discuss that AI can output code faster than humans, because that's a given, provided that the human and the AI agent start with the same context.

### Management style

When managing humans, it depends on the person. Some people can be trusted with their work, and when they challenge the current idea, it is usually a pleasant discussion. However, some others require micromanaging every now and then.

On the other hand, when managing agents, it _hovers_ more towards micromanaging. How could we not? The AI models are trained using vast amounts of data, and we have to "propel" them to our needs. The Markdown files are the representation of it, and we "force" the AI agent to read them (either by default or conditionally). Despite the fact that this is a manual process, it's only done once.

So, if we want to take some major differences, they would be these:

- Humans can (or often) forget, so the worst case is that micromanagement needs to happen often. However, for those with excellent skills and attitude, we can delegate with peace of mind, so no micromanagement is needed.
- AI agents start from 0, so if you care about the codebase, you have to micromanage by initially setting up the Markdown files to ensure the code output is consistent, regardless of who runs it and when it runs. As the codebase grows, we will need to regularly micromanage by updating the Markdown files to the latest state-of-the-art condition of the codebase. It doesn't mean that you'll be able to one-shot a complex case in the future, but it would _reduce_ the amount of back-and-forth that you need to get the result just right.

Both have the same common pattern: if you don't know the fundamentals of what your direct reports/AI agents are doing, you can't really manage them. You just let them do what they think is right. Are the things they are doing right? You never know.

When you do, though, you have the right to micromanage... although I do recommend refraining from doing so to humans unless absolutely necessary. Micromanage prevents mistakes, yes, but growth more often than not comes from failures.

I can understand people who prefer to manage AI agents rather than humans. I was once, too (or probably I still am). But I wouldn't be able to manage AI agents if not for those who helped me grow. So, I kinda think that this is my chance to "give back".

### Experience

Experience allows people to make better decisions in the future. When a task is completed, the assignee _usually_ gains experience. Just like an RPG, right? Finish a quest, get experience. But, keep in mind, when someone in a group finishes a quest, _not everyone will get the same amount of experience_. The most experience will be gained by the person who pulls their weight the most.

Let's compare them (the example below assumes the human pulls their weight):

- In terms of "getting" experience
  - When a human completes a task that is challenging, they get experience. That experience is _shareable_ in both work and personal projects, interchangeably. That means, you can utilize the knowledge you gained from personal projects in work and vice versa, which I think is very good.
  - When an AI agent does the same, the best case is that the knowledge is shared _ONLY in your account_. Say, you have multiple AI provider accounts. Unless you agreed that your work can be used as training data, you can be sure that the knowledge will not persist across accounts (even then, it would still take a while). This is very different compared to if the experience is obtained on the human-level instead of the tool-level.
- In terms of "applying" experience
  - When a human applies their experience, they express it based on their memory and pattern matching, _"Oh, back then I did this, and it worked, so let's do this approach."_
  - When an AI agent applies their experience, it is based on its (1) training data, (2) conversation history, and (3) Markdown file inputs. This means that their "usefulness" is just as good as these 3 are. Additionally, it all comes down to token inputs. How many files does it need to search before it says _"Now I have full context"_?

I daresay that humans and AI agents _can be_ on the same level in terms of expressing experience, given the same initial context. Under normal conditions, I believe humans can be better decision makers. However, if the human has a lot of things to juggle, which prevents them from effectively switching context, I like to think an AI agent has an edge (because it is very fast in "recalling context").

## Bottom line

As all other things do, upsides and downsides are imminent. So, I present these rhetorical questions to close this post:

- One of the manager's dreams is to make a team able to self-operate. Is that easier or harder to achieve in the AI era when speed is an [S-tier](https://en.wikipedia.org/wiki/Tier_list) aspect?
- When your direct report finishes a task with an AI agent, how much experience do they gain from it? Do they get more experience than the AI agent, or is it the other way around?
