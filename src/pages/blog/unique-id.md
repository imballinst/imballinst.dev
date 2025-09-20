---
title: Unique ID
description: 'In this post, let's explore the unique ID and translate it to a question: "What makes us unique?"'
publishDate: 2024-01-16T01:01:35.585Z
image: /assets/blog/unique-id/unique-id.png
imageAlt: An image containing the text, "Unique ID".
imageCaption: An image containing the text, "Unique ID".
tags: software engineering, life
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello! How are you doing? I hope you are doing well. In this post, I am writing about a unique ID. So, in software engineering, we know what a unique ID is, yes? Some take it even further and make it a Universally Unique Identifier (UUID), whose ID string will have a very small likelihood of clashing with other UUIDs in other services. Let's explore that a bit.

## Uniqueness

Let's say we have this list of users.

| id                                   | first_name | last_name | regnal_number  |
| ------------------------------------ | ---------- | --------- | -------------- |
| 6a710292-9719-457f-836b-93cb86112881 | John       | Doe       | I              |
| dae34224-edc7-4490-9aa1-ad0e0af8628c | John       | Doe       | II             |
| 63c50a79-513d-456b-9b4c-68146416ae38 | John       | Doe       | III            |
| 468cab41-f469-4f3f-b920-6ff8ef7b65c9 | John       | Doe       | IV             |
| 2a97bd76-ed73-41d0-851d-341acd4d7289 | John       | Doe       | V              |
| 09d38a83-a40c-40ac-a64a-ccf267883286 | John       | Doe       | VI             |
| 2072e779-e64d-47ba-938a-dce7f822453f | John       | Doe       | VII            |
| 5afc13af-6c76-4f2a-bff9-bc111d4664ba | John       | Doe       | VIII           |
| 9b4d909f-8250-4886-ad7a-b881f4def1b0 | John       | Doe       | IX             |
| eb29c2df-5a6d-4b7a-908f-32563157fd5c | John       | Doe       | X              |

If we want to update the data for a certain "John Doe", how do we do it? We can use the `id`, let's say. Now, let's try removing the `id` column.

| first_name | last_name | regnal_number  |
| ---------- | --------- | -------------- |
| John       | Doe       | I              |
| John       | Doe       | II             |
| John       | Doe       | III            |
| John       | Doe       | IV             |
| John       | Doe       | V              |
| John       | Doe       | VI             |
| John       | Doe       | VII            |
| John       | Doe       | VIII           |
| John       | Doe       | IX             |
| John       | Doe       | X              |

How do we know which "John Doe" is which? Well, we can still know from the `regnal_number` column. Let's try removing the `regnal_number`.

| first_name | last_name |
| ---------- | --------- |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |

Now, they all look the same! Sure, you may assume that it is ordered from I to X, but what if the order is shuffled? That's the tricky part! We have to discover uniqueness not by "status", but by "expression".

## Imagine everyone is but a shade, faceless

Everyone that we are acquainted with, whether in real life or on the internet, has some sort of "identifier". In real life, we identify people by their faces and voices. Maybe by their name tag, if we are in an office setting. On the internet, we identify people by their name, such as phone contacts or their identifiable name, such as ones in a WhatsApp Group where they go along with `~John Doe`.

Let's make this harder. How do you identify people in real life without their faces and voices? How do you identify people on the internet without their identifiable names?

In real life, we may identify people by their physical attributes. Some people are tall, some might not be. Some people have a proportional weight/height, some might not. Some people might have a certain way to walk. Some people might have certain postures, different than the others.

On the internet, let's say we are in an office setting. We may identify people by how they write their sentences. Some people are straightforward, some might not. Some people care too much about grammar and structure, while others might be more carefree. Some people like to incorporate emojis in their sentences, while others might not use them so much. I find it quite fascinating—now that I think about it—that we can identify people we know by seeing a text (without seeing their names).

Still with me? Let's go further.

## Identifying deeds

Remember the list of John Doe names in the table above? How do we differentiate them again? We differentiate them by their deeds. Someone's deeds _can_ be considered a unique identifier.

| first_name | last_name | deeds                                                                |
| ---------- | --------- | -------------------------------------------------------------------- |
| John       | Doe       | led the fight against imperials                                      |
| John       | Doe       | leeched off citizen's coffers                                        |
| John       | Doe       | created dictatorship                                                 |
| John       | Doe       | did ok, nothing majorly good and nothing majorly bad                 |
| John       | Doe       | improved economic growth by 10%                                      |
| John       | Doe       | reworked the government's successful yearly targets                  |
| John       | Doe       | sold the lands to foreign countries cheaply                          |
| John       | Doe       | destroyed the country's environments                                 |
| John       | Doe       | shielded ministers who committed corruption, collusion, and nepotism |
| John       | Doe       | replaced sidewalk for pedestrians with roads for cars                |

Now, added with the `deeds` column above, even if we do not know the `id` or the `regnal_number`, we can do a "guesstimate" on where John Doe is. An easy example is our country leaders. What did our previous country leaders do that they are famous (or infamous) for? That's what people will associate them with for a long time.

Let's apply the above in the context of work. Take maybe 5 examples of your coworkers. How do you identify them if you do not know their names (e.g., we cannot see their Slack name/photo/profile)? Could you describe them based on their activities and what they have done?

Finished? Now, let's go to the last stretch of this post.

## Identifying yourself

How will you identify yourself in an office setting? Let's say you are a Senior Software Engineer (or Senior title in something). Will you identify yourself by that, or will you identify yourself by what you are doing? Be careful, the difference is subtle, but once you see it, you can't unsee it.

Next, how will others identify you? Similar to what we are doing for John Doe above, imagine you are faceless, nameless, titleless. What makes you different than others? The answer is the same: by your deeds.

:::
Just for my peace of mind, I'm not saying the title means nothing. Of course, it means something, because usually the title relates to salary, and we want to be paid fairly.
:::

It all comes down to one thing: it will be easier for others to identify you if you have "unique" capabilities. For example: in the case of software engineers, _every_ software engineer is _expected_ to be able to write code. If you and everyone else can write code, how can you stand out amongst other faceless, nameless, titleless shades? From my experience, here are the options.

### Communication

Let's admit it, some (if not most) of the software engineers do not excel at communicating with humans. I was once that way, too. They are good at communicating with machines, yes, but if you are only good at communicating with machines, I _think_ a "developer" title is more fitting than "engineer".

I see a developer as more of a "coder", whereas an engineer as more of a "thinker+coder". Ultimately, creating software is all about solving problems. Whose problems are we going to solve again? None other than humans. So, human interaction is _kinda_ inevitable at some point. You may not be exposed as much as an early software engineer level, but as you level up, you will be expected more to "drive" and "think" more, on top of writing code. This was also my mistake back then, actually. _"Why communicate with humans when I could just communicate with a machine?"_ I couldn't be further away from the truth.

If you can hone your communication skills, opportunities will come because communication is key to everything. You can quicken a discussion that would otherwise take ages, and you can mentor others, to name a few.

### Proactiveness

Have you ever felt your days go by, and you are just working on your assigned tasks? There are no issues with that, especially if you complete them with good quality. However, remember, if all software engineers _do_ finish their tasks, what makes you different from them?

As the sub-section title goes, proactiveness can go a long way. Try to figure out something that may benefit the team that wasn't previously considered. Propose it to your lead, discuss the pros/cons, and plan it as the next work item.

If you can hone your proactiveness, there are at least 2 benefits. The first benefit is that you will be familiar with thinking outside the box (because the thing that you are doing is from yourself instead of from others). The second one is that you will be able to provide additional value, depending on the user. For example, let's say that you volunteered to optimize the build pipeline, which previously took quite a while, and you sped it up by 50% without reducing the overall features (e.g., from 20 minutes to 10 minutes). That's big, and the benefit will be felt by the entire team since they will be able to deliver faster.

### Domain knowledge

If your team is working on a service (or some services), there are 2 ways (at least) to enhance your domain knowledge:

- **Dive deeper:** learn more about the behavior of your service. What happens when on X, Y, Z scenarios, which code will execute? What kind of edge case is the code possibly missing? Which part of the code is redundant or has inconsistent behavior with other services?
- **Jump higher:** learn more about how your service _interacts_ with other services. What are the things that your service depends on from other services (and vice versa)? What is the implication? What could be improved?

By improving your domain knowledge, you will be able to participate in more cross-team discussions and thus get more visibility. Applying the above examples, when there is a need to trace the root cause of a bug, you can utilize your deep knowledge, and when there is a need to engineer a solution, you can utilize your vast knowledge.

## How can it be applicable for a career resume?

A career resume is key when applying for jobs. Needless to say, it's not a silver bullet, but I'd say it's worth it to try. Back then, I heard someone mention "adding metrics" in the resume so recruiters could identify your impact in your previous roles. That is solid advice, and I do agree.

_However_, numbers have to be applied with context, too. Let's say I have a $1 revenue, then I increased it to $10. I could just say _"My engineering effort multiplied the revenue by 10 times"_... and yet, does that sound convincing? Another example is improving performance. If my website loads faster by 30%, there are 2 ways to do it. The first one is to optimize the SEO tidbits (e.g., Time To First Byte, Time To Load), which should be the correct way to do so. The second way is just to simply reduce the content of the site. Less content means fewer things to process, right? So, _technically_ it should load faster.

In any case, I highly recommend expanding the "how" as briefly as possible (because resumes are meant to be brief). For example: _"I proposed and owned (an engineering solution) that went down as one of the most used features by customers, resulting in (X%) ARR improvement"_. See the "proposed" and "owned" keywords here? _That_ is what makes you different than others. Every software engineer can write _"I developed (an engineering solution) that went down as one of the most used features by customers, resulting in (X%) ARR improvement"_, because that's their core work. However, not everyone can propose and own a big effort.

Lastly, it's not always about numbers. Numbers are valid for output that is based on quantity, yes. But how about quality? How do you measure "good communication"? I mean, sure, you can write _"I communicated with the design team, project manager, and product manager to ensure a smooth development"_, but isn't that what every software engineer does? From my perspective, here are the examples to showcase this:

- **Making the team more proactive in communication to other teams:** maybe your team members were shy in the first place, so they had to ask a "gatekeeper" to reach out to other teams. However, with your guidance, by the time you left, they can handle them on their own.
- **Making the team capable of debugging a service on their own:** maybe your team members were only capable of debugging browser (UI) specific issues, but couldn't debug already deployed backend services without assistance from Site Reliability Engineers (SREs). However, with your guidance, by the time you left, they were able to debug backend services on their own because you provided documentation for them to learn.
- **Making the team comfortable writing long text when needed:** maybe your team members were more accustomed to writing short texts, which at times, is fine. However, sometimes it requires longer texts to explain something, so the explanation could be "whole", reducing back-and-forth between all parties. With your guidance, by the time you left, they were more confident in writing long pieces.

## Closing words

That should be all! As a closing word, I want to share this term called "squad player" (in football or maybe other sports). The following is from ChatGPT, which also aligns with my understanding:

> A squad player is not a regular first-team star, but is a dependable member of the team who ensures the club can handle injuries, fixture congestion, and tactical changes across a long season.

I _do_ think it is fine to decide "just" to be a squad player in a team or organization. They help share the team's load so their contribution is as important. _However_, if you are aiming to climb up the career ladder, I suggest to start asking, _"What makes me unique?"_

Hopefully, this post is useful. Let me know if you have thoughts. Take care!
