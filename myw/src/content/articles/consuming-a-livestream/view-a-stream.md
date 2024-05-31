---
route: /consuming-a-livestream/view-a-stream
pageTitle: View a stream
kind: quickstart
uuid: f339bd10-4099-4f13-b88b-16b3c2ec9220
---

{% tabs  %}
{% tab-header %}
{% tab-header-item %}
React
{% /tab-header-item %}
{% tab-header-item %}
Vanilla JS
{% /tab-header-item %}
{% /tab-header %}
{% tab-panel %}
{% tab-panel-item %}

There are two ways to create players: via `backendEndpoints`, and via a manifest.

Table of Contents:

1. [Setting up a Player via backendEndpoints](#setting-up-players-via-backendendpoints)
1. [Setting up a Player via manifest](#setting-up-players-via-manifest)
1. [Glossary](#glossary-1)

## Setting up Players via backendEndpoints

### 1. Auth token

The token is what gives a user permission to connect.

**IMPORTANT**: To use a Player, you must have a subdomain.  You will get your subdomain from your Engagement Manager at {% company-name /%}.  For details on obtaining a token or implementing a tokenRefresher see [How do I create a token?](/docs/basic-operator-integration/video-client#how-do-i-create-a-token)

### 2. imports

You'll need to import these required components:

1. **_CallContext_** - This is a Call Context instance that manages global call state for the Player instance.
2. **_PlayerUiContext_** - This is a Player UI Context instance that manages UI state for the Player instance.
3. **_PlayerUiState_** - A Class that manages the UI state for the Player.
4. **_VideoClient_** - This is the VideoClient class.
5. **_types_** -- For `VideoClient` types, if you are using TypeScript

```js
import {
  CallContext,
  PlayerUiContext,
  PlayerUiState,
  VideoClient,
  types,
} from "@video/video-client-web";
```

You'll also need to import these components to be used for the Player.

```js
import {
  ControlBar,
  MediaContainer,
  PlayerAudioButton,
  PlayerBitrateButton,
  PlayerFullscreenButton,
  PlayerGetSoundButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
} from "@video/video-client-web";
```

### 3. Required Properties

Before you are able to create a Player you need three pieces of information. There are two objects that you will need to define - the _VideoClientOptions_ and the _CallOptions_. Please see the description below for additional information about these two objects.

**_VideoClientOptions_**: Object

- **_backendEndpoints_**: string[] - This is an array of URLs we try when we are creating a call. If a URL fails to connect, this will failover to the next URL and so on.
  **Note: A minimum of one URL is required.**

**_CallOptions_**: Object

- **_callId_**: string - This is the `callId` for the call.  It is associated with the broadcast and is a UUID, a unique value.
- **_userId_**: string - This is the `userId` that will be passed into the call.  It is an identifier for the user.  It is used by the {% company-name /%} team for logging purposes.  In an application, it would normally be the display name of the user.  It is not required to be a unique value.
- 
### 4. State setup

You need to set up a `players` state to manage the stream. It is the local state of the component using a reducer and needs to be changed.

```ts
const playerReducer = () => {}; // We will fill this in Step 7.
const [vc, setVc] = useState<types.VideoClientAPI | null>(null);
const [call, setCall] = useState<types.CallAPI | null>(null);
const [players, setPlayers] = useReducer(playerReducer, []);
```

### 5. Create your Video Client instance

`VideoClient` is a video-client class that connects to the server and enables either creating a call or joining
an existing call. A `VideoClient` instance is required for _each_ user.

When creating the useEffect for your `VideoClient` instance be sure to only include things in your dependency array that will allow for disposal and cleanup of the `VideoClient` instance to occur when the `VideoClient` instance has changed or is removed. Failure to do so may result in cleanup code running more often than desired.

**Be sure to **dispose** the `VideoClient` instance on unmount!**

```ts
useEffect(() => {
  if (vc == null) {
    const opts: types.VideoClientOptions = {
      backendEndpoints: ["https://yourEndpoint"], // If you do not have a  subdomain, contact .
      token: tokenRefresher(tokenOptions),
      loggerConfig: {
        clientName: "your-app-name",
        writeLevel: "debug", // Defaults to debug, but can be info, warn, notice, deprecated, network, local, timing, or trace. Recommend leaving this as debug.
      },
    };
    const newVc = new VideoClient(opts);
    setVc(newVc);
  }
  return () => {
    if (vc != null) {
      vc.dispose();
      setVc(null);
    }
  };
  /*
   * Remember to only include things in your dependency array related to the state of your `VideoClient` instance, otherwise disposal may occur at undesired times.
   */
}, [vc]);
```

For details on obtaining a token or implementing a tokenRefresher see [How do I create a token?](/docs/basic-operator-integration/video-client#how-do-i-create-a-token)

### 6. Join a call and set the callStore.

In this example, this user is joining an existing call. You will need access to the `callId`.

**Be sure to call on unmount.**

```js
useEffect(() => {
  if (callId && vc && call == null) {
    (async () => {
      const options: Partial<RequestPlayerOptions> = {};
      const joinedCall: types.CallAPI = await vc.joinCall(callId, options);
      setCall(joinedCall);
    })();
  }
  return () => {
    if (call != null) {
      setCall(null);
    }
  };
}, [vc, call, callId]);
```

### 7. Fill in `playerReducer`.

There are three main cases we are going to care about for our reducer: `addPlayer`, `removePlayer`, and `unmount`.

```ts
const playerReducer = (
  players,
  action
): Array<{ id: string; uiState: PlayerUiState }> => {
  switch (action.type) {
    case "addPlayer":
      return [
        ...players,
        {
          id: action.ev.peer.peerId,
          uiState: new PlayerUiState(action.ev.player),
        },
      ];
    case "removePlayer":
      return players.reduce((acc, player) => {
        if (player.playerUi.player === action.ev.player) {
          player.playerUi.dispose();
          return acc;
        }
        acc.push(player);
        return acc;
      }, []);
    case "unmount":
      return players.reduce((acc, player) => {
        player.playerUi.dispose();
        return acc;
      }, []);
    default:
      throw new Error();
  }
};
```

### 8. Add player event listeners.

In order to know when another user has joined a call and _started_ their own broadcast, you need to listen for
the "playerAdded" `VideoClient` event. You'll also need to listen for when another user
has _terminated_ their broadcast with the "playerRemoved" `VideoClient` event.

**We will be building on the `useEffect` we created in Step 5.**

**Be sure to remove all event listeners on unmount.**

```js
useEffect(() => {
  if (vc == null) {
    const opts: types.VideoClientOptions = {
      backendEndpoints: ["https://yourEndpoint"], // If you do not have a  subdomain, contact .
      token: tokenRefresher(tokenOptions),
      loggerConfig: {
        clientName: "your-app-name",
        writeLevel: "debug", // Defaults to debug, but can be info, warn, notice, deprecated, network, local, timing, or trace. Recommend leaving this as debug.
      },
    };
    const newVC = new VideoClient(opts);

    newVC.on("playerAdded", (ev) => {
      setPlayers({ type: "addPlayer", ev });
    });

    newVC.on("playerRemoved", (ev) => {
      setPlayers({ type: "removePlayer", ev });
    });

    setVc(newVC);
  }
  return () => {
    if (vc != null) {
      setPlayers({ type: "unmount" });
      vc.removeAllListeners("playerAdded");
      vc.removeAllListeners("playerRemoved");
      vc.dispose();
      setVc(null);
    }
  };
}, [vc]);
```

### 9. Render imported components

Now that you have setup your state, you can construct your UI. Note that each Player will require its
own `PlayerUiContext`.

```js
return (
  <CallContext.Provider value={call}>
    {players.map((player) => {
      return (
        player.uiState != null && (
          <div key={player.id}>
            <PlayerUiContext.Provider value={player.uiState}>
              <MediaContainer>
                <PlayerGetSoundButton />
                <PlayerVideo />
                <ControlBar variant="player">
                  <PlayerPlayButton />
                  <PlayerAudioButton />
                  <PlayerVolumeRange />
                  <PlayerBitrateButton classNames="lv-push-left" />
                  <PlayerFullscreenButton />
                </ControlBar>
                <PlayerOverlayButton />
              </MediaContainer>
            </PlayerUiContext.Provider>
          </div>
        )
      );
    })}
    ;
  </CallContext.Provider>
);
```

## Setting up Players via manifest

### 1. Imports

You'll need to import these required components:

1. **_PlayerUiContext_** - This is a Player UI Context instance that manages UI state for the Player instance.
1. **_PlayerUiState_** - A Class that manages the ui state for the Player.
1. **_VideoClient_** -- This is the VideoClient class.

```js
import {
  PlayerUiContext,
  PlayerUiState,
  VideoClient,
} from "@video/video-client-web";
```

You'll also need to import these components to be used for the Player.

```js
import {
  ControlBar,
  MediaContainer,
  PlayerAudioButton,
  PlayerBitrateButton,
  PlayerFullscreenButton,
  PlayerGetSoundButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
} from "@video/video-client-web";
```

### 3. Required Properties

Before you are able to create a Player via a `manifest`, there are a few required properties you will need to have.

**_VideoClientOptions_**: Object

- **_backendEndpoints_**: string[] - This is an array of URLs we try when we are creating a call. If a URL fails to connect, this will failover to the next URL and so on.
  **Note: A minimum of one URL is required.**

- **_ManifestUrl_**: string - This is a required URL for the player manifest.

### 4. State setup

You need to set up a `playerUi` state to manage the state of the player.

```ts
const [vc, setVc] = useState<types.VideoClient | null>(null);
const [playerUi, setPlayerUi] = useState<PlayerUiState | null>(null);
```

### 5. Create your Video Client instance

`VideoClient` is a class that connects to the server and enables generating a player from a manifest.

**Be sure to _dispose of_ the `VideoClient` instance on unmount!**

```js
import React, { useEffect } from "react";

useEffect(() => {
  if (vc == null) {
    const opts: types.VideoClientOptions = {
      backendEndpoints: ["https://yourEndpoint"], // If you do not have a  subdomain, contact .
      token: tokenRefresher(tokenOptions),
    };
    const newVc = new VideoClient(opts);
    setVc(newVc);
  }
  return () => {
    if (vc != null) {
      vc.dispose();
      setVc(null);
    }
  };
}, [vc]);
```

### 6. Request manifest player from `VideoClient`.

**Be sure to dispose your PlayerUi instance on unmount.**

```js
useEffect(() => {
  if (vc != null && playerUi == null && manifestUrl) {
    const player = vc.requestPlayer(manifestUrl);
    setPlayerUi(new PlayerUiState(player));
  }
  return () => {
    if (playerUi != null) {
      playerUi.dispose();
      setPlayerUi(null);
    }
  };
}, [vc, playerUi, manifestUrl]);
```

### 9. Render imported components

Now that you have set up your state, you can construct your UI. Note you will need to wrap your player
components in a `<PlayerUiContext.Provider>`.

```js
return (
  <>
    {playerUi != null && (
      <PlayerUiContext.Provider value={playerUi}>
        <MediaContainer>
          <PlayerGetSoundButton />
          <PlayerVideo />
          <ControlBar variant="player">
            <PlayerPlayButton />
            <PlayerAudioButton />
            <PlayerVolumeRange />
            <PlayerBitrateButton classNames="lv-push-left" />
            <PlayerFullscreenButton />
          </ControlBar>
          <PlayerOverlayButton />
        </MediaContainer>
      </PlayerUiContext.Provider>
    )}
  </>
);
```

### Need More?

To learn more about customizing the Web Conference Player component, you can find all the information you'd need in the link below:

{% link-card title="Web Conference Player Documentation" href="/livestream-interactions/create-a-group-call" icon="AcademicCapIcon" description="Learn how to customize the Web Conference Player" /%}

To learn more about customizing the Manifest Player component, you can find all the information you'd need in the link below:

{% link-card title="Manifest Player Documentation" href="/consuming-a-livestream/play-a-stream-using-a-manifest" icon="AcademicCapIcon" description="Learn how to customize the Manifest Player" /%}

## Next Steps

Now that you have an idea of the basic setup, take a look through some of the other stories to find all the extra options that will help you get the most out of each component.

{% /tab-panel-item %}
{% tab-panel-item %}

A Player is 's video consumer API. There are two different kinds of players, Web Conference players, and Manifest players. A _Web Conference Player_ is used when connecting to a known `callId` instead of a Manifest player.
It allows a user to receive video and audio data via a web call.

## Before Getting Started

's Player API can either be used as a standalone JavaScript API or as a React Component Library.
The instructions below outline how to create a simple Player application using Vanilla JavaScript.

**IMPORTANT**: You will need _your domain_ which will be provided by .

Below are step-by-step instructions on how to set up a basic Player using Vanilla JavaScript.
If you want to just skip to the end and see it all put together, head [here](#full-code).

## Part I: Creating your bundle

In order to use the `video-client-core` dependency inside of a Vanilla JavaScript application you must use a static module bundler. For this example we will be using webpack.

### Step 1: Create your webpack.config.js file

```js
var webpack = require('webpack');

module.exports => {
    return {
        // Make sure to point this at the index.js file of @video-client-core
        entry: "./index.js",
        output: {
            path: __dirname + "/bundle",
            filename: 'videoClientLib.js',
            libraryTarget: 'var',
            library: 'VideoClient'
        },
    }
};
```

### Step 2: Now create your HTML page for your Player and add the created bundle

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
  </body>
</html>
```

### Step 3: Configure `VideoClient` Options.

Begin configuring your `VideoClient` options.
A new `VideoClient` instance takes as a parameter an _optional_ `VideoClientOptions` object comprised of
five optional properties:

1. `backendEndpoints` - _Optional_ - An array of loadbalancer urls. These are optional when using a manifest player, for a web conference player this is required, so for this example it will be required.
1. `token` - _Optional_ - A token.
1. `autoPlay` - _Optional_ - A boolean that determines if players should autoplay (`autoPlay: true`) or not (`autoPlay: false`).
1. `stats` - _Optional_ - A `VideoClientStats` options object.
1. `logger` - _Optional_ - A `LoggerCore` instance.
1. `loggerClientName` - _Optional_ - Passing this option appends the preferred app name to Video Client logs, i.e. "videoclient:loggerClientName"

### Step 4: Create a `VideoClient` instance

The VideoClient class is the foundation of the Video web encoder and player. It provides access
to a Call as well as manages peer state.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
    <script>
      window.onload = async function () {
        const yourDomain = "https://yourdomain.com";
        // Set your videoClient options
        const videoClientOptions = {
          backendEndpoints: [yourDomain],
          token: yourToken,
        };

        // Create your videoClient instance
        const vc = new VideoClient.VideoClient(videoClientOptions);
      };
    </script>
  </body>
</html>
```

### Step 5: Join a call

A `Call` is what connects a VideoClient instance to broadcasted streams.

In this example we are _joining_ an existing call.
Every call with have a unique `callId`, which is a property accessible off of the `Call` class: `call.id`. You will need the `callId` in
order to _join_ an existing call.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
    <script>
      window.onload = async function () {
        const yourDomain = "https://yourdomain.com";
        //Set your videoClient options
        const videoClientOptions = {
          backendEndpoints: [yourDomain],
          token: yourToken,
        };

        //Create your videoClient instance
        const vc = new VideoClient.VideoClient(videoClientOptions);

        //Join the call using your videoClient Instance.
        //Note call.id should be replaced with the unique Call ID for the call you would like to join
        const joinCall = await vc.joinCall(call.id);
      };
    </script>
  </body>
</html>
```

### Step 6: Grab your player from the `videoClient` instance and attach it to an HTML Element

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
    <script>
      window.onload = async function () {
        const yourDomain = "https://yourdomain.com";
        //Set your videoClient options
        const videoClientOptions = {
          backendEndpoints: [yourDomain],
          token: yourToken,
        };

        //Create your videoClient instance
        const vc = new VideoClient.VideoClient(videoClientOptions);

        //Join the call using your videoClient Instance.
        //Note call.id should be replaced with the unique Call ID for the call you would like to join
        const joinCall = await vc.joinCall(call.id, yourCallOptions);

        //Keep track of our player to ensure it exists for click handlers.
        let playerVideo;

        //Use the playerAdded event to watch if a player has been added.
        vc.on("playerAdded", (ev) => {
          // Use the isImplements method on the adapter device to ensure the CREATE_VIDEO_ELEMENT is enabled
          if (
            VideoClient.adapter.device.isImplements(
              VideoClient.adapter.Feature.CREATE_VIDEO_ELEMENT
            )
          ) {
            //Create the video element using videoClient
            const videoEl = VideoClient.adapter.device.createVideoElement();
            playerVideo = videoEl;
            //Set a width for the video (this can be done separately if needed)
            videoEl.width = 400;
            //Attach the video to the player
            ev.player.attachTo(videoEl);
            //Append your newly created video-element with the player attached to your document body
            document.getElementById("playerWrapper").appendChild(videoEl);
          }
        });
      };
    </script>
    <div id="playerWrapper"></div>
  </body>
</html>
```

### Step 7: Create your buttons to control the player and their on click event handlers

Notice that in our click handlers we are using the `videoPlayer` API.
`videoPlayer`: Will only affect the video that we see in the videoElement. `videoPlayer` has the following properties: `localAudioVolume`, `localVideoPaused`, `localAudioMuted`.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
    <script>
      window.onload = async function () {
        const yourDomain = "https://yourdomain.com";
        //Set your videoClient options
        const videoClientOptions = {
          backendEndpoints: [yourDomain],
          token: yourToken,
        };

        //Create your videoClient instance
        const vc = new VideoClient.VideoClient(videoClientOptions);

        //Join the call using your videoClient Instance.
        //Note call.id should be replaced with the unique Call ID for the call you would like to join
        const joinCall = await vc.joinCall(call.id, yourCallOptions);

        //Keep track of our player to ensure it exists for click handlers.
        let playerVideo;

        //Use the playerAdded event to watch if a player has been added.
        vc.on("playerAdded", (ev) => {
          // Use the isImplements method on the adapter device to ensure the CREATE_VIDEO_ELEMENT is enabled
          if (
            VideoClient.adapter.device.isImplements(
              VideoClient.adapter.Feature.CREATE_VIDEO_ELEMENT
            )
          ) {
            //Create the video element using videoClient
            const videoEl = VideoClient.adapter.device.createVideoElement();
            playerVideo = videoEl;
            //Set a width for the video (this can be done separately if needed)
            videoEl.width = 400;
            //Attach the video to the player
            ev.player.attachTo(videoEl);
            //Append your newly created video-element with the player attached to your document body
            document.getElementById("playerWrapper").appendChild(videoEl);
          }
        });

        //Click handler for playing/pausing the video
        function handlePlayerPlay() {
          //Ensure the player exists
          if (playerVideo) {
            playerVideo.localVideoPaused = !player.localVideoPaused;
          }
        }

        //Click handler for muting/unmuting the video
        function handlePlayerMute() {
          //Ensure the playerVideo exists
          if (playerVideo) {
            playerVideo.localAudioMuted = !playerVideo.localAudioMuted;
          }
        }

        //Click handler for entering fullScreen mode
        function handlePlayerFullScreen() {
          //Ensure the player exists
          if (playerVideo) {
            document.getElementById("playerWrapper").requestFullscreen();
          }
        }

        //Event listeners to trigger our click handler functions when button elements are clicked
        document
          .getElementById("playerPlayButton")
          .addEventListener("click", handlePlayerPlay, false);
        document
          .getElementById("playerMuteButton")
          .addEventListener("click", handlePlayerMute, false);
        document
          .getElementById("playerFullScreenButton")
          .addEventListener("click", handlePlayerFullScreen, false);
      };
    </script>
    <div id="playerWrapper"></div>
    <button id="playerPlayButton">Play/Pause</button>
    <button id="playerMuteButton">Mute</button>
    <button id="playerFullScreenButton">FullScreen</button>
  </body>
</html>
```

# Full Code

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
    <script>
      window.onload = async function () {
        const yourDomain = "https://yourdomain.com";
        //Set your videoClient options
        const videoClientOptions = {
          backendEndpoints: [yourDomain],
          token: yourToken,
        };

        //Create your videoClient instance
        const vc = new VideoClient.VideoClient(videoClientOptions);

        //Join the call using your videoClient Instance.
        //Note call.id should be replaced with the unique Call ID for the call you would like to join
        const joinCall = await vc.joinCall(call.id, yourCallOptions);

        //Keep track of our player to ensure it exists for click handlers.
        let playerVideo;

        //Use the playerAdded event to watch if a player has been added.
        vc.on("playerAdded", (ev) => {
          // Use the isImplements method on the adapter device to ensure the CREATE_VIDEO_ELEMENT is enabled
          if (
            VideoClient.adapter.device.isImplements(
              VideoClient.adapter.Feature.CREATE_VIDEO_ELEMENT
            )
          ) {
            //Create the video element using videoClient
            const videoEl = VideoClient.adapter.device.createVideoElement();
            playerVideo = videoEl;
            //Set a width for the video (this can be done separately if needed)
            videoEl.width = 400;
            //Attach the video to the player
            ev.player.attachTo(videoEl);
            //Append your newly created video-element with the player attached to your document body
            document.getElementById("playerWrapper").appendChild(videoEl);
          }
        });

        //Click handler for playing/pausing the video
        function handlePlayerPlay() {
          //Ensure the player exists
          if (playerVideo) {
            playerVideo.localVideoPaused = !playerVideo.localVideoPaused;
          }
        }

        //Click handler for muting/unmuting the video
        function handlePlayerMute() {
          //Ensure the player exists
          if (playerVideo) {
            playerVideo.localAudioMuted = !playerVideo.localAudioMuted;
          }
        }

        //Click handler for entering fullScreen mode
        function handlePlayerFullScreen() {
          //Ensure the player exists
          if (playerVideo) {
            document.getElementById("playerWrapper").requestFullscreen();
          }
        }

        //Event listeners to trigger our click handler functions when button elements are clicked
        document
          .getElementById("playerPlayButton")
          .addEventListener("click", handlePlayerPlay, false);
        document
          .getElementById("playerMuteButton")
          .addEventListener("click", handlePlayerMute, false);
        document
          .getElementById("playerFullScreenButton")
          .addEventListener("click", handlePlayerFullScreen, false);
      };
    </script>
    <div id="playerWrapper"></div>
    <button id="playerPlayButton">Play/Pause</button>
    <button id="playerMuteButton">Mute</button>
    <button id="playerFullScreenButton">FullScreen</button>
  </body>
</html>
```

{% /tab-panel-item %}
{% /tab-panel %}
{% /tabs  %}

{% feedback /%}
