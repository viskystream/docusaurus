---
route: /basic-operator-integration/native-mobile-applications/livestream-from-an-ios-application/broadcast-a-livestream
pageTitle: Broadcast a livestream
kind: guide
uuid: 55840e96-8f98-437f-8dad-c8759f073d59
---

# Livestream Encoder Setup
This document will walk you through the steps to set up a livestream encoder in a view controller

## Setup the encoder in the view controller
In the view controller implementation import the Encoder

```objective-c
#import <VideoClient/Encoder.h>
```

In the view controller class interface, create a strong property for the Encoder

```objective-c
@interface YourViewController ()
@property (nonatomic, strong) Encoder *encoder;
@end
```

Instantiate the encoder and insert the encoder.view into the ViewControllers view

```objective-c
- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    NSDictionary *props = @{
        @"isDemoMode":@true,
        @"isEncodeOnStart":@true,
        @"loadbalancer":@"{your loadBalancer}",
    };
    self.encoder = [[Encoder alloc] initWithProperties:properties];
    [self.view insertSubview:self.encoder.view atIndex:0];
    self.encoder.view.bounds = self.view.bounds;
}
```

Handle the layout of the MediaStreamView when the view controller handles a layout

```objective-c
- (void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
    _encoder.view.frame = self.view.bounds;
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
These functions allow the encoder to start, stop, toggle, and check if the video (camera) is on for the encoder session

```objective-c
- (void)startVideo
- (void)stopVideo
- (void)toggleVideo
- (bool)isVideoOn
```

### Encoder Audio Functions
These functions allow the encoder to start, stop, toggle, and check if the audio (mic) is on for the encoder session

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