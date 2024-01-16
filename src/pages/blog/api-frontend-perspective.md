---
title: API from Frontend Perspective
description: Let's revisit the definition of API and how could frontend engineers benefit more from understanding the UX of an API.
publishDate: 2024-01-16T01:01:35.585Z
image: /assets/blog/api-frontend-perspective/api-frontend-perspective.png
imageAlt: An image containing the text, "API from Frontend Perspective".
imageCaption: An image containing the text, "API from Frontend Perspective".
tags: software engineering, javascript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello, there! I hope you are doing well. Currently, I am pondering about "API". If we look at its definition, API is short for Application Programming Interface. Notice that it does not mention anything about HTTP or endpoint. It's super generic: an interface, a way to interact with your application.

As a frontend engineer at heart, sometimes I too think that "API" is only related to endpoints, because that is what we mostly do. We create UIs, and then we "hook" those UIs to the backend so they can present actual data (and not just mock data). Are there other perspectives to look at?

## API from a consumer perspective

What are the most common ways we interact with an API in our daily work? One of them is HTTP endpoints. I trust you have at least once said something along these lines, "This endpoint is so strict, could we make it more flexible?". Yes, that usually happens when the endpoint is _tightly coupled_ with the UI. In other words, the UI dictates the endpoint API. It is not ideal. At most, the backend should be independent _or_ the backend should dictate the UI through some sort of "generic" data structure (e.g. [Airbnb's Server-Driven UI system](https://medium.com/airbnb-engineering/a-deep-dive-into-airbnbs-server-driven-ui-system-842244c5f5)).

How about CLI, let's say, Git? The `git` CLI is an API to interact with the local `.git` folder (along with its configs) and remote Git repository. Probably we had this confusion with the concept of "pull" and "push", which are not necessarily common outside of software engineering, or maybe it was just me. Anyway, as I practiced more and more, I was not "jetlagged" anymore with Git. When I do not make repeated mistakes with Git CLI (especially big ones) after some time using it, it means Git CLI's API is good.

How about a UI framework? We all have different opinions on frameworks such as Angular, React, Vue, Svelte, and Solid. All of them have advantages and disadvantages, which of course are "biased" depending on the tendency of the current job market. I don't want to single out React here, but I think one good example is `useEffect`. There are so, so many practical uses of `useEffect` to the point that engineers using `useEffect` are prone to using it incorrectly. While human mistakes can indeed contribute to it, at the end of the day, the API of `useEffect` is perhaps still rather "novel". What is an "effect", and why does it _seem_ to conflate `componentDidMount` and `componentDidUpdate` in React Class components? Why doesn't React have lifecycle hooks instead? Things like that.

How about frontend component libraries? Surely we use tons of them. Bootstrap, Material UI, Chakra UI, and Ant Design, to name a few. Then, try to recall, have you had difficulties when using them? How is the experience when modifying color tokens, how is the experience when we want to override a certain style in a certain element, and so on.

These paragraphs above converge into one conclusion: API is not only about HTTP endpoints but almost everything that we use daily and we can take lessons from them.

## API from a creator perspective

We have discussed APIs from the consumer perspective. When we learn about a variety of APIs, we will be able to recognize and appreciate good APIs.

The first time I used Chakra UI, I was so impressed by it. Back then, I mostly used Material UI, which was pretty tricky to style, especially for child components. Chakra UI's API was a breath of fresh air. [Compound components](https://www.smashingmagazine.com/2021/08/compound-components-react/) approach and all components "extend" the base Box props (such as `m` for margin, `p` for padding), styling has never been easier.

Then, Tailwind arrived with the IDE IntelliSense. Developer experience instantly skyrocketed. Previously we always had to remember the class names, but with the utility classes from Tailwind, we _almost_ don't need them anymore (except for a few special cases).

So, how do we make good APIs? From what I think, at least:

1. Do research on the current pain points. What are the problems that we need to solve? Are those problems really impacting productivity?
2. "Steal ideas" from existing software. What do we need to follow, what do we not want to follow? I know people will be somewhat salty when we steal ideas from others, but if those ideas are good, why don't we adopt them? If we do, I recommend crediting the original work for the ideas.
3. Try our own APIs. Are they painful to use? Do they solve the previous pain points? Are they flexible? Do they add layers of complexity that may compromise maintainability?
4. Lastly, of course, practice, practice, practice. We all have been a victim of a "super component" (a component that accepts too many props) and then we realized that it was not good, so we decided to split them into compound components.

## Closing words

So, yeah, there's that. Hopefully, this post is useful. The primary audience is frontend engineers, but of course, it also applies to non-frontend engineers as well, because APIs are for everyone.

Take care and see you on the next one!
