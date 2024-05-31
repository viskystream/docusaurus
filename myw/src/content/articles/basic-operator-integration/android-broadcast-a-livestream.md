---
route: /basic-operator-integration/native-mobile-applications/livestream-from-an-android-application/broadcast-a-livestream
pageTitle: Broadcast a livestream
kind: guide
uuid: d5b59212-7f08-4833-ba26-00881b23ba8f
---

### Prerequisites

Setup your environment [here](/docs/basic-operator-integration/native-mobile-applications/livestream-from-an-android-application)

## Broadcast

Broadcasting can be done with activities or fragments.

## Broadcast with activities

{% image src="https://firebasestorage.googleapis.com/v0/b/umbrella-e6468.appspot.com/o/screenshot-1663355609591.png?alt=media&token=3c3b11f2-116d-4e16-9b5c-6beb33181bed" alt="screenshot" /%}

### Quick Broadcast

Extending `DevCenterEncoderActivity` is simpliest way to start testing within your app and on your devices.
Create a new activity and extend `DevCenterEncoderActivity`.

```kotlin
class EncoderActivity : com.video.videoclient.DevCenterEncoderActivity() {
    companion object {
        fun start(context: Context) {
            context.startActivity(Intent(context, EncoderActivity::class.java))
        }
    }
}
```

### Broadcast Activity Customization

Customizations may be done by overriding methods such as `isEncodeOnStart()`, `onEncoderStarted()`, and `getLoadBalancer()`.

## Broadcast with Fragments

Broadcasting with fragments provides more UI flexibility.

| {% image src="https://firebasestorage.googleapis.com/v0/b/umbrella-e6468.appspot.com/o/screenshot-1666710209518.png?alt=media&token=8cbeba66-d922-43ec-8e36-f79eda9e3cf6" alt="screenshot" /%} | {% image src="https://firebasestorage.googleapis.com/v0/b/umbrella-e6468.appspot.com/o/screenshot-1666710236937.png?alt=media&token=21f99310-77b3-4275-b047-a28ac5b40fe8" alt="screenshot" /%} |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Extend `BaseEncoderFragment` or `EncoderFragment`.

```kotlin
class MyEncoderFragment : EncoderFragment() {
    companion object {
        fun newInstance(
            options: IEncoderOptions,
            bundle: Bundle
        ): EncoderFragment {
            return EncoderFragment.newInstance(
                options = options,
                bundle = bundle
            )
        }
    }
}
```

### Broadcast Fragment Customization

Customizations may be done by setting `IEncoderOptions` properties in the `options` parameter. An instance of `DevCenterEncoderOptions` can be conveniently used.

```kotlin
val opts = DevCenterEncoderOptions()
opts.setLoadBalancer("<load balancer>")
opts.setEncodeOnStart(true)
opts.setCallId("<call ID>")

MyEncoderFragment.newInstance(opts, Bundle())
```

Once your fragment has been setup, it can be added/used like any other fragment.

```
supportFragmentManager.beginTransaction().add(
    R.id.fragmentContainer, MyEncoderFragment.newInstance(
        options = DevCenterPlayerOptions().apply {
            setLoadBalancer("<load balancer>")
            setCallId("<call ID>")
        },
        bundle = savedInstanceState ?: Bundle()
    ), null
).setReorderingAllowed(true).commit()
```

{% feedback /%}
