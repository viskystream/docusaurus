---
route: /introduction/types-of-streaming
pageTitle: Types of streaming
kind: concept
uuid: 442352d9-a37c-4035-8f16-3c864aa32952
---

The first choice you will need to make is how the video is going to get out of your system and onto our platform. Are you using a software package like OBS or Wirecast? Or will the stream be originating on a mobile device or even directly from a browser? The {% company-name /%} platform provides your team with the integration tools required to process the stream and distribute it to your users. {% company-name /%} is your turn-key solution and is accessible to anyone with an internet connection. These primary streaming methods have their trade-offs and can be used to achieve different goals but can be used simultaneously by different users within the same stream network.

There are two primary methods for getting your stream (ingress) to the {% company-name /%} platform. Each of them has pros and cons. Maybe you want to maximize interactivity between the {% definition-hover path="broadcaster" %}broadcaster{% /definition-hover %} and the {% definition-hover path="viewer" %}viewer{% /definition-hover %} by minimizing latency, get the highest resolution possible out of streaming equipment, or minimize cost for a high-volume streaming operation. Determining how streams are sent into the platform by broadcasters is key to achieving these goals and creating a hybrid system where broadcasters are able to utilize the best solution for their needs can be the key to a successful strategy for your system.

## Streaming Software and RTMP

The first option we will talk about is the traditional method of delivering audio and video streams over the internet, [Real-Time Messaging Protocol (RTMP)](https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol). This protocol is the default for most streaming software used in the market today and the one that professional streamers are likely most familiar with. Web browsers do not support RTMP natively, so a broadcaster must download a piece of software that enables RTMP streaming, such as [OBS](https://obsproject.com/). Broadcasters then input an origin URL provided by the streaming platform and a private key provided by the streaming platform operator. The origin URL will determine to which geographical location of servers the stream is sent while the private key is an authorization mechanism to ensure that the broadcaster is allowed to stream.

RTMP streaming is a very reliable way to deliver a high-quality stream from the broadcaster to the streaming platform. When you have a stream that requires high resolution or frame rate like live concerts, RTMP provides the optimal solution. Software like OBS and Wirecast allows broadcasters to mix audio, execute scene transitions, and utilize other professional production capabilities.

One downside to using RTMP to stream is the introduction of latency between the broadcaster and the viewer. The RTMP protocol relies on the confirmed delivery of all information sent from the video encoder. Network congestion or network loss can create a compounding effect on the time it takes for the stream to be ready to view. This can happen on even the most reliable of network connections. As a streamer, you can generally live with the latency unless you want to increase the interactivity and engagement with your audience. See [Benefits of Low Latency](#benefits-of-low-latency-1) for more details. But if you are trying to drive engagement and interactivity, RTMP might not be the right choice.

### RTMP Authorization By Stream Key

The software you use to generate the RTMP stream often does not have a native integration with your streaming platform. This means you have to enter the origin URL and private key so that the stream is authorized on the platform. Your servers are responsible for making calls to the streaming platform to determine available origin URLs as well as managing private keys. A malicious actor who is able to get access to the key can interrupt and hijack a valid broadcaster's stream. Steps should be taken to mitigate this vulnerability by regenerating new private keys each time a user needs to stream and invalidating those keys when the user becomes idle in the operator's system. However, there is no way to altogether remove the vulnerability and these steps can make it cumbersome for the user to stream because they have to update software settings each time they do.

### Streaming from iOS and Android with RTMP

Streaming to your users via iOS and Android can be implemented as part of a custom application you write. The {% company-name /%} platform does not currently have an SDK that supports RTMP.

## Low latency broadcasting over WebRTC

The second {% company-name /%} supports for ingress is [WebRTC](https://en.wikipedia.org/wiki/WebRTC). WebRTC is a combination of protocols used for audio and video streaming designed to minimize the amount of time (latency) between the broadcaster producing a stream and the viewer consuming it. It is built for variable bitrate streaming that can adapt to network conditions and for minimizing the impacts of packet loss on the playback of the resulting media.

The primary reasons to use WebRTC are its capabilities for keeping real-time latencies, adaptability to network conditions, and ease of use for the end user. As opposed to RTMP, WebRTC is implemented natively in most browsers, meaning that users can start a stream directly from a webpage with all context related to that user's authorization status and metadata able to be deeply integrated with both the streaming platform and the streaming platform operator.

Tradeoffs for using WebRTC in the browser include the development complexities of integration and somewhat more limited encoding capabilities artificially imposed by the browser. This means that achieving a consistently 60 frame-per-second, 4k resolution stream is difficult for most users and is only possible on certain browsers. High FPS screen capture of content like video games is also currently severely limited by browser capabilities. Our SDKs provide implementers with easy-to-use APIs to reduce the complexity of building most use cases for WebRTC and some of the browser limitations can be overcome with Javascript-based native applications like Electron.

### Benefits of Low Latency

The streaming market has been striving to reduce latency for a very long time, but the target latency depends primarily on the streaming use case. It can vary between the need to keep the event "live" enough to ensure the context of content shared in "real-time" on social media is kept in sync between participants watching on various platforms to a need for conference-call level conversational interactivity between the broadcaster and the viewer.

Real-time latency streaming, allowing a two-way conversation between participants where delay imposed by the technology is not a perceptible hindrance to the experience is generally below 300 milliseconds, although anything below 1 second is adequate enough to keep most users engaged. In order to achieve this sub-second latency, both the broadcaster and the viewer must be using a real-time streaming protocol such as WebRTC.

### Streaming from iOS and Android with WebRTC

SDKs are available for integrating your application with our platform on both iOS and Android via WebRTC.

- [Streaming from iOS](/docs/basic-operator-integration/native-mobile-applications/livestream-from-an-ios-application)
- [Streaming from Android](/docs/basic-operator-integration/native-mobile-applications/livestream-from-an-android-application)

{% feedback /%}
