---
route: /archiving-a-stream
linkTitle: Archiving a Stream
pageTitle: Overview
kind: concept
uuid: cefb79ef-9e64-4ed4-bee5-36e732331f7d
---

Video streaming can take the form of both live and recorded content. In addition to live streaming, Native Frame also supports Video on demand (VOD), which is pre-recorded content that viewers can access from an online video archive.

There are numerous benefits with VOD. For many brands, VOD creates a unique revenue stream for on-demand playback. Not only can you monetize content in its live format, but you can also make the recording available at a later time with an ad-supported, pay-per-view, or subscription model. You can also repurpose and combine the stream with other content like tutorials, promotions, and social media. And with VOD, you always have a record of the event, so whether it’s an online lecture or a company all-hands, the event can be shared for those who have schedule conflicts or replayed for those who want to review material.

Live stream archives which can be used for VOD or archival purposes. All archives are controlled by sets of rules that define when the archives are captured, for how long, in which format, at which quality, etc. 

Example archiver rule:
```js
archiverRules: {
	compliance: { // archiver rule name
		recordMode: 'always',
		type: 'all',
		driver: 'flvfile',
		maxDurSec: -1,
		backfill: 3, 
		warmup: 15,
		fileTemplate: 'id_{{{StreamId}}}_{{{ArchiveFileStartTime}}}_{{{FileDuration}}}_{{{VideoKbps}}}_{{{Width}}}x{{{Height}}}_{{{AudioKbps}}}.flv'
		formats: [700, 2500],
	}
}
```

The archiving rules can be configured in two modes; An [always](/docs/archiving-a-stream/archive-a-full-broadcast) mode where the rules are always applied to every broadcast *or* an [integration](/docs/archiving-a-stream/record-clips) mode where the rules are only applied to specific broadcasts. Integration mode allows more fine grained control as the archives can be enabled/disalbed at any point in a broadcast to create shorter clips instead of always archiving an entire broadcast. In both modes, [always](/docs/archiving-a-stream/archive-a-full-broadcast) and [integration](/docs/archiving-a-stream/record-clips) archiver rules will be pre-defined when your archiver is initially configured and deployed.

Archives can be saved in two different formats which are selected by the *driver* in the archiver rules. [HLS](/docs/overview/types-of-streams) would be the most common for VOD purposes as there is wide support for the format across many devices. [FLV](/docs/overview/types-of-streams) is another option that is suitable for archival purposes. In either case a range of cloud storage providers can be selected to deliver the archives to upon completion of the live broadcasts. 

## GET STARTED {% .text-primary-500 %}

{% link-grid  %}
  {% link-grid-link title="Archive a full broadcast" href="/archiving-a-stream/archive-a-full-broadcast" description="Learn how to configure for archiving a full broadcast" /%}
  {% link-grid-link title="Record clips" href="/archiving-a-stream/record-clips" description="Learn how to extract video highlights and trim down a recorded video" /%}
  {% link-grid-link title="Record snippets at an interval" href="/archiving-a-stream/record-snippets-at-an-interval" description="Learn how to access and configure for snippets at a specific recording interval" /%}
  {% link-grid-link title="Create still images" href="/archiving-a-stream/create-still-images" description="Using video snapshots, you can capture and record still images from a live stream" /%}
{% /link-grid  %}

