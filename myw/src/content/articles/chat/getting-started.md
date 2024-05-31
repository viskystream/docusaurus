---
route: /chat/getting-started
pageTitle: Getting Started
kind: guide
uuid: d9e23c06-f39e-426e-802b-fe168047f040
---

# Getting Started With Chat
The following is a guide for developers integrating with the {% company-name /%} Chat Service.

## Deployment
The {% company-name /%} Platform is fully hosted. No server components beyond your existing infrastructure with an authentication endpoint configured are required.

## Slugs
Usernames and roomnames are slugified in order to make them more usable by the end user in chat commands. A user may not recognize that capitalization matters when when issuing a "/ban FoO" command so username "FoO" is slugified into "foo".

The following rules are applied for slugification to go from a username to a slug

remove all whitespace characters at beginning and end of the string
replace all spaces with dashes
remove any "," characters
lowercasing - convert all Unicode letters mapped to their lower case
Usernames and roomnames passed into both chat commands and URL parameters will be slugified before being processed further. Thus, all entities add to the system (user or room) must be unique by slug.

## Client libraries
{% company-name /%} provides Javascript client libraries for developers integrating the {% company-name /%} Chat Service. Your organization will be provided access to these libraries at the beginning of your project. Javascript libraries as published as NPM modules.

## Authentication
Chat client libraries provide built in logic for authentication. In order to use a chat client library, you must first implement an authentication route in your application which conforms to required scheme. See the Getting Started With Authentication guide.

## Emoticons
If allowed by the client organization, users are able to manage the emoticons available to themselves and the rooms they own. This means that users can upload an image associated and associate it with a specific pattern. Anytime the pattern appears in a chat message that has the context of the "emoticon set" they have added this emoticon to, the image URL and metadata is attached to the chat message which is published to the client, noting the position and length of text the emoticon should should replace.

If the client organization wishes to disallow custom emoticons, or just wants to implement an approval process, emoticon management should be implemented via the {% company-name /%} Chat Private API

## Message logging
If configured, each chat message sent to the system is logged to the configured endpoint. Logging is done via a batch POST to the specified endpoint if using a http or https protocol or is written to a local file if using a valid file URI scheme (file:///var/log/chat.log). Firehose type dispatch via a TCP socket is coming soon.

Configuration of batch size for http can be done by providing a duration in go format (https://golang.org/pkg/time/#ParseDuration) in a 'batch' query parameter (http://localhost/logreader?batch=50). Logs by default contain messages in the same manifest encoded format as is sent to the client. To use uncompressed json, set a 'uncompressed' query parameter to 'true' (http://localhost/logreader?uncompressed=true). Logs are flushed to the endpoint before chat service shutdown.

## Advanced server side chat administration via the Private API
You may wish to prevent users from performing certain actions without your application knowing or performing some other action in conjunction with the chat action (for example, you may want to have an approval step before someone uploads a custom emoticon). To do this, use the {% company-name /%} Private Chat API. Use of this private API can also be helpful in managing the state of chat users in response to certain things that happen in your application (for example: if a user gains a specific status in your application, you may want to add metadata to the user in the {% company-name /%} Chat Service to reflect that status such as giving them access to special emoticons or badges)