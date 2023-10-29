---
title: oas-typescript
description: All about OpenAPI stuff. Generators, enhanced Swagger UI, and more!
publishDate: 2023-10-19T00:00:00.000Z
githubLink: https://github.com/imballinst/oas-typescript
layout: '../../layouts/Project.astro'
---

This repository is basically all about using OpenAPI Specification as the source of truth. At the time of writing, the repository has 3 packages:

1. `@oas-typescript/swagger-ui`: this is to enhance the default capability of Swagger UI docs, so we can have something like "badges" when we're using specification extensions. Mostly useful to display if we need some kind of permissions when we want to fetch an endpoint, without having to scroll or click the Authorization icon button.
2. `@oas-typescript/axios`: this is pretty straightforward, basically just output `axios`-based fetchers from OpenAPI.
3. `@oas-typescript/koa`: this is the most interesting part for me. I learned a lot about generic types and extracting information from them. The end goal is that to have a fully type-safe generated server using OpenAPI as the source of truth. At the time of writing, it's been progressing well.
