---
title: A Test of Your Reflexes (Atoyr)
description: A word-based game, similar to Wordle, but arcade-based instead of just one-time-per-day based.
publishDate: 2026-08-04T00:00:00.000Z
websiteLink: https://atoyr.imballinst.dev
layout: '../../layouts/Project.astro'
---

I was thinking about developing a simple game that involves some server-side stuff. I wanted it to be simple because I had to learn (and re-learn) about all of the deployment stuff, as well. So, I took inspiration from Wordle and made it arcade-like. Given a word definition and certain scrambled characters, guess the words (which can be anything). Your reflexes will be tested here, especially because a typo might be costly for your accuracy and score, which are key in climbing the leaderboard.

<div style="width:100%;display:flex;justify-content:center;"><div style="left: 0; width: 100%; max-width: 56vh; position: relative; height: 600px;"><iframe src="https://www.youtube.com/embed/1Ao9qnknhVY?rel=0" style="top: 0; left: 0; width: 100%; height: 600px; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;" referrerpolicy="strict-origin"></iframe></div></div>

You can see the engineering notes that I wrote—containing the "journey" of developing it—here: [Engineering Notes from Building Atoyr](../blog/engineering-notes-atoyr.md). In short:

- React Router SSG + Go, bundled into a single Dockerfile with nginx
- VPS bought from OVHcloud
- Coolify for the Docker containerization
- GitHub Actions for CI to push to Coolify registry and webhook trigger for deployment
- Google Analytics for user engagements (e.g. number of button clicks) and server-side dashboard for server-specific data (e.g. number of sessions)
