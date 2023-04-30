---
title: Leveling Up as a Frontend Engineer
description: There are a lot of ways to level up as a frontend engineer and grinding algorithms isn't the only way.
publishDate: 2023-04-30T07:57:54.295Z
image: /assets/blog/leveling-up-as-frontend-engineer/background-leveling-up-as-frontend-engineer.png
imageAlt: An image with the text "Leveling Up as a Frontend Engineer" at the center.
imageCaption: An image with the text "Leveling Up as a Frontend Engineer" at the center.
tags: software engineering, life
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hey folks, hope you are doing well! In this post, I am going to share a bit about my journey as a frontend engineer, where now I am a Senior Software Engineer 1 at [AccelByte](https://accelbyte.io). Bear in mind that levels vary between organizations, so there's a chance that my actual level might be lower than yours. With that out of the way, [listen to my story](https://www.youtube.com/watch?v=d7M1_gjqqws&pp=ygUWZmZ4IGxpc3RlbiB0byBteSBzdG9yeQ%3D%3D) (yeah I'm a bit crazy to Final Fantasy X at the moment).

## TL;DR

Since the parts below are pretty long, here is the summary:

1. **Be curious**: don't be satisfied without knowing the root cause if you have no more pressing matters.
2. **Be proactive**: don't let your manager chase you, but instead you should feed your manager with information.
3. **Build portfolio from things that you are interested**: one of the most questions I often got when people just started web development was, "Where do I start?" Well, I think we can start by combining web development to create something that we love. In my case, I made small websites about Dota 2 tournaments and my team's landing page.
4. **Expand knowledge outside the frontend area**: added value can be big when so that we could stand out to other candidates when we are applying for a position. Every frontend engineer probably knows about HTML/CSS/JavaScript in the browser, so it's a good idea as well to learn about other things, such as Node.js®, CI/CD, Docker, Kubernetes, npm, or even simple things like writing documentation!
5. **Practice communication**: this covers both asynchronous communication and synchronous communication. Better asynchronous communication reduces the need for synchronous communication, and better synchronous communication reduces the time spent between the stakeholders.
6. **Build, build, build**: there are no better ways to learn something than to put it into practice. Back then I created my blog using Gatsby, then I tried migrating to Astro. These experiences can be useful be it in the workplace or an interview.

## Pre-college

I went on the path of informatics engineering during my college times. Before that, I had almost 0 programming experience. My closest experience was creating Warcraft III maps using [Warcraft III World Editor](https://wc3we.fandom.com/wiki/Jass_Coding) and that was using the GUI! I was so afraid of JASS (Just Another Scripting Syntax) because the programming syntaxes were so intimidating to me.

Anyway, I loved gaming and I spent a lot of time in front of computers, so informatics engineering should fit for me, right? Right......?

[!Future me to the past me: "It's not all fun and games".](/assets/blog/leveling-up-as-frontend-engineer/how-do-we-tell-him-meme.jpg)

## College

I got into college in 2012 and got wrecked by the difficulty of the subjects. Also, I didn't opt for Electrical Engineering because I wasn't a fan of hardware... or maybe I was afraid of being electroshocked? Or maybe both. So, yeah, Informatics Engineering it was.

Still, being a "gamer" absolutely had nothing to do with Informatics Engineering. My brain wasn't really capable of understanding algorithms and all that, so most of the time my project groupmates carried me (thank you and I am sorry).

Anyway, I spent most of my time in college _actually_ competing in Dota 2 tournaments (mostly online though). The year where I started taking web development pretty seriously was 2015 when I was required to do an internship. Since I didn't really know what I wanted to be back then, I ended up interning at a project-based company where I worked on some HTML/CSS stuff. However, I didn't have a feeling of satisfaction because the thing that I worked on was kinda... trivial?

So, yeah, after that internship, I upped my web development skills a little bit. I started learning to use jQuery and Bootstrap more properly and I learned a bit about Angular 1 (now I feel old). Due to my procrastination, I had to redo my internship elsewhere otherwise I wouldn't be able to graduate in October 2016 (the next one would be April 2017).

I feel like I have told this story a lot of times before, but I almost had a paid internship with a startup based in Jakarta. However, back then I was still in love with Bandung due to me having so much freedom there, especially since I could play games with my own internet and wouldn't get random lags. I turned down the internship in Jakarta while trying my best to get an internship in Bandung. Desperately.

Fate would have it that... I got an internship as a front-end engineer at [eFishery](https://efishery.com/en/), which was based in Bandung. It was not paid, but I took it nonetheless because of my reason above. Anyway, I learned a lot there and my mentor there was super good (and I'm forever grateful). At the end of my internship, I got offered a part-time job, which I accepted and I converted to full-time after I graduated on October 2016.

And that's the end of my college chapter. What's the lesson here? I think if you don't have work/internship experience or shining academic scores yet you want to do a breakthrough, try learning that area and combine it with the thing that you love. For example, back then I was really in love with Dota 2 tournaments. So, I made these 2 repositories:

- [Indonesian Dota 2 Tournaments List](https://github.com/imballinst/d2l): This was a website that "scrapes" from Ligagame forums, where people usually posted tournaments and events. I built it with jQuery, Bootstrap, and Angular.
- [RTD Dota 2 Team Profile](https://github.com/imballinst/rtdota2): This was a website that I built for fun, so on top of the Facebook fan page (back then), my team could have a somewhat poor man's landing page.

Sure, the quality may not be that good, but they were a good experience for me and I could add them to my portfolio! In fact, I believe I added these 2 websites to my CV when I applied for an internship at eFishery.

There are 2 things that I encourage "fresh" frontend engineers to do: **curiosity** and **proactivity**. Being curious is very important because if we get stuck or find a problem, we don't want to "just let it be". It's best if we can try to find the root cause. That way, we can learn from it and better, we can share it with others. As for proactivity, it's important in the sense of helping our manager so they don't need to constantly monitor us. We feed them information instead of them chasing us, which helps in creating a faster feedback loop.

## Post-college: eFishery

After I graduated in October 2016, I converted to full-time frontend engineer at eFishery. I worked there until June 2018. During that time, I learned a lot about Node.js®, CI/CD, Docker, npm, and even simple things like writing documentation! stuff (the server-side thingy), CI/CD, bundlers (we used Webpack), React, and npm.

Back then, I didn't realize that me learning CI/CD at eFishery would have a big impact on my career development. Initially, we were required to build the UI assets locally before we push them to the repository. In other words, the static files are stored in Git. This wasn't really efficient in terms of time since the build itself could take 1-2 minutes. At some point, I tried to develop a mechanism (utilizing [Git bare repository](https://www.geeksforgeeks.org/bare-repositories-in-git)) that would allow the CI to synchronize the static assets to the server, and lo and behold, it worked and we didn't have to build before push anymore.

The last one was perhaps the most important for me until now. So, back then I published [react-bs-datatable](https://github.com/imballinst/react-bs-datatable), which was used in our internal dashboard. Until now, I have learned about semantic versioning, documentation, as well as open source community where I collaborated with people who I have never met before (e.g. folks who submit feedback through GitHub issues). A few folks were also being so kind by sponsoring me on GitHub.

With the open-source experience that I had from my library, I contributed to some other open-source repositories as well on GitHub, the biggest one I think was [date-fns](https://github.com/date-fns/date-fns/pulls?q=is%3Apr+author%3A%40me+is%3Aclosed), where I helped create some standard format functions. On top of that, with the publishing experience, I learned about JS module types, such as UMD, CJS, and ESM.

By the end of my time at eFishery, I was a Frontend Engineer.

## Post-college: Tetrate

I started working remotely at Tetrate in September 2018, where I was still doing my Master's in Melbourne, Australia. It was a part-time role, since, well, I was still studying and I didn't want to screw up (I almost did). I worked part-time at Tetrate until December 2019 and then I converted to full-time until October 2022.

I joined Tetrate without really knowing an inch about the Cloud Native area. I didn't know a thing about Kubernetes, I didn't know a thing about Envoy, I didn't know a thing about Istio, and all that. It was all alien to me.

It was a painful road to learn a bit about all this stuff outside the frontend area, but with the help of my colleagues, I could get some grasp on it. Now, I am quite familiar with Kubernetes and some parts of Cloud Native, thanks to them! This knowledge of Kubernetes immensely helped me in my current role at AccelByte, because everyone has access to the development environment. That way, if there are bugs in the services that my team maintains, I could check the pod logs and see if there are interesting things. This means I don't put myself at the mercy of the DevOps team, since I could have a chance to debug them myself.

Of course, since I was not an English-speaking native, working at Tetrate remotely with people all over the world was challenging for me since everyone had different accents and cultures. But with that challenge, along with my study in Australia, I gained some sense of confidence when communicating in English. Looking back, I think it was a pretty huge deal and I will cherish these experiences a lot.

Lastly, as I mentioned above, Tetrate was a distributed company (at the time of writing, it still is). So, asynchronous communication was the primary way to go before electing for synchronous communication (like meetings). As such, writing was a great asset to have, so that we could minimize meetings and all that (the clearer the text, the less chance there is misunderstanding). Again, my experience from maintaining my datatable library helped a lot since I had to write documentation about it, especially if there are breaking changes.

Folks at Tetrate were amazing professionals. When I just started, I was very hesitant in communicating in public channels since, you know, I felt inferior to them. However, as time went on, I realized that I had to be more outspoken so I could stand on my own two feet. I _think_ I did that part okay and I have felt the positive effect since. That was perhaps my second-best learning at Tetrate.

I _probably_ could have learned to give feedback to my colleagues directly. I had this bad habit back then where I hesitated from giving feedback to people directly that I needed help from my colleague to "bridge" the feedback for me. I realize now that this was counterproductive. There is nothing wrong in giving feedback, as well as we keep the tone friendly. No need to feel guilty or whatever.

By the end of my time at Tetrate, I was a Frontend Engineer.

## Post-college: AccelByte

I started working at AccelByte in March 2022. It seemed like a dream at first, but almost everything that I had learned previously was applicable here:

- **Building and experimenting with various tools**: I remember during my AccelByte interview, the interviewee asked me about Gatsby. Since I used Gatsby for my previous blog site, I could easily explain to them my experience in using Gatsby and why I switched to Astro.
- **Documentation**: Although AccelByte is based in Yogyakarta (Indonesia), it's kinda a distributed company as well since there are people from all over the globe. So, that covers PR descriptions as well as internal articles.
- **DevOps stuff**: I had the chance to learn about Kubernetes before at Tetrate and that knowledge is very useful at AccelByte. I ended up writing a guide for other engineers to do various `kubectl` commands so that they could try it on their own.
- **CI stuff**: With my prior knowledge in CI/CD, I am pretty comfortable with scripting in CI. It definitely helps a lot in case the DevOps team is a bit short on resources, so I could help lift their burden a bit.
- **Communicating in English**: Asynchronous and synchronous communication. Two things that I learned a lot when working at Tetrate, when doing my Masters, and when working on open source stuff (only asynchronous, though).
- **npm related stuff**: This includes publishing and maintaining npm dependencies. Since I still maintain my datatable library, I could share my knowledge about semantic versioning and some bits about module types (UMD/CJS/ESM) with my colleagues.

AccelByte appreciates curiosity and proactivity _a lot_. One of the feedback that I got after my probation was that my team lead didn't have to always monitor me and they could trust me in what I did, so that was really awesome to hear. I wouldn't have known that these 2 traits I developed during my eFishery internship times would be a major factor in my career now.

I have been working for more than 1 year now at AccelByte. If there is one thing I had never done before, it was probably I now share things more frequently. I want to help my colleagues grow together with me. That, and now I feel like I am more comfortable with giving people feedback.

At the time of writing, I am a Senior Software Engineer 1. I know it's not much since it's my 7th year in web development. But, considering my shaky start to the journey, I think it's enough and I'm hungry for more!

Hopefully, this post is useful and as always, feel free to hit me up if you have any feedback!
