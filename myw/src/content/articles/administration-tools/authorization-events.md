---
route: /administration-tools/authorization-events
pageTitle: Authorization events
kind: guide
uuid: 327be7c3-ed1b-4949-8863-2c159a775b78
---

**NOTE: Webhook Events app - is the main reference for the following event configuration and monitoring.**

## Roles

- {% company-name /%} employee
- Company Admin
- Streamer that uses the company's site to stream content
- Viewer that uses the company's site to pick streams and pay (maybe) and view them

## Viewer

- Access to the company's site
- View a list of available streams
- Pay for streams (different billing models (e.g. prepaid credit that is depleted, charge as you go, post billing?) and/or preview

## For a Viewer

- Company Admin needs to provide them login credentials
- Collect payment instruments, etc.
- /Customer authorizes a list of streams, and also verify that every request by a Viewer to view or continue viewing a stream is valid

1. Viewer requests to view a stream by navigating to a manifest using the player
2. **svc:lgbx** gets this request and sends a request to the svc:livesvc to verify that the stream is valid and that this user is allowed to view the stream
3. **svc:livesvc** hits **svc:auth** and/or **svc:customerauth** to determine if the request should be allowed, after verifying that the stream is valid
4. Approve -or- Deny the request

## For a Company Admin/

- provides login credentials to Umbrella, etc.
- Gives the ability to update webhooks (i.e. the ones that tell the Customer that a stream has started/stopped)
- Kill a running stream
- Issue stream keys for Streamers

## For a Streamer

- Customer provides them with streaming keys
- Keeps track of their stream time if they wish
- Issues them payment on an agreed-upon interval

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH66822cdb-3ee9-46b2-9869-344aad2a9ebd" alt="auth events settings" /%}

1. Company Admin creates a streamer in svc:livesvc by calling the `key` API, which accepts a user id and returns a private key/stream key
2. Company sends the stream key to the streamer
3. Streamer attempts to stream using RTMP or PVC with the above key
4. LGBX receives this request and sends the key to svc:livesvc to verify if valid
5. **svc:livesvc** approves/denies the request and sends the webhook (a.k.a. start event) to the broadcast webhook endpoint

## Events on Stream Stop

1. Streamer stops the stream
2. LGBX sends the stream-delete request to livesvc
3. **livesvc** stops the stream and marks the end timestamp plus sends the stop event/webhook to the bc webhook endpoint

{% feedback /%}
