---
title: Sticky Skill Sets
description: This post contains a bit about sticky skill sets, those things that you learn at some point, but are useful in some ways in the future.
publishDate: 2025-05-17T08:05:38.951Z
image: /assets/blog/sticky-skill-sets/sticky-skill-sets.png
imageAlt: 'An image containing the text, "Sticky Skill Sets".'
imageCaption: 'An image containing the text, "Sticky Skill Sets".'
tags: software engineering, typescript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Heya, how is it going? I hope you are doing well! In this post, we are going to talk about sticky skill sets.

> _Wait wait, what do you mean by "sticky skillsets"? Are there skill sets that aren't sticky (easily forgotten)? And if they are forgotten, they aren't useful anymore?_

Yes, bear with me for a bit. I do think that everything that we learn in life, even if we already forget about it (or maybe we are just autopiloting it), may be useful at later points in life. How so? Let's start with how we learn stuff.

## Learning in games

Most RPGs that I have ever played used an approach where a skillset that is learned cannot be unlearned (there are some exceptions to games that use skill trees). For example, in Final Fantasy X, once we learn an Ability node in the Sphere Grid, we cannot unlearn the Ability. Similarly, for Kimahri, once he learns another ability using Lancet, he won't be able to unlearn it. Another example is Path of Exile. Although it's not necessarily a "skill tree" (it's rather a "passive skill tree"), we can unlearn some of the leaf nodes.

The opposite side is Pokémon games. Although I don't play the latest Pokémon games (the last I played was Platinum), if I remember correctly, each Pokémon can only have 4 moves. If we want to learn a new move when there are already 4, we have to replace 1 of the 4, and sometimes, the unlearned move can't be _naturally_ learned anymore, unless the move exists in the Technical Machines (TM).

However, is it _that_ extreme in real life, either we can learn everything, or we can unlearn only the last thing we learned, or we can only learn a limited amount of skill sets?

## Learning in real life

Let's use walking as an example. We learned to walk when we were babies/kids. For me who still has a complete pair of legs, that skill that I learned back then was very useful. However, due to the frequency of how often I use my legs daily, I mostly walk on autopilot. I mean, I do not need to think about being afraid that my muscles will let go and my body will fall as a result. However, I may need to re-learn how to walk _if_ (hopefully not) at some point my legs were injured for some prolonged amount of time, in which the muscles used for the walking process need to be "recalibrated" because of the recovery process.

Now, how about skillsets that we have learned, but don't practice every day? There are 3 options for this: either we forget them totally, we can recall them but it needs a trigger/stimulation, or we can easily recall them.

I like to use the [S3 pricing](https://aws.amazon.com/s3/pricing/) as an analogy. There are buckets where access is cheaper (but storage is more expensive) and there are buckets where access is more expensive (but storage is cheaper). Similarly, for our memory, things that we keep in mind are easier to recall, whereas those that we bury deeply (because we rarely use them) are harder to recall.

Have you ever experienced a moment where you tried to recall something so bad? You would try to re-trace every memory in your brain... some memories open paths to other memories, and so on, and so forth until you finally get the piece that you want to recall. Something like that. I suppose most of us will do that when we are doing examinations.

So, I have to say: when it comes to learning, real life is not as extreme as it is for the games used as comparison above.

## Extracting sticky skillsets from skillsets

Let's talk about sticky skill sets. It is one of the things that I learn from games, somewhat. For example, in MMORPGs, "line of sight" is a pretty useful concept to learn. You do not want to be exposed in the middle of nowhere if your character isn't meant to be there, such as healers. If you play as a healer and you are consistently on the front line, you can get focus-fired or disabled by your enemies, making you unable to protect your allies. However, if you stay in the line of sight, you can still expose yourself to your allies but not to your enemies. This can frustrate your enemies because they can never reach you and they may overextend, resulting in them getting out of position. This concept applies to every PvP team match in MMORPG.

This is the key: when we learn to play a game, we do not only learn the game, but we are learning the concepts, so that when we play another MMORPG, we are already familiar with the concept, making it easier for us to pick the game up. The "line of sight" concept above is the sticky skillset.

Similarly, in real life, for each skill set, for each learning that we have from doing daily stuff, we want to extract the "sticky" parts of them. In my mind, there are 2 "sticky" things that we can learn. The first one is a "pattern matching skill" and the second one is an "unblocking skill".

### Pattern matching

As a software engineer, every day I try to solve problems. When a problem is solved, I learn the solution, so whenever a similar problem appears, I can recall the solution from my memory. This is the interesting part, it's not only about the exact problem and exact solution, but it's also about the _process of finding the solution_.

Let's say that we have this: `A --> B --> C`, where A is the problem, B is the process, and C is the solution. If we only try to remember A and C, then B is just a "black box" to us. It's not exactly helpful when the problem is not A. However, when we also learn about the process, we can apply some parts of the process to find a solution to another problem.

Problems share some common grounds and we use those common grounds as a pattern so we can determine which parts of the learned processes can be used.

### Unblocking

As a software engineer (mostly in front-end), I specialize in building the UI. I used to not know stuff about DevOps, which made me rather a sitting duck when problems around deployments arose. Learning about the DevOps stuff (although just the surface) allows me to unblock myself and also partially helps the SRE team so they do not have to handhold me through the investigation (unless absolutely necessary).

When I learned how to operate Kubernetes, I didn't know that it would be very useful for me in the future. I was wrong. It was very useful for the reasons above. Sure, every team has its roles, but rather than standing still doing nothing while waiting for help, it's better to actively move, no?

## Closing words

Well, there's that! To close this post, I want to say that: some, if not most of the things that we learned are not a one-off, especially if it's related to our main jobs. Try to extract the sticky parts of it and it can potentially be useful in the future.

Hopefully, it can be useful. Take care!
