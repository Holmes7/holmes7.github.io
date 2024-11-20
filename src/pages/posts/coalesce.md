---
layout: ../../layouts/PostLayout.astro
title: Analyzing a 30x Slowdown in My Spark Program Due to Coalesce
description: This blog post explores the unexpected performance impact of using coalesce(1) in Apache Spark in distributed computing. I discovered that while coalesce avoids costly shuffling, it unintentionally sacrifices parallelism in some cases, leading to a significant slowdown in runtime performance.
date: 2023-11-15
tags: ['tech']
---

Recently, I encountered a puzzling issue while working on a task involving pre-written Spark code. Although the code had proven itself in previous iterations, its runtime performance on my dataset was surprisingly slow. I went on to check how much data was already written and to my surprise there was a single file, no partitions, of 8.5GB size. I immediately decided to stop the program and started to investigate.

## The Culprit: coalesce(1)

Upon closer inspection, the source of the sluggish performance surfaced in an unexpected place - a seemingly innocent line at the end of the code: `coalesce(1)`. To my surprise, this apparently harmless operation turned out to be the culprit behind the slowdown.

To quench my curiosity, I decided to experiment by removing the coalesce(1) and rerunning the code. The result was a significant boost in speed and the output also had multiple partitions.

## Comparing Strategies

Intrigued by this revelation, I decided to explore further by experimenting with `repartition(1)`. To my surprise, it too ran swiftly, prompting me to delve into the differences between repartition and coalesce.

### Understanding Repartition

When repartitioning, each partition is sent to an executor chosen using different algorithms. Here, I have shown [round robin paritioning](https://www.quora.com/What-is-round-robin-partitioning). So 1st part goes to executor 1, 2nd to executor 2, 3 to 3, and circling back, 4th to executor 1 and so on. 

![Repartition](https://user-images.githubusercontent.com/52966140/282919513-1e963eb3-bafc-4c3d-8d0b-b14e5df50a28.jpg)

### Understanding Coalesce

Unlike repartition, which shuffles data across the network, coalesce tries to merge partitions locally on the same executor. This strategy avoids the need for a full shuffle, which we know is quite an expensive operation since it requires redistributing partitions over the network. 

![Coalesce](https://user-images.githubusercontent.com/52966140/282919565-3e696c74-5df0-4916-9a9d-ade0632ab4d7.jpg)

So then why is coalesce running slower when it is actually avoiding a shuffle?

## The Unintended Consequence: Sacrificing Parallelism

Analyzing the Spark history server shed light on the situation. The coalesce operation, designed to sidestep shuffling, had condensed the workload onto a single executor. Surprisingly, there was only one task running in the coalesce program, in stark contrast to the repartition variant, which had spawned 36 tasks.

Tasks in Spark perform computations on individual partitions, executing on a single executor. Which means if we have 1 big partition, then we will have 1 task executing on single executor. If we have 1000 partitions, then 1000 tasks that can be executed in parallelI on multiple machines. 

In the case of coalesce, the attempt to avoid shuffling accidently killed parallel processing. The entire workload was burdened onto a single executor, sacrificing the vital parallelism for efficient distributed computing.

## Conclusion

The advice to use `coalesce` over `repartition` might work most of the times, but it doesn't work every time. Depending on the kind of workload, the tradeoffs must be considered to choose the best option.

## References

[spark-repartition-vs-coalesce](https://stackoverflow.com/questions/31610971/spark-repartition-vs-coalesce)
