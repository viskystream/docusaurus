---
route: /consuming-a-livestream/play-a-stream-using-a-manifest
pageTitle: Play a stream using a manifest
kind: guide
uuid: a2506b6b-94f9-426c-a866-d22c51c3f15d
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

## Manifest Player

Below are instructions on how to set up a basic Manifest Player which is a player that uses a manifest URL to receive video data.

## What is a Player?

Player is {% company-name /%}**'s** video consumer API. It allows a user to receive video and audio data via a web call. The Player API is intended for unidirectional video streaming applications such as one-way education, presentation, performance, and more.

## Before Getting Started

's Player API can either be used as a standalone JavaScript API or as a React Component Library. The instructions below outline how to create a simple Manifest Player application using React.

Project dependencies include knowledge of and experience with:

- [React](https://reactjs.org/docs/react-api.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Context](https://reactjs.org/docs/context.html), including [Providers](https://reactjs.org/docs/context.html#contextprovider)

If you are new to any of the above, we recommend spending some time familiarizing yourself with these before moving on.

**IMPORTANT**: You will need a _domain_ which will be provided by .

## Excluding Hls.js or Mpegts.js libraries from the bundle

By default, the player uses `hls.js` and `mpegts.js` npm packages, which means they will be included in the bundle and the player will be ready to play stream without additional requests. It's possible to exclude it from the bundle and load it on demand, which decreases the bundle size but adds a small delay before `hlsjs` or `flvhttp` start playing. To do that you need some js minifier with the ability to replace `proccess.env` with literals and remove dead code from the bundle and pass `HLSJS_BUNDLED=false` or/and `MPEGTS_BUNDLED=false` env to a minifier / bundler.
[How to reduce the size of the bundle?](/docs/basic-operator-integration/video-client#how-do-i-do-an-isimplements-check)

## Part I: Setting up a Basic Manifest Player

Below are step-by-step instructions on how to set up a basic `PlayerUiState` instance using a manifest. If you want to just skip to the end and see it all put together, head [here](#full-code).

### Step 1: Imports

To start, import the following:

1. `React`, `useEffect`, `useState` from `react`
2. `PlayerUI`, `PlayerUiContext`, and `VideoClient` from `@video/video-client-web`

```js
// in MyManifestPlayerApp.tsx
import React, { useEffect, useState } from "react";
import {
  PlayerUI,
  PlayerUiContext,
  VideoClient,
} from "@video/video-client-web";
```

### Step 2: Set `yourDomain` variable(s).

This will be provided by for your organization.

```js
// in MyManifestPlayerApp.tsx
const yourDomain = "https://yourdomain.com";
```

### Step 3: Configure `VideoClient` Options.

Begin configuring your `VideoClient` options.
A new `VideoClient` instance takes as a parameter an _optional_ `VideoClientOptions` object comprised of
five optional properties:

1. `backendEndpoints` - _Optional_ - An array of loadbalancer urls. These are optional when using a manifest player. For more info, see [Appendix](#backendEndpoints).
1. `token` - _Optional_ - A token. For more info, see [Appendix](#videoclientoptionstoken).
1. `autoPlay` - _Optional_ - A boolean that determines if players should autoplay (`autoPlay: true`) or not (`autoPlay: false`).
1. `stats` - _Optional_ - A `VideoClientStats` options object. For more info, see [Appendix](#videoclientoptionsstats).
1. `logger` - _Optional_ - A `LoggerCore` instance. For more info, see [Appendix](#videoclientoptionslogger).
1. `loggerClientName` - _Optional_ - Passing this option appends the preferred app name to Video Client logs, i.e. "videoclient:loggerClientName"

```js
interface VideoClientOptions {
  backendEndpoints?: string[];
  token?: TokenGetter;
  autoPlay?: boolean;
  stats?: VideoClientStats;
  logger?: LoggerCore;
  loggerClientName?: string;
}
```

### Step 4: Create a `VideoClient` instance.

The VideoClient class is the foundation of the Video web encoder and player. It provides access
to a Call as well as manages peer and player state.

1. Set up your main React component.

```js
// in MyManifestPlayerApp.tsx
const MyManifestPlayerApp = ({ props }) => {
  return <h1>Placeholder for Manifest Player App</h1>;
};
export default MyManifestPlayerApp;
```

1. Use the React `useState` hook to manage the `VideoClient` state.

```ts
// in MyManifestPlayerApp.tsx
/*
 * 4.2a Set local state.
 */
const [vc, setVc] = useState<types.VideoClient | null>(null);
/*
 * 4.2b For dev purposes only, let's console our state to make sure we
 * have the right data.
 */
console.log("VideoClient State", vc);
```

1. Use the React `useEffect` hook to create a new `VideoClient` instance.

Using your configured options from Step 3 we will create a `VideoClient` instance.

```ts
// in MyManifestPlayerApp.tsx
useEffect(() => {
  /*
   * 4.3a Setup a VideoClient instance. Be sure to include a state check to avoid
   * an infinite loop.
   */
  if (vc == null) {
    const opts: types.VideoClientOptions = {
      backendEndpoints: [yourDomain],
      loggerConfig: {
        clientName: "your-app-name",
        writeLevel: "debug", // Defaults to debug, but can be info, warn, notice, deprecated, network, local, timing, or trace. Recommend leaving this as debug.
      },
    };
    /*
     * 4.3b Set local state.
     */
    const newVc = new VideoClient(opts);
    setVc(newVc);
  }
  /*
   * 4.3c On unmount, be sure to dispose of the VideoClient and set state to `null`.
   */
  return () => {
    if (vc != null) {
      vc.dispose();
      setVc(null);
    }
  };
}, [vc]);
```

1. Putting it all together, your code should look like this at this point:

```tsx
// in MyManifestPlayerApp.tsx
import React, { useEffect, useState } from "react";
import {
  PlayerUiState,
  PlayerUiContext,
  types,
  VideoClient,
} from "@video/video-client-web";

const MyManifestPlayerApp = ({ props }) => {
  const yourDomain = "https://yourdomain.com";
  /*
   * 4.2a Set local state.
   */
  const [vc, setVc] = useState<types.VideoClientAPI | null>(null);
  /*
   * 4.2b For dev purposes only, let's console our state to make sure we
   * have the right data.
   */
  console.log("VideoClient State", vc);

  useEffect(() => {
    /*
     * 4.3a Setup a VideoClient instance. Be sure to include a state check to avoid
     * an infinite loop.
     */
    if (vc == null) {
      const opts: types.VideoClientOptions = {
        backendEndpoints: [yourDomain],
      };
      /*
       * 4.3b Set local state.
       */
      const newVc = new VideoClient(opts);
      setVc(newVc);
    }
    /*
     * 4.3c On unmount, be sure to dispose the VideoClient and set state to `null`.
     */
    return () => {
      if (vc != null) {
        vc.dispose();
        setVc(null);
      }
    };
    /*
     * 4.3d Include vc in the dependency array.
     */
  }, [vc]);

  /*
   * 4.1 Return placeholder UI.
   */
  return <h1>Placeholder for Manifest Player App</h1>;
};

export default MyManifestPlayerApp;
```

1. If you are on the right track, this is what you should be seeing in your console output and in the UI after you set your `vc` state.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/jasonmark@devcenter/CH5529fdba-7115-4e32-95dd-476bbe6da500" alt="Player data via console log" /%}
Expected console output at the end of Step 4.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/jasonmark@devcenter/CH5f9d4db2-376b-4f57-a60d-2379808b1f81" alt="Placeholder for Manifest Player App" /%}
Expected UI at the end of Step 4.

### Step 5: Get a Manifest.

A customer will receive a manifest in the callback to their integration with the video backend system. For more info, see [What are manifests?](/docs/basic-operator-integration/video-client#what-are-manifests).

1. Get your `manifestUrl`.

In this example we will be passing in a `manifestUrl` as a prop to our `MyManifestPlayerApp`. Your application may
have different functionality.

```tsx
// in MyManifestPlayerApp.tsx
/*
 * 5.1 Set manifestUrl as a prop in our MyManifestPlayerApp component
 */
const MyManifestPlayerApp = ({ manifestUrl, props }) => {
  // Rest of code here
};
```

### Step 6: Configure `PlayerOptions`.

The `VideoClient.requestPlayer()` method takes one required and one optional parameter: a required `manifest` (string) and an optional `PlayerOptions` object:

```ts
interface PlayerOptions {
  autoPlay?: boolean;
  players: string[] | PlayerSpec[];
}

interface PlayerSpec {
  id: string;
  options: any;
}
```

`PlayerOptions.players` object accepts either a string list or an array of `PlayerSpec` objects. If you want to limit available player drivers with default options, then pass a string list with desired players:

```ts
const player: types.PlayerAPI = vc.requestPlayer(manifestUrl, {
  players: ["webrtc", "hlsjs", "native-hls"],
});
```

When using `PlayerSpec` array, each player driver accepts its specific options:

```ts
const player: types.PlayerAPI = vc.requestPlayer(manifestUrl, {
  players: [
    { id: "webrtc" },
    { id: "hlsjs", options: { hlsjsPath: "http://example.com/hls.js" } },
    "native-hls",
  ],
});
```

List of player drivers and options:

#### webrtc

- `autoPlay` - _boolean_, overrides global `autoPlay` option

#### hlsjs

- `autoPlay` - _boolean_, overrides global `autoPlay` option
- `estimatedKbps` - _number_, estimated bitrate for ABR controller
- `maxBufferSize` - _number_, 'minimum' maximum buffer size in bytes. If buffer size upfront is bigger than this value, no fragment will be loaded.
- `maxBufferLength` - _number_, maximum buffer length in seconds. Hls.js will never exceed this value, even if maxBufferSize is not reached yet.
- `hlsjsPath` - _string_, URL to specific version of Hls.js
- `debug` - _boolean_, enables debug logs in console

#### native-hls

- `autoPlay` - _boolean_, overrides global `autoPlay` option

#### mp4-ws

- `autoPlay` - _boolean_, overrides global `autoPlay` option
- `maxShifts` - _number_, TBD
- `requiredBuffer` - _number_, TBD
- `requiredBufferBeforeRemove` - _number_, TBD
- `backFill` - _number_, TBD
- `maxGap` - _number_, TBD
- `retry` - _number_, TBD
- `mode` - _"A", "B", "N"_, TBD
- `download` - _boolean_, TBD
- `segmentDuration` - _number_, TBD
- `initFailTimeout` - _number_, TBD
- `playbackFailTimeout` - _number_, TBD
- `skipWatchInterval` - _number_, TBD
- `skipForwardThreshold` - _number_, TBD
- `bitrate` - _number_, TBD
- `estimatedKbps` - _number_, estimated bitrate for ABR controller
- `origin` - _boolean_, TBD

### Step 7: Request a manifest player.

1. Use the React `useState` hook to manage `playerUi` state.

```ts
// in MyManifestPlayerApp.tsx
/*
 * 7.2b Set local state.
 */
const [playerUi, setPlayerUi] = useState<PlayerUiState | null>(null);
/*
 * 7.2c For dev purposes only, let's console our state to make sure we
 * have the right data.
 */
console.log("Manifest Player Ui", playerUi);
```

1. Request manifest player.

Using the React `useEffect` hook, we will request a manifest player and set our local state.

```tsx
// in MyManifestPlayerApp.tsx
useEffect(() => {
  /*
   * 7.2a Check if playerUi is null to avoid a loop.
   */
  if (vc != null && playerUi == null && manifestUrl) {
    /*
     * 7.2c Your configured PlayerOptions from Step 6.
     */
    const options: Partial<types.PlayerOptions> = {};
    /*
     * 7.2d Await manifest player.
     */
    const player: types.PlayerAPI = vc.requestPlayer(manifestUrl, options);
    /*
     * 7.2e Set local state with a new PlayerUiState instance.
     */
    setPlayerUi(new PlayerUiState(player));
  }
  /*
   * 7.2f Include vc, playerUi, and manifestUrl in the dependency array.
   */
}, [vc, playerUi, manifestUrl]);
```

1. **Important: Clean up!** Be sure to dispose of the `PlayerUiState` (in this case, on unmount). Your implementation may have different functionality,
   so you may not want to dispose on unmount, but be sure to dispose of the Player instance when appropriate.

```tsx
// in MyManifestPlayerApp.tsx
useEffect(() => {
  if (vc != null && playerUi == null && manifestUrl) {
    const options: Partial<types.PlayerOptions> = {};
    const player: types.PlayerAPI = vc.requestPlayer(manifestUrl, options);
    setPlayerUi(new PlayerUiState(player));
  }
  /*
   * 7.3a In the same useEffect as above, utilize the useEffect cleanup.
   */
  return () => {
    /*
     * 7.3b Check is current state is not null.
     */
    if (playerUi != null) {
      /*
       * 7.3c Dispose encoderUi and set state to null.
       */
      playerUi.dispose();
      setPlayerUi(null);
    }
  };
}, [vc, playerUi, manifestUrl]);
```

1. Putting it all together, your code should look like this at this point:

```tsx
// in MyManifestPlayerApp.tsx
import React, { useEffect, useState } from "react";
import {
  PlayerUiState,
  PlayerUiContext,
  types,
  VideoClient,
} from "@video/video-client-web";

const MyManifestPlayerApp = ({ manifestUrl, props }) => {
  const [vc, setVc] = useState<types.VideoClientAPI | null>(null);
  const [playerUi, setPlayerUi] = useState<PlayerUiState | null>(null);

  const yourDomain = "https://yourdomain.com";

  /*
   * For dev purposes only, let's console our state to make sure we
   * have the right data.
   */
  console.log("VideoClient State", vc);
  console.log("Manifest Player Ui", playerUi);

  useEffect(() => {
    if (vc == null) {
      const opts: types.VideoClientOptions = {
        backendEndpoints: [yourDomain],
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

  useEffect(() => {
    if (vc != null && playerUi == null && manifestUrl) {
      const options: Partial<types.PlayerOptions> = {};
      const player: types.PlayerAPI = vc.requestPlayer(manifestUrl, options);
      setPlayerUi(new PlayerUiState(player));
    }
    return () => {
      if (playerUi != null) {
        playerUi.dispose();
        setPlayerUi(null);
      }
    };
  }, [vc, playerUi, manifestUrl]);

  /*
   * Let's add some Ui to remind us to include a manifestUrl
   */
  if (!manifestUrl) {
    return <h3>Please input a valid manifest url.</h3>;
  }

  return <h1>Placeholder for Manifest Player App</h1>;
};

export default MyManifestPlayerApp;
```

1. If you are on the right track, this is what you should be seeing in your console output and in the UI.

**Important**: Remember to pass in a valid `manifestUrl` prop!

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/jasonmark@devcenter/CH67bc8f1d-6213-4f5b-9315-657f9732e997" alt="VideoClient and Manifest Player data via console log" /%}
Expected console output at the end of Step 7.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/jasonmark@devcenter/CH5f9d4db2-376b-4f57-a60d-2379808b1f81" alt="Placeholder for Player" /%}
Expected UI at the end of Step 7.

### Step 8: Create a Player Provider

Now that you have a working `VideoClient` and `playerUi` state, it's time to start building the UI of your application.
's UI components access _global state_ via React `Context`. For more background information, check out the
[React Context docs](https://reactjs.org/docs/context.html).

1. Create a new file for our UI Component, and set aside.

```js
// in Player.tsx
import React from "react";

const Player = () => {
  return <>Placeholder for Player Component!</>;
};

export default Player;
```

1. Back in `MyManifestPlayerApp.tsx`, import `PlayerUiContext` and our new component.

```js
// in MyManifestPlayerApp.tsx
import { PlayerUiContext } from "@video/video-client-web";
import Player from "./Player";
```

1. Create a React Context `Provider` for your Call store using the `PlayerUiContext` Context instance. Grab the `playerUi` value
   from the local React state.

```js
// in MyManifestPlayerApp.tsx
return <PlayerUiContext.Provider value={playerUi}></PlayerUiContext.Provider>;
```

1. Implement Player Provider.

**Important: The Provider needs to _wrap_ our `Player` component.**

```js
// in MyManifestPlayerApp.tsx
/*
 * 9.4a If our state is null, let's just return a fragment.
 * Loading our Player component with an invalid store will throw errors.
 */
if (playerUi == null) {
  return <></>;
}
/*
 * 9.4b If our playerUi state is available, let's return our
 * Provider and Player component.
 */
return (
  <PlayerUiContext.Provider value={playerUi}>
    <Player />
  </PlayerUiContext.Provider>
);
```

1. Putting it all together.

This is how our application should be looking at this point:

```js
// in Player.tsx
import React from "react";

const Player = () => {
  return <>Placeholder for Player Component!</>;
};

export default Player;
```

```ts
// in MyManifestPlayerApp.tsx
import React, { useEffect, useState } from "react";
import {
  PlayerUiState,
  PlayerUiContext,
  types,
  VideoClient,
} from "@video/video-client-web";
import Player from "./Player";

const MyManifestPlayerApp = ({ manifestUrl, props }) => {
  const [vc, setVc] = useState<types.VideoClientAPI | null>(null);
  const [playerUi, setPlayerUi] = useState<PlayerUiState | null>(null);
  const yourDomain = "https://yourdomain.com";
  /*
   * For dev purposes only, let's console our our state to make sure we
   * have the right data.
   */
  console.log("VideoClient State", vc);
  console.log("Manifest Player Ui", playerUi);

  useEffect(() => {
    if (vc == null) {
      const opts: types.VideoClientOptions = {
        backendEndpoints: [yourDomain],
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

  useEffect(() => {
    if (vc != null && playerUi == null && manifestUrl) {
      const options: Partial<types.PlayerOptions> = {};
      const player: types.PlayerAPI = vc.requestPlayer(manifestUrl, options);
      setPlayerUi(new PlayerUiState(player));
    }
    return () => {
      if (playerUi != null) {
        playerUi.dispose();
        setPlayerUi(null);
      }
    };
  }, [vc, playerUi, manifestUrl]);

  /*
   * Let's add some Ui to remind us to include a manifestUrl
   */
  if (!manifestUrl) {
    return <h3>Please input a valid manifest url.</h3>;
  }

  if (playerUi == null) {
    return <></>;
  }

  return (
    <PlayerUiContext.Provider value={playerUi}>
      <Player />
    </PlayerUiContext.Provider>
  );
};

export default MyManifestPlayerApp;
```

1. If you are on the right track, this is what you should be seeing in the UI.

**Important**: Remember to pass in a valid `manifestUrl` prop!

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/jasonmark@devcenter/CHd807f821-4f62-4aca-a8fd-650c0873e458" alt="Expected UI at the end of Step 8." /%}
Expected UI at the end of Step 8. Your console output should stay the same as in the previous step. Nice work!

## Part II: Build Some UI and Consume the Context

### Step 9: Build the Player UI using React Components

1. Import Player Components.

```js
// in Player.tsx
import {
  ControlBar,
  MediaContainer,
  PlayerAudioButton,
  PlayerBitrateButton,
  PlayerFullscreenButton,
  PlayerGetSoundButton,
  PlayerNewWindowButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
} from "@video/video-client-web";
```

1. Assemble a Player.

These modular components are independent of one another and can be arranged however you like. The `MediaContainer` and `ControlBar` are merely wrappers for styling purposes.

```js
// in Player.tsx

return (
   {* 9.2a MediaContainer should wrap all components for styling. *}
    <MediaContainer>
        <PlayerGetSoundButton />
        <PlayerVideo />
        {* 9.2b ControlBar wraps controls (for styling). Pass in "player"
        to the variant prop in ControlBar. *}
        <ControlBar variant="player">
          <PlayerPlayButton />
          <PlayerAudioButton />
          <PlayerVolumeRange />
          <PlayerBitrateButton />
          <PlayerFullscreenButton />
          <PlayerNewWindowButton />
        </ControlBar>
        <PlayerOverlayButton />
    </MediaContainer>
);
```

1. Putting it all together, our `Player.tsx` should now look like this:

```js
// in Player.jsx

import React from "react";
import {
  ControlBar,
  MediaContainer,
  PlayerAudioButton,
  PlayerBitrateButton,
  PlayerFullscreenButton,
  PlayerGetSoundButton,
  PlayerNewWindowButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
} from "@video/video-client-web";

const Player = () => {
  return (
    <MediaContainer>
      <PlayerGetSoundButton />
      <PlayerVideo />
      <ControlBar variant="player">
        <PlayerPlayButton />
        <PlayerAudioButton />
        <PlayerVolumeRange />
        <PlayerBitrateButton />
        <PlayerFullscreenButton />
        <PlayerNewWindowButton />
      </ControlBar>
      <PlayerOverlayButton />
    </MediaContainer>
  );
};

export default Player;
```

And our UI should now look something like this:

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/jasonmark@devcenter/CH1231f62e-0d2c-46ab-9a48-a17611ee6ff2" alt="Screenshot of player" /%}
Expected UI at the end of Step 9. Woohoo! You did it!

### Step 10. Access Context

Next, you'll access the `playerCtx` context from the Context Provider.

**Important to note:** In order to update the `playerCtx` and make these updates available via `Context` (i.e. available
to all components nested within the Provider tree), updates need to occur _within_ a nested component NOT in the component
which declares the `Provider`.

1. Import `useContext` from React and `PlayerUiContext` from `@video/video-client-web`.

```js
// in `Player.tsx`
import React, { useContext } from "react";
import { PlayerUiContext } from "@video/video-client-web";
```

1. Access `Context` via React's `useContext` hook.

```js
// in `Player.tsx`
const playerCtx = useContext(PlayerUiContext);
```

1. Putting it all together.

Not much has changed in this step (our UI and console output should remain the same as in Step 9), but our `Player` component should now look like this:

```js
// in Player.tsx
import React, { useContext } from "react";
import {
  ControlBar,
  PlayerUiContext,
  MediaContainer,
  PlayerAudioButton,
  PlayerBitrateButton,
  PlayerFullscreenButton,
  PlayerGetSoundButton,
  PlayerNewWindowButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
} from "@video/video-client-web";

const Player = () => {
  const playerCtx = useContext(PlayerUiContext);

  return (
    <MediaContainer>
      <PlayerGetSoundButton />
      <PlayerVideo autoPlayerSetup />
      <ControlBar variant="player">
        <PlayerPlayButton />
        <PlayerAudioButton />
        <PlayerVolumeRange />
        <PlayerBitrateButton />
        <PlayerFullscreenButton />
        <PlayerNewWindowButton />
      </ControlBar>
      <PlayerOverlayButton />
    </MediaContainer>
  );
};

export default Player;
```

### Step 11. Working with Context.

Now that you have a Player up and running, you may have some functionality in your application that requires interacting with the `Player` API. In almost all cases, you will want to call any methods and make any changes to your state _within_ the `PlayerUiContext.Provider`, that way your Context is updated. If you make any updates to your Context _outside_ of the `PlayerUiContext.Provider`, those changes will not be reflected in your application.

1. **Do This:** Call methods and update Context WITHIN the `PlayerUiContext.Provider`.

```ts
// in Player.tsx
import React, { useContext, useEffect } from "react";
import {
  ControlBar,
  PlayerUiContext,
  MediaContainer,
  PlayerAudioButton,
  PlayerBitrateButton,
  PlayerFullscreenButton,
  PlayerGetSoundButton,
  PlayerNewWindowButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
} from "@video/video-client-web";

const Player = () => {
  /*
   * 11.1a Access the playerCtx via the useContext hook.
   */
  const playerCtx = useContext(PlayerUiContext);

  /*
   * 11.1b Make updates to your Player store, call Player methods, etc.
   * here or within nested components that access Context from the same
   * Provider.
   */
  useEffect(() => {
    playerCtx.player.localVideoPaused = true;
    // Will pause the player.
  }, []);

  return (
    <MediaContainer>
      <PlayerGetSoundButton />
      <PlayerVideo />
      <ControlBar variant="player">
        <PlayerPlayButton />
        <PlayerAudioButton />
        <PlayerVolumeRange />
        <PlayerBitrateButton />
        <PlayerFullscreenButton />
        <PlayerNewWindowButton />
      </ControlBar>
      <PlayerOverlayButton />
    </MediaContainer>
  );
};

export default Player;
```

1. **Not This:** Don't call methods or update Context from OUTSIDE the `PlayerUiContext.Provider`.

```ts
// in MyManifestPlayerApp.tsx
import React, { useEffect, useState } from "react";
import {
  PlayerUiState,
  PlayerUiContext,
  types,
  VideoClient,
} from "@video/video-client-web";
import Player from "./Player";

const MyManifestPlayerApp = ({ manifestUrl, props }) => {
  const [vc, setVc] = useState<types.VideoClientAPI | null>(null);
  const [playerUi, setPlayerUi] = useState<PlayerUiState | null>(null);
  const yourDomain = "https://yourdomain.com";

  /*
   * 11.2a With few exceptions (dispose being one of them), DO NOT make updates to
   * your Player store, call Player methods, etc. here. Any changes you make will not
   * be reflected in your Context, and therefore, your application.
   */
  const playerCtx = useContext(PlayerUiContext);

  useEffect(() => {
    playerCtx.player.localVideoPaused = true;
    // Will NOT pause the player.
  }, []);

  useEffect(() => {
    if (vc == null) {
      const opts: types.VideoClientOptions = {
        backendEndpoints: [yourDomain],
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

  useEffect(() => {
    if (vc != null && playerUi == null && manifestUrl) {
      const options: Partial<types.PlayerOptions> = {};
      const player: types.PlayerAPI = vc.requestPlayer(manifestUrl, options);
      setPlayerUi(new PlayerUiState(player));
    }
    return () => {
      if (playerUi != null) {
        playerUi.dispose();
        setPlayerUi(null);
      }
    };
  }, [vc, playerUi, manifestUrl]);

  if (!manifestUrl) {
    return <h3>Please input a valid manifest url.</h3>;
  }

  if (playerUi == null) {
    return <></>;
  }

  return (
    <PlayerUiContext.Provider value={playerUi}>
      <Player />
    </PlayerUiContext.Provider>
  );
};

export default MyManifestPlayerApp;
```

# Full Code

```ts
// in Player.tsx
import React, { useContext, useEffect } from "react";
import {
  ControlBar,
  PlayerUiContext,
  MediaContainer,
  PlayerAudioButton,
  PlayerBitrateButton,
  PlayerFullscreenButton,
  PlayerGetSoundButton,
  PlayerNewWindowButton,
  PlayerOverlayButton,
  PlayerPlayButton,
  PlayerVideo,
  PlayerVolumeRange,
} from "@video/video-client-web";

const Player = () => {
  const playerCtx = useContext(PlayerUiContext);

  return (
    <MediaContainer>
      <PlayerGetSoundButton />
      <PlayerVideo />
      <ControlBar variant="player">
        <PlayerPlayButton />
        <PlayerAudioButton />
        <PlayerVolumeRange />
        <PlayerBitrateButton />
        <PlayerFullscreenButton />
        <PlayerNewWindowButton />
      </ControlBar>
      <PlayerOverlayButton />
    </MediaContainer>
  );
};

export default Player;
```

```ts
// in MyManifestPlayerApp.tsx
import React, { useEffect, useState } from "react";
import {
  PlayerUiState,
  PlayerUiContext,
  types,
  VideoClient,
} from "@video/video-client-web";
import Player from "./Player";

const MyManifestPlayerApp = ({ manifestUrl, props }) => {
  const [vc, setVc] = useState<types.VideoClient | null>(null);
  const [playerUi, setPlayerUi] = useState<PlayerUiState | null>(null);
  const yourDomain = "https://yourdomain.com";

  useEffect(() => {
    if (vc == null) {
      const opts: types.VideoClientOptions = {
        backendEndpoints: [yourDomain],
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

  useEffect(() => {
    if (vc != null && playerUi == null && manifestUrl) {
      const options: Partial<types.PlayerOptions> = {};
      const player: types.PlayerAPI = vc.requestPlayer(manifestUrl, options);
      setPlayerUi(new PlayerUiState(player));
    }
    return () => {
      if (playerUi != null) {
        playerUi.dispose();
        setPlayerUi(null);
      }
    };
  }, [vc, playerUi, manifestUrl]);

  if (!manifestUrl) {
    return <h3>Please input a valid manifest url.</h3>;
  }

  if (playerUi == null) {
    return <></>;
  }

  return (
    <PlayerUiContext.Provider value={playerUi}>
      <Player />
    </PlayerUiContext.Provider>
  );
};

export default MyManifestPlayerApp;
```

For more info, see [What are manifests?](/docs/basic-operator-integration/video-client#what-are-manifests).

# Appendix

#### VideoClientOptions.token

Either a token `string` or a `TokenRefresher` can be passed in.

```ts
type TokenRefresher = () => Promise<string>;
type TokenGetter = string | TokenRefresher;
```

#### VideoClientOptions.backendEndpoints

This is an array of loadbalancer urls. One url is required and additional fallback urls are optional, and the urls will be tried in order.

#### VideoClientOptions.mediaController

A `MediaStreamController` instance. A `MediaStreamController` takes one _optional_ `options` parameter.

```ts
interface MediaStreamControllerOptions {
  defaultConstraints: {
    audio: DeepReadonly<MediaTrackConstraints>;
    video: DeepReadonly<MediaTrackConstraints>;
    screencapture: DeepReadonly<MediaTrackConstraints>;
  };
  fallbackConstraints: {
    audio: DeepReadonly<MediaTrackConstraints>;
    video: DeepReadonly<MediaTrackConstraints>;
    screencapture: DeepReadonly<MediaTrackConstraints>;
  } | null;
  replaceTracks: boolean;
  waitingDelay: number;
  defaultLockPolicy: ExistsStreamPolicy;
}

/*
 * Example
 */
const myMediaStreamController = new MediaStreamController(
  MediaStreamControllerOptions
);
```

#### VideoClientOptions.logger

A `LoggerCore` instance.

```ts
import LoggerCore from "@video/log-client";

const myLogger = new LoggerCore("myLogger");
```

#### VideoClientOptions.stats

A `VideoClientStats` options object.

```ts
interface VideoClientStats {
  app: string;
  userId: string;
  statsInterval?: number;
  streamId?: string;
  studioId?: string;
  rsrc?: string;
  xkey?: string;
  bpeerId?: string;
  debugLogs?: boolean;
}
```

#### PlayerBitrateButton Component

A parent component for PlayerQualitySettings, used only in the manifest player. This component allows the user to select different bitrates for a player and toggle between low and high latency streams.

**Available Props:**

```ts
type QualitySettingsProps = {
  classes?: {
    //NOT REQUIRED: Styling properties for quality select settings.
    root?: {}; // Styles the root element for the quality select feature.
    option?: {}; // Styles the element for an inactive bitrate selection option.
    activeOption?: {}; // Styles the element for an active bitrate selection option.
    disabledOption?: {}; // Styles the element for an inactive and disabled bitrate selection option.
  };
  showBitrate?: boolean; // NOT REQUIRED: When true the bitrate will appear next to each bitrate option
  disableToggle?: boolean; // NOT REQUIRED: When true the latency toggle is disabled and accepts no click events.
  disableSelect?: boolean; // NOT REQUIRED: When true the bitrate selection options are disabled and accepts no click events.
};
```

Usage example, disabled latency toggle:

```ts
<PlayerBitrateButton
  disabledToggle
  classes={{ root: {}, option: {}, activeOption: {}, disabledOption: {} }}
/>
```

{% /tab-panel-item %}
{% tab-panel-item %}

## Manifest Player

The Player is 's video consumer API. There are two different kinds of players, Web Conference players and Manifest players. A _Web Conference Player_ is used when connecting to a known `callId` instead of a Manifest player.
It allows a user to receive video and audio data via a web call. In this guide we will be learning how to create a Manifest Player using Vanilla JavaScript.

## Before Getting Started

's Player API can either be used as a standalone JavaScript API or as a React Component Library.
The instructions below outline how to create a simple Manifest Player application using Vanilla JavaScript.

**IMPORTANT**: You will need _your domain_ which will be provided by .

Below are step-by-step instructions on how to set up a Manifest Player using Vanilla JavaScript.
If you want to just skip to the end and see it all put together, head [here](#full-code-1).

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
1. `streamId` - _Optional_ - The id for the stream that is being viewed.
1. `autoPlay` - _Optional_ - A boolean that determines if players should autoplay (`autoPlay: true`) or not (`autoPlay: false`).
1. `stats` - _Optional_ - A `VideoClientStats` options object.
1. `logger` - _Optional_ - A `LoggerCore` instance.
1. `loggerClientName` - _Optional_ - Passing this option appends the preferred app name to Video Client logs, i.e. "videoclient:loggerClientName"

### Step 4: Create a `VideoClient` instance

The `VideoClient` class is the foundation of the Video web encoder and player. It provides access
to a Call as well as manages peer state. For this function we are going to want to receive a manifest URL which will be required for the `manifestPlayer` when the `VideoClient` is created.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
    <script>
      function createVideoClient() {
        //Here we are grabbing the streamKey at the end of our manifestURL
        const streamKey = manifestUrl.slice(
          manifestUrl.lastIndexOf("/") + 1,
          manifestUrl.indexOf(".json")
        );
        //Creating our VideoClient instance
        const vc = new VideoClient.VideoClient({
          backendEndpoints: ["https://yourEndpoint"],
          stats: {
            app: "Storybook",
            userId: uuid,
            statsInterval: 5000,
            streamId: streamKey,
            studioId: "321",
          },
        });
        return false;
      }
    </script>
  </body>
</html>
```

### Step 5: Create our player using the VideoClient

Next we need to create our `manifestPlayer`, this can be done by requesting a new player from the `VideoClient`.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
    <script>
      function createVideoClient() {
        //Here we are grabbing the streamKey at the end of our manifestURL
        const streamKey = manifestUrl.slice(
          manifestUrl.lastIndexOf("/") + 1,
          manifestUrl.indexOf(".json")
        );

        const vc = new VideoClient.VideoClient({
          backendEndpoints: ["https://yourEndpoint"],
          stats: {
            app: "Storybook",
            userId: uuid,
            statsInterval: 5000,
            streamId: streamKey,
            studioId: "321",
          },
        });
        let player;
        try {
          //Here we are creating our player from the VideoClient
          player = vc.requestPlayer(manifestUrl);
        } catch (err) {
          throw err;
        }

        return false;
      }
    </script>
  </body>
</html>
```

### Step 6: Add our player to the page

Now we need to create a method that will add our player to our web page.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
    <script>
      //This is used to store our player outside of each functions scope
      let playerVideo;

      function addPlayer(player) {
        //Here we are ensuring the Create Video Element feature exists on the current VideoClient
        if (
          VideoClient.adapter.device.isImplements(
            VideoClient.adapter.Feature.CREATE_VIDEO_ELEMENT
          )
        ) {
          //Now we create our player and append it to or playerWrapper
          const videoEl = VideoClient.adapter.device.createVideoElement();
          playerVideo = player;
          videoEl.width = 400;
          playerVideo.localAudioMuted = false;
          player.attachTo(videoEl);
          document.getElementById("playerWrapper").appendChild(videoEl);
        }
      }

      function createVideoClient() {
        //Here we are grabbing the streamKey at the end of our manifestURL
        const streamKey = manifestUrl.slice(
          manifestUrl.lastIndexOf("/") + 1,
          manifestUrl.indexOf(".json")
        );

        const vc = new VideoClient.VideoClient({
          backendEndpoints: ["https://yourEndpoint"],
          stats: {
            app: "Storybook",
            userId: uuid,
            statsInterval: 5000,
            streamId: streamKey,
            studioId: "321",
          },
        });
        let player;
        try {
          player = vc.requestPlayer(manifestUrl);
        } catch (err) {
          throw err;
        }

        addPlayer(player);

        return false;
      }
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
      let playerVideo;

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

      function addPlayer(player) {
        //Here we are ensuring the Create Video Element feature exists on the current VideoClient
        if (
          VideoClient.adapter.device.isImplements(
            VideoClient.adapter.Feature.CREATE_VIDEO_ELEMENT
          )
        ) {
          //Now we create our player and append it to or playerWrapper
          const videoEl = VideoClient.adapter.device.createVideoElement();
          playerVideo = player;
          videoEl.width = 400;
          playerVideo.localAudioMuted = false;
          player.attachTo(videoEl);
          document.getElementById("playerWrapper").appendChild(videoEl);
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
      }

      function createVideoClient() {
        //Here we are grabbing the streamKey at the end of our manifestURL
        const streamKey = manifestUrl.slice(
          manifestUrl.lastIndexOf("/") + 1,
          manifestUrl.indexOf(".json")
        );

        const vc = new VideoClient.VideoClient({
          backendEndpoints: ["https://yourEndpoint"],
          stats: {
            app: "Storybook",
            userId: uuid,
            statsInterval: 5000,
            streamId: streamKey,
            studioId: "321",
          },
        });
        let player;
        try {
          player = vc.requestPlayer(manifestUrl);
        } catch (err) {
          throw err;
        }

        addPlayer(player);

        return false;
      }
    </script>
    <div id="playerWrapper"></div>
    <button id="playerPlayButton">Play/Pause</button>
    <button id="playerMuteButton">Mute</button>
    <button id="playerFullScreenButton">FullScreen</button>
  </body>
</html>
```

### Step 8: Add an input for the manifest URL

Finally we are going to add an input where a manifest URL can be added and sent to our created function. Note: this is not the required way to do this, likely you will want to add the manifestUrl without user input but this is a good way to test if your player is working as expected with different manifests.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="/videoClientLib.js"></script>
    <script>
      let playerVideo;

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

      function addPlayer(player) {
        //Here we are ensuring the Create Video Element feature exists on the current VideoClient
        if (
          VideoClient.adapter.device.isImplements(
            VideoClient.adapter.Feature.CREATE_VIDEO_ELEMENT
          )
        ) {
          //Now we create our player and append it to or playerWrapper
          const videoEl = VideoClient.adapter.device.createVideoElement();
          playerVideo = player;
          videoEl.width = 400;
          playerVideo.localAudioMuted = false;
          player.attachTo(videoEl);
          document.getElementById("playerWrapper").appendChild(videoEl);
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
      }

      function createVideoClient() {
        //Finally we can grab our manifest URL when this function is called.
        const manifestUrl = document.getElementById("manifest").value;
        //Here we are grabbing the streamKey at the end of our manifestURL
        const streamKey = manifestUrl.slice(
          manifestUrl.lastIndexOf("/") + 1,
          manifestUrl.indexOf(".json")
        );

        const vc = new VideoClient.VideoClient({
          backendEndpoints: ["https://yourEndpoint"],
          stats: {
            app: "Storybook",
            userId: uuid,
            statsInterval: 5000,
            streamId: streamKey,
            studioId: "321",
          },
        });
        let player;
        try {
          player = vc.requestPlayer(manifestUrl);
        } catch (err) {
          throw err;
        }

        addPlayer(player);

        return false;
      }
    </script>
    <div id="playerWrapper"></div>
    <button id="playerPlayButton">Play/Pause</button>
    <button id="playerMuteButton">Mute</button>
    <button id="playerFullScreenButton">FullScreen</button>
    <br />
    <label>Manifest Url: </label>
    <form />
    <input type="text" id="manifest" name="manifest" />
    <button id="submit" onclick="return createVideoClient()">Submit</button>
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
      let playerVideo;

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

      function addPlayer(player) {
        //Here we are ensuring the Create Video Element feature exists on the current VideoClient
        if (
          VideoClient.adapter.device.isImplements(
            VideoClient.adapter.Feature.CREATE_VIDEO_ELEMENT
          )
        ) {
          //Now we create our player and append it to or playerWrapper
          const videoEl = VideoClient.adapter.device.createVideoElement();
          playerVideo = player;
          videoEl.width = 400;
          playerVideo.localAudioMuted = false;
          player.attachTo(videoEl);
          document.getElementById("playerWrapper").appendChild(videoEl);
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
      }

      function createVideoClient() {
        //Finally we can grab our manifest URL when this function is called.
        const manifestUrl = document.getElementById("manifest").value;
        //Here we are grabbing the streamKey at the end of our manifestURL
        const streamKey = manifestUrl.slice(
          manifestUrl.lastIndexOf("/") + 1,
          manifestUrl.indexOf(".json")
        );

        const vc = new VideoClient.VideoClient({
          backendEndpoints: ["https://yourEndpoint"],
          stats: {
            app: "Storybook",
            userId: uuid,
            statsInterval: 5000,
            streamId: streamKey,
            studioId: "321",
          },
        });
        let player;
        try {
          player = vc.requestPlayer(manifestUrl);
        } catch (err) {
          throw err;
        }

        addPlayer(player);

        return false;
      }
    </script>

    <div id="playerWrapper"></div>
    <button id="playerPlayButton">Play/Pause</button>
    <button id="playerMuteButton">Mute</button>
    <button id="playerFullScreenButton">FullScreen</button>
    <br />
    <label>Manifest Url: </label>
    <form />
    <input type="text" id="manifest" name="manifest" />
    <button id="submit" onclick="return createVideoClient()">Submit</button>
  </body>
</html>
```

{% /tab-panel-item %}
{% /tab-panel %}
{% /tabs  %}

{% feedback /%}
