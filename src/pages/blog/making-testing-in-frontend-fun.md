---
title: Making Testing in Frontend Fun
description: The nature of frontend that can be tested in browser makes writing automated tests to be rather an afterthought. How to make it fun?
publishDate: 2024-03-30T05:51:49.642Z
image: /assets/blog/making-testing-in-frontend-fun/making-testing-in-frontend-fun.png
imageAlt: An image containing the text, "Making Testing in Frontend Fun".
imageCaption: An image containing the text, "Making Testing in Frontend Fun".
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Heya! Hope you are doing well. This will be rather a short post. Well, hopefully, anyway. Recently I have been trying to be more diligent in writing tests in my daily work, be it for frontend (unit, component, or page) and backend (functions that are called by controllers, I guess they fall to "unit" as well?).

Building this habit is not easy, not sure why, maybe because I have this habit of testing locally during the development time? So, if it works, then it's all good. There are a lot of reasons not to write tests, such as, "There will be Quality Assurance (QA) engineers who test them", "There is no time to write tests", and "There is no one to maintain the tests".

Well, I'm here to debunk those questions. Here goes!

## The questions

### "There will be QA engineers who test them"

Okay, let's say that we have QA folks who will help us test the stuff after we have finished developing them. This feature is called "Feature A". They will write test cases around the thing that we have developed, both positive and negative test cases. Afterwards, they do manual QA, confirm the functionality, and the feature gets shipped. All is well and good.

...until the feature breaks. For some reasons. Turns out, the feature breaks because we updated certain helper functions that are completely unrelated to Feature A since we need to update it for other feature, say, Feature B.

It is very, very uncomfortable for QAs to do regression testing every time something gets added, updated, or deleted. Put our place in theirs. Do we want, as software engineers, to test all functionalities when we implement a new one? That gives the impression that the software is not robust.

At the end of the day, QAs are still human. Us software engineers are still human. We both are capable of making mistakes. So, it is not fair if we rely the whole "system stability" to them. If there is a way to help them ease their burden, we should do it.

### "There is no time to write tests"

This is very understandable. We don't always have the luxury of time when developing something. However, let's count the number of times where you need to wake up at night to be "activated" to fix a bug in production. Would you trade those "awkward hours" for the burden in writing tests? I would definitely do it. There is no better feeling than knowing that you can sleep peacefully at night. You sleep better and you can be productive the next day.

Think of testing as an investment. There is no time to write tests, why? Is writing test too hard? Then, get used to it. For sure it will be tough when we're not used to it. However, as we get familiar with the inside and out, all will be worth it. Who doesn't love seeing checklists in the test run result?

### "There is no one to maintain the tests"

## How to make it fun
