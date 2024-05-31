---
route: /administration-tools/identifying-streams
pageTitle: Identifying streams
kind: concept
uuid: 1c761240-2a65-4071-8d57-a781830d05cf
---

# Identifying streams

Depending on what part of the platform you are interacting with, a stream may be referred to or looked up by different identifiers.

## Public keys

Public keys are UUIDs generated by the platform to serve as the identifier exposing a viewable stream. The most widely used identifier in the platform, most administrative tooling will allow search by public key to provide stream information. A manifest URL will contain the public key to a stream.

## Private keys

These keys are "private" because they must not be shared or inadvertently exposed to end users who are not the broadcaster. Used for authenticating RTMP streams [link] when broadcasting to an origin server, these keys are generated or provided by the operator. Certain administrative sections will allow search by a private key to facilitate finding a stream when that key is shared by the broadcaster with the operator's administrators, but due to their sensitive nature, it is recommended to use lookup by user ID or display name instead in these situations.

## User IDs

User IDs are optionally provided by the operator as part of integration API calls to create an association between a stream on the platform and the end user in the operator's system. Providing these is optional, but is recommended to give the operator's administrators an easy way to look up streams based on a key that is more accessible in the operator's system.

## Display names / Slugs

Referred to as "display names", "slugs", or "nicknames", like user IDs, these names associate a stream to an end user to facilitate the process of administering or debugging streams. Most admin tools in the platform allow search by this identifier if it is provided by the operator during integration.

## Uniqueness

If you are providing a key to the platform (not generating it via an API on the platform), you are responsible for maintaining key uniqueness to prevent key collision on the system. This is always the case for user IDs and displays names as they must always be provided by the operator.

{% feedback /%}