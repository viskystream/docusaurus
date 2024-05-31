---
route: /administration-tools/backend-video-infrastructure
pageTitle: Backend video infrastructure
kind: guide
uuid: 9e8a08cd-3f3c-4a33-a3bd-be7d1ca60be9
---
## Transcode Hosts (TAB)

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CHdbcecbe4-6c5e-46c6-9a9b-8dccdf622088" /%}

-  **Xcode** is short for **Transcode** 

- Setting a stream key in the Global Search Key input box (upper-right corner) allows you to navigate different views while maintaining focus on the selected stream

**Xcode Hosts diagrams below _(next 11 images)_**

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH03b5cc58-656a-4872-8fcf-927194b28bb4" alt="xcode_diagram_1" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CHddab6976-5cca-4657-ae76-2aea1498cf20" alt="xcode_diagram_2" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CHa28a023d-b727-47ba-a78c-758ca4317670" alt="xcode_diagram_3" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH794d6b4c-c673-4c08-9eb4-fd66df69c488" alt="xcode_diagram_4" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH256503f9-7144-4e3e-bbb9-16493c017103" alt="xcode_diagram_5" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH61a5cb41-38e6-4c19-9d8e-bb5f9d02a14c" alt="xcode_diagram_6" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH0149c8ac-e3fd-4e38-8d93-e8e52e281a26" alt="xcode_diagram_7" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CHc47c3330-9128-40a4-8473-ec5d396fe29a" alt="xcode_diagram_8" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH945781da-0cd1-41fb-bf26-e705099491ce" alt="xcode_diagram_9" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH515dff64-3cde-47cd-9efa-b6890009dcbf" alt="xcode_diagram_10" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH7e7c37a8-9207-4d81-a651-04f18fabc873" alt="xcode_diagram_11" /%}

**XCODE HOSTS = shows the list of all transcoder hosts, organized by regions**

**On this page:**

- You can check **Regions of Hosts** (Note: In most cases, each **HostName** represents a different machine).

- By clicking down into a Hostname, you can see details like **CPU Utilization, Max Streams, Total Streams**. You are able to drill down (arrows on the left) to a specific hosted video and see UUID’s **(Public Key)** or **Dimensions** as well.

- Clicking into a stream will allow you to see Player type information, as well as **Driver preference (HlsJS, PVC, Hjs, Meow)**. After you click the **Play** button on the video you have selected, you can uncheck the Driver Preference boxes to see if Stream samples play within the video box (lower right). When clicking on different **Border regions**, this allows the video to run from that specific location. _[demonstration video below]_

- There are also **Access Token** and **Manifest URL** fields visible on the Middle-right side of this page.

- Next to each **Public Key**, there will be a **Play** button that allows you to play and then “stop” a stream. If at any point you want to stop the auto-play of a stream (because it is currently selected), you can click the “X” on the upper right corner of the video. While a video is playing, you will get a “Latency” counter on the upper-left of the video. _(see image below)_

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CHc6ccb1b0-af42-4c1f-8eed-2e91c66d6c09" alt="xcode_public_key1" /%}

- There is also the **Xcode** button, listed on the same line (horizontally) as the stream’s Public key. _(see image below)_ After being clicked, it will open up a new window with a deeper look at the Xcode data for this stream. _[demonstration video below]_

- Next to the Xcode button is a **Stats** button that will give you a Grafana xcode stat page for the selected stream. _(see image below)_

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CHdcfb8a02-47cc-454e-bd48-8379402b0b95" alt="stats" /%}


**_Inside the Xcode console (see image below)_**

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CHf49bf27d-ff25-403d-ba68-4b57d07561a9" alt="xcode_console" /%}

*On this Xcode console view, you can see the health of the stream and the server itself. This view provides further details, such as:

- **Variant type (different playback resolutions)**
- **Start time**
- **Duration**
- **Video PTS**
- **Audio PTS**
- **Idle MS**
- **FPS Video/Audio**
- **Bitrate Video/Audio**
- **GOP (sec)**
- **Video codec**
- **Audio codec**

## Borders (TAB)

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH08ab418d-169e-480f-a2d5-cd435a670569" alt="border_tab"/%}

**Borders diagram below _(next 2 images)_**

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH188777d0-7b4c-4588-bb0b-a77e4949bfda" alt="borders_diagram_1" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH4c83727f-3666-4129-910c-b2a585b2d80d" alt="borders_diagram_2" /%}

**BORDERS = lists all border hosts that servers (where the stream is sent from)**

**HLS egress traffic, organized by regions**

**From this page, you can do the following:**

- Check what Build # the host is on
- View the number of streams
- You see what Borders exist, including which hosts are on them
- Search for Borders and see how many machines are associated with each.

*This tab is very similar to Xcode Hosts, as it will allow you to dive into specific streams in each region, then test the streams. Note: there are a series of tabs over the video that lets you select between Player, Job, Manifest. _(see image below)_

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH2c4690b7-d37a-483d-8ce3-04f6c9cfa336" alt="border_tabnginxTab" /%}

- While you have a stream selected, within the Hostname you should see a button for **Nginx logs**. Clicking this will bring you to a new page with links for different log types. To the right, you have refresh buttons for the **Host**, which will refresh the stream list. Clicking **Region** will refresh the entire region. _(see image below)_

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH93eeafff-344a-4b86-9324-dc2f2850cf98" alt="ngninx_logs" /%}

## Pools (TAB)

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CH3f03b665-e5bd-4832-9acd-368189037d44" alt="pools_tab" /%}

**POOLS = RTMP for streaming information**

**Here you can do the following:**

- View: Show Pool ID, Score, Number of Jobs, Current Leader, Lock TTL
- You can see stream Start Time, Duration, Public/Private Key, and last **pings** (Xcode, Origin, SFU, Supervisor check)
- In the upper-right corner, you can click and “Select a Field” to display different information to show on the left half of the page.

## Archivers (TAB)

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/Shirin@devcenter/CHd65b589a-fd8c-4f2f-ae73-7c2df53874d8" alt="archivers_tab" /%}

**Archivers diagram below _(next 4 images)_**

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CH91e88884-4a54-4759-8698-12d6982a83ce?token=33e3cafb22d14c65bd23d7fd2285e038" alt="archivers_diagram_1" /%}

- Each archiver instance can run multiple jobs concurrently

- Each job replicates one stream and stores it to a target device based off job specifications

- The max number of concurrent jobs per instance is fixed (configurable)

- Free slots is the max number of jobs minus the number of currently running jobs

- Stream Console puts jobs to be archived in queues. Archivers with free slots will continuously check with LGBX for new jobs

- Archivers are deployed in multiple regions in order to reduce network overhead for stream replication

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CH47d5d477-3880-4095-abec-7cbec779982b?token=33e3cafb22d14c65bd23d7fd2285e038" alt="archivers_diagram_2" /%}

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CHb7a8690a-968b-4fef-85a6-7d5ccb9001b8?token=33e3cafb22d14c65bd23d7fd2285e038" alt="archivers_diagram_3" /%}

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CH2fe40ca4-8a32-4326-bb14-b30581f7dfba?token=33e3cafb22d14c65bd23d7fd2285e038" alt="archivers_diagram_4" /%}

**ARCHIVERS = shows the list of all Archiver hosts/processes, organized by regions and type. Stores VOD’s (video files) of streams (based on user-defined settings). Each stream archived will appear here and show its duration.**

**From this page, you can do the following:**

- See what archiving is setup/processing for each Host
- You can see Main Queue as well as expired items

## Origins (TAB)

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/localhostuser@devcenter/CHf7c65ce3-dd2e-43f8-8b4a-5f00fcfdc748?token=f33ac7f9d1a04b42ae1039b302959f00" alt="origins_tab_view" /%}

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/localhostuser@devcenter/CH70f6578e-691d-4bae-8546-b2988a9e9f41?token=f33ac7f9d1a04b42ae1039b302959f00" alt="origins_diagram_1" /%}

**ORIGINS = lists all RTMP ingress (origin) hosts, organized by region**

**From this page, you can do the following:**

- Show the HostNames and Total Streams for each host.
- Click into any of the Hosts to get the stream’s **private key, dimensions, data written, bit rate, duration**.
- There are 3 small icons next to the private keys. The icon on the left (below red arrow in the following image) is clicked if you want to copy the private key, next to it is the icon to copy ffplay link, and the icon furthest right is to show stats on that stream. _(see zoomed image below)_

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/localhostuser@devcenter/CHd4a4be55-8c34-471d-973d-227d8b5c709a?token=f33ac7f9d1a04b42ae1039b302959f00" alt="copy_private_key" /%}

**Note:** We recommend installing [ffmpeg](https://www.ffmpeg.org/download.html) in order to play ffplay links, like the example above.

## Selective Forwarding Units (SFUs) (TAB)

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CH5d06e8b2-9995-40a2-ba53-306306788daa?token=8e31b3bdcba2499ea437089343d8fb00" alt="sfu_tab" /%}

**SFUs diagram below _(next 3 images)_**

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CHccaf2bd3-1690-4a62-ac27-3f8401f090b4?token=8e31b3bdcba2499ea437089343d8fb00" alt="sfu_diagram_1" /%}

**NOTE:**  SFU (tab) view is like Xcode and Borders view. Unlike origin, Xcode and Borders (tabs), where a stream refers to a single source (broadcast) with zero or more viewers, SFU has the concept of a call that can accommodate one or more streams. Each broadcaster or viewer is referred to as a peer.

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CHc9d174ee-fd11-40e4-a1bb-3b1843d11f4f?token=8e31b3bdcba2499ea437089343d8fb00" alt="sfu_diagram_2" /%}

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CHd78dbf6e-f4d6-4a3d-8d1c-bd1c54971847?token=8e31b3bdcba2499ea437089343d8fb00" alt="sfu_diagram_3" /%}

**SFU’s = WebRTC SFU server information, organized by region**

**From this page you can do the following:**

- See SFU and call ID’s, along with User Names (Slug) and peer counts.
- Click into any streams to see details, and sample stats on them like **Total Bitrate, version, Pool, Max calls, calls**. _(see image below)_

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CH42dbf930-2795-4f11-a0d9-8f61f6d38d67?token=8e31b3bdcba2499ea437089343d8fb00" alt="sfu_info" /%}

## Job (TAB)

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CHd6474791-8072-4856-9e43-f66fbb3ce567?token=885b25d7e2ee4d2ea5eb889215dc404a" alt="job_tab_view"/%}

**JOB = shows task processing information of a stream**

**From this page, you can do the following:**

- If you already have a stream (Call ID) selected in the previous tab (SFUs), it will carry over to the Job tab here, and display the same stream yet with more stats and detail. Details like **Last Ping** or **Stream Duration** are visible. _(see image below)_

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CHe3cba868-bd24-49cb-be66-69ff6a096ae0?token=885b25d7e2ee4d2ea5eb889215dc404a" alt="job_details" /%}

- If you play a stream, just underneath the video, you will get the following stats about the playback time:
  - **Manifest Load**
  - **Hls Driver Init**
  - **M3u8 load**
  - **Index load**
  - **Fragment load**
  - **Total load time**

_(example image below)_

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CHf475c5f7-d0f0-4983-a962-c614ff8d12c9?token=885b25d7e2ee4d2ea5eb889215dc404a" alt="example" /%}

## Player (TAB)

{% image src="https://nativeframe-prod-usc1b.nativeframe.com/api/asset/Shirin@devcenter/CH7e602a05-73ce-4504-b9e4-9bf722694cd6?token=733a39ab496644659cafcab3a405b5ba" alt="player_tab_view" /%}

**PLAYER = Page is more simplified for focusing on video playback**

**From this page, you can do the following:**

- If you already have selected a stream to play on previous tabs, the video will automatically play on this page.
- In order to play a video, you can enter a Public key (upper-left side).
- There are also **Show Manifest** and **Generate Token** buttons on this page.

{% feedback /%}