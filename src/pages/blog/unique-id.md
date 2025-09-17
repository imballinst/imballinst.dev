---
title: Unique ID
description: In this post, let's explore about unique ID and translate it to a question, "What makes us unique?"
publishDate: 2024-01-16T01:01:35.585Z
image: /assets/blog/unique-id/unique-id.png
imageAlt: An image containing the text, "Unique ID".
imageCaption: An image containing the text, "Unique ID".
tags: software engineering, life
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello! How are you doing? I hope you are doing good. In this post, I am writing about unique ID. So, in software engineering, we know what unique ID is, yes? Some takes it even further and make it Universally Unique Identifier (UUID), which ID string will have very small likeliness to clash with other UUIDs in other services. Let's explore that a bit.

## Uniqueness

Let's say we have this list of users.

| id                                   | first_name | last_name | regnal_number |
| ------------------------------------ | ---------- | --------- | ------------- |
| 6a710292-9719-457f-836b-93cb86112881 | John       | Doe       | I             |
| dae34224-edc7-4490-9aa1-ad0e0af8628c | John       | Doe       | II            |
| 63c50a79-513d-456b-9b4c-68146416ae38 | John       | Doe       | III           |
| 468cab41-f469-4f3f-b920-6ff8ef7b65c9 | John       | Doe       | IV            |
| 2a97bd76-ed73-41d0-851d-341acd4d7289 | John       | Doe       | V             |
| 09d38a83-a40c-40ac-a64a-ccf267883286 | John       | Doe       | VI            |
| 2072e779-e64d-47ba-938a-dce7f822453f | John       | Doe       | VII           |
| 5afc13af-6c76-4f2a-bff9-bc111d4664ba | John       | Doe       | VIII          |
| 9b4d909f-8250-4886-ad7a-b881f4def1b0 | John       | Doe       | IX            |
| eb29c2df-5a6d-4b7a-908f-32563157fd5c | John       | Doe       | X             |

If we want to update the data for a certain "John Doe", how do we do it? We can use the `id`, let's say. Now, let's try removing the `id` column.

| first_name | last_name | regnal_number |
| ---------- | --------- | ------------- |
| John       | Doe       | I             |
| John       | Doe       | II            |
| John       | Doe       | III           |
| John       | Doe       | IV            |
| John       | Doe       | V             |
| John       | Doe       | VI            |
| John       | Doe       | VII           |
| John       | Doe       | VIII          |
| John       | Doe       | IX            |
| John       | Doe       | X             |

How do we know which "John Doe" is which? Well, we can still know from the `regnal_number` column. Let's try removing the `regnal_number`.

| first_name | last_name |
| ---------- | --------- |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |
| John       | Doe       |

Now, they all look the same! Sure, you may assume that it is ordered from I to X, but what if the order is shuffled? That's the tricky part! We have to discover uniqueness not by "status", but by "expression".

## Imagine everyone is but a shade, faceless

Everyone we that we are acquainted with, whether in real life or in internet, have some sort of "identifier". In real life, we identify people by their faces and voices. Maybe by their name tag if we are in office setting. In internet, we identify people by their name such as phone contacts or their identifiable name such as ones in WhatsApp Group where they go along with `~Jane Doe`.

Put those aside, how do you identify them? How do you identify people in real life without their faces and voices? How do you identify people on the internet without their identifiable name?

In real life, we may identify people by their physical attributes. Some people are tall, some might not. Some people have a proportional weight/height, some might not. Some people might have certain way to walk. Some people might have certain postures, different than the others.

In internet, let's say we are in work setting. We may identify people by how they write their sentence. Some people are straightforward, some might not. Some people care too much about grammar and structure, some people might be more carefree. Some people like to incorporate emojis in their sentences, some people might not use them so much. I find it quite fascinating, now that I think about it, that we can identify people we know by seeing a text (without seeing their names).

Still with me? Let's go further.

## Identifying deeds

Remember the list of John Doe names in the table above? How do we differentiate them again? We differentiate them by their deeds. Someone's deeds _can_ be considered a unique identifier.

| first_name | last_name | deeds                                                          |
| ---------- | --------- | -------------------------------------------------------------- |
| John       | Doe       | led the fight against imperials                                |
| John       | Doe       | leeched off citizen's coffers                                  |
| John       | Doe       | created dictatorship                                           |
| John       | Doe       | did ok, nothing majorly good and nothing majorly bad           |
| John       | Doe       | improved economic growth by 10%                                |
| John       | Doe       | reworked the government's successful yearly targets            |
| John       | Doe       | sold the lands to foreign countries cheaply                    |
| John       | Doe       | destroyed the country's environments                           |
| John       | Doe       | shielded ministers who did corruption, collution, and nepotism |
| John       | Doe       | replaced sidewalk with roads for cars                          |

Now, added with the `deeds` column above, even if we do not know the `id` or the `regnal_number`, we can do a "guesstimate" on which John Doe is which. Easy example is our country leaders. What did our previous country leaders do that they are famous (or infamous) of? That's what people will associate them with for a long time.

Let's apply the above in the context of work. Take maybe 5 examples of your coworkers. How do you identify them if you do not know their names (e.g. we cannot see their Slack name/photo/profile)? Could you describe them based on their activities and what they have done?

Finished? Now let's go to the last stretch of this post.

> How will you identify yourself?

## Identifying yourself

- Employee may outgrow company or company may outgrow employee
- How to make sure that we have a "unique" impact?
- How it translates to CV/resume
- Engineer vs. developer
