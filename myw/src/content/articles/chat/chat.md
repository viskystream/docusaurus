---
route: /chat
pageTitle: Overview
linkTitle: Chat
kind: guide
uuid: 2ec61151-50cf-4a76-81fe-4ccf1b9dfddd
---

The {% company-name /%} Chat Service allows existing users of your application to join chat rooms and engage with each other through a text chat interface enhanced by emoticons, commands, and user moderation. Chat messages and updates are propagated to end user clients via a websocket, long poll HTTP request, or TCP. Basic functionality is provided to the end user in the form of commands such as /mod username or /blacklist word and advanced functionality can be added via the chat HTTP API implemented on either client or server side.

{% link-grid  %}
  {% link-grid-link title="Getting started" href="/chat/getting-started" description="" /%}

  {% link-grid-link title="Configuration" href="/chat/configuration" description="" /%}

  {% link-grid-link title="Roles" href="/chat/roles" description="" /%}

  {% link-grid-link title="Commands" href="/chat/commands" description="" /%}
{% /link-grid  %}