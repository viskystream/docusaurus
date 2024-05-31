---
route: /customizing-a-stream/transcode-configuration
pageTitle: Transcode Configuration
kind: concept
uuid: 52e39060-ad2a-4b14-84e5-967c65ff9df9
---

The main goal of the transcoding service is to increase the target audience both for the ingress and egress sides by consuming ingress streams over multiple different protocols and formats and adjusting them to different network conditions and agent capabilities such as supported codecs.

## Current Capabilities

Streams can be transcoded to support the following:

* Transrated ingress streams
  * modifying video properties
    * bitrate
    * frame rate
    * frame dimension
    * rotation
    * pixel format
    * aspect ration
  * modifying audio properties 
    * bitrate
    * sampling rate
    * sample format
    * number of channels
  * modifying the output codec (e.g. OPUS --> AAC, VP8 --> H264)
* stabilizing streams
  * ensuring consistent egress of constant bitrate outflow for HLS
  * reducing accumulated latency caused by TCP underflow/overflow flow nature
  * filling audio gaps
  * ensuring consistent egress GOP (keyframe interval)
* accessing raw decoded media
  * [archives](/docs/archiving-a-stream/archive-a-full-broadcast)
  * [clips](/docs/archiving-a-stream/record-clips) / [snippets](/docs/archiving-a-stream/record-snippets-at-an-interval)
  * [stills](/docs/archiving-a-stream/create-still-images)
  * [statistics](/docs/administration-tools/monitoring-streams)

{% if requiredRoles($roles, ["admin"]) %}

### Naming

The transcoding service is also referred to in code as xcode or xcode2. Transcoder v3 will be called xcode-vf for Video Foundation.

### Additional design guidelines

- xcode2 was designed to support streams that are composed out of a small and fixed number of elementary streams, normally one video and one audio. It was designed to locate and process the elementary streams at session initiation and process those elementary streams from start to end. It was not designed to allow on the fly changes to the composition of the elementary stream.
- xcode2 was designed to work as an independent stand-alone service that runs in a single container.  It communicates with other services using bi-directional HTTP calls.
- It was designed to support ingress over both TCP i.e. RTMP / FLV over HTTP as well as UDP i.e. RTP.
- It was designed to support egress over both TCP i.e. RTMP / FLV over HTTP / HLS as well as UDP i.e. RTP.

Note:  That the original implementation was heavily skewed toward HLS egress thus its RTP egress implementation isn't great.

## High-Level Architecture

Internally the service is composed of multiple sub-modules.

- NGINX - used for ingress and egress over TCP
- MediaSoup (SFUi) - used for ingress and egress over RTP
- Internal Controller - responsible for starting, stopping and monitoring running jobs
- External Controller - responsible for updating external services with the state of all running streams (optional)
- APIs - rest API service for administering streams

## Normal Workflow
1. API gets a relay request over HTTP
2. API sends a request to either the nginx or sfui to pull the stream from its source
3. Once the stream is pulled from the source the internal controller detects that and starts a decoder job
4. Once the decoder job is running the internal controller starts one or more encoder jobs
5. External controller reports the state of the jobs to the external endpoint over HTTP. It may receive a status command to stop running streams
6. A consumer connects to either nginx or sfui to consume the encoded variant(s)

{% /if %}

{% feedback /%}