---
title: DNS Resolution Nightmare
description: Changing DNS providers can be scary... especially if you have a lot of subdomains.
publishDate: 2026-08-04T04:49:00.000Z
image: /assets/blog/dns-resolution-nightmare/00-hero.png
imageAlt: An image showing the text, "DNS Resolution Nightmare".
imageCaption: An image showing the text, "DNS Resolution Nightmare".
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello! This post is special. Let's try a heading-less post, a free-style format, so to speak.

Yesterday was a bit of a nightmare. Kinda. So, what happened was that, the day before yesterday, I scheduled a [Buffer](https://buffer.com/) content (for my Twitter and LinkedIn accounts) about a new feature of my word-based game, Atoyr, which now includes a new topic on top of the existing English words: Indonesian Politician Quotes.

The motivation was that, often (if not very often), those who have power in the country don't use their power for the greater good. A lot of people were scrambling over trains during rush hour and yet, there was a person in the civil parliament (DPR) who rejected the procurement of a new train sets and said, _"Are we in chaos?"_ I think that was a very... insensitive thing to say. I'll die on the hill that politicians should at least use public transportations once in a while (maybe once a week), instead of everyday getting transported with a luxury car. Maybe, they will never do it because firstly, it's painful and secondly, people will bash/mock them along the way because of them failing at representing the citizen.

But anyway, the following is the video of the new feature, in case you haven't seen it:

<div style="width:100%;display:flex;justify-content:center;"><div style="left: 0; width: 100%; max-width: 56vh; position: relative; height: 600px;"><iframe src="https://www.youtube.com/embed/1Ao9qnknhVY?rel=0" style="top: 0; left: 0; width: 100%; height: 600px; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;" referrerpolicy="strict-origin"></iframe></div></div>

The day after I published those updates in my platforms, I researched about domains and Domain Name System (DNS) Cloudflare, which apparently, to my understanding, if we set an orange proxy in Cloudflare DNS, then Cloudflare will be able to [edge-cache them](https://developers.cloudflare.com/dns/proxy-status/#benefits) (on top of resolving the DNS). It seemed interesting, so in my infinite wisdom, I decided in the morning to migrate my DNS records from Netlify to Cloudflare (both are free). Here are the steps that I did:

- Download records from Netlify (the format is CSV).
- Convert the DNS records CSV format into BIND format (since Cloudflare importer only supports that format).
- Update the nameserver in Squarespace from Netlify's nameservers to Cloudflare's (I might be ridiculed for using Squarespace instead of Cloudflare for domains because most people choose the latter, but to my defense, this domain is cheaper there than in Cloudflare's, not by a lot, but still).
- Pray for a quick DNS resolution, because DNS resolution means downtime for anyone visiting via the internet.

After I changed the nameservers, I recalled that it was only yesterday that I published my content updates... and that was the time that I regretted my decision. But what was done, was done.

Ten minutes gone by, I could visit the Atoyr's website and some others subdomains under `imballinst.dev` (which are all hosted in a VPS), but I still couldn't visit _this site_ (which is hosted on Netlify). I checked again in Cloudflare dashboard and tell you what, there were mistakes in the CNAME records.

![Cloudflare DNS records. The red box covers over the "Content" column contains the "target" IP/domain.](/assets/blog/dns-resolution-nightmare/dns-records.png)

On the image above, notice the red box. At that time, I realized that all of them ended with suffix `.imballinst.dev`. So, `imballinst.dev` got redirected to `imballinst.netlify.app.imballinst.dev`. Of course I couldn't visit the thing. So, I fixed all of them, and few minutes later, I was able to visit this site. _Phew_, or so I thought.

There was another issue. Previously, all of the things that I hosted in my VPS via Coolify used a self-signed certificate via [Traefik's DNS challenge](https://coolify.io/docs/knowledge-base/proxy/traefik/dns-challenge). So, those subdomains under Coolify will have TLS certificate automatically applied with Let's Encrypt, no matter how "deep" the subdomain is. For example, `a.b.c.imballinst.dev` will have HTTPS available all the same. Not with Cloudflare, though. Cloudflare only provides free TLS for orange-proxied DNS [for the _first_ subdomain](https://community.cloudflare.com/t/use-a-second-level-sub-domains-with-ssl/405833/3), e.g. `atoyr.imballinst.dev` and `hello.imballinst.dev`. If I have `universe.hello.imballinst.dev`, it will not be covered by Cloudflare's TLS and as such, my browser wasn't able to visit those sites.

The options were either I purchase [Advanced Certificate Manager (ACM)](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) in order to get [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/), or I gave up the Cloudflare orange-proxy DNS for those second-level subdomains and just use Traefik's TLS. Considering those second-level subdomains are mostly internal and testing only... and ACM costs $10/month, I decided to skip the orange-proxy for those.

With that decision, finally all of deep-subdomains under `imballinst.dev` were available again. For now, at least. As a matter of fact, in the process of writing this post, I recalled that I hadn't updated my Traefik's DNS challenge from Netlify to Cloudflare. I just did... and hopefully when the TLS certificate expires, it will be able to renew itself just fine... or it's going to be a nightmare situation. Again.

Anyway, that's all Ihave to share. So, to recap, when you want to migrate a DNS from one provider to another:

- Expect slight downtime. Make sure that you DO NOT "invite" people to check your sites recently. Otherwise they'll be confused, like, _"Why is this person publishing this but the thing is not available?"_
- Double-check the DNS records before finalizing the nameserver migration.
- If you are using Traefik (or similar proxy) with DNS challenge approach, ensure that you have also migrated the configuration to use your latest DNS provider.
