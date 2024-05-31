---
route: /archiving-a-stream/archive-a-full-broadcast
pageTitle: Archive a full broadcast
kind: guide
uuid: e64b089f-7308-40c4-b59d-c1ae80224067
---

- How to configure for archiving everything that streamed
- How to pick a bitrate
- How to access archives

When the live stream archiver is setup in the "always" mode the archiving will happen in a hands-off manner; The archiver will simply follow the rules that were defined when it is first configured and every live broadcast will be archived. If only certain broadcasts or certain sections of broadcasts are desired to be archived then the [integration](/docs/archiving-a-stream/record-clips) mode should be used.

Example always archiver rule:

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

Possible values for the rules include:

| Field            | Value(s)                             | Description                                                                                                                               |
| ---------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **type**         | `never, all, paid, unpaid, snapshot` | Indicates when the rule should execute/archive                                                                                            |
| **driver**       | `flvfile, hlss3`                     | Which file type to save the archive                                                                                                       |
| **maxDurSec**    | `-1 (infinity), 3600 (integer)`      | Time in seconds to continue archiving                                                                                                     |
| **backfill**     | `3 (integer)`                        | Time in seconds to read backwards in the live buffer when starting an archive                                                             |
| **warmup**       | `15 (integer)`                       | Time in seconds to refrain from creating an archive file (helps short broadcasts from being archived)                                     |
| **fileTemplate** | `id_{{{StreamId}}}.flv`              | Template used to name the archive file. **\*Values:** StreamId, ArchiveFileStartTime, FileDuration, VideoKbps, Width, Height, AudioKbps\* |
| **formats**      | `[300, 600, 1500] (integer)`         | An array of bitrates to archive; The closest match from what is actually available we be archived.                                        |

All archives will be delivered to the cloud storage provider that was selected when the archiver was initially configured with on the path listed in the _fileTemplate_ of the archiver rule.

{% feedback /%}
