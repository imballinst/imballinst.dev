---
title: pl-form-comparison
description: A website containing Premier League related information, originally used to provide stats for each teram.
publishDate: 2026-06-29T00:00:00.000Z
githubLink: https://github.com/imballinst/pl-form-comparison
layout: '../../layouts/Project.astro'
---

I was following https://x.com/DrRitzyy on Twitter, where they often shared about Arsenal's remaining matches, and the "projected" points if Arsenal would go the track of certain previous seasons. He was using spreadsheet and I was amazed by the effectiveness of the information being conveyed.

However, I noticed there were some questions like _"How about Manchester City?"_ or _"How about Liverpool?"_, which isn't exactly "self-serve". This website is meant for people to self-serve those kind of data and derive their own conclusions.

I originally took the data out from the official Premier League website (using PulseLive API calls). However, I then realized it was a mistake based on [their Terms of Use](https://www.premierleague.com/en/terms-and-conditions):

> The Website and App must not be used in any other way, including for commercial purposes, and you may not otherwise reproduce, re-utilise or redistribute it (including, by way of example, creating a database (electronic or otherwise) that includes material downloaded or otherwise obtained from the Website or App) ...

I tried to look out for alternatives. In the process, I found this tweet which I think is very informative:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;ve been researching a number of soccer data sites recently to see what their data use/scraping policies are.<br><br>Wanted to share what I&#39;ve found so far in this thread.<br><br>A critical factor to consider when using third party (i.e. not your own created dataset) is use ethics &amp; terms</p>&mdash; Ben Griffis (@BeGriffis) <a href="https://x.com/BeGriffis/status/1525282683424755713?ref_src=twsrc%5Etfw">May 14, 2022</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script> 

I ended up using FBref and Understat as primary source of data. The stats aren't as complete as the Premier League one (which is expected). Understat doesn't seem to have any terms of use, so we are all clear on that. There are still some wordplays especially with [Sports Reference's term of use](https://www.sports-reference.com/data_use.html) (company behind FBref):

> use any material or Content from the Site, including without limitation any statistics or data, (i) to create any database, archive, or other data store that competes with or constitutes a material substitute for the services or data stores offered on the Site or by the Site's Data Providers or (ii) to provide any service that competes with or constitutes a material substitute for the services or data stores offered on the Site or by the Site's Data Providers

For now, I am using FBref stats as "supporting" stats, such as for number of fouls, offsides, penalties, yellow cards, red cards, and even match officials. If it is not an acceptable use, then I'll probably bring down the pages that used those additional statistics. There are other alternatives, like [Football Data](https://www.football-data.org) but to have information around fouls, penalties, offsides, and bookings, I'll need to pay.
