---
route: /basic-operator-integration/native-mobile-applications/livestream-from-an-android-application/consume-a-livestream
pageTitle: Consume a livestream
kind: guide
uuid: 3ab06a01-cdb6-4823-b4c4-cdf3fe4f7d53
---

### Prerequisites

Setup your environment [here](/docs/basic-operator-integration/native-mobile-applications/livestream-from-an-android-application)

## Consuming Streams with Fragments

The quickest way to consume a stream is to pass arguments to `PlayerFragment`.

```kotlin
val fragment = PlayerFragment.newInstance(
    options = DevCenterPlayerOptions().apply {
        setLoadBalancer("<load balancer>")
        setCallId("<call ID>)
    },
    bundle = savedInstanceState ?: Bundle()
)
```

Once your fragment has been set up, it can be added/used like any other fragment.

{% image src="https://firebasestorage.googleapis.com/v0/b/umbrella-e6468.appspot.com/o/screenshot-1666710300957.png?alt=media&token=9214d6e5-e726-4158-85c7-dc35a9896831" alt="screenshot" /%}

### Fragment Customization
Customizations may be done by extending `BasePlayerFragment` or `PlayerFragment`.

```kotlin
class MyPlayerFragment : PlayerFragment() {
    //when a stream joins a call
    override fun onStreamAdded(streamId: String, userId: String?) {
        activity?.runOnUiThread {
            //convert stream ID to an actual UI view
            val streamView = context?.loadViewForStream(
                reactInstanceManager = reactNativeHost.reactInstanceManager,
                streamId = streamId,
                isSourceStream = false,
                enableBorder = true,
                enableMargin = true,
                layoutParams = null
            )

            //add view to some view group
        }
    }

    //when a stream leaves a call
    override fun onStreamRemoved(streamId: String, userId: String?) {
        //remove stream view
    }
}
```

{% feedback /%}