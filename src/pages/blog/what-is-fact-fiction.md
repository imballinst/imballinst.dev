---
title: What is fact, what is fiction?
description: In a noisy world full of engagement farmers, it's hard to differentiate between fact and fiction.
publishDate: 2026-04-04T05:16:56.276Z
image: /assets/blog/what-is-fact-fiction/what-is-fact-fiction.png
imageAlt: An image showing the words "What is fact" and "what is fiction?"
imageCaption: An image showing the words "What is fact" and "what is fiction?"
tags: software engineering, ai
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello, hello! I hope you are doing well. In this post, we are going to talk about fact and fiction. As we know, facts are something that is real based on data, whereas fiction is something that is based not on real life but rather, _manufactured_, if you will, to make that thing to be as if it's a reality. But how to differentiate what is fact and what is fiction?

I think it's been a while since I last wrote an unstructured post. No headings and all that, just immediate, short paragraphs. Let's do that.

![I bought a pre-owned FF16 disc. I haven't played it yet at the time of writing, but I'm looking forward to it!](/assets/blog/what-is-fact-fiction/blog-ff16.png)

I found something interesting in the dialogue of Final Fantasy XVI (which, I have yet to play, but probably soon!). It's along the lines of, _"A fiction becomes a fact when a lot of people believe in it."_

It's a pretty interesting line, especially if we look at the current era. Social media has become the field day of influencers and engagement farmers, who build their platform to whatever they want their end goal to be. The bigger the platform a person has, the bigger their influence will be. When their platform gets big enough, every single word that they say becomes _gospel-like_ and it spreads like a plague. This is where it gets dangerous. When enough people believe in a narrative or a fiction, it becomes a fact.

It doesn't have to be a "fact" itself; it's all within our state of mind. When enough people talk about something, that will be the only thing that will be in the readers' minds. One example case is how _buzzers_ work in Indonesia: when the citizens begin talking about government on social media, after the topic reaches a certain threshold, the government will unleash the buzzers and have them manufacture other topics, "swaying" the current topics at hand. It makes people believe that the manufactured topics are the facts that should be talked about instead of the original ones.

Similarly, it is the case as well in the era of AI. When someone with a big platform preaches about their "productivity", producing hundreds of thousands Lines of Code (LOC) within a single day, or hundreds of commits/pull requests, I just find it silly. Imagine if you work in a company and your success metrics as an engineer is number of LOC produced within a day. It's very hard for me to imagine it; it's so performative. Maybe it's similar to how the Indonesian government runs the country: the success criteria is not the impact for citizens, but rather, _"how much money can we burn in a year?"_.

Anyway, it's also part of why I really like the stance from the OpenCode team about this. While I can't verify if this is just "public relations" work or not, at least they try to be different rather than being a sheep that follows the herd.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">sent this to the team today<br><br>everything great comes from being able to delay gratification for as long as possible<br><br>and it feels like we&#39;re collectively losing our ability to do that <a href="https://t.co/HlIpY86eJn">pic.twitter.com/HlIpY86eJn</a></p>&mdash; dax (@thdxr) <a href="https://twitter.com/thdxr/status/2031377117007454421?ref_src=twsrc%5Etfw">March 10, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I don't know any single AI-first company who are willing to "fight against the currents" as the OpenCode team does. But yes, if there are more, please let me know, and I'll follow them (especially on Twitter). At the end of the day, I want to make sure that I am not swept by the currents that are the AI fever dream.

To wrap up this post, the following are my two cents. Of course, the facts are "just" what I believe _currently_. Maybe, at some point, I won't count them as facts anymore based on the information that I learned.

- Facts
  - The current state of AI and its advancements. Ignoring it is unwise (IMO). Even if you don't like it, at some point you may need to accept that at least, _some_ parts of the software engineering workflow will utilize (if not heavily utilize) AI.
  - **Human brains** are still needed. Take a look around how many people "plan" their development using AI, one way or another. Of course, when we plan (including myself), human inputs are required so that we can "steer" the AI in the right direction. The downside of the current AI models is that they often hallucinate and tend to be agreeable. It's important that we ensure it backs up what it writes with a legitimate reference and perhaps acts as a devil's advocate.
- Borderline (gray area)
  - Are certain models/providers the _de facto_ best? Is it all about the model, or is it the prompt/input?
  - Will AI coding agents' price stay as is?
  - How will AI development impact technology prices in the future?
- Fiction
  - AI-assisted development helps in reducing workload. This is a big fiction. Just because AI-assisted development helps us in reducing the "boring things" (what they said), it doesn't mean our workload is reduced. In fact, it gets more compacted. Reason is, not only do you have to think about how the AI should progress through the chores (which it does quickly, by the way), you have to think about "what to do next".
  - Productivity is measured by the number of LOCs added/changed. This is also a fiction. If only software is a one-time development and then you throw it away, then yes, sure, we can count that as productivity. However, keep in mind that software is ever evolving. How do you make sure that the _initial development_ can survive the future developments? For the frontend area, this is maybe not really a problem. However, for anything related to persistence that requires migration, this can quickly become a sticky situation. If it's not planned carefully from the start, your software's availability may plummet ([hello, GitHub](https://mrshu.github.io/github-statuses/)).
