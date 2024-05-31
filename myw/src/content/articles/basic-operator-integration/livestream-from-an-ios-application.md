---
route: /basic-operator-integration/native-mobile-applications/livestream-from-an-ios-application
pageTitle: Livestream from an iOS application
kind: quickstart
uuid: d0b77a94-4d57-4e15-bb99-a11d116e7ce0
---

# iOS Quick Start

This quick start guide will walk you through setup and integration to start broadcasting audio and video from your iOS app! 🍎

## Requirements

- [Xcode](https://developer.apple.com/xcode/) 14.0 or higher
- Minimum iOS Deployment Target 15.0 or higher
- iOS device running iOS 15.0 or higher

## Framework Setup

- Under your apps Target, under `Frameworks, Libraries, and Embedded Content` link
```
VideoClient.framework		Embed & Sign
WebRTC.framework			Embed & Sign
```

### Permissions
The following permissions must be added to your applications `Info.plist`
```plist
	<key>NSCameraUsageDescription</key>
	<string>Enable Broadcasting</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>Enable Broadcasting</string>
```

These permissions can also be added via Xcode under your application target `Info`
```plist
<key>Privacy - Camera Usage Description</key><string>Use camera for broadcasting</string>
<key>Privacy - Microphone Usage Description</key><string>Use mic for broadcasting</string>
```

{% feedback /%}