---
title: Managing Context Switch
description: Context switch can be a scary thing, because it can impact your productivity. However, is it absolute? Is there absolutely nothing we can do about it? Let's discuss it in this post!
publishDate: 2025-06-15T14:17:04.269Z
image: /assets/blog/managing-context-switch/managing-context-switch.png
imageAlt: An image containing the text, "Managing Context Switch".
imageCaption: An image containing the text, "Managing Context Switch".
tags: life, software engineering, typescript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Ho there! Hope you are doing well. Let's talk about context switch. It is one of the most used phrases in software engineering, example case is when one is working but interrupted because of something else, reducing the productivity.

Without further ado, let's go!

## Context switching vs multitasking

I did a bit of research from few sources around the differences between context switching and multitasking, because I think it's important to learn about them before we delve further into the topic.

According to [this Asana article about the impact of context switch](https://asana.com/resources/context-switching), it _kinda_ follows the public understanding: context switch is about moving between multiple items and multitasking is about doing multiple things at the same time. Although, in another [Asana article about multitasking](https://asana.com/resources/multitasking), it says that multitasking is just context switches that happen rapidly.

Another [article from HubSpot about multitasking](https://product.hubspot.com/blog/forget-multitasking-try-context-switching) defines multitasking closer to the Asana's latter article rather than the former.

After reading those articles (and some others), I am more aligned with Asana's second article definition as well as HubSpot's. Although, probably there are another definition that lies in-between the 2 definitions above.

## Context switching in MMORPG

I have been playing Final Fantasy XIV for a while now and I played the healer role most of the time. When I tried out other jobs, it is pretty enlightening experience, especially when playing a Damage Per Second (DPS) role.

As a healer, there are 3 things that I mostly look out for:

1. Keep the party alive.
2. Do a bit of DPS whenever no one needs healing. Remember the ABC, "Always Be Casting"! I don't actively heal unless there are players in my party at risk being at death's door.
3. Monitor surroundings, such as anticipating the next boss attack, who I can still heal, who will inevitably die (and needs raising). If my character is knocked out, I can't keep the party alive.

The DPS part in healer role isn't that complex, because there are no "combo attacks". So, if I mess up the DPS rotation as a healer, it is not the end of the world.

![My Red Mage hotbar in Final Fantasy XIV. Don't judge my awkward hotkeys.](/assets/blog/managing-context-switch/ff14-rdm-hotbar-size500w.png)

Enter DPS role. I remember when I did the DPS role in higher-level dungeons and trials when the stakes were higher and it was super messy. As a DPS role, I need to:

1. Do DPS (of course) and to deal the most optimal DPS, I need to do optimal rotation. On top of the combo attacks, I need to also keep track of the ability cooldowns as well as the active buff durations. Some melee characters even have to adjust positioning when to attack from the rear and when to attack from the side.
2. Monitor surroundings, similar like the healer role. However, it's worse for DPS, because if my character is knocked out, the encounter will last longer (due to less DPS output).
3. Keep the party alive. DPS roles have abilities that reduce the damage of an enemy, or amplifies the healing to other players. Certain DPS roles can also raise other fallen players.

For me, playing as DPS is harder than playing as healer, especially because there are more things to be aware of in short period of time. I think this classifies as multitasking.

I don't think I'm _that_ good yet multitasking as a DPS role, but I suppose I'm better at it with a healer role because I remember the hotkey of every ability and what each ability does. This way, I can do the other things without having to take a look at my keyboard and hotbar which hotkey uses which ability.

## Context switching in football

A little bit about football, so while I'm not an expert whatsoever in terms of football tactics, one thing that reminds me about multitasking in football is called [scanning](https://barcainnovationhub.fcbarcelona.com/blog/let-the-last-thing-you-look-at-be-the-ball-scanning-in-football/).

> When Arsène Wenger gave a lecture at the Barça Innovation Hub’s Sports Tomorrow Congress in 2020, he found himself on the perfect stage to explain what he valued most in a football player: scanning, the visual exploration of the environment; the glances a footballer takes before or after touching the ball, the frequency of head and eye movements to gather information about their surroundings, whether when receiving a ball or when it moves away from the player.

It is a very interesting action, which of course, before I knew about it, I never thought about it. As someone who never plays competitive football, I think I would be overwhelmed when I need to at least scan, remember the tactics, and walk/jog/run at the same time.

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">Playmaking under pressure and in the traffic is a key concept for central midfielders. Schouten is a player that even though still having lots of potential in hus scanning process, can secure and retain the possession in quite decent way.<br><br>via <a href="https://twitter.com/mfbnTV?ref_src=twsrc%5Etfw">@mfbnTV</a><a href="https://t.co/BVvO1g6qkZ">pic.twitter.com/BVvO1g6qkZ</a></p>&mdash; Mindfootballness (@mfbnvideos) <a href="https://twitter.com/mfbnvideos/status/1950829800488083707?ref_src=twsrc%5Etfw">July 31, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

What does that remind us of? Yes, multitasking! Although, similar like the previous section, if all of the other things is already stored as "muscle memory", then scanning will not reduce the player's productivity.

It actually reminds me of one of the reasons why I don't drive, because I just can't help with checking front, back, and flank when my mind wanders elsewhere. Perhaps I am just not used to it yet... and with more practice, I guess that too will become muscle memory which I no longer need to exert effort on.

## Context switching in software engineering

Ah, finally now we are at the main topic. I'll share the perspective from a software engineer. Do you ever had a moment where you wanted to focus on a task; or in a middle of something but there is a Slack or email notification? How distracted are you? Do you feel an "itch" to open the notification and see what's that all about?

Yes, that's the _start_ of the context switching. If you decide to see the notification (e.g. there is an issue that needs assessment) and begin diving into it, you are in the _middle_ of the context switch. By the time your mind is "set" on the issue, you have _finished_ switching context.

As written above, yes, context switch _can_ (more often than not) reduces productivity. So, are we a sitting duck? Do we just accept that as software engineers, we can't do anything about context switch?

## What do we do?

The answer is, of course not! The 2 articles above from Asana and HubSpot contain ways to prevent context switch, be it the negative effect or the activity as a whole.

I'd say the approaches in the Asana article is too extreme, although there are some good advices in it. For example, using "Do not disturb" (or disable notifications) and practice time management techniques. I say "extreme" because it's isolating yourself. Let's take an example of the MMORPG and football above. Do you just stand still in the middle of boss attack just because you want to keep DPS-ing? Do you just dead-set focusing on the ball without looking where the opposing players closest to you is?

Personally, I like the HubSpot approach more. It asks questions and from them, we can _learn_ more.

> Do you have enough context to jump in on the new task? If not, how long would it take to gather that context?
> How quickly do you think you can help solve the unexpected problem in front of you (once you have the context)?
> Is this not only a high value task, but a high priority one? (They’re not always the same thing.)
> How many people are already working on it? Are you actually providing any additional value?
> How significant is the ripple effect of the (new) task? (Is this a small task that will have a big impact? Vice versa? Somewhere in between?)

These are _very good_ questions. Let's say you are in the middle of a work, then you get a notification about an issue (again). But you don't have sufficient knowledge of the service that's causing the issue. There are at least 6 different actions that you can do here:

1. If there is no reply yet
   1. Do nothing (ignore it). Get back to your work.
   2. Respond that you don't know much about it and tag other people to help with it. Get back to your work.
   3. _If_ the issue is urgent, "store" your latest work state, be it in form of written note or just in your memory. Then, respond that you'll timebox a time to investigate it. If that doesn't work, call out others for help, then get back to your work using latest work state as reference.
   4. _If_ the issue is not urgent, respond with something along the lines of "I'll get back to this later after I finish my work".
2. If there is already a reply
   1. Do nothing (ignore it). Get back to your work.
   2. Ask the person currently investigating the issue if they need help or not. If what they need help with is not within your knowledge (or you won't be productive with providing help), call out others for help (especially if the issue is urgent).

If we do other actions than (1.1) and (2.1), chances are we have entered the context switch process. It will be worse for you if you don't ignore the issue (and spend longer time to investigate it). In this case, the above questions [from HubSpot] will not help.

In that case, we have to begin strenghtening our muscle memory. _Learn_ more while at the same time knowing our limitations. It's a tricky thing to balance... and it's okay to acknowledge our limitations, especially if we have tried our best. So, what kind of things that we can learn to strenghten our muscle memory in software engineering?

1. **Who to find out**: who we need to seek is part of the solution, sometimes. Once we get the sense on whose help we should be getting help when trying to solve an issue, that is already a big step in the process. This is mostly applicable when we are not the Subject Matter Expert (SME).
2. **Know where to look**: in the MMORPG section above, we know that it is easier to do "rapid context switch" when we know which ability goes to which hotkey. Similarly, the deeper we learn about a service, the more we learn more about the process happening inside it. So, when an issue happens, we have some kind of "spatial" memory and we can do some kind of "guesstimate" where the issue location is.
3. **What to do**: in the football section above, by actively scanning, we can plan ahead before the ball is played to us. Compare this to if we only start thinking about "what to do next" after receiving the ball. The closest opposing player may have already stolen the ball from us. Similarly, it kinda relates to the above point. By knowing deeper and making ourselves an SME, it will be easier for us to identify issues.

## Conclusion

So, yes. I agree context switching is bad. But, it's not like it's something that _always_ have to be avoided. We can put a boundary on it (turn notifications off, practice time management techniques). At the same time, we have to deepen the understanding on the area(s) where we act as an SME, too. By making ourselves a better SME, the areas we are an expert on will become a muscle memory, and the lesser impact of context switch will have on our productivity.

That's all for this post, hope this is useful and I'll see you on the next one!
