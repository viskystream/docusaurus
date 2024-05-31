---
route: /archiving-a-stream/record-snippets-at-an-interval
pageTitle: Record snippets at an interval
kind: guide
uuid: 5d82fdc1-0367-4308-b1ed-62dbbfec54f6
---

- How to configure for snippets
- How to access snippets

Snippets are a specialized mode for the archiver to generate a series of short clips of a specified duration over and over at a set interval. Currently only the flv format is supported for this type of archive.

Example archiver rule:

```js
archiverRules: {
	compliance: { // archiver rule name
		recordMode: 'always',
		type: 'snapshot',
		driver: 'flvfile',
		minDurSec: 5, // if less than this duration in seconds, archive file will be discared
		maxDurSec: 30, // max time to capture in seconds
		interval: 360000, // time between snapshots in milliseconds
		backfill: 0,
		warmup: 0,
		fileTemplate: 'id_{{{StreamId}}}_{{{FileDuration}}}_{{{VideoKbps}}}_{{{Width}}}x{{{Height}}}_{{{AudioKbps}}}.flv'
		formats: [2500],
	}
}
```

Snippets are intended to be used with the _always_ recordMode so that they happen in an automatedd fashion all the time, _but_ they can also be used with the [integration](/docs/archiving-a-stream/record-clips) recordMode so they can be enabled/disabled for specific broadcasts.

All snippet archives will be delivered to the cloud storage provider that was selected when the archiver was initially configured on the path listed in the _fileTemplate_ of the archiver rule.

{% feedback /%}
