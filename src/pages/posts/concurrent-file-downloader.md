---
layout: ../../layouts/PostLayout.astro
title: How Free Download Manager Achieves Lightning-Fast Speeds
date: 2023-09-05
published: false
description: abc
---
So I have been using [Free Download Manager](https://www.freedownloadmanager.org/) for quite a while. I always got amazed at how it gave me 5-10x the speed of a normal download using the browser. I knew it used concurrency but had no idea how it's actually working under the hood. So I decided to build one for myself to understand it and documented the journey in this blog. If the problem seems interesting to you, read along.

## A Basic Download

I first tried to write a function that simply downloads the file without any concurrency. For simplicity I haven't included error handling and resource cleanup

```go
func normalDownload(url string, filename string) {
	resp, _ := http.Get(url)
	file, _ := os.Create(filename)
	_, _ = io.Copy(file, resp.Body)
}
```
Quite simple, right? We first send a get request to the server and then start to copy the remote file into our local file. The `io.Copy` is a high level function of Go. It reads data from `resp.Body` and writes it to `file` until it reaches `EOF`.

I chose a random 100 MB pdf from the internet and this completed the download in **35.23s**. 

## Bottleneck

