---
route: /administration-tools/transcoding-details
pageTitle: Transcoding details
kind: guide
uuid: 8e29b523-cac7-4483-b499-e07eb9f1072e
---

## Xcode (transcode)

Xcode console within LGBX is provided as an option to open up more data regarding a stream you have selected. To do this, you can click into a Host, and then select a Public Key for the stream you want to review. 

While you click into a server/host, you will see the `Xcode`  button. This Xcode button focuses on the entire Host (and active streams) running. If you click down further into a Host and select a specific stream/Public Key, you will see a lighter color Transcode button.

Clicking `Xcode` will show the Transcode console for only the single stream you have selected. Click this to open up the following page.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH50b1953e-a251-4b82-a3c8-3eb1ccd96a53" alt="xcode details 1" /%}

Within this window, you will see different sets of data for the targeted stream. On the very right side, you will see an Action button.

If you click on the `Actions` button, it will give you several choices in the dropdown: like, providing options like INFO, DEBUG, and TRACE.

There are other options on this page, like **Show CPU** (found at the top of the page), which can display the CPU usage for a stream. Clicking the same button will **Hide CPU** usage from your stream stats section.

If you want to **Show Events**, you can click on this `show events` and it should show related events like stream begin and stream end.

Different decoders can be selected by clicking the KPI button. Once `KPI` is clicked, you will get a menu with multiple options.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH315b6744-9b5a-4ab2-8cfd-b45867d0cf16" alt="xcode details 2" /%}

As you do so, it changes the graph (to the right) to represent the different data type. For example, if for **KPI** you click “Decoder Video Drop/Inject”, you will see the graph change to a bar-graph, as shown in the picture below. Try clicking the `?` button if you wish to see definitions of your current graph.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CHd5cef338-f27d-47f8-ab25-e07728f7f7ff" alt="xcode details 3" /%}

Just below the KPI button, there is the Time Range button.

When you click on,`Time Range` it reveals a menu allowing for different ranges to be selected.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH744dda30-ec40-4879-936a-990cbd943a6d" alt="xcode details 4" /%}

For example, choosing “Last 30 minutes” will filter and change the graph indicator to show a scale for the last 30 minutes of data about the stream.

{% feedback /%}