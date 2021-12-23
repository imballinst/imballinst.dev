---
title: chrome-ext-slack-linkedin-users-download
description: chrome-ext-slack-linkedin-users-download is a Chrome browser extensions to download Slack workspace users and LinkedIn connections.
publishDate: 2020-12-17T10:49:00.000Z
githubLink: https://github.com/imballinst/chrome-ext-slack-linkedin-users-download
setup: import Layout from '../../layouts/Project.astro'
---

`chrome-ext-slack-linkedin-users-download` is a tool that I built for an ex-colleague in my past job. Initially, the extension was only created to scrape the users of a Slack workspace. However, it later was expanded to also scrape LinkedIn connections when a profile is visited.

To use the extension, firstly download the ZIP file of the `main` branch. After that, extract the ZIP file to a folder. Then, enable "Developer mode" in the chrome://extensions (which contains list of your installed extensions). Finally, click "Load unpacked" and select the extracted folder.

To scrape the list of users in a Slack workspace, go to a particular channel. The extension will then download all users in that channel.

The same goes for connections in LinkedIn, go to a profile (that you are conneted with), then the extension will download all of the _exposed_ connections. It will take a while, around ~6 minutes to download full 990~ish connections.

The _exposed_ connections are the connections visible to public—the ones that you see when you click on the "N connections+" link in their profile. This number, at the time of writing, limited to not more than 1000. As such, although your connection has 8000 connections or more, for example, you will only be able to scrape 1000 connections or less using the extension.

This extension works by "hijacking" the cookie that the browser uses to request data for the page. It will use the cookie to then scrape the relevant endpoints.
