---
title: Building Word Arcade Game
description: "In this post, I am sharing my experience building the Atoyr: a word arcade agme".
publishDate: 2026-06-30T06:34:35.744Z
image: /assets/blog/building-word-arcade-game/hero.png
imageAlt: An image showing one of the screenshots of the game Atoyr.
imageCaption: An image showing one of the screenshots of the game Atoyr.
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello, hello! Welcome to this post, in which I will be sharing my experience in building a _simple_ (hopefully) word arcade game. I originally started this early this year (January-ish) but only managed to release it properly just last week... because reasons. Mostly because I lost my spark in building software and currently on track in reviving it.

So, yeah, let's get started!

## The beginning

Initially, I used this project to get myself familiarzed with AI-assisted development, so that I could get a sense how to operate it with the hope that I wouldn't be jetlagged when my work allowed/wanted me to use it. I was using the free version of GitHub Copilot (🕊️), which I'd say was pretty good because I could choose from a lot of available models and see which models were "expensive" and which ones were "cheap".

Needless to say, the development itself was pretty fast. I was initially opting for full TypeScript for easier end-to-end integration and typing between the client and server, with me wanting to learn about [NestJS](https://nestjs.com/). But goodness me, I _think_ it was so painful to learn, as I wasn't a fan of decorator-based syntaxes. I have learned TypeScript for 7 years but I was more comfortable in Go (which I only had 4 years of experience) than TypeScript-based NestJS.

Anyway, finally I decided just to go with a SPA (prerendered) React Router and Go as the backend. I didn't want to use TypeScript for the backend because I wanted to keep honing my skills in another language.

## Tasting AI-assisted development

As probably every other person who first touched LLMs for software engineering, we _want_ everything. Like, everything. So, I casted a very wide net for the requirements. _"Hey, I think it should be possible to do this. Let's add this to the requirement, migration schema, etc. etc."_ 

Fast forward, I lost appetite in developing it. I got the "joy" of finishing it according to my prompt, but it was... bland. What did I learn? Probably not much, but one thing for sure, it did make experimentation faster. I would've never went back and forth from normal [Koa](https://koajs.com/) to NestJS to [Gin](https://gin-gonic.com/) while keeping the features intact without the help of LLMs.

Just reviewing code outputted by LLMs took me back to college years. It was exactly like what I did back then: you know the "tutorial books" of previous year's exams that were sold by the student union? I only read the question, the step-by-step formulas, and finally the answer. Guess what? I scored (almost always) badly in exams, if not just enough.

The same case with reviewing code from LLMs. If I just review the diff, I learned little what was being developed, which would reduce my decision making regarding that thing in the future. Sure, I know it implemented X, Y, Z, and the tests, but can I answer a technical question about it in the future? I don't know.

Let's assume that the LLM is a cook and you ask it to cook a food. The result: it looks good, it tastes good. On the surface. On the inside? How do you know if it uses too much certain ingredient? You won't know _unless_ you supervise it _and_ you know what you are doing. It's like what they say: LLM _feels_ better at a job that we aren't familiar at.

Anyway, if you still want to (or are forced to) only-review-LLM-code, one way to reduce that learning concern is to keep asking the LLM about the part that you don't understand (or is not aligned with your understanding). As the LLM clarifies the intent, you can provide feedback and re-align as needed. However, you have to spare more "token usage" which requires you to be lucky... as in, not being "on the clock 24/7", because speed and learning often are mutually exclusive (unless you have a galaxy brain).

## Taking more control

I mentioned in the preivous section that I made too many requirements and lost appetite in the process. When I got back to it recently, I made a resolve to release it in few weeks. This required me to... wait for it... _ruthlessly prioritize_ the requirements.

There were 2 features that I scoped out: first one is user account and second one is itemization, both of them were technically "one package". An item has to be granted and persisted to "something", which is the user account, but to create user account, I have to think about the authentication/authorization. Do I want username/password only, or do I want it to be exclusively third-party auth (e.g. Google)? What's the difference between a session with account and without in the leaderboard? Will it show the username instead of the last 4 characters of session ID? Should I prevent bad words when creating the username? How to prevent abuse on the username creation?

These were the headaches that I think would prevent the "launch" from happening earlier. So, I got rid of them. Looking back, I was grateful I did so, because I was able to learn how to iteratively grow than "waiting for perfection".

I also started mixing coding manually with AI-assisted development. The latter was just because so that I could keep up with the "industry norms". It was pretty fun. When I wrote code manually, I would ask the LLM to review my code; and vice versa. By writing code manually, I got some grasp on "where some things are", which allowed me to give better feedback to the LLM. _"Haha, you still do that manually?"_ I'm sorry, I was trying to keep being a human and I don't have unlimited token usage.

In addition to that, since I was (and still am) using GORM, I stopped using the [auto migration tool](https://gorm.io/docs/migration.html), which I had been using during the development. This was so that I could know what exists in the database and what not, because with the auto migration, based on the docs, it is only able to "append" and won't be able to "modify" or "delete".

Lastly, since "synchronizing" the payload/response was painful, I decided to use [oapi-codegen](https://github.com/oapi-codegen/oapi-codegen/) to codegen OpenAPI 3.0 spec into [Go (Gin)](https://github.com/oapi-codegen/oapi-codegen/tree/main/examples/minimal-server/gin) and [TypeScript fetch](https://openapi-ts.dev/openapi-fetch/). It was pretty cool and I added [openapi-react-query](https://openapi-ts.dev/openapi-react-query/) as cherry-on-top, which builds on top of `openapi-fetch`.

## Overall architecture

<!-- Architecture image -->

The planned release day swiftly approached. I felt like the thing was ready to be deployed, the question was just about where. I was thinking to use Hetzner, but Hetzner raised their server prices few times already this year [[1](https://www.hetzner.com/pressroom/statement-price-adjustment/), [2](https://www.hetzner.com/pressroom/standardization-and-price-adjustment-of-our-server-products/)]. Previously, the cheapest Shared Cloud Server (CX class) started from $4 per month. Now, it started from $6.5 per month, more than 50% price hike, all because of this AI hyperscale stuff.

Man, it makes me want to rant a bit about the prices. The good old days when I was able to buy 16x2 DDR4 RAM sticks for just under $100... now it is 3-4 times pricier. Good thing I upgraded my PC's SSD before it went crazy.

This is why I think the market for PC gamers will not grow for now, because the PC part prices are crazy. If someone already struggles to fulfill their primary needs, with the PC parts being that big, they can kiss goodbye building a PC. Console and smartphone prices also got bumped, although I don't think it's as big as PC's. So, I think there is _still_ hope to console and mobile gaming. If you are reading this and in the near future AI is still hyperscaling but PC gamers community _seemingly_ becomes bigger than before, please kindly remind me about this post and I'll write an update that I was wrong!

Back to topic. I ended up with [OVHcloud with their VPS package](https://www.ovhcloud.com/asia/vps/). With $5.35 per month (or $4.54 if you take the 1-year commitment), you get the same specification as Hetzner does, in addition to located in Singapore, which will help in reducing latency a bit to my stuff. As for the DNS, I used the subdomain of `.imballinst.dev`, a domain that I already have in Squarespace Domains (used to be Google Domains, again, 🕊️). In the process, I forgot that `imballinst.dev` used Netlify's name servers, so it took me a bit back and forth before realizing that I had to add A and CNAME records in Netlify instead of in the Squarespace Domains.

I had an experience setting up HTTPS and stuff myself back then in a VPS (and it was painful). I think it was in 2017/18. Fast forward to now, there is a thing called [Coolify](https://coolify.io/) (which I wanted to try for so long but haven't had the chance). Coolify came out-of-the-box with the routing stuff ([Traefik](https://doc.traefik.io/traefik/)), which I see as a "better Nginx" so I don't have to manually configure the reverse proxy and all that myself inside a config file.

Next one is Continuous Integration (CI). There were 2 options with Coolify: Git mode (build in VPS) or Doker image mode (build in any CI outside of VPS and then pull the Docker image). I really wanted for the VPS to just pull a Docker image so it doesn't cause CPU/memory spike during the build, so I went with GitHub Actions, considering my repository is hosted in GitHub anyway. Additionally, GitHub Actions is pretty generous for private repositories, with 2000 CI-minutes per month.

Up next, the Continuous Deployment (CD). I had several registry options:

- **GitHub Packages:** https://docs.github.com/en/billing/concepts/product-billing/github-packages. The egress limit is quite low for private repositories, so it's a bit of no-go.
- **Docker Hub:** https://hub.docker.com. There is only 1 private repository limit, so if I want to host another app, I have to think about an alternative, anyway.
- **Harbor:** https://github.com/goharbor/harbor. It caught my eye around March/April and it was pretty nice in terms of feature set (seems easy to toggle some optional features like Trivy for image scanning, too), but I had trouble setting that up in the VPS.
- **Registry (from inside Coolify):** https://coolify.io/docs/services/docker-registry. From what I understand, this is the baseline of Harbor. It doesn't have other rich features like the image scanning, but for my case, it should be enough.

So, I ended up with using Coolify Docker Registry service, set up my CI to push it there, and then point my app to use Docker Image that points to that Docker Registry URL. Mind that Docker auths have to be in HTTPS, so I had to set up the HTTPS first (alongside the Docker Registry domain). Other than that, it was pretty smooth. GitHub Actions push Docker image to Coolify Docker Registry, then GitHub Actions trigger the deployment of the said app, which will pull the `latest` image.

There you have it, a commit is pushed to the repository, then GitHub Actions will test, build, push Docker image to Coolify registry, and then trigger the Coolify deployment.

## Analytics and dashboard

<!-- Setting up GTM, simple dashboard -->

The CI/CD is ready, the domain is ready, I already did some tests... but there were still some missing things. How would I know if the game was played? How many users visited only the home page, only end up not playing the game? I decided to split up into 2 key sources:

- **User interactions:** from Google Analytics via Google Tag Manager. Metrics being tracked:
  - Button clicks and labels
  - Number of visitors
  - Page views
- **Game data:** from the server. Metrics being tracked:
  - Currently active sessions
  - Sessions today
  - Sessions this week
  - Sessions this month
  - Total number of sessions (fetched on-demand)
  - All other observability metrics, like response time, throughput, error rate, and memory usage

This way, I can look up some numbers and _maybe_ derive some decisions based on them. I had some improvements based on the Google Analytics' numbers, which I will share in another post (this post is already quite long!). To protect the dashboard, I used a simple Google auth, so only certain users with certain Google auth token can see the dashboard. The UI is kind of "throwaway feature" that I almost fully relied on LLMs to create. I didn't need it to be fancy, I needed it to "just work".

The HTTP endpoints used to fetch those stats though, I had to take more careful look so that the monitoring capabilities won't end up hurting the server's performance (if the traffic ever skyrockets at some point).

## Final touches

<!-- Separating staging and production environments -->

Initially, I only had production environments. However, as I iterated, I realized that I would need a staging environment, especially to test out migrations. I don't want a migration to break production accidentally despite that it works fine in my machine. So, I updated my GitHub workflows so it would build Docker image with different tags:

- **Normal `main` branch pushes:** build `staging` Docker image tags.
- **Tag pushes:** build tag AND `latest` Docker image tags. These tags are to be created via GitHub Releases and then it goes to the usual CI/CD flow. This way, I can still "time" my releases.

## Closing words

That's all for this post. To recap:

- Went back and forth between Koa, NestJS, and Go for the backend options with the help of LLMs during initial development
- Ended up with React Router (SPA) for the frontend and Go (Gin, GORM) for the backend
- Took more control by prioritizing features and mixing some manual code writing with AI-assisted development
- 

That's all for this post. Hopefully it is useful and see you on the next one!
