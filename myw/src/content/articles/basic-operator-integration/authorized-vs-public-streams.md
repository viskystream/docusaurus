---
route: /basic-operator-integration/methods-of-authorization/authorized-vs-public-streams
pageTitle: Authorized vs Public Streams
kind: concept
uuid: c2f00958-9f0b-46f4-b328-4ecacbfdf45a
---

# Switching between authorized and public streams

## Live Service Integration (LSI) -- What is the purpose of LSI?

LSI is a service that interfaces with the broadcast servers to track active live streams, to allow for revocation of active live streams, and to enable live stream viewers to get active streams and their associated manifests.

It also provides a set of endpoints that can be configured to receive POST requests on broadcast "start" and "end" events, as well as GET requests when a viewer requests access to a broadcast. The LSI service will then forward the requests to the [Live Service API](/docs/apis/lsi).

{% callout type="todo" title="Jeremiah / James" %}
- When would someone use a private vs public stream?
- How do you switch modes? On an SFU? On an origin?
- What is the purpose of LSI?
{% /callout %}

{% feedback /%}