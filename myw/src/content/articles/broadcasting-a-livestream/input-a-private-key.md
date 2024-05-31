---
route: /broadcasting-a-livestream/streaming-with-external-software/input-a-private-key
pageTitle: Input a private key
kind: guide
uuid: 94548eb4-e3f8-4101-bdb0-d0a3d70ea3c8
---

## Private Key vs Stream Key

Stream keys and private keys are the same things.  Stream keys, by nature, are private.  A private key is a special code that allows any software encoder to communicate with a video streaming platform.  The term “stream key” is typically used when dealing with broadcasters since it is more user-friendly.  The term “private key” is usually used by more technically savvy users that have knowledge of how video streaming works and by the video streaming platform APIs and systems.

## Adding a Private Key

The private key(stream key) is provided by the video streaming platform, usually through a dashboard that can be copied and pasted.  Once you have the key, you can set up a custom RTMP stream by adding the key to the encoder.

### Examples

#### OBS

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/kimPham@devcenter/CH00f5b5ff-a956-4cb7-b92f-4d23c62a5888" /%}

#### Wirecast

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/kimPham@devcenter/CHfcd65ba8-ee53-4189-b57e-56d56979f1ac" /%}

## Supported Query Parameters

- `clientReferrer` - _Optional_ - Allows an implementer to route certain requests based on the clientReferrer configured.
- `preferredXcodeLocation` - _Optional_ - Allows an implementer to set a preferred xcode location.
- `broadcasterProfile` - _Optional_ - Allows an implementer to control the encoding profile per stream.

{% feedback /%}