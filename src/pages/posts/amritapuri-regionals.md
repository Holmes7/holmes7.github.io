---
layout: ../../layouts/PostLayout.astro
title: My ICPC Amritapuri Regionals Experience
description: In this blog, I'll walk you through the challenges, strategies, and insights gained when I participated in ACM-ICPC regionals, shedding light on the world of algorithmic problem-solving for college students. Join me as I recount our adventure, from the anxious prelude to the epic contest, and explore the valuable lessons learned along the way.
date: 2023-04-04
---

If you're not familiar with ACM-ICPC, it's like the Olympics of coding for college students. It's a competition where students from all over the world come together to tackle challenging algorithmic problems, relying solely on their problem-solving skills and coding abilities. Me and my team, the StaticProgrammers, participated in the online qualifiers held in March and were placed 30th. This made us eligible for the Amritapuri Regionals and this blog is about my experience participating in it.

## Day 0

### The Anxious Prelude

Our tale begins on a night of uncertainty. Anurat, one of our teammates, fell ill with a fever. As dawn approached, anxiety gripped us. Would Anurat recover in time for our journey to the ACM-ICPC qualifiers? Thankfully, the morning brought relief, and our adventure was set in motion.

We left IIT Kharagpur at the crack of dawn, riding in a cab to the airport. Excitement pulsed through us, especially for me, as it was my first time on a plane. Our destination: Bangalore, the battleground for the online qualifiers.

### The Bangalore Campus

Upon arrival, we were greeted by a huge campus and the warm company of a team from Jadavpur University, school friends of Shrayam. The dorm room they provided was spacious, a pleasant surprise compared to our cramped college hostel. The balcony had a breathtaking view of the city, setting the stage for our epic journey.

## Day 1

### Navigating the Maze
Our first challenge: finding breakfast! We roamed from one hostel mess to another, only to discover that the ICPC participants had their own exclusive breakfast venue. After our breakfast, we returned to our room to make final adjustments to our code booklet. 

### The Font Size Fiasco
Once we had the updated version printed, we proceeded to the registration desk. However, our printout faced scrutiny as they found the font size to be too small. Our code booklet followed the [kactl](https://github.com/kth-competitive-programming/kactl) standard, but it contained math formulas in the form of attached images. Uncertain if this met the font size requirements, we had to return to our room to enlarge the font. To ensure compliance, we made the font larger, though we had to remove of some geometry code to fit within the 25-page limit.

### Goodies!!!

After the registration ordeal, they welcomed us with a delightful surprise - a bag, a T-shirt, a water bottle, a writing pad, and a pen. These goodies served as both practical tools and memorable mementos. With our goodies in hand, we fueled up with a satisfying lunch and eagerly anticipated the upcoming inauguration ceremony at 3 PM.

### Testing the Waters

The inauguration ceremony marked the start of our practice contest. Here, we had to acquaint ourselves with our contest system, ensuring that the login worked seamlessly. We opted for Sublime Text as our code-editor and encountered a minor hiccup. The default C++ build in Sublime used C++14, but our contest strategy required C++17 for certain templates. 

Although we eventually figured out the C++17 build system, Sublime stopped displaying compilation errors in the GUI. Here, we made a strategic decision. To ensure a smooth contest experience, we resolved to use C++14 for the actual contest but kept C++17 in our back pocket, ready to deploy if our templates demanded it.

### Banquet Dinner Extravaganza

After the practice contest, it was time to indulge in the banquet dinner. The banquet showcased an array of delectable dishes that left our taste buds dancing with joy. We savored every bite, enjoying not only the food but also the camaraderie that comes with shared meals.

With satisfied appetites and content hearts, we retired for the night, getting the rest we needed to tackle the main event with vigor and determination.

## Day 2: The Epic Contest

The big day dawned, and we arrived at the contest arena with eager anticipation. As the clock struck 9, the contest began.

### Early Game

In a team competition it becomes crucial to read problems in parallel to save time. So we are usually provided with printed problem sheets. But for some reason they didn't provide us with them for the first 10-15 minutes! We juggled screens and problems for a while until we got our hands on the sheets. Soon we solved the three easiest problems, [Final Over](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/final-over), [Mex Median](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/mex-median) and [Longest Strictly Increasing Sequence](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/longest-strictly-increasing-sequence)

Soon, we noticed a flurry of submissions on the easiest problems, and we pounced on them. Anurat faced a penalty but quickly recovered. Shrayam started tackling the [Maximum Bitwise OR](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/maximum-bitwise-or) problem. I got the idea for [Knockout Miracles](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/knockout-miracles) quite fast, but second-guessed myself due to a lack of submissions. After convincing myself that I am correct, I coded it and it passed.

### Mid Game
Hours passed, solutions flowed, and our ranks fluctuated. Anurat cracked [Rectangle Submissions](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/rectangle-intersection), while Shrayam wrestled with [Maximum Bitwise OR](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/maximum-bitwise-or). I turned my attention to "Minimal Increasing Graph" but time was running out, and my brain was fatigued. An update on the problem statement for [No Enemy](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/no-enemy) led to a breakthrough, and Shrayam fixed the bug in his solution. 

### End Game
With just 45 minutes remaining, all three of us switched to a single problem. Solving just one more problem would mean a great jump in ranks at this moment. However, we missed the critical insight that only a maximum of 6 steps are required on [Make it Zero](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/finding-the-best-possible-partners) and ended up with a heuristic solution that fell short.

As the contest ended, we had solved 7 out of 12 problems. It was a rollercoaster of emotions, filled with triumphs and missed opportunities.

## Aftermath

After the contest, during the post-contest discussion, Shrayam realized that he had actually made a crucial observation while attempting the "Maximum Bitwise OR" problem, but had somehow forgotten it during the contest. If he had remembered, he could have solved it. 

The "Minimal Increasing Graph" problem surprised me the most. I was approaching it as a hard data structure problem while it had a divide-and-conquer solution, which didn't even cross my mind.

Interestingly, there was one problem, [Talk That Talk](https://codedrills.io/contests/icpc-amritapuri-2022-regional-round/problems/talk-that-talk), with zero submissions. Even more fascinating is that this problem was created by an LGM (Legendary Grandmaster), [Harris Leung](https://codeforces.com/profile/gamegame), no wonder nobody could solve it.

## Results

We ended up in 14th place, not as high as we'd hoped. We learned valuable lessons about the importance of carefulness and the unique challenges of longer contests.

In the end, this journey was a fantastic learning experience, and we cherished every moment. And as I write this, we've already returned from the Kanpur regionals, finishing 8th, making us eligible for the ICPC Asia-West Finals. 
