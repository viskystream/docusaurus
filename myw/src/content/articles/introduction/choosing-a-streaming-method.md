---
route: /introduction/types-of-streaming/choosing-a-streaming-method
pageTitle: Choosing a streaming method
kind: concept
uuid: 22f4d909-295b-40b3-80b3-12f39a51e438
---

We walked you through the differences between RTMP Streaming and WebRTC streaming in the previous section.  This page acts as a high-level summary of the pros and cons of the two methods of ingress supported by {% company-name /%}. Please make sure you read the [previous article](/docs/introduction/types-of-streaming) for more detailed information.

## RTMP Streaming:

### Pros:

- Supports consistent quality streaming for high specification streams (greater than 1080p resolution, higher than 30fps)
- Existing streaming software uses this protocol by default
- Latency can be mitigated with [Secure Reliable Transport (SRT)](https://en.wikipedia.org/wiki/Secure_Reliable_Transport).

### Cons:

- Latency grows when network issues are present
- Requires management of private keys

## WebRTC Streaming:

### Pros:

- Can achieve and maintain real-time latency
- Recovers faster after periods of network instability
- Integrates directly into a webpage

### Cons:

- Cost per stream is slightly higher than RTMP.

{% feedback /%}
