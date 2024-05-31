---
route: /introduction/types-of-streams
pageTitle: Types of streams
kind: concept
uuid: b5eddcf2-4cfb-46eb-9431-3cfe94b60718
---

Now that you have a new

As a content provider looking for a video solution that wants to control your content, you need a platform like {% company-name /%}. Our streaming platform and SDK deliver an all-in-one player that can ingest your stream and stream it back out to your customers. Along with your {% company-name /%} Engagement Manager, you can configure what formats are available to specified users and how the types of platforms you support. Our player is a manifest containing all the options and makes the appropriate decisions about the format and automatic switching based on the quality of the stream and what the customer's device can support.

## Regional Border Delivery

After being processed into the streaming platform, a [webhook](https://en.wikipedia.org/wiki/Webhook) is sent to the operator with information about the newly online stream. This information contains a URL that viewers can query for a manifest of available stream formats. On manifest request, the streaming platform makes intelligent decisions as to how to load-balance the user's request to minimize resource utilization and provide the best experience for the user by serving content from the closest geographical area to them.

If the stream is not yet available on a border distribution server in that region, the border will replicate the stream to itself and forward the stream to the requesting user if authorized. This distribution mechanism applies to most delivery mechanisms for streams. Regional border delivery for WebRTC is coming soon.

## HLS

Probably the most commonly used method of viewing streams, HLS (HTTP Live Streaming) requires the stream to be encoded in short segments, which are delivered based on a manifest. HLS supports automatic quality switching and the ability to cache streams on a CDN. It is the recommended format if the operator is interested in scaling distribution to thousands of concurrent viewers. As a tradeoff, delivering streams through HLS will result in a higher latency between the broadcaster and the viewer. Normally, this range between 5-10 seconds and even using Low Latency HLS, latency will almost always be over a second.

### Using a Content Delivery Network For HLS

Most CDNs provide a pre-set streaming configuration for HLS. This allows for caching of media file (.ts) segments on the CDN, limiting the amount of traffic hitting the streaming platform. This can significantly decrease bandwidth costs and limit the exposure of the underlying streaming platform to DOS attacks or just unexpectedly popular streams.

The CDN needs to be provided with an "origin" from which to pull the HLS stream when requested. Not to be confused with an RTMP origin, this will be a unique URL that load-balances requests between border servers. Since streams for the CDN are replicated across all borders, if you plan on serving some traffic from a CDN and some traffic directly from borders, we recommend having a dedicated pool of borders for the CDN and a dedicated pool of borders for direct requests.

Strict authorization is still possible when using a CDN. Ensure that your CDN is passing through HTTP requests with .m3u8 extensions to the origin so that authentication continues to use its [regular flow](#)

See:

- Configuring for a CDN

## FLV over HTTP

The {% company-name /%} service also supports [FLV](https://en.wikipedia.org/wiki/Flash_Video) over HTTP. This is not a commonly used protocol, but we do support it. Similar to RTMP, this protocol can allow for fairly low latency streaming but as network instability grows, so does the latency.

## MP4 over WebSocket

This protocol provides video as binary over a WebSocket. It is commonly used as a fallback mechanism when WebRTC is unavailable but the operator wishes to accommodate as low latency as possible. At present, the {% company-name /%} service supports MP4 over WebSocket, but this protocol may be deprecated soon so it is not recommended for new integrations.

## Transrating streams to provide lower resolutions

In order to serve users with bandwidth limitations, sometimes it is necessary to provide lower resolution or lower framerate variants of the stream to accommodate such limitations. As described in [Simulcast/SVC vs Transrated variants](#), this can be done from the broadcaster side or by the streaming platform. All viewing protocols provide the ability to do quality level switching, and most provide an automatic quality switching algorithm that adjusts the quality to the user's network conditions. WebRTC viewers can still be provided transrated variants through simulcast even if the broadcaster is sending a single stream.

Transrated variant quantities and qualities can be configured to accommodate the widest range of users you wish to support.

See:

- [Transcoding configurations](/docs/customizing-a-stream/transcode-configuration)

### Source quality vs transrated variants

When a broadcaster is streaming at a high source quality, it may be tempting to deliver the source quality to all viewers as well and failover those that can not support it to transrated variants. Many modern broadband connections can now easily support the viewer in being able to view a 4mbps source, however, it should be kept in mind that there will always be a temporal difference between source and transrated variants. In other words, when switching between the two, the viewer may experience a "jump" in time to what’s being shown on the stream. This can be mitigated and made less jarring by prompting the user to interact with the player before failover happens.

## Ubiquitous device support vs targeting devices

A decision should be made by the operator on what devices must be supported for viewing streams. Certain codecs, transcoding features, or delivery mechanisms can be turned on or off to find a good balance between the percentage of the device ecosystem capable of viewing a stream and the additional cost of accommodating them.

## Simulcast/SVC vs Transrated variants

The video SDK has two ways of accommodating viewers who are not able to consume the highest quality source because of bandwidth limitations. Lower qualities can be encoded on the broadcaster's machine and sent to the streaming platform using WebRTC simulcast or SVC mechanisms (subject to codec availability). Alternatively, a single high-quality stream can be sent and transrated by the streaming platform into multiple qualities.

Simulcast and SVC are generally more taxing on the broadcaster's computer, which can result in inconsistent quality for the stream. If sending with simulcast or SVC, it is recommended that all viewers are viewing only using WebRTC as well so that transcoding costs are not applied for additional conversion to other formats. Opting to transrate streams into different qualities on the backend may be a more expensive solution but generally provides a more consistent quality to the end user. Transrated stream variants can be delivered through any protocol, including WebRTC.

{% feedback /%}
