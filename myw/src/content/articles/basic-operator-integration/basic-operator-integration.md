---
route: /basic-operator-integration
linkTitle: Basic Operator Integration
pageTitle: Overview
kind: concept
uuid: 4235313f-190f-4859-94d4-f1a44e2b47e8
---

In order to complete an end-to-end implementation of the platform, the operator must integrate the video SDK into their frontend code as well as update their server-side code to provide source-of-truth for user authentication/authorization. The following concept explanations and guides are provided to cover all parts of the integration process necessary to run a production environment for streaming.

Most of the capabilities of the streaming platform are entirely within the control of the operator and integrating into the operator's ecosystem can be completely seamless from the perspective of the end user. The only platform-specific details that need to be customized to completely white-label the streaming services are URLs for the streaming platform's endpoints and the UI of the encoder and player.

To customize urls to use your domain, you will need to set DNS records for specified domains and provide SSL certificates for the streaming platform.

Our SDK provides a styling API to make the encoder and player match your visual style.

## GET STARTED {% .text-primary-500 %}

{% link-grid  %}
{% link-grid-link title="Video Client" href="/basic-operator-integration/video-client" description="Learn about Video Client and find code snippets that you can use to get started using our component library" /%}
{% link-grid-link title="Bring your own infrastructure" href="/basic-operator-integration/bring-your-own-infrastructure" description="Learn about how  gives operators the ability to choose the infrastructure that suits their needs" /%}
{% /link-grid  %}

## MOBILE APPLICATIONS {% .text-primary-500 %}

{% link-grid  %}
{% link-grid-link title="Native mobile applications" href="/basic-operator-integration/native-mobile-applications" description="Learn about how  APIs can be integrated into both iOS and Android apps." /%}
{% link-grid-link title="Livestream from an iOS application" href="/basic-operator-integration/native-mobile-applications/livestream-from-an-ios-application" description="Get started livestreaming from an iOS app by broadcasting and consuming a livestream or creating a group call" /%}
{% link-grid-link title="Livestream from an Android application" href="/basic-operator-integration/native-mobile-applications/livestream-from-an-android-application" description="Get started livestreaming from an Android app by broadcasting and consuming a livestream or creating a group call" /%}
{% /link-grid  %}

## AUTHORIZATION AND AUTHENTICATION {% .text-primary-500 %}

{% link-grid  %}
{% link-grid-link title="Methods of authorization" href="/basic-operator-integration/methods-of-authorization" description="Learn about the methods of authorization for both broadcasters and viewers " /%}
{% link-grid-link title="Authentication tokens" href="/basic-operator-integration/methods-of-authorization/authentication-tokens" description="Learn how to create service and client Bearer tokens" /%}
{% link-grid-link title="Authentication webhooks" href="/basic-operator-integration/methods-of-authorization/authentication-webhooks" description="Learn how to set up webhook based authorization" /%}
{% link-grid-link title="Authorized vs public streams" href="/basic-operator-integration/methods-of-authorization/authorized-vs-public-streams" description="Learn about the differences between authorized and public streams, and configure viewer authentication based on your needs" /%}
{% /link-grid  %}
