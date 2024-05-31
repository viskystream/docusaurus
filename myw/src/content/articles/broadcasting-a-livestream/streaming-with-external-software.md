---
route: /broadcasting-a-livestream/streaming-with-external-software
pageTitle: Streaming with external software
kind: concept
uuid: d5a9e1ee-abe0-419d-802f-fa4b99540f5f
---
## What are some of the benefits of streaming with OBS?

Open Broadcast Software (OBS) "Free and open source software for video recording and live streaming." The main benefit of using OBS is control. Control over your settings and unlocking hardware encoding. Users can control settings such as resolution, frame rate, and bitrate. Configuring broadcast settings is a balance between network conditions, hardware, and end viewer experience. 

OBS supports x264 for encoding and supports the following for hardware encoding.

- NVIDIA NVENC
- Intel Quick Sync Video (QSV)
- AMD Advanced Media Framework (AMF)
- Apple VideoToolbox (VT)

In most cases, OBS will be the first to support new encoding solutions including AV1 encoding with new NVIDIA RTX 40 series GPUs. 

Hardware encoding can increase the video and audio quality of streams and reduce the load on the system's CPU. 

Aside from the technical benefits, OBS includes a lot of features for the customization for any content. Users can add screen capture, cameras, game capture, graphics, videos, audio devices, text, stinger transitions, browser sources, filters, and more. OBS also includes features more commonly found in professional broadcasting like Studio Mode and audio mixing. Adding all of these resources to a broadcast can also have an effect on the system's performance. The CPU will still be used even if the encoding is being done by the GPU.

## What are some of the common issues?

Settings are not configured properly. Although having control can be seen as a benefit OBS is far from software that “just works”. Dropped frames due to network configuration issues are common. OBS includes a feature that will try to reconnect to the server in case of an outage. 

Being that this is an open-source software it can come with issues with new releases. Compatibility with OS, hardware, and third-party plugins can break-in new releases without being tested. 

## What are some other external encoders that we integrate with?

We can integrate with any software that can stream to an RTMP server. Here are some examples other than OBS Studio.

{% link href="https://streamlabs.com/" target="_blank" %}StreamLabs Broadcaster{% /link %} - This software takes the base OBS and adds a new UI, more features, and more stable releases.

{% link href="https://www.xsplit.com/" target="_blank" %}Xsplit{% /link %} - Xsplit is its own paid broadcasting and recording software. 

{% link href="https://www.vmix.com/" target="_blank" %}VMIX{% /link %} - VMIX is a professional production software very similar to what you would see in a TV production studio with hardware switchers. 

{% feedback /%}