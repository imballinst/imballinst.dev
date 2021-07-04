---
templateKey: blog-post
title: Creating Count Up Timer
date: 2021-02-23T07:14:56.835Z
featuredpost: false
featuredimage: images/dan-meyers-hluOJZjLVXc-unsplash.jpg
visibility: public
description: In this post, I will be sharing a bit about creating a count up timer.
tags:
  - software engineering
  - life
---

What is a count up timer? A count up timer is the opposite of the countdown timer. Instead of counting **to zero**, this timer counts **from zero**. It can serve multiple purposes, such as for counting the duration of a workout, duration of screen usages in a day or week, or... for my case, counting the duration since I got married. In this post, I will be sharing a bit about the process in creating a count up timer.

## Defining the "start time"

The first thing we need to do is to define the "zero point"—everything has to start somewhere. For me, I defined the start time as the second I got married to my wife ([link to the count up site](https://imballinst.github.io/married)). Up to second? But, how?

<!-- Insert the married timer here. -->

This part is a bit tricky. My wedding event was live on my wife's Instagram account and hence it was stored on her Instagram TV (we didn't use fancy recordings with timestamps). Now, Instagram has this "posted date" on every post. However, there are 2 problems here. The first one is the UI does not show the exact timestamp (it only shows something like "July 12, 2021" or "2 weeks ago") and the second one is, because of the first problem, I could not know the exact timestamp the chief said "confirmed" (or in Indonesian, "sah").

<!-- Insert the Instagram picture (without tab open) -->

I tried to search the solution in Google and I [found out](https://www.followchain.org/exact-time-instagram-post) that there was a way to do it! We don't need to install anything, we can just use Firefox or Chrome in our PC. OK, so what we need to do is, we right click on the date (in my example above, it was "July 12"), then click "Inspect". It will open some kind of drawer in your browser like the picture below.

<!-- Insert the Instagram picture (with tab open) -->

Inside the drawer, there will be a "selection" (indicated by the blue color). This is the element that we chose to inspect before. The content is as the following:

```html
<time
  class="FH9sR Nzb55"
  datetime="2021-04-19T13:01:01.000Z"
  title="Apr 19, 2021"
>
  10w
</time>
```

Now, we have 3 important information here. The first one is the content of the tag `datetime`, the second one is the `title` (which shows up when we hover on the date element), and the last one is the actual shown text, "10w", which stands for 10 weeks ago. Since our objective is to get the timestamp, `2021-04-19T13:01:01.000Z` is the text that we need to take. That text is a representation of date in [ISO 8601](https://www.w3.org/TR/NOTE-datetime) string.

That was how I got the post date of the recorded event. I moved to the second problem. When did the chief confirmed our marriage? When was the exact time? So, given the initial timestamp, I saw the recorded video's duration. I thought, maybe I could count from behind until the second in the video where the chief confirmed. I did just that and finally I got the timestamp that I wanted.

Now, let's get to the site building part!

## Building the timer

This is the [file in the repository](https://github.com/imballinst/married/blob/master/date.js) that I am referring to. I am only using plain HTML/CSS/JS for that site and as a disclaimer, the calculation may not be the most efficient performance-wise. I chose to not handle it _yet_ since it does not cause major performance degradation (even in mobile browser).

So, here is the outline of the steps that my code does to get the "duration since":

1. Get initial timestamp
2. Get current timestamp
3. Get the difference of years
4. Get the difference of months
5. Get the difference of days
6. Get the effective difference of years
7. Get the effective difference of months
8. Get the effective difference of days
9. Render the dates accordingly (with Monospace fonts and padded with 0s)

<!-- TBD -->
