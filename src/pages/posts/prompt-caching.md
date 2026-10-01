---
layout: ../../layouts/PostLayout.astro
title: How my idea for a Pi extension got screwed
description: I talk about how I got a great idea but realised it wasn't that great when I learnt about prompt caching
date: 2026-10-01
tags: ['tech']
---
A few days back I made a post about not getting any good ideas on how to use Jev. It has been in the back of my mind ever since, and yesterday I finally had a good problem that could be a use case for Jev.

Or at least that's what I thought.

## The Problem
Ever since I started using Pi, I have been noticing my context a lot.

The fact that on every subsequent chat, all of my previous messages, the assistant messages, and the tool call results are sent again felt really inefficient to me. Like, most of it isn't even related to the current query, so why send all that stuff?

That's when I thought:

What if I could very quickly get a judgement call on whether a particular part of the context is relevant to my current query?

It seemed like a perfect use case for Jev. I thought this would save a good amount of token cost and maybe even improve the quality of the output since the context is much more lean for the LLM to reason about.

So I started to research a bit more about how exactly each request is constructed in the agent, what is sent to the LLM, etc., etc.

## Prompt Caching
And then I came across prompt caching. I heard about the term before, but I didn't understand exactly how it worked.

As it turns out, prompt caching generally relies on prefix matching. Only the longest matching prefix is considered when calculating the cached tokens, which are significantly cheaper than the uncached input tokens.

As an example, let us say 

`abcdefghijk` is cached on the provider server. 

Now I send `abcdefghijkl`

Since the longest prefix is `a-k`, we get those at a discounted price and only have to pay for `l` at the usual price.

## And There Goes My Idea
This fundamentally breaks my idea. What if Jev decides that b is not related to the current query, and I send `acdefghijkl` 

But now the longest prefix is only `a`.

So I have to pay for `c-l` at the usual price, and I only get a single token at a discounted price. So the token cost definitely is not getting solved, at least in this case.

That leaves the output quality, which is quite subjective, and I'm not quite sure if it would be enough given that we might be paying even more using a tool like this due to all the cache misses.

## Sad Life
Well this was sad, but I got to learn quite a few things deeply because of it.
