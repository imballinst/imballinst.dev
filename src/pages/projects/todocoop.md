---
title: todocoop
description: todocoop is a collaborative to-do list app that requires no login.
publishDate: 2021-08-1T05:27:00.000Z
githubLink: https://github.com/imballinst/todocoop
setup: import Layout from '../../layouts/Project.astro'
---

One of the issues that I saw from most collaborative to-do list applications was they require accounts. Although accounts are good for preserving history and all that, I think they are nuisance when I just want to create a short term to-do lists. With that, I initiated `todocoop`.

The use cases of `todocoop` (at the time of writing) are as the following:

1. **Creating a room**: users can create "rooms" right ahead. The term is "room" instead of "to-do list" because "room" is more appropriate when it comes to collaboration (from my perspective). Anyone who has access to a room will be able to modify the to-do list. A single session can only access one room at a time.
2. **Joining a room**: users can join rooms that other users have created, provided the correct room credentials.
3. **Leaving a room**: of course, it's not proper to let users in but not letting them to leave.

Other features inside the room includes getting the room information (room name nad password) and copying the current to-do list as Markdown. Using it, you can share and/or save the list to other medias.

Since this web application is meant to be for "temporary" to-do lists, rooms that don't have any kind of to-do list modifying activity for more than 1 day will be deleted.
