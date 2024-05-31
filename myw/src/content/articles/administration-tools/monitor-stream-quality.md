---
route: /administration-tools/monitoring-streams/monitor-stream-quality
pageTitle: Monitor stream quality
kind: guide
uuid: 6bfa3da0-0719-4bef-8c2b-d648c7f2c5e0
---

## Pulse app (cont’d)

Each stream has a set of details that can contribute to the overall visual and audio quality. Video dimensions come in variants and bitrate can of course have a major impact on what values are available for the source, along with the end user (viewer).  Another way is to look at the Transcode console (found in Stream Console), where a stream's different video dimensions can be sampled. Each will have a small play button, similar to the image below.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CHa1a12736-7b28-4a65-a440-b04d8539d2b4" alt="monitor stream quality 1" /%}

## Quality by comparison

The simplest method of getting a feel for different levels of quality is to compare streams. In Pulse, try navigating into a Host, and clicking into a Public Key to bring up stats on a certain stream. This information is worth noting when you see details like: 

**Avg. Video Kbps**

**Height (pixel)**

**GOP (group of pictures)**


{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH62b3b195-fc46-47c0-ba0e-aaba5dacfe2a" alt="monitor stream quality 2" /%}

Now using the current stream you have selected and going back to the Host server and selecting a different Public Key will lend itself to identifying the quality status and potential on your network.

Quality can also relate to stability, in that watching info such as **Kbps** for a stream, you can see further down on your Pulse page that a graph can give you helpful insight. In the example image below, you can see there is a fluctuation in the rate as it increases and drops, yet still living within the same range of the chart. The higher numbers and straighter lines are ideal here. However, some data you may want to be without higher values, as in what is represented in the graph **Num Duplicate Frames**.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CHe43fce3a-dbdf-4813-82d0-0f67df7a1e5c" alt="monitor stream quality 3" /%}


{% feedback /%}