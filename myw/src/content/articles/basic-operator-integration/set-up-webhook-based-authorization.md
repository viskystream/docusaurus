---
route: /basic-operator-integration/methods-of-authorization/authentication-webhooks/set-up-webhook-based-authorization
pageTitle: Set up webhook based authorization
kind: guide
uuid: 77f7bb8f-272e-44c9-83dd-817090fa8437
---

### Using the correct client referrer

If you have chosen to authorize your viewers with a webhook, ensure that you are starting broadcasts with the client referrer set to `live-service-webhooks`.

### Set up an endpoint for broadcast authorization

To view the full spec of the broadcaster webhook, see [here](/docs/apis/lsi#/webhooks/broadcastState).

### Set up an endpoint for viewer authorization

To view the full spec of the viewer webhook, see [here](/docs/apis/lsi#/webhooks/get_configurable_path_for_viewer_authentication).

### Configure your endpoints in the webhook application

Go to the [Live Service tab in the events console](/apps/events/live/settings) to put in the appropriate urls on which each webhook is served. Use the full https URL.