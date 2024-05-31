---
route: /basic-operator-integration/methods-of-authorization/authentication-tokens
pageTitle: Authentication Tokens
kind: concept
uuid: 468f3c51-0750-4e8b-a851-b3930219d9e8
---

# Bearer authentication

At {% company-name /%} we authorize requests by checking a *Bearer Token* in the Authorization Header of the request.  Requests made via API can be separated into two kinds:

- requests made by your servers
- requests made by end users

## Service as Bearer

Your servers have full access to our platform APIs, allowing you to customize workflows to their specific business needs.  To authorize API calls, all requests to {% company-name /%} must have an `Authorization: Bearer {operator-bearer-token}` header.

For example, the request to create a client *Bearer Token* (described below) would be the following curl:

```
curl -X POST https://{your-platform-domain}/auth/v1/access-tokens -H 'Authorization: Bearer {operator-bearer-token}'
```

{% callout type="warning" title="Keep it secret" %}
The value of your *Bearer Token* can be found in your [operator configuration section](/config). You should store this token with other confidential information in a secret manager or vault and should ***NEVER*** be used for requests made client-side.
{% /callout %}

## Client as Bearer

For API requests made by your viewers (from browsers, mobile apps, etc) to the platform, your servers should still serve as the source of truth for authorization. To facilitate this, the platform provides a simple HTTP API for managing user tokens. When an end user requires the ability to make requests directly from their client to a platform API (for example, to start a stream), the *Bearer Token* that the client will use needs to be generated on the platform but only if permitted by your network. 

### Bearer Token Request Flow

- The client makes a request to an endpoint on your server.
- Your server checks permissions for that user using your normal workflow.
- If authorization conditions are satisfied, your server makes a request to generate a new *Bearer Token* on the platform. This token may contain specific scopes to limit the client's access to certain platform resources, maybe have a configurable time to live, or may contain additional configuration options that pertain to how the client should interact with the platform.
- The token is passed back to the client to be used as the *Bearer Token* in any direct API requests to our platform.
- If required, token invalidation happens through the **DELETE** endpoint.  See our API documentation for additional information about this endpoint.

{% feedback /%}