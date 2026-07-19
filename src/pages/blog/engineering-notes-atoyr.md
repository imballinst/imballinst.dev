---
title: Engineering Notes from Building Atoyr
description: "In this post, I am sharing my experience building the Atoyr, a word arcade game."
publishDate: 2026-07-19T13:08:30.630Z
image: /assets/blog/engineering-notes-atoyr/00-hero.png
imageAlt: An image showing one of the screenshots of the game Atoyr.
imageCaption: An image showing one of the screenshots of the game Atoyr.
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello, hello! Welcome to this post, in which I will be sharing my experience in building a _simple_ (hopefully) word arcade game called "Atoyr". It is an abbreviation of "A test of your reflexes", which is a homage to a Final Fantasy XIV character when he casts a spell with a long cast time (ironically). The mechanic is quite simple: given a scrambled word [and a definition], guess the word. Repeat this every 30 seconds, get as many correct guesses as you can.

I originally started developing this early this year (January-ish) but only managed to release it properly just last week... because reasons. Mostly because I lost my spark for building software and am currently on track to revive it. So, yeah, let's get started!

## The beginning

Initially, I used this project to get myself familiarized with AI-assisted development, so that I could get a sense of how to operate it, with the hope that I wouldn't be jet-lagged when my work allowed/wanted me to use it. I was using the free version of GitHub Copilot (🕊️), which I'd say was pretty good because I could choose from a lot of available models and see which models were "expensive" and which ones were "cheap".

Needless to say, the development itself was pretty fast. I was initially opting for the entire thing being in TypeScript for easier end-to-end integration and typing consistency between the client and server, with [NestJS](https://nestjs.com/) as the backend. But goodness me, I _think_ NestJS was so painful to learn, as I wasn't a fan of decorator-based annotations. I have been learning TypeScript for 7 years, but I was more comfortable in Go (which I only had 4 years of experience with) than TypeScript-based NestJS.

Anyway, finally I decided just to go with a SPA (prerendered) React Router and Go (Gin) as the backend. I didn't want to use TypeScript for the backend because I wanted to keep honing my skills in another language.

## Tasting AI-assisted development

As probably every other person who first touched LLMs for software engineering, we _want_ everything. Like, everything. So, I cast a very wide net for the requirements. _"Hey, I think it should be possible to do this. Let's add this to the requirements, migration schema, etc., etc."_ 

Fast forward, I lost my appetite for developing it. I got the "joy" of finishing it according to my prompt, but it was... bland. It wasn't because of the requirements; it was because of the process. What did I learn? Probably not much, but one thing is for sure: it did make experimentation faster. I would've never gone back and forth from normal [Koa](https://koajs.com/) to NestJS to [Gin](https://gin-gonic.com/) while keeping the features intact without the help of LLMs.

Just reviewing code outputted by LLMs took me back to my college years. It was exactly like what I did back then: you know the "tutorial books" of previous year's exams that were sold by the student union? I only read the question, the step-by-step formulas, and finally the answer. Guess what? I scored (almost always) badly in exams, if not just enough.

The same case with reviewing code from LLMs. If I just review the diff, I learn little about what was being developed, which would reduce my decision-making regarding that thing in the future. Sure, I know it implemented X, Y, Z, and the tests, but can I answer a technical question about it in the future? I don't know.

Let's assume that the LLM is a cook, and you ask it to cook food. The result: it looks good, and it tastes good on the surface. On the inside? How do you know if it uses too much of a certain ingredient? You won't know _unless_ you supervise it _and_ you know what you are doing. It's like what they say: an LLM may _feel_ amazing at a job that we aren't familiar with.

Anyway, if you still want to (or are forced to) only review LLM code, one way to reduce that learning concern is to keep asking the LLM about the part that you don't understand (or that is not aligned with your understanding). As the LLM clarifies the intent, you can provide feedback and re-align as needed. Although, you have to spare more "token usage," which requires you to be lucky... as in, not being "on the clock 24/7", because if you are always expected to build, you won't have time to stop, ask, and learn.

This is actually the same as the Pull Request (PR) review in the real world. If you see PR only as a gatekeeping mechanism, you won't learn much from what your peers do. However, if you're actively trying to learn, it may actually benefit you and your peers! That's probably also the case with the LLMs as our peers. If they do something wrong, we can ask why, and from there, we can "fine-tune" the context to prevent the same issue from happening again.

## Taking more control

I didn't really progress on the project for a good while. When I got back to it recently, I made a resolution to release it in a few weeks. This required me to... wait for it... _ruthlessly prioritize_ the requirements and adjust my workflow.

There were 2 features that I scoped out: the first one is the user account, and the second one is itemization, both of which were technically "one package". An item has to be granted and persisted to "something", which is the user account, but to create a user account, I have to think about the authentication/authorization. Do I want username/password only, or do I want it to be exclusively third-party auth (e.g., Google)? What's the difference between a session with an account and without in the leaderboard? Will it show the username instead of the last 4 characters of the session ID? Should I prevent bad words when creating the username? How to prevent abuse in username creation?

These were the headaches that I think would prevent the "launch" from happening earlier. So, I got rid of them. Looking back, I was grateful I did so, because I was able to learn how to iteratively grow rather than "waiting for perfection".

I also started mixing manual coding with AI-assisted development. I did the latter just so that I could keep up with the "industry norms". It was pretty fun. When I wrote code manually, I would ask the LLM to review my code, and vice versa. By writing code manually, I got some grasp on "where some things are", which allowed me to give better feedback to the LLM. _"Haha, you still do that manually?"_ I'm sorry, I was trying to keep being a human, and I don't have unlimited token usage (I personally am using [OpenCode Go](https://opencode.ai/docs/go/), and I gotta say it's pretty good).

## Locking the stack

For the backend, I was (and still am) using Go+Gin+GORM. Initially, I was using GORM's [auto migration tool](https://gorm.io/docs/migration.html) during development. However, since it contained a lot of "magic" and "constraints", I changed it to manual migrations (with SQL files). This was so that I could know what exists in the database and what doesn't, because with the auto migration, based on the docs, it is only able to "append" and won't be able to "modify" or "delete".

Lastly, since "synchronizing" the request/response payload between the UI and server was painful, I decided to use [oapi-codegen](https://github.com/oapi-codegen/oapi-codegen/) to codegen the OpenAPI 3.0 spec into [Go (Gin)](https://github.com/oapi-codegen/oapi-codegen/tree/main/examples/minimal-server/gin) and [TypeScript fetch](https://openapi-ts.dev/openapi-fetch/). It was pretty cool, and I added [openapi-react-query](https://openapi-ts.dev/openapi-react-query/) as a cherry on top, which builds on top of `openapi-fetch`.

Communication between client/server is mostly via HTTP, whereas timers exclusively use SSE (because wrong answers have to be resolved in the server and the server takes care of the timer). Why SSE instead of WebSocket? Because I don't want to handle the WebSocket complexity, especially around reconnection. If submitting an answer is handled inside a WebSocket, my understanding is that I have to handle cases where the submitted answer is "lost" in the process and has to be retried after reconnection. With SSE handling the tick only, I have far fewer things to worry about if the connection drops. For the record, currently I handle this by checking if the SSE is inactive (the client doesn't receive `tick` events); and re-establish it if that is the case.

## CI/CD and release

The planned release day swiftly approached. I felt like the thing was ready to be deployed; the question was just about where. I was thinking of using Hetzner, but Hetzner has raised their server prices a few times already this year [[1](https://www.hetzner.com/pressroom/statement-price-adjustment/), [2](https://www.hetzner.com/pressroom/standardization-and-price-adjustment-of-our-server-products/)]. Previously, the cheapest Shared Cloud Server (CX class) started from $4 per month. Now, it starts from $6.5 per month, more than a 50% price hike, all because of this AI hyperscale stuff.

<details>
  <summary>Rant about AI hyperscale that you may or may not read</summary>

  Man, it makes me want to rant a bit about the prices. The good old days when I was able to buy 16x2 DDR4 RAM sticks for just under $100... now it is 3-4 times pricier. Good thing I also upgraded my PC's SSD before it went crazy.

  This is why I think the market for PC gamers will not grow for now, because the PC parts' price is absurd. If someone already struggles to fulfill their primary needs, with the PC parts being that big, they can kiss goodbye to building a PC. Console and smartphone prices also got bumped, although I don't think it's as big as PC's. So, I think there is _still_ hope for console and mobile gaming. If you are reading this and in the near future AI is still hyperscaling but the PC gamers community _seemingly_ is still consistently growing, please kindly remind me about this post, and I'll write an update that I was wrong!

  Just to be clear, I _still_ use LLMs (maybe not as _extensively_ as you). I find value in it. But, I don't like how it destroys the PC parts' prices and how the big startup companies do fearmongering-based marketing (which resulted in many layoffs in the name of AI, by the way). This is why I am _personally_ subscribed to OpenCode instead of Codex and Claude, even though the latter two may have the better models and "value-for-money". Unless it is forced on me (e.g., because of work), I won't pay OpenAI and Anthropic. Maybe the companies behind the open-weight models also have "sins" that I don't know about yet. But, until I do, this will be my personal stance.
</details>

Back to the topic. I ended up with [OVHcloud with their VPS package](https://www.ovhcloud.com/asia/vps/). With $5.35 per month (or $4.54 if you take the 1-year commitment), you get the same specifications as Hetzner, in addition to being located in Singapore, which will help in reducing latency a bit for my stuff. As for the DNS, I used a subdomain of `imballinst.dev`, a domain that I already have in Squarespace Domains (used to be Google Domains, again, 🕊️). In the process, I forgot that `imballinst.dev` used Netlify's name servers, so it took me a bit of back and forth before realizing that I had to add A and CNAME records in Netlify instead of in the Squarespace Domains.

I had an experience setting up a deployment with HTTPS myself back then on a VPS (and it was painful). I think it was in 2017/18. Fast forward to now, there is a thing called [Coolify](https://coolify.io/) (which I wanted to try for so long but haven't had the chance). Coolify came out of the box with the routing stuff ([Traefik](https://doc.traefik.io/traefik/)), which I see as a "better Nginx" so I don't have to manually configure the reverse proxy and all that for everything that I want to expose.

Next one is Continuous Integration (CI). There were 2 options with Coolify: Git mode (build on the VPS) or Docker image mode (build in any CI outside of the VPS and then pull the Docker image). I really wanted the VPS to just pull a Docker image so it doesn't cause a CPU/memory spike during the build, so I went with GitHub Actions, considering my repository is hosted on GitHub anyway. Additionally, GitHub Actions is pretty generous for private repositories, with 2000 CI minutes per month.

Up next, the Continuous Deployment (CD). I had several registry options:

- **GitHub Packages:** https://docs.github.com/en/billing/concepts/product-billing/github-packages. The egress limit is quite low for private repositories, so it's a bit of a no-go.
- **Docker Hub:** https://hub.docker.com. There is only 1 private repository limit, so if I want to host another app, I have to think about an alternative anyway.
- **Harbor:** https://github.com/goharbor/harbor. It caught my eye around March/April, and it was pretty nice in terms of feature set (seems easy to toggle some optional features like Trivy for image scanning, too), but I had trouble setting that up on the VPS.
- **Registry (from inside Coolify):** https://coolify.io/docs/services/docker-registry. From what I understand, this is the baseline of Harbor. It doesn't have other rich features like image scanning, but for my case, it should be enough.

So, I ended up using the Coolify Docker Registry service, set up my CI to push it there, and then pointed my app to use a Docker Image that points to that Docker Registry URL. Mind that Docker auths have to be over HTTPS (so IP addresses are a no-go), so I had to set up the DNS and HTTPS first for the Docker Registry. Other than that, it was pretty smooth. A GitHub Actions job pushes the Docker image to the Coolify Docker Registry, then it triggers the deployment of the said app, which will cause Coolify to pull the `latest` image.

![Atoyr overall CI/CD setup.](/assets/blog/engineering-notes-atoyr/01-atoyr-architecture.png)

It is said that I don't really need to trigger the webhook, but I need something like [Watchtower](https://github.com/nicholas-fedor/watchtower). But... that is more of a toy for me to play with, and for every toy I play with, the release is delayed. So, I kept it simple. There you have it: a commit is pushed to the repository, then GitHub Actions will test, build, push the Docker image to the Coolify registry, and then trigger the Coolify deployment.

## Analytics and dashboard

The CI/CD is ready, the domain is ready, I already did some tests... but there were still some missing things. How would I know if the game was played? How many users visited only the home page, only to end up not playing the game? I decided to split up into 2 key sources.

![Atoyr Google Analytics "home numbers". It's still rookie numbers, for now!](/assets/blog/engineering-notes-atoyr/03-google-analytics.png)

The first one is user interactions, which are retrieved from Google Analytics via Google Tag Manager. Metrics being tracked:

- Button clicks and labels
- Number of visitors
- Page views

![Atoyr server data.](/assets/blog/engineering-notes-atoyr/02-dashboard.png)

The second one is session data, which are retrieved from the server. Metrics being tracked:

- Currently active sessions
- Sessions today
- Sessions this week
- Sessions this month
- Total number of sessions (fetched on-demand)
- All other observability metrics, like response time, throughput, error rate, and memory usage

By having these 2 sources, I can look up some numbers and _maybe_ derive some decisions based on them. I had some improvements based on the Google Analytics numbers, which I will share in another post (this post is already quite long!). To protect the dashboard, I used a simple Google auth, so only certain users with a certain Google auth token can see the dashboard. The UI is kind of a "throwaway feature" that I almost fully relied on LLMs to create. I didn't need it to be fancy; I needed it to "just work".

The HTTP endpoints used to fetch those stats, though, I had to take more control so that the monitoring capabilities wouldn't end up hurting the server's performance (if the traffic ever skyrockets at some point).

## Adding a staging environment

Initially, I only had production environments. However, as I iterated, I realized that I would need a staging environment, especially to test out migrations. I don't want a migration to break production accidentally, even though it works fine on my machine. So, I updated my GitHub workflow so that it would build a Docker image with different tags:

- **Normal `main` branch pushes:** build `staging` Docker image tags.
- **Tag pushes:** build tag AND `latest` Docker image tags. These tags are to be created via GitHub Releases, and then they go through the usual CI/CD flow. This way, I can still "time" my releases.

## Closing words

That's all for this post. To recap:

- Went back and forth between Koa, NestJS, and Go for the backend options with the help of LLMs during initial development
- Ended up with React Router (SPA) for the frontend and Go (Gin, GORM) for the backend
- Took more control by prioritizing features and mixing some manual code writing with AI-assisted development
- Used OVHcloud as hosting because it was cheaper than Hetzner
- GitHub Free plan's private repository GitHub Actions minutes are generous, which allows building the Docker image in CI and pushing it to the Coolify Docker registry
- Google Analytics was used to capture user interactions, whereas the dashboard is used to see the latest state of the data in the database
- Separation between staging and production was done via a tag split: `staging` and `latest`

I also mentioned about my lack of "appetite" for software engineering. After adjusting my workflow to be a mix of AI-assisted development and manually writing code, I got my excitement over the project back. I know it's not really attracting _that_ many numbers, but I learned a lot from this project and that was what mattered to me, because this could be a very good momentum for me to build onwards towards a healthier software engineering (personally, at least).

So, yeah. Hopefully this post is useful, and see you on the next one!
