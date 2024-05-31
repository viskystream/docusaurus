---
route: /broadcasting-a-livestream/geographic-distribution
pageTitle: Geographic distribution
kind: concept
uuid: dda87659-cd70-4d7a-92df-0849a3ffa173
---

To account for a wide geographic audience, the platform allows scaling video systems across data centers in different geographic regions. As with the need to evaluate what system components are best suited for the particular use case for video streaming and delivery, identifying where various system components should be located is a critical decision in delivering the highest quality service for the lowest cost.

For broadcasting with WebRTC, streams can be automatically load-balanced to the SFU in the closest region which houses that system component. If the stream delivery is also WebRTC, in general, even if the viewer is in a geographic region farther away, collocation and delivery from the same data center are preferable. On the other hand, if the stream is being delivered with HLS or any other TCP-based protocol, border servers should be set up in a region closest to the stream's consumers to reduce request latency and prevent choppiness or buffering.

Transcode servers should generally be in the same data center as the ingress system whether that be a WebRTC SFU (Selective Forwarding Unit) or RTMP origin to prevent additional network cost of relaying the stream to a different data center. For larger, geographically distributed audiences, the distribution of streams is automatically done by replicating to the border server region closest to the viewer.

We work with multiple cloud partners to provide a large, cost-effective global network. Please reach out to your engagement manager for an up-to-date list of available regions and associated costs.

## WebRTC broadcasting:
- Client first calls global LB which proxy the request to local LB based on client IP and resources availability
- Local LB selects an SFU based on availability from the local cluster
- Client then communicates directly with the selected SFU

## WebRTC viewing:
- Client requests a manifest per stream from LGBX manifest service
- Manifest service includes a link to the SFU which receives the stream
- Client then communicates with that SFU directly

## RTMP broadcasting:
- Clients use DNS lookup which balances the load in RR way over available hosts
- Global load balancing is done differently per system and it isn’t controlled by the video pipeline

## HLS viewing from borders:
- All available border hosts periodically update LGBX about their availability, spare capacity, and active replicated streams. This information is stored in global Redis
- Client first requests a manifest from LGBX manifest service per stream
- Manifest service based on the client location (using IP), available borders (location and capacity) and current active replica select a border to serve the stream
- Clients connect directly to the select border to consume the stream. If the stream isn’t already replicated to that border, the border will automatically replicate the stream from the transcode machine

## HLS viewing from CDN:
- Client first requests a manifest from LGBX manifest service per stream
- Manifest will select a CDN link (multiple different CDNs can be configured with different weights)
- Client request the stream from the CDN
- CDN forward the request to the origin URL which is a load-balanced endpoint
- The LB will forward the request to any border host in the local cluster
- The border will either return the segment from the cache or pull the segment from the source transcode

## Select transcode:
- All transcode hosts periodically update LGBX about their availability and the list of active jobs they process
- When LGBX determines that a stream isn’t currently being processed by a transcode it first selects a cluster based on broadcaster geo-location and Lb parameters such as designated percent load. It then sends a relay request to one of the transcode in the target cluster via local LB. The local LB either use plain RR or takes into account load factor such as CPU load per host (depending on the environment)
- The transcode host which receives the relay request first determines if it has sufficient capacity to process a new job and if it does it will replicate the stream from the source and start processing it. Otherwise, the transcode will return 429 and LGBX will retry the request and potentially after several retries will try a different cluster

## What are the benefits of geographic distribution?

- Reduce packet loss, retransmissions, and disconnects. This proved to be particularly important for TCP-based streams. Packet loss is the main factor for longer latency and poor stream quality
- Redundancy - in the event of a failure in one region there is always a fallback. In many events, a network outage may impact one ISP but not others therefore shifting between regions and ISP may mitigate outages. Furthermore, it allows greater flexibility in complex deployments that require a long draining period.  

## What are the things to watch out for?

- Excessive network traffic between clusters. For example, having streams replicated to many regions (transcode → borders) for no reason.
- Imbalance load and lack of capacity. For example, if the cluster in Europe doesn’t have sufficient capacity then too many streams will be routed to Seattle. The same hold for excessive underutilized capacity
- Temporary settings that are put in place during an outage or maintenance which are kept for long periods of time

{% feedback /%}