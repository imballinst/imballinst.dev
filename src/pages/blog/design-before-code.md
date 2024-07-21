---
title: Design Before Code
description: Designing the process process is as important as implementing the UI design itself.
publishDate: 2024-07-21T08:38:36.747Z
image: /assets/blog/design-before-code/design-before-code.png
imageAlt: An image containing the text, "Design Before Code".
imageCaption: An image containing the text, "Design Before Code".
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello, hope you are doing well! In this post, we are going to discuss a little bit about design before code. No, we are not going to talk about UI/UX design, we are going to talk about the process before implementation. This post might be related to the other post that I wrote before, ["API from Frontend Perspective" post](https://imballinst.dev/blog/api-frontend-perspective).

## The basics of "computer system"

Software engineers _technically_ implement a computing mechanism every time they write code. According to [this module from the University of Iowa](https://www.continuetolearn.uiowa.edu/nas1/07c187/Module%204/module_4_p2.html):

> Each system first must have a means to input information. This information is then processed. From the processed information, the computer produces some type of output. Input or output devices can be modified to provide access to individuals with disabilities who cannot use standard input or output devices.

That's problem-solving, right? We have a problem (input) and we need a solution (output). The gap between the input and output is "process", in this case, the software or pieces of code that we write daily.

## Designing the process

Now, with that in mind that "process" is the bridge between "input" and "output", what do we do? That depends. If the process is simple enough, maybe we can just start coding right away. However, if the process is not that straightforward, I recommend writing in human language first. For example, consider this scenario:

- **Input (problem):** the user cannot log in because there is no interface to do it.
- **Output (solution):** a login page.

It is clear what we should do: implement a login page. Now, here comes the process definition.

1. What fields are required for the login process? Username/password, username only, email/password, email only, or is there anything else?
2. What kind of authentication scheme will be used? Will it be using OAuth2 (with token exchange), or will it be just basic authentication (with credentials)?
3. What will the login page look like?
4. How will the HTML structure look like?
5. What logic needs to be attached? Do we need validations on the form?

From the questions above, we will have a clearer process (which we usually call "technical specifications").

1. The login page will be using email/password fields.
2. The login page will be using a Basic auth, utilizing the `POST /iam/authenticate` endpoint.
3. The login page is rather simple, just a simple email field, password field (with password mask toggle), and a "Log in" button.
4. The JSX structure will look like the snippet below (assuming we are using React).
5. For the initial iteration, there are no validations. When the "Log in" button is pressed, it will do a POST form action to the backend endpoint and later will redirect us to the landing page (if the authentication is successful). If not, it will redirect back to the login page with error URL parameters.

```jsx
<form className="flex flex-col gap-y-2" method="post" action="/iam/authenticate">
  <div className="flex flex-col">
    <label htmlFor="email">Email</label>

    <input id="email" type="email" placeholder="hello@example.com" />
  <div>

  <div className="flex flex-col">
    <label htmlFor="password">Password</label>

    <InputPassword id="password" />
  <div>

  <button>Log in</button>
</form>
```

The above is the case if we want to use a rather "written" design process. Alternatively, we can also use a visual design process. Instead of writing an HTML structure, we can do a bit of wireframe. It doesn't have to be fancy, we just need some boxes and texts to represent what we want to build. The example is as follows.

![Example login page wireframe](/assets/blog/design-before-code/wireframe-example.png)

Based on the wireframe above, we could imagine what the HTML structure would look like, including the "gaps" between the form fields. Using the same approach, we can also do the same when we want to implement more complex solutions. Start with writing or drawing and you'd be surprised how many things you can identify early compared to if you brute force by coding implementation right away.

## Closing words

That's all I have for now, hopefully it's useful. Let me know what you think and I'll see you on the next one!
