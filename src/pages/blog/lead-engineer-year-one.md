---
title: 'Lead Software Engineer: Year One'
description: I had the chance to become a Lead Software Engineer in 2023. This post reflects the things that I learned across the past 1 year.
publishDate: 2024-09-08T10:51:22.220Z
image: /assets/blog/lead-engineer-year-one/lead-engineer-year-one.png
imageAlt: An image containing the text, "Lead Software Engineer&colon; Year One".
imageCaption: An image containing the text, "Lead Software Engineer&colon; Year One".
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello! Hope you are doing well. Things were pretty rocky for me past few weeks, mostly was super drained with interpersonal activities. If there is one thing to learn, I should have brought my trusty True Wireless Stereo (TWS) with me everywhere, so I can block out unpleasant noises.

Anyway, in this post, I am going to write down what I have learned from my past year's experience being a Lead Software Engineer in a company with remote work scheme. This role covers mostly the Web area, so mostly frontend (UI) area and just only a bit about backend.

I will try to be as anonymous as I can in describing situations. If you happen to know the context, then maybe you know, maybe you don't. Let's start!

## The beginning: people pleasing

I was (and maybe still is) a people pleaser type. I tried so hard to make people comfortable (by not really "complaining" a lot). I tried so hard to not be upfront, despite if they underperformed. Turned out it didn't only hurt myself, but it also "disrespected" the people I interacted with because they deserved better.

So I guess, what I learned was to follow "strong opinions, weakly held". What that means is that, I should have a solid ground to stand so that I could deliver my opinions that I think are beneficial. However, if the person I interacted with have other opinions that are _factually and objectively_ correct, then I should be able to adapt accordingly.

Being upfront also helps a lot. I tried to avoid conflict as much as possible because I thought conflicts always result in lower chemistry. However, apparently there are two kinds of conflicts: healthy and unhealthy. Unhealthy conflicts are kinds of conflicts where both parties end up being negative to each other, whereas healthy conflicts are the ones where both parties _may_ disagree during the event, but they do not dwell overlong and move forward.

## Embracing meetings

Until now, I believe myself is an introvert... and an acute one at that. Probably you already picked this up from what I wrote in the intro around interpersonal activities tired me out. As such, if I could avoid a meeting (where I won't really contribute much), I would do so in a heartbeat. Before I became a lead, I only had 1:1 session and that was with my manager. It's okay, I could take it.

However, in becoming a lead, I also needed to have people to manage. The amount of 1:1 that I need to do changes from 1 to 1+N, where N is the number of people that I manage. Additionally, it is also became "automatic" that I got added to a lot more meetings. Some are project-related ones and others are recurring ones, such as backlog grooming, for example.

I used to think that backlog groomings were boring. As time went though, I began to realize that there is a way to make backlog grooming to _not_ be boring: have an agenda and come prepared. There are a lot of things that we can prepare, such as:

- **Improving product knowledge:** this is _probably_ kinda obvious if we think about it. If we want to manage a product, we want to know the inside and out of the product, at least its high-level requirements or functionalities. Otherwise, we will have no clue on what is the current product's state... hence it will seem as if we are rolling dices to pick tickets for the next sprint randomly without knowing the tickets' impacts.
- **Being aware of roadmap items:** Roadmap awareness can also be very useful in backlog grooming. It might have some intersections with the previous point, because roadmap involves current state and future plans.
- **Keeping track of discussions:** Other than the regular agenda, it is also important to keep track of discussions happening in the team or between teams. Those discusions that happened prior to the backlog grooming meeting _may_ have impact on how we want to plan ahead.

## Learning more, technical-wise

Some people say that when they become manager, they don't really "create" anymore. Instead, they are "orchestrating". On my side, I was (and still am) kinda 50:50 on this. I still do a bit of individual contribution sometimes, while some other times I just manage things from the background.

There were a lot of technical things that I learned from since I started became a lead, most of them are from collaboration with my colleagues. I think the top 2 were as follows:

- **API design:** the context of "API design" here is for both functions and endpoints. Function name and its required parameters should be related, whereas "modifiers" should be put as optional parameter(s). For endpoints, I used to follow a rather "plain" endpoints where "response payload is not driven by the UI". However, this makes the endpoint consumer need to have several steps to be able to "tailor" meaningful data. On the other hand, endpoints shouldn't also be strictly tied to the consumer, because we do not want the endpoint to "break" when the requirement of the consumer changes. So, we need to find a middle ground.
- **Testing:** I learned a lot about testing since becoming a lead. I used to not care about component testing, I only cared about unit tests. However, component testing _is_ very valuable to prevent regression. I wrote what I did to [make frontend testing more fun in this post](https://imballinst.dev/blog/making-testing-in-frontend-fun).

## Closing words

Well, that's all I have for this post. I was afraid and very wary when I took up this position, but I think it kinda turned out okay and I hope I can become better at it, both in terms of technical and people skills.

Thank you for reading this far and hopefully this is useful!
