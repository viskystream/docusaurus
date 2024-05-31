---
route: /archiving-a-stream/record-clips
pageTitle: Record clips
kind: guide
uuid: 691d2438-afd8-41bf-bed7-4974c6334a3a
---

With video clips, you can extract a video highlight or trim down a recorded video with the exact time to begin and end the clip.

- How to configure for recording clips
- How to access clips
- Reference [LSI API Specs](/docs/apis/lsi) specifically the [Admin Patch route](/docs/apis/lsi#/key/updateKey) for users stream properties.

When the archiver is configured in "integration" mode no archiving will take place unless directed by calls to the [LSI](/docs/basic-operator-integration/methods-of-authorization/authorized-vs-public-streams) service. This can allow fine grained control over which broadcasts will be archived and when the archive begins and ends. This is controlled specifically by sending an object of "archiverRules" inside the [props](/docs/apis/lsi#/key/updateKey) when making a **PATCH** request to the [LSI](/docs/basic-operator-integration/methods-of-authorization/authorized-vs-public-streams) api service.

The props.archiverRule can contain as little as the rule name (with an empty sub object). As long as the rule sent matches an existing rule from when the archiver service was configured, it will being the archive.

Example archiver rules:

```js
{
  props: {
    archiverRules: {
      compliance: {
      } // archiver rule name
    }
  }
}
```

If any (or all of) the properties of the rule need to be changed, they simply need to be inlcuded in the **PATCH** request.

Example archiver rules with additional values:

```js
{
  props: {
    archiverRules: {
      compliance: {
        // archiver rule name
        fileTemplate: "id_{{{StreamId}}}_{{{Width}}}x{{{Height}}}.flv";
        formats: [700];
      }
    }
  }
}
```

Any field/value that is _NOT_ sent back in the archiver rules will fallback to the predefined rules that were initially configued.

| Field            | Value(s)                             | Description                                                                                                                               |
| ---------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **type**         | `never, all, paid, unpaid, snapshot` | Indicates when the rule should execute/archive                                                                                            |
| **driver**       | `flvfile, hlss3`                     | Which file type to save the archive                                                                                                       |
| **maxDurSec**    | `-1 (infinity), 3600 (integer)`      | Time in seconds to continue archiving                                                                                                     |
| **backfill**     | `3 (integer)`                        | Time in seconds to read backwards in the live buffer when starting an archive                                                             |
| **warmup**       | `15 (integer)`                       | Time in seconds to refrain from creating an archive file (helps short broadcasts from being archived)                                     |
| **fileTemplate** | `id_{{{StreamId}}}.flv`              | Template used to name the archive file. **\*Values:** StreamId, ArchiveFileStartTime, FileDuration, VideoKbps, Width, Height, AudioKbps\* |
| **formats**      | `[300, 600, 1500] (integer)`         | An array of bitrates to archive; The closest match from what is actually available we be archived.                                        |

If the archive needs to be stopped then another **PATCH** request can be send with empty archiver rules.
Example:

```js
{
  props: {
    archiverRules: {
    }
  }
}
```

All archives will be delivered to the cloud storage provider that was selected when the archiver was initially configured on the path listed in the _fileTemplate_ of the archiver rule.

{% feedback /%}
