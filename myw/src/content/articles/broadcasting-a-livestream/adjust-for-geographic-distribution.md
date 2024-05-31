---
route: /broadcasting-a-livestream/adjust-for-geographic-distribution
pageTitle: Adjust for geographic distribution
kind: guide
uuid: 4f54df89-2d81-408e-a28d-6d840405a499
---

## Ideal setup

### RTMP:
- Broadcast to the nearest origin
- Transcode in the same region as the origin
- View from the nearest border (replicated from transcode)

### WebRTC:
- Broadcast to Selective Forwarding Unit (SFU) which is near most potential viewers
- Consume from source SFU
- Xcode in the same region as SFU

## How to assess the point of presence for origins/SFUs/transcoders

- Determine available resources per region (on-prem + GCP + CDN)
  * Total network bandwidth (public ingress, egress, and internal)
  * Total transcode CPU, total SFU CPU
- Determine the number of broadcasters per region
- Determine the number of viewers per region
- Determine average network bandwidth per broadcast
  * Ingress kbps
  * Replication to transcode (local or remote)
  * Replication to borders (local or remote)
  * Egress kbps (number of viewers x consumed kbps)
- Determine average CPU per broadcast
  * Transcode CPU
  * SFU CPU

Based on the above allocate resources per region taking into account that the system is designed to automatically shift traffic between regions in the event of overflow


{% feedback /%}