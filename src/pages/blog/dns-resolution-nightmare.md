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

Yesterday (August 3rd) was a bit of a nightmare. Kinda. So, what happened was that, on August 2nd, I scheduled [Buffer](https://buffer.com/) content (for my Twitter and LinkedIn accounts) about a new feature of my word-based game, [Atoyr](https://atoyr.imballinst.dev/), which now includes a new topic on top of the existing English words: Indonesian Politician Quotes. The motivation behind this feature was that, often (if not very often), those who have power in the country don't use their power for the greater good, so this feature serves as a "hall of fame" of sorts.

<details>
  <summary>Atoyr gameplay with Indonesian Politician Quotes</summary>

  <div style="width:100%;display:flex;justify-content:center;margin-top:16px;"><div style="left: 0; width: 100%; max-width: 56vh; position: relative; height: 600px;"><iframe src="https://www.youtube.com/embed/1Ao9qnknhVY?rel=0" style="top: 0; left: 0; width: 100%; height: 600px; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;" referrerpolicy="strict-origin"></iframe></div></div>
</details>

On August 3rd, the day after I published those updates on my platforms, I researched domains and the Domain Name System (DNS) on Cloudflare. Apparently, to my understanding, if we set an orange-proxy in Cloudflare DNS, then Cloudflare will be able to [edge-cache them](https://developers.cloudflare.com/dns/proxy-status/#benefits) (on top of resolving the DNS), whereas if we set grey-proxy, Cloudflare will only act as a DNS resolver. It seemed interesting, so in my infinite wisdom, I decided in the morning to migrate my DNS records from Netlify to Cloudflare (both are free). Here are the steps that I took:

- Download records from Netlify (the format is CSV).
- Convert the DNS records CSV format into BIND format (since Cloudflare's importer only supports that format).
- Update the nameserver in Squarespace from Netlify's nameservers to Cloudflare's (I might be ridiculed for using Squarespace instead of Cloudflare for domains because most people choose the latter, but in my defense, this domain is cheaper there than in Cloudflare's, not by a lot, but still).
- Pray for a quick DNS propagation, because DNS propagation means downtime for anyone visiting via the internet.

After I changed the nameservers, I recalled that it was only yesterday that I published my content updates... and that was the time that I regretted my decision. This migration meant some visitors wouldn't be able to visit the Atoyr website from the social links I shared, even if only briefly. But what was done, was done.

Ten minutes later, I could visit Atoyr's website and some other subdomains under `imballinst.dev` (which are all hosted in a VPS), but I still couldn't visit _this site_ (which is hosted on Netlify). I checked again in the Cloudflare dashboard and tell you what, there were mistakes in the CNAME records.

![Cloudflare DNS records. The red box covers the "Content" column, which contains the "target" IP/domain.](/assets/blog/dns-resolution-nightmare/dns-records.png)

On the image above, notice the red box. At that time, I realized that all of them ended with the suffix `.imballinst.dev` (which probably happened during the CSV-to-BIND conversion, which I didn't realize). That meant `imballinst.dev` got redirected to `imballinst.netlify.app.imballinst.dev`. Of course I couldn't visit the thing. So, I fixed all of them, and a few minutes later, I was able to visit this site. _Phew_, or so I thought.

There was another issue. Previously, all of the things that I hosted in my VPS via [Coolify](https://coolify.io/) used a certificate via [Traefik's DNS challenge](https://coolify.io/docs/knowledge-base/proxy/traefik/dns-challenge). So, those subdomains under Coolify would have a TLS certificate automatically applied with Let's Encrypt, no matter how "nested" the subdomain is. For example, `a.b.c.imballinst.dev` would have HTTPS available all the same. Not with Cloudflare, though. Cloudflare only provides free TLS for orange-proxied DNS [for the _first_ subdomain](https://community.cloudflare.com/t/use-a-second-level-sub-domains-with-ssl/405833/3), e.g. `atoyr.imballinst.dev` and `hello.imballinst.dev`. If I have `universe.hello.imballinst.dev`, it would not be covered by Cloudflare's TLS and as such, my browser wasn't able to visit those sites.

There were 3 options:

- Purchase [Advanced Certificate Manager (ACM)](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) in order to get [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/).
- Give up the Cloudflare orange-proxy DNS for those nested subdomains and just use Traefik's TLS.
- Flatten the nested subdomains. For example, `universe.hello.imballinst.dev` becomes `universe-hello.imballinst.dev`.

Considering those nested subdomains are mostly internal/testing only and ACM costs $10/month, it was an automatic no. Flattening was an interesting option, but then again, since they won't attract real traffic, it was probably fine (hopefully). So, I gave up the orange-proxy and used the grey-proxy instead for those nested subdomains.

With that decision, finally all of the deep-subdomains under `imballinst.dev` were available again. For now, at least. As a matter of fact, in the process of writing this post, I recalled that I hadn't updated my Traefik DNS challenge from Netlify to Cloudflare. I just did... and hopefully when the TLS certificate expires in a few months, it will be able to renew itself just fine... or it's going to be a nightmare situation. Again.

Anyway, that's all I have to share. So, to recap, when you want to migrate a DNS from one provider to another:

- Expect slight downtime. Make sure that you haven't recently "invited" people to check your sites. Otherwise they'll be confused, like, _"Why is this person publishing this but the thing is not available?"_
- Double-check the DNS records before finalizing the nameserver migration.
- If you are using Traefik (or similar proxy) with the DNS challenge approach, ensure that you have also migrated the configuration to use your latest DNS provider.
- If you have nested subdomains, want to migrate to Cloudflare, AND you don't want to use Total TLS, you have to switch to grey-proxy or flatten the nested subdomains, because the orange-proxy won't properly work on nested subdomains.
