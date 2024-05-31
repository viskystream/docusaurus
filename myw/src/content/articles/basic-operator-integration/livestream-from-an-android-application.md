---
route: /basic-operator-integration/native-mobile-applications/livestream-from-an-android-application
pageTitle: Livestream from an Android application
kind: quickstart
uuid: eb3059b0-6ee0-47a8-9d22-cdaca0b61c9a
---

# Android Quick Start

Use this guide to get up and running on Android. By the end of this guide, you will be able to broadcast audio/video 🚀.

## Notes
Latest SDK version: 

```groovy 
10.1.3.700
```
## Requirements

- [Android Studio](https://developer.android.com/studio/?gclid=Cj0KCQiA4aacBhCUARIsAI55maGzhi0atZoHVdGAqrMCrO8JFthwxfYuA8EbsTw03gS2Y3t1fJjTZsAaAkaPEALw_wcB&gclsrc=aw.ds)
- Target Android 5 (API 21) or higher
- Android device running Android 5 (API 21) or higher

## Gradle Setup

- Add to project level build.gradle repositories.
```groovy
repositories {
    maven {
        url "https://maven.pkg.jetbrains.space/livelyvideo/p/video-client/vdc-android"
    }
}
```
- Add to module/app level build.gradle dependencies.
```groovy
implementation("tv.vdc:videoclient:<version>")
```

## App Setup
Your Android application must extend `DevCenterApplication`. Example:

```kotlin
class MyApp : com.vdc.DevCenterApplication() {
}
```
If you haven't already, reference your application class in the AndroidManifest.

```xml
<application
        android:name=".MyApp"
```

### Permissions
The following permissions must be added to the AndroidManifest.
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```


## Encoder Setup

An encoder is what broadcasts audio/video for others to consume/playback. You can use [`DevCenterEncoderActivity`](#devcenterencoderactivity) or [`DevCenterEncoderFragment`](#devcenterencoderfragment).

### DevCenterEncoderActivity
Extending DevCenterEncoderActivity is simpliest way to start testing within your app and on your devices.
Create a new activity and extend DevCenterEncoderActivity.

```kotlin
class EncoderActivity : com.vdc.DevCenterEncoderActivity() {
    companion object {
        fun start(context: Context) {
            context.startActivity(Intent(context, EncoderActivity::class.java))
        }
    }
}
```

Don't forget to add activity to the AndroidManifest.

```xml
<activity android:name=".EncoderActivity" />
```

Start the encoder from your activity, after a button click for example.

```kotlin
EncoderActivity.start(context)
```

## Run the app

Run the app and trigger the start of your encoder activity. Once started, click "Start Broadcast" and allow video and audio permissions:

{% image src="https://firebasestorage.googleapis.com/v0/b/umbrella-e6468.appspot.com/o/screenshot-1663355609591.png?alt=media&token=3c3b11f2-116d-4e16-9b5c-6beb33181bed" alt="device screenshot" /%} 

Copy/share the auto-generated link and open it in a browser on a different device.

{% image src="https://firebasestorage.googleapis.com/v0/b/umbrella-e6468.appspot.com/o/screenshot-1660666726090.png?alt=media&token=652147a4-07cc-4a1e-9175-ab0c7a92f98d" alt="device screenshot" /%} 

Congrats! You are broadcasting from your Android device.2

{% image src="https://firebasestorage.googleapis.com/v0/b/umbrella-e6468.appspot.com/o/desktop-player.png?alt=media&token=94ab662e-502f-428b-aa4e-d6f8a3245c1c" alt="device screenshot" /%} 

*You can also open the same link on another Android device to view playback.*

### DevCenterEncoderFragment

[See](/docs/basic-operator-integration/native-mobile-applications/livestream-from-an-android-application/broadcast-a-livestream)

{% feedback /%}