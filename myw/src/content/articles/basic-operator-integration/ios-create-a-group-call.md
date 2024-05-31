---
route: /basic-operator-integration/native-mobile-applications/livestream-from-an-ios-application/create-a-group-call
pageTitle: Create a group call
kind: guide
uuid: cb94549b-ec81-461a-9888-1e497740a142
---

# Livestream Call Setup

This document will walk you through the steps to set up a livestream call in a view controller

## Setup the call in the view controller header

In the view controller header import the CallDelegate, EncoderDelegate, and PlayerDelegate

```objective-c
#import <VideoClient/CallDelegate.h>
#import <VideoClient/EncoderDelegate.h>
#import <VideoClient/PlayerDelegate.h>
```

Have the view controller implement the CallDelegate, EncoderDelegate, and PlayerDelegate

```objective-c
@interface YourViewController : UIViewController<CallDelegate, EncoderDelegate, PlayerDelegate>
```

## Setup the call in the view controller implementation
In the view controller implementation import  the Encoder

```objective-c
#import <VideoClient/CallController.h>
```

In the view controller class interface, create a strong property for the CallController

```objective-c
@interface YourViewController ()
@property (nonatomic, strong) CallController *callController;
@end
```

Instantiate the CallController

```objective-c
- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    NSDictionary *props = @{
        @"user":@"{your userName}",
        @"loadbalancer":@"{your loadBalancer}",
        @"token":@"{your token}",
    };
    _callController = [[CallController alloc] initWithProperties:properties];
    _callController.delegate = self;
}
```

## Handle the onCallReady and onCallCreated delegate functions
The call controller cannot join or start a call until the CallController is ready.
If the `callId` is known, join the existing call.  If not, create a new call.

```objective-c
- (void)onCallReady {
    if (self.callId && self.callId.length > 0) {
        [_callController joinCall:self.callId];
    }
    else {
        [_callController startCall];
    }
}
```

Once the call is ready via the `joinCall` or `startCall`, then the encoder can be started.

```objective-c
- (void)onCallCreated {
    [_callController startEncoder];
}
```

## Displaying Video
Video streams for either the encoder or for streams added to the call can be displayed with the MediaStreamView.

### MediaStreamViews
MediaStreamViews can be added via the interface builder or dynamically using a UITableView or a UICollectionView.  MediaStreamViews have a property stream of type RTCMediaStream.  The easiest way to display this is to get the media stream from the call controller and set it MediaStreamView's stream property

```objective-c
    mediaStreamView.stream = [_callController mediaStream:streamId];

```

### Callback for getting the stream from the encoder

```objective-c
-(void)onSourceStream:(NSString *)streamId {
	{some existing MediaStreamView}.stream = [_callController mediaStream:streamId];
}
```

### Callback for getting streams being added to the call

```objective-c
-(void)onStreamAdded:(NSString*)streamId userId:(NSString*)userId {
    {some existing MediaStreamView}.stream = [_callController mediaStream:streamId];
}
```

## Controlling the encoder
The encoder can be controlled with the following functions

### Encoder Session Functions
The encoder session needs to be started before any other functions can be called

```objective-c
- (void)startEncoder
- (void)stopEncoder
- (void)toggleEncoder
```

### Encoder Video Functions
These functions allow the encoder to start, stop, toggle, and check if the video is on for the encoder session

```objective-c
- (void)startVideo
- (void)stopVideo
- (void)toggleVideo
- (bool)isVideoOn
```

### Encoder Audio Functions
These functions allow the encoder to start, stop, toggle, and check if the audio is on for the encoder session

```objective-c
- (void)startAudio
- (void)stopAudio
- (void)toggleAudio
- (bool)isAudioOn
```

### Encoder Camera Functions
These functions allow the encoder to select the front camera, select the rear camera, or toggle which camera is selected for the encoder session

```objective-c
- (void)frontCamera
- (void)rearCamera
- (void)toggleCamera
```

## (Optional) Implement the EncoderDelegate to update the UI based on encoder changes
In the view controller header, import the EncoderDelegate

```objective-c
#import <VideoClient/EncoderDelegate.h>
```

In the view controller, implement the EncoderDelegate protocol

```objective-c
@interface YourViewController : UIViewController<EncoderDelegate>
```

### EncoderDelegateFunctions
EncoderDelegate functions can update UI in the UI thread

#### Encoder State
These functions allow the UI to update when the encoder has stopped or started

```objective-c
- (void)onEncoderStarted
- (void)onEncoderStopped
```

#### Video State
These functions allow the UI to update when the encoder's video has stopped or started

```objective-c
- (void)onVideoStarted
- (void)onVideoStopped
```

#### Audio State
These functions allow the UI to update when the encoder's audio has stopped or started

```objective-c
- (void)onAudioStarted
- (void)onAudioStopped
```

#### Camera State
These functions allow the UI to update when the encoder's camera has switched to the front or rear

```objective-c
- (void)onCameraFront
- (void)onCameraRear
```

{% feedback /%}