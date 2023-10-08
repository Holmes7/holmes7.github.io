---
layout: ../../layouts/PostLayout.astro
title: Saving 2 Minutes of My Life with GitHub Actions
date: 2023-02-12
description: In this blog, I'll share my first-hand experience with GitHub Actions, illustrating how it streamlined my development workflow. I'll walk you through its core concepts, integration into project structures, and how it solved a critical problem for me personally.
---

## The Problem

So my previous project, the [Random Mashup Generator](https://randommashupgenerator.netlify.app/) was built using React and TypeScript. The challenge? Browsers understand HTML/CSS/JS, but not React components. So, I had to locally build the project and then manually deploy the resulting build folder to Netlify. This workflow was manageable for occasional projects but became a significant hassle when working on my personal website.

Unlike the Mashup Generator, my personal website relies on a static site generator, which requires a build step to transform templates and markdown into HTML/CSS. What sets it apart is that I frequently make tweaks and adjustments. The thought of repeatedly building the project locally, navigating to Netlify, and manually uploading it didn't sit well with me. This is when I began exploring GitHub Actions as a potential solution.

## What Are GitHub Actions?

Think of GitHub Actions as a simple server provided by GitHub, aptly called a "runner." However, instead of interacting with it directly, you define instructions in the form of YAML files. These instructions execute when specific events occur within your repository, such as pushing a commit to the main branch or creating a pull request.

These YAML files are called "workflows" and are placed in the `.github/workflows` directory. Here's what the directory structure of my repository looks like:

```bash
root/
|-- .github/
|   |-- workflows/
|   |   |-- host.yml
```

## When Does the Workflow Run?

I wanted GitHub to automatically build and deploy my website every time I pushed a commit to the main branch. This is defined by specifying the event in the `on` section of the workflow YAML file:

```yaml
on:
  push:
    branches:
      - main
```

## What Does the Workflow Do?

Similar to the steps we take on our local computers, GitHub Actions workflows consist of specific instructions called "steps." Each step can be a shell script or a pre-made action, and they run in sequence, one after the other, with dependencies between them.

## Checking Out the Repository

First, just like on our local machines, we need to navigate to the project directory. GitHub provides a pre-made action called [actions/checkout@v3](https://github.com/actions/checkout) that grants the workflow access to the repository. Here's how I set it up:

```yaml
jobs:
  host:
    runs-on: ubuntu-20.04

    steps:
      - uses: actions/checkout@v3
```

## Setting Up Node

Next, I specify that I want to use Node.js, and there's another handy action, [actions/setup-node@v3](https://github.com/actions/setup-node), to accomplish this. I placed this step after the checkout step:

```yaml
steps:
  - name: Use Node.js 19
    uses: actions/setup-node@v3
    with:
      node-version: 19
```

With Node.js ready, I move on to installing the project's dependencies, which I do with a simple shell script:

```yaml
steps:
  - name: Install dependencies
    run: npm ci
```

I use `npm ci` instead of `npm install` for a clean, automated environment-friendly installation of dependencies. It's worth noting that I encountered an error at this stage because I had ignored the `package-lock.json` file, which is required for this command.

## Building and Deploying
Similarly, I execute another shell command to build the project. I've configured an npm script to direct the build output (HTML/CSS/JS files) to the `_site` folder:

```yaml
steps:
  - name: Build Eleventy
    run: npm run build
```

Finally, I host my website on GitHub Pages and want it to access the `_site` folder. To accomplish this, I use another GitHub Actions action, [peaceiris/actions-gh-pages@v3](https://github.com/peaceiris/actions-gh-pages/). This action creates a new branch named `gh-pages` in the repository and deploys the `_site` folder there:

```yaml
steps:
  - name: Deploy
    uses: peaceiris/actions-gh-pages@v3
    with:
      publish_dir: ./_site
      github_token: ${{ secrets.GITHUB_TOKEN }}
```

That's it! This was my introduction to continuous delivery, which, in essence, is streamlining the entire process. I hope this post has given you a basic understanding of GitHub Actions and how it can simplify your development and deployment workflows.

## Complete Workflow File

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  host:
    runs-on: ubuntu-20.04

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js 19
        uses: actions/setup-node@v3
        with:
          node-version: 19

      - name: Install dependencies
        run: npm ci

      - name: Build Eleventy
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: ./_site
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)