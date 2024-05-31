---
route: /broadcasting-a-livestream/streaming-with-external-software/stream-with-obs-studio
pageTitle: Stream with OBS Studio
kind: guide
uuid: 45e29425-1461-417a-b394-230df5355c1c
---

## Install OBS

Download and install OBS from {% link href="https://obsproject.com/download" target="_blank" %}https://obsproject.com/download{% /link %} or locate the download from their website {% link href="https://obsproject.com/" target="_blank" %}https://obsproject.com/{% /link %}

Don’t forget to connect or enable your webcam, if needed.

## Setting up OBS

An easy way to begin your configuration is to use the Auto-configuration wizard. This should auto-detect your camera, etc. so that it can apply the best settings for your device.

At the top of OBS your menu, click on Tools > Auto-Configuration Wizard.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CHfceb7a7c-654c-42d0-beee-43b6f1bc67b9" alt="obs 1" /%}

We recommend using default settings, as you click “Next” about 2 times. The 3rd page will contain streaming info (like Service and Server), which you can fill out so OBS can test your connection/settings.

If later you want to change setup options, you can go to Settings > Stream. Here you can connect your account with your preferred streaming site (Connect Account), or if you have a Stream Key to use, just click **Use Stream Key** button and fill in the blank field.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CHe7afce7f-03b6-495f-a0b3-f305bffb496c" alt="obs 2" /%}

There are many options for streaming sites in the dropdown box at the top of the Settings page. You can also do a Custom setup if your streaming service is not available to select.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH3cb3bb88-560e-4efc-a2b5-446b0d4a689c" alt="obs 3" /%}

Select what option applies to your streaming and fill in the information needed. Don’t forget to click Apply, and OK when you are finished modifying your Settings page. Once finished, you should have the basic configuration in order to start streaming video. Note that you can select to stream from your camera or to show your computer/device screen.

## Broadcasting with OBS

In order to begin your broadcast, click on **Start Streaming** on the right side of the OBS app.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH693722d3-2a5e-4371-8f52-010bb4081233" alt="obs 4" /%}

## OBS Virtual Camera to stream/test playback

You can test your stream by pushing it through channels. One way to sample this is to use the Display Capture as a Source in OBS, and adjust the screen to capture the area of your viewing screen that you wish to.

To do this, take a look at the Display dropdown box, just underneath the preview window. Clicking this lets you select the device monitor you want to capture. Select what display works best for your sample. This will show the visuals of what is on that screen/monitor at this time.

The following adjustment is not necessary for a simple test – Using the red parameter lines, you can click-to-drag the border of your viewable/streamable area, to adjust OBS’s capturable area of your screen.

In Umbrella, you can click into Docs > then you will see Playground at the top - click this as well. Now it should have taken you to a menu on the left for testing. Click on Basic Encoder. **NOTE:** As you arrive on this page, your browser may prompt you to “allow” this website to access your camera - accept or allow this to continue.

Now, hover your cursor over the player area of the Encoder, and you will see a pop-overlay appear, and so when you see the cogwheel for settings, click on it. On the following menu, there is a box where you can select “Camera”. Click this to make sure you have OBS Virtual Camera selected. Once you have this done, you can close this menu by clicking the “x” on the upper-left to close. Now that you have the Virtual Camera chosen, it will show this screen capture from OBS inside your Umbrella’s Basic Encoder. To stream this, you can go over to your OBS app and click on the **Start Virtual Camera** button (right side, under “Controls”).

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH3ebefda6-3c91-47c7-943e-dba131eee5e9" alt="obs 5" /%}

Starting Virtual Camera should give you the display video on the Basic Encoder player window, but to run the stream, you click on the Overlay menu of the Basic Encoder. Hover your cursor over the Basic Encoder’s player again, and you will see (as the overlay menu appears) the left-most icon is “Broadcast”. Click this and it will begin the stream.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH98514235-807f-455c-bf4d-5896210bf837" alt="obs 6" /%}

Now that this is running, you should be able to navigate over to the Stream Console and view the stream. For LGBX, click on Admin (at the top-left of the page), and then click Stream Console. Once you are there you can use the current (Xcode Hosts) tab and expand the Hosts until you locate your stream. After you locate your stream, click on it and click the Play arrow on the player. It will play your live test stream.
