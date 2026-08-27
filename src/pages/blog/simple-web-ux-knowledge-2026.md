---
title: Simple Web UX Knowledge in 2026
description: With agentic development, it's all too easy to skip the details. But you shouldn't in case you care about your users.
publishDate: 2026-08-21T01:55:47.227Z
image: /assets/blog/simple-web-ux-knowledge-2026/00-hero.png
imageAlt: An image with text "Simple Web UX Knowledge in 2026", plus gauge icon, calendar icon, form icon, and link icon.
imageCaption: An image with text "Simple Web UX Knowledge in 2026", plus gauge icon, calendar icon, form icon, and link icon.
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

The year is 2026. You would have thought that with the rise of agentic engineering, the UX of websites (and by extension, apps in our phones) would be better in terms of UX, but nope. It doesn't mean that LLMs produce bad UX, no, but rather, with these kinds of tools existing, suboptimal UX should be able to be swept on.

- Landing pages are CPU-heavy because of too many animations and moving parts.
- Forms are hard to use because of a small clickable area.
- Navigations are not power-user friendly because we decide to put events on non-interactive elements because of using anchor links.

These were my observations from using various web/native apps in the past week or so, with one of them being created in recent times. Now, I'll admit that my creation is not perfect, but I still sometimes (if not often) fall into some silly mistakes like usability issues in smaller phones, which I only realized after using my wife's phone, which has smaller screen size than the one I have.

Anyway, let's get started identifying above issues one-by-one! I'll admit that each solution doesn't warrant a section, but I'll do it just so it's nice and tidy.

## Landing pages being CPU-heavy

First things first: the objective of a landing page is to convert the visitor into a customer, right? If the customer feels unpleasant when opening your landing page, they will bounce out. For context, the landing page that I mentioned above, despite being more text-heavy, uses way more CPU compared to [Apple's Macbook Air page](https://www.apple.com/macbook-air/) **when idle**. I think it's unacceptable.

Below is the list of what _may_ make them unpleasant and how to reduce them:

- **Too many animations**: ask yourself, _"Are these animations required? Do they represent the product? How much performance do we gain if we don't use them?"_ If they turn out not to be a "must have" for the landing page, then we can reduce them (or even remove them completely).
- **Heavy JavaScript bundle**: ask yourself, _"What do I lose if I don't include some of the JavaScript libraries? Will the page still be usable?"_ If after some reduction/removal the information you want to convey is still visible, then maybe you don't need them at all. But there are cases where you might still need it, such as a JavaScript library for handling cookies (although arguably, you can inline it in your HTML, like with [Cookie Consent](https://www.cookieconsent.com/)).

What's the moral of the story? It's _"don't add something just because."_ Now, let's get to the second one.

## Forms being hard to use

This one is easier to explain using demos. Let's start from checkboxes.

### Checkboxes

Consider these simplified checkboxes.

<div class="flex flex-col gap-2 base-text-variant-gray max-w-sm demo-wrapper" id="checkbox-demo">
  <div class="flex gap-2">
    <div><input type="checkbox" /></div>
    <p>I agree with the Terms and Conditions.</p>
  </div>

  <label class="flex gap-2">
    <input type="checkbox" />
    <p>I agree with the Terms and Conditions.</p>
  </label>

  <div class="mt-4">
    <button class="base-button-default" onclick="showDifference()">Show me the difference</button>
  </div>
</div>

Try clicking the "Show me the difference" button above. It will show the click area. Why is this a big deal? Because imagine as a user you have to click a very small checkbox. On PCs, you have to move your mouse to click that small box. On tablets/phones, you have to tap _that_ very small box. Not a good UX. You can see this Nielsen Norman Group reference [Checkboxes: Design Guidelines](https://www.nngroup.com/articles/checkboxes-design-guidelines/).

> Don’t force users to click or tap on a too-small box to make their selection. Include a perimeter around the checkbox and make the label clickable to allow for adequate touch-target size (at least 1 cm x 1 cm).

Next up: select dropdowns.

### Select dropdowns

I think it's very rare that it occurs _nowadays_ but as usual, Indonesian government's apps always find a way to baffle me. Consider these simplified dropdowns.

<div class="flex flex-col gap-2 base-text-variant-gray max-w-sm demo-wrapper" id="dropdown-demo">
  <div class="flex justify-between" id="dropdown-trigger-wrapper">
    <div class="relative cursor-default w-full">
      <div id="dropdown-trigger" class="w-[200px] px-2" onclick="onDropdownClick()">Select an option...</div>
      <div class="absolute top-6 left-0 p-2 border border-black dark:border-gray-200 bg-gray-50 dark:bg-gray-800 w-full hidden rounded" id="manual-dropdown-options">
        <div>Value A</div>
        <div>Value B</div>
      </div>
    </div>
    <div>
      <svg class="fill-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" /></svg>
    </div>
  </div>

  <select class="px-2">
    <option value="1" hidden>Select an option...</option>
    <option value="2">Value A</option>
    <option value="3">Value B</option>
  </select>

  <div class="mt-4">
    <button class="base-button-default" onclick="showDifferenceDropdown()">Show me the difference</button>
  </div>
</div>

It's similar to above: don't mislead your users. If a select dropdown border has certain width, **the clickable area should also be equal to that width**. You'd say the same for sidebar dropdown if the menu has to be clicked _exactly_ on the text instead of the "container" that wraps the text. Another reference from Nielsen Norman Group: [Beyond Blue Links: Making Clickable Elements Recognizable](https://www.nngroup.com/articles/clickable-elements/).

> Signaling clickability with cues such as borders, color, size, consistency, placement, and adherence to web standards can give interactive components the proper look. 

Finally, the last one: date pickers!

### Date pickers

Unfortunately no demo for this one, so I'll just provide an image right away.

![Scrollable date picker, where you have to scroll for each date component.](/assets/blog/simple-web-ux-knowledge-2026/scrollable-datepicker.jpg)

This one is the... absurd variation of date pickers from my perspective, because this "interaction" mostly only happens in mobile apps. See, if I have to scroll back many years, I'd just scroll through the years _really fast_. This behavior is _rarely_ precise, which can be annoying. From my perspective, here is my tier list of date pickers:

- **Combo**: combine text input AND date pickers. This allows power users to just type their date/time of choice, while the rest of the users can use the date pickers (preferably a calendar-like).
- **Date picker**: in cases where a combination of text input and date pickers may be confusing, we should just leave the user with just a calendar picker. The **calendar**, I said, because it allows us to be more precise. Select current month? Just pick right away. Select previous/next month? Navigate using the arrows. Select certain month in this year? Click the month. Zoom-out into year ranges? Click the year.
- **Scrollable date picker**: this is probably the lowest tier in my book because of reasons above. Even more so if you have to input time. I recall customer feedback in my previous work that they were a bit frustrated because they had to select date using calendar, but time using scrollable time picker. They would rather just input directly without being "constrained". This is the reason why I rank combo so high above.

Again, you can find another Nielsen Norman Group reference regarding date/time pickers here: [Date-Input Form Fields: UX Design Guidelines](https://www.nngroup.com/articles/date-input/).

> Poorly designed date input leads to distressed or annoyed users — risking the abandonment of the form altogether.

## Navigation links

Consider these two elements (I assure you, they link to the same URL on this site):

<div class="flex flex-col gap-2 base-text-variant-gray max-w-sm demo-wrapper">
  <div>
    <a href="/" class="hover:underline">Navigate</a>
  </div>

  <div>
    <button class="base-button-default" onclick="window.location.href = '/';">Navigate</button>
  </div>
</div>

As a user, which one do you trust more to click? _Ideally_, the first one. Why? Because it's the _right_ HTML semantics and it gives your user **visibility** on where the browser will be taking you. Imagine if I made the `<button>` one to redirect you to a malicious website. You might not realize that is the case until it is too late. That is the first reason.

The second reason is that, "Open in a new tab" is pretty much a mainstream feature now. Why, if it's not a mainstream feature, everyone and their mother would have a harder time having 100 browser tabs open, but I digress. The idea is that, with a normal navigation link, I can simply middle-mouse click, or Ctrl/Cmd + left-mouse click, or right-mouse click + open in a new tab. This is not possible with buttons. With a button, I have to click the button first, and then Ctrl/Cmd + left-mouse click the Back browser button so I can continue my previous state.

You may ask a question: _"Are there cases where buttons can be used for navigation?"_ Yes! But the navigation is the _side effect_. Take a registration or login page, for example. You use a button to register or sign in. If the process is successful, then _ideally_ you will be redirected to the dashboard (for example: using HTTP response 301 or the client-side JavaScript `window.location.replace`).

In some cases, if you really want the link to have a button presentation, you can style the link in a way so that it has a button styling. You shouldn't (although technically, you could) wrap a `<button>` with an `<a>`, because it doesn't adhere to the HTML spec ([MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#technical_summary)).

Finally, as I have been doing in this post, here's another Nielsen Norman Group reference: [Buttons vs. Links: What’s the Difference and Why Does it Matter?](https://www.nngroup.com/videos/buttons-vs-links/).

> Buttons trigger actions, while links navigate between pages, and using them correctly is key for clarity and accessibility.

## Closing words

So, yeah, that's all that I have to share. So, takeaways, like usual:

- Using agentic development doesn't guarantee you UX best practices, especially if you aren't aware of them. "Make no mistakes" can only do so much.
- If certain animations and JavaScript libraries aren't integral to your landing page, consider removing them so it's not making your visitors' machine work overtime.
- Ensure clickable areas are What You See Is What You Get (WYSIWYG). Having a clear indicator of a clickable area is a nice feedback for users, which is partly why I don't agree with the Tailwind v4 decision that buttons shouldn't have a [pointer cursor](https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor).
- Choose date pickers wisely. Use a combo of text input and calendar selection as a default, or restrict it to only calendar if you don't want to deal with the validation. But whatever happens, _avoid_ scrollable date pickers when you are able to, especially if the user may pick a date far from now (e.g. birth date).
- Use anchor links for navigation, so users can open in a new tab. Use a button for actions that may, or may not, produce navigation as a side-effect. Style a link in a way so it looks like a button CTA, if desired.

<script>
  function showDifference() {
    try {
      const element = document.getElementById('checkbox-demo')
      const cn = 'difference-shown'
      if (element.classList.contains(cn)) {
        element.classList.remove(cn)
      } else {
        element.classList.add(cn)
      }
    } catch (err) {
      // No-op.
    }
  }

  function showDifferenceDropdown() {
    try {
      const element = document.getElementById('dropdown-demo')
      const cn = 'difference-shown'
      if (element.classList.contains(cn)) {
        element.classList.remove(cn)
      } else {
        element.classList.add(cn)
      }
    } catch (err) {
      // No-op.
    }
  }

  function onDropdownClick(e) {
    try {
      const element = document.getElementById('manual-dropdown-options');
      const cn = 'hidden';

      if (element.classList.contains(cn)) {
        element.classList.remove(cn);

        // Delay attaching so the click that opened the dropdown
        // doesn't immediately trigger this and close it again.
        setTimeout(() => {
          document.addEventListener('click', onOutsideClick);
        }, 0);
      } else {
        element.classList.add(cn);
        document.removeEventListener('click', onOutsideClick);
      }
    } catch (err) {
      // No-op.
    }
  }

  function onOutsideClick(e) {
    const element = document.getElementById('manual-dropdown-options');
    const trigger = document.getElementById('dropdown-trigger');

    if (!element.contains(e.target) && !trigger.contains(e.target)) {
      element.classList.add('hidden');
      document.removeEventListener('click', onOutsideClick);
    }
  }
</script>

<style>
  .demo-wrapper {
    padding: 16px;
    border: 1px solid var(--color-gray-400);
    border-radius: 4px;
  }

  #checkbox-demo > div:first-of-type > div {
    border: 1px solid transparent;
  }
  #checkbox-demo > label {
    border: 1px solid transparent;
  }
  #checkbox-demo.difference-shown > div:first-of-type > div {
    border: 1px solid red;
  }
  #checkbox-demo.difference-shown > label {
    border: 1px solid red;
  }

  #dropdown-demo #dropdown-trigger-wrapper {
    border: 1px solid var(--color-gray-400);
  }
  #dropdown-demo #dropdown-trigger {
    border: 1px solid transparent;
  }
  #dropdown-demo select {
    border: 1px solid var(--color-gray-400);
  }
  #dropdown-demo.difference-shown #dropdown-trigger {
    border: 1px solid red;
  }
  #dropdown-demo.difference-shown select {
    border: 1px solid red;
  }
</style>
