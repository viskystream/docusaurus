---
route: /basic-operator-integration/methods-of-authorization
pageTitle: Methods of Authorization
kind: concept
uuid: 032e5628-36bb-4a11-852b-04a49d23d2f3
---

# Stream authorization

Viewers need access to your content.  How you choose to manage that access is up to you and how you plan to monetize that content is up to you.  The content could be free to account holders, pay-per-minute, or pay-per-view.  But how do you ensure that only authorized users have access to your content?  With {% company-name /%}, we use *authTokens* to control who has access.  


## Authorizing Broadcasters

The first stem of the authorization process is making sure only authorized streamers can upload content.  On the {% company-name /%} platform, we are always the source of truth to determine whether a streamer (you) has access to broadcast on the platform. How you gain access to our platform depends on how you are getting the video to us.  If you are using RTMP, you maintain a set of keys that your application exposes to end users.  If you are using WebRTC, you maintain authorization tokens (or *authTokens* in this document) that your application uses directly in setting up WebRTC streams.

- For streaming with RTMP, see: [Using an external encoder](/docs/broadcasting-a-livestream/streaming-with-external-software) 
- For streaming with WebRTC, see: [Starting a webrtc stream](/docs/broadcasting-a-livestream/streaming-with-a-web-browser)

## Authorizing Viewers
 
Once the content is streaming to the platform, you need to be able to authorize their access.  As your streaming platform partner, {% company-name /%} we want to emphasize that we do not keep user information beyond what is necessary for debugging information or for passing data back and forth between the viewer and you the operator.  Since you have a relationship with your viewers, you need to decide how you are handling the authorization of your viewers. 

### Methods of Viewer Authentication
 
Like choosing a streaming method, there is no perfect way to handle the authorization of your viewers.  Each method has its own pros and cons.  In the section below we will attempt to cover them here in order to help guide you to the right decision for your organization.  If you have any questions, make sure to reach out to your Integration Specialist.  

#### Metered Viewing 
At the strictest level, the interval between re-authorization requests viewers can be kept to the bare minimum.  In this scenario, there is nearly instantaneous invalidation of a viewer's authorization.  The benefit of using a method like this is it will prevent users from continuing to access a stream nearly the moment they stop paying for it.  To do this, you configure {% company-name /%} to make requests to you the operator via a WebHook scheme.  If the WebHook does not return that the viewer is authorized then the viewer immediately loses access to the stream.  These WebHooks can occur on both the manifest request used by the player and from the border server from which the stream is consumed. As an example, when viewing with HLS, if authorization on the border fails, a viewer is not notified of the next randomly named .ts media file segment it would need to download to continue playing back the stream.  This kind of scheme provides high fidelity on when the viewer started and ended their streaming for billing purposes.  The downside to choosing this method, make sure your servers are ready to scale to accommodate significant web traffic due to the repeated requests for authorization.

#### Pay-per-view

A more relaxed method of viewer authorization revolves around the use of an authorization token.  You as the operator create a token that allows an authorized user to watch the stream and the token is valid for the lifetime of the stream.  This is an ideal scenario where you are using a pay-per-view monetization scheme.  You as the operator will provide the token to {% company-name /%} and we will store that token internally, without having to call back to you for each new request of data to your already authorized viewer.  This kind of scheme reduces traffic to your servers. The downside to this method is you have to make sure you are charging enough to cover your costs for the whole stream, which can be costly for longer events.

### Push Vs Pull Authentication
 
Once you pick one of the methods above, you have a further choice to make.  Do you want the authentication to be pushed or pulled?  
 
Using push architecture, an integrator pushes a token to the streaming platform, which will be used until the expiration of such token to authorize viewers of the stream. The integrator can invalidate the token at any time resulting in the viewer losing access to the stream. However, during a period of network disruption between the integration server and the video server, an invalidation request may fail, meaning that the viewer will continue to have access with the integrator having no control over removing said access until the network disruption is over.
 
With pull architecture, the video server will intermittently pull the authorization status of each viewer to ensure that the user is still allowed to view the stream. If at any point this request returns that the viewer is unauthorized, the user immediately loses access to view the stream. If the request fails, configurable logic is executed based on the reason for the failure and if deemed appropriate, the viewer is disconnected. This provides stricter control over pay-as-you-go model stream monetization to ensure charges can be reconciled with the viewer authorization poll durations.
 
#### Pros of push based authentication

- Easier to implement and easier to debug when implementing since the implementor is able to immediately see the request and response for the auth token creation endpoint.
- Fewer requests are made between integration servers and video servers
 
#### Cons of push based authentication

 - Network disruption can prevent token invalidation
 
#### Pros of pull based authentication

- Provides a configurable timeout for removing stream access during network disruption
- Communicates view time per user to the integration servers
 
#### Cons of pull based authentication

- Increases traffic between integration servers and video servers
- Streams fail if the integration server can not handle the load from HTTP WebHooks, streams will fail to auth, resulting in viewer disconnects

### Selecting a client referrer

Once you've chosen which authorization scheme best fits your use case, select the appropriate client referrer to identify to the platform how you want to authorize streams. Use this string when creating broadcasts to dictate how authorization should occur.

- `token-auth` - Use only tokens to authorize broadcasters and viewers. No webhook integration.
- `live-service-webhooks` - Use webhooks to authorize broadcasters and viewers. A webhook is executed to verify authorization when a stream begins or a viewer is watching a stream.
- `public-viewers` - Use tokens to validate broadcaster authorization.

{% feedback /%}