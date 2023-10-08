---
layout: ../../layouts/PostLayout.astro
title: "Demystifying Unix Pipes"
date: 2023-09-23
description: A few days ago, I wanted to preview a massive 1.1 GB file stored on an S3 bucket. Downloading it would take a lot of time so I asked my senior for help, and he told me to run the usual aws copy file command with the unix tool head. I received the results within seconds, but the underlying process was not intuitive to me. Trying to uncover this magic ...
---

A few days ago, I wanted to preview a massive 1.1 GB file stored on an S3 bucket. Downloading it would take a lot of time so I asked my senior for help, and he told me to run the usual aws copy file command with the unix tool head. I got the results in mere seconds but what exactly happened at the lower level wasn't intuitive to me. Trying to uncover this magic, my research led me to a variety of topics and this blog aims to explore those discoveries.

## What's the magic?

Let's start by dissecting the command that seemed to perform the impossible:
```bash
aws s3 cp <gizzped-file-location-on-s3-bucket> - | gunzip | head

```

It's quite intuitive to understand what the output will be here-the first five lines of the unzipped file. But how is it all actually processed? Clearly the entire file isn't downloaded as the command executed in seconds. But how does the aws command know to copy only the first five lines? Is the head command communicating something special to it?

## Unix philosophy

Just then I recalled reading about the Unix philisophy.

> Expect the output of every program to become the input to another, as yet
unknown, program.

Doesn't this mean that `aws` has no idea about `head`, since both of them are different, individual programs. So that only leaves the `|` (Pipe) operator which could be responsible for the communication. So I tried to understand it's internals.

## Understanding Unix Pipes

Starting from stackoverflow, I ended up at the [Pipe(7) — Linux manual page](https://man7.org/linux/man-pages/man7/pipe.7.html). There I found this statement

> So basically a unix pipe has a read end and a write end. Data written on the write end can be read from the read end. 

In our example, `aws s3 cp` writes the gzipped content to the write end of the first pipe and it is read by `gunzip` through the pipe's read end. Similarly `gunzip` writes the unzipped content to the second pipe and `head` reads from it.

At this point, I thought that initially aws copies all content from remote file to pipe 1. Then gunzip unzips all of it and writes to pipe 2. Then head only outputs the first 5 lines. But if this is the case, it still demands downloading the entire remote file, which is impossible to finish in a few seconds.

## Pipe capacity

Scrolling down the docs I found out that a pipe has limited capacity. That means the entire file can't even fit into the pipe at once. And this is where the magic happens. 

> If a process attempts to read from an empty pipe, then read will block until data is available.  If a process attempts to write to a full pipe then write blocks until sufficient data has been read from the pipe to allow the write to complete.

So in our example, file is downloaded only until the pipe is full. If the pipe is full, downloading is blocked temporarily until there's free capacity in the pipe again. 

## The Broken Pipe error

But we still haven't understood how the entire command stops once `head` has written sufficient data to *stdout*. I recalled there was this error at the bottom of the output.

```bash
[Errno 32] Broken pipe
```

Going a bit deeper, I ended up at the [GNU error codes](https://www.gnu.org/software/libc/manual/html_mono/libc.html#Error-Codes) and found this

> “Broken pipe.” There is no process reading from the other end of a pipe. Every library function that returns this error code also generates a SIGPIPE signal; this signal terminates the program if not handled or blocked. Thus, your program will never actually see EPIPE unless it has handled or blocked SIGPIPE. 

So we see the error as head is not reading from the other end of the pipe. But what role does SIGPIPE play?

## The Linux SIGPIPE signal

So when head reads whatever it needs, it terminates and automatically closes the read end of pipe 2. This causes a SIGPIPE signal to be sent by the kernel to `gunzip`. When it recieves the signal, it is forced to react. It can either ignore, terminate (default action) or execute a *signal handler* defined by user which is simply a piece of code to handle the signal. 

In this scenario, the `EPIPE` error occurs, indicating that the signal was ignored. This leads to an attempt to write to a closed pipe, ultimately resulting in the termination of the process.

## Conclusion

In conclusion, the magic lies in the seamless coordination between Unix pipes, limited pipe capacity, and the SIGPIPE signal. The head command doesn't know, and it doesn't even care about the other commands. It simply reads what it needs and terminates, leaving the operating system to handle the rest.

## References

1. M. D. McIlroy, E. N. Pinson, and B. A. Tague: “[UNIX Time-Sharing System:
Foreword](https://archive.org/details/bstj57-6-1899/page/n3/mode/1up)”
2. [Pipe(7) — Linux manual page](https://man7.org/linux/man-pages/man7/pipe.7.html)
3. [GNU error codes](https://www.gnu.org/software/libc/manual/html_mono/libc.html#Error-Codes)