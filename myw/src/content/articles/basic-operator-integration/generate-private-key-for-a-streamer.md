---
route: /basic-operator-integration/methods-of-authorization/authorized-vs-public-streams/generate-private-key-for-a-streamer
pageTitle: Generate Private Key for a Streamer
kind: guide
uuid: 604319db-1132-4409-8162-ab95fcdd85a3
---

Operators can track active live streams, revoke those streams, and enable live stream viewers to get active streams and their associated manifests using the Live Service Integration, or [LSI](/docs/basic-operator-integration/methods-of-authorization/authorized-vs-public-streams). LSI also enables the generation of private keys for a broadcaster, allowing operators to restrict streaming access only to authorized users.

To generate a private key, the integrator should make a GET request to `/api/ls/v1/key/{userId}`, where `userId` is some key meaningful to integrators such as a broadcaster username or record ID. This endpoint will return a private key which integrators may return to their broadcaster to use as a stream key.

An example of how you might make this request in a NodeJS app, using your operator bearer token (see [Set up token-based authorization](/docs/basic-operator-integration/methods-of-authorization/authentication-tokens/set-up-token-based-authorization)):

```js
import fetch from 'node-fetch';

const DOMAIN = `yourhosteddomain.com`

const getBroadcasterPrivateKey = async (broadcasterId) => {
    const response = await fetch(`${DOMAIN}/api/ls/v1/key/${broadcasterId}`, {
        headers: {
            authorization: `Bearer ${operatorBearerToken}`
        }
    })
    const privateKey = await response.json();
    return privateKey;
};
```

LSI also generates a public key pair which is used to authorize viewers. To get this public key, the integrator should call `/api/ls/v1/live/user/{userId}`.

```js
const getBroadcasterPublicKey = async (broadcasterPrivateKey) => {
    const response = await fetch(`${DOMAIN}/api/ls/v1/live/user/${broadcasterPrivateKey}`)
    const publicKey = await response.json();
    return publicKey;
};
```

However, a viewer will typically need to select which stream they intend to view first. A list of all active streams is available from the `/api/ls/v1/live` endpoint, which returns those streams\` manifests and public keys.

A sample of how a front-end application might implement this functionality:

```js
// Used to display a list of live streams for viewers to pick from
const getLiveStreams = async () => {
    const response = await fetch(`${DOMAIN}/api/ls/v1/live/`);
    const liveStreams = await response.json();
    return liveStreams;
};
```

If returning to a stream detail page where one only has the cached public key (the manifest may have changed between stream sessions), you can use the same pattern to call the streamer manifest endpoint `/api/ls/v1/live/{publicKey}` to fetch the latest manifest.

The integrator should use their own authorization layers to sign up streamers/viewers and make this request on behalf of the end user.

From the streamer's perspective, getting to stream follows these steps:

1. Broadcaster signs up with the integrator
2. Broadcaster requests authorization to stream from the integrator
3. Integrator calls NativeFrame's `/apis/ls/v1/key` route to get a private key
4. Integrator returns retrieved the private key to the streamer with streaming instructions
5. Streamer starts a stream with this private key

From the viewer's perspective, viewing a stream follows these steps:

1. Viewer signs up with integrator
2. Viewer requests authorization to view streams from the integrator
3. Integrator calls NativeFrame's `/api/ls/v1/live` route to get a list of streams and present it to the viewer as a UI
4. Viewer picks a stream from the list
5. Viewer is redirected to the NativeFrame player with the resulting manifest with the public key

{% feedback /%}
