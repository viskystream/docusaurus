---
route: /basic-operator-integration/native-mobile-applications/livestream-from-an-ios-application/consume-a-livestream
pageTitle: Consume a livestream
kind: guide
uuid: 94870f6d-d05b-40a5-8702-d4cf5e8df905
---

# Livestream Player Setup
This document will walk you through the steps to set up a livestream player in a view controller

## View Controller .h setup
In the view controller header import the PlayerDelegate

```objective-c
#import <VideoClient/PlayerDelegate.h>
```

Have the view controller implement the PlayerDelegate protocol

```objective-c
@interface YourViewController : UIViewController<PlayerDelegate>
```

## View Controller .m setup
In the view controller implementation import  the Player and MediaStreamView

```objective-c
#import <VideoClient/Player.h>
#import <VideoClient/MediaStreamView.h>
```

In the view controller class interface, create strong properties for the Player and MediaStreamView

```objective-c
@interface YourViewController ()
@property (nonatomic, strong) Player *player;
@property (nonatomic, strong) MediaStreamView *playerView;
@end
```

In the view controller implement the PlayerDelegate to handle the stream being added by the Player

```objective-c
- (void)onStreamAdded:(NSString *)streamId userId:(NSString*)userId {
    _playerView.stream = [_player mediaStream:streamId];
}
```

Instantiate the player and insert the MediaStreamView into the ViewControllers view

```objective-c
- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    NSDictionary *props = @{
        @"isDemoMode":@true,
        @"isEncodeOnStart":@true,
        @"loadbalancer":@"{selected loadBalancer href}",
        @"callId":@"{selected callId}"
    };
    
    self.player = [[Player alloc] initWithProperties:properties];
    self.player.delegate = self;
    
    _playerView = [[MediaStreamView alloc] init];
    [self.view insertSubview:_playerView atIndex:0];
}

```
Handle the layout of the MediaStreamView when the view controller handles a layout

```objective-c
-(void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
    _playerView.frame = self.view.bounds;
}
```

{% feedback /%}