---
title: text-to-playwright
description: Poor man's Playwright MCP, basically. It parses syntactically rather than semantically like Gen AIs.
publishDate: 2025-06-08T00:00:00.000Z
githubLink: https://github.com/imballinst/text-to-playwright
layout: '../../layouts/Project.astro'
---

This repository contains the experiment to parse English text using [compromise](https://github.com/spencermountain/compromise/) and make it to run Playwright. It's pretty similar to Playwright MCP, unless it's not as smart.

That said, the benefit of the package is that it can run locally and of course, free. It doesn't depend on any subscription at the cost of being less smart than the Gen AIs.

```yaml
tests:
  - name: Example test case
    steps:
      # Create, cancel.
      - Click "Create template" button on the "Existing templates" section.
      - Click "Cancel" button on the "Create template" section.
      - Ensure "Create template" heading to not exist.
      # Create.
      - Click "Create template" button on the "Existing templates" section.
      - Click "Create template" button on the "Create template" section.
      - Ensure "Notifications" element to contain text "Successfully created template.".
      # Update, cancel.
      - Click "Edit Greetings template" button on the "Existing templates" section.
      - Click "Cancel" button on the "Greetings template" section.
      - Ensure "Greetings template" heading to not exist.
      # Update.
      - Click "Edit Greetings template" button on the "Existing templates" section.
      - Fill "Template name" input with value "".
      - Click "Update template" button on the "Greetings template" section.
      - Ensure "Template name" input to have error message "Template name is required".
      - Fill "Template name" input with value "Hello world".
      - Click "Update template" button on the "Greetings template" section.
      - Ensure "Notifications" element to contain text "Successfully updated template.".
      # Test, cancel.
      - Click "Test Hello world" button on the "Existing templates" section.
      - Click "Cancel" button on the "Test template" section.
      - Ensure "Hello world template" heading to not exist.
      # Test.
      - Click "Test Hello world" button on the "Existing templates" section.
      - Ensure "Template value" input to have value "Hello {{name}}".
      - 'Fill "JSON string" input with value "{ "name": "hehe" }".'
      - Click "Test" button on the "Test template" section.
      - Ensure "Result" section to have text "Hello hehe".
```
