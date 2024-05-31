---
route: /introduction/types-of-streams/choosing-a-stream-type
pageTitle: Choosing a stream type
kind: concept
uuid: 94a5642c-1e2b-4953-b592-a0ef701a88f6
---

In the previous section, we walked you through the differences in the egress method for your content - HLS and WebRTC Streaming.  This page acts as a high-level summary of the pros and cons of the two methods of ingress supported by {% company-name /%}. Please make sure you read the [previous article ](/docs/introduction/types-of-streams)for more detailed information.


## HLS Streaming:

### Pros:

- Video segments can be cached, providing the ability to scale to large audiences at low cost

### Cons:

- Even with small segment sizes, latency is not truly real-time, exceeding one second between broadcaster and viewer, often closer to between four and ten seconds.

## WebRTC Streaming:

### Pros:

- Can achieve and maintain real-time latency.
- Recovers faster after periods of network instability and can withstand a higher percentage of packet loss.

### Cons:

- Cost per stream is slightly higher than HLS. Scale is limited to a smaller audience.

{% feedback /%}
