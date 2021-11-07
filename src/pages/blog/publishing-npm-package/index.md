---
templateKey: blog-post
title: A Guide to Publishing Your Library to NPM Registry
date: 2021-11-07T01:06:48.075Z
featuredpost: false
featuredimage: images/npm-package.jpg
visibility: public
description: This post covers a step-by-step guide to publish a library to NPM registry, as well as things to consider before doing so.
tags:
  - software engineering
  - javascript
---

![<span>A cardboard with the NPM logo. Since my photo editing skill is so "good", you should be able to notice the flaws.</span>](images/npm-package.jpg)

Hey! So, you want to publish your library to NPM registry? Nice! Publishing a library to a public registry has a lot of positives and probably 0 negatives, as long as your library doesn't contain malicious code. The positives are as the following (this list is not exhaustive):

- You can use your library in your projects without having to copy-paste them locally
- You build your brand (if it's a public library), because it will be linked to your public Git repository
- You can practice doing [semantic versioning](https://semver.org/) (if you plan to maintain it)

You probably don't have to worry having to maintain it, because you don't have an obligation to maintain. It's like what they said about side projects, a lot of them are in unfinished state and that's okay.

# Requirements

Here is the list of things that we need before we can do so:

1. Node.js® (this typically comes along with `npm`, so we don't have to worry about installing `npm` separately).
2. Git (can be CLI or UI).
3. A text editor of your choice (e.g. Visual Studio Code).
4. A remote Git repository (e.g. GitHub).
5. **[Optional]** Yarn, if you prefer to use `yarn` instead of `npm` for managing the library and its dependencies.

# Steps to publish

The following sections will contain the steps to publish your library. Let's get started!

## Log in to NPM

First, if you haven't registered yet, you need to do so at https://www.npmjs.com/signup. After that, it is recommended that you also set up two-factor authentication (2FA) in your account. You can do so by clicking your profile picture on the top-right, then click on "Account". You will be redirected to your account page and you will see "Two Factor Authentication" section on the right column, just below the "Email & Password" section.

After finishing all that, you can log in in your CLI by doing `npm login`:

```bash
$ npm login
Username: your-username
Password: 
Email: (this IS public) your-username@gmail.com
Enter one-time password from your authenticator app: 123456
Logged in as your-username on https://registry.npmjs.org/.
```

Use the details that you used when registering: username, password, and email. If you have also set up 2FA in the previous step, then you will need to also input it. If all of these details are correct, then you will be logged in to NPM in your CLI.

## Create the library

To publish a "library" in the NPM registry, we must first define, _"What is a library?"_ A library is as simple as an `index.js` and a `package.json`, which contains at least `name`, `version`, and `main` fields in it.

## Add a LICENSE

## Publish to NPM registry

# Things that you may want to look out for

## Semantic versioning

## Release notes

## Add `.npmignore`

## Do `npm publish --dry-run`

## Do `npm link`



- [ ] You'll need a NPM creds, log in or create one
- [ ] `npm init` or `yarn init`, probably doesn't matter. As long as there is `package.json` (and optionally lockfile if you use deps)
- [ ] Create `index.js`
- [ ] In the index file, set `main`
- [ ] Set LICENSE
- [ ] Set version with `npm version x.x.x` (this will also create a new tag), then `npm publish`
- [ ] Push to your Git repository the code and also `git push <remote> --tags` to push the tag
- [ ] Optionally, create a release note from the pushed tag

Things to look out for:

- [ ] Check `.npmignore` to reduce unpacked library size
- [ ] Do `npm publish --dry-run` to see which files and folders are uploaded to the registry. Not all files and folders need to be uploaded
- [ ] Do `npm link` or `yarn link` to test the package locally
