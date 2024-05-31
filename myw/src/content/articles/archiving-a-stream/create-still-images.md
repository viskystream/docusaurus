---
route: /archiving-a-stream/create-still-images
pageTitle: Create still images
kind: guide
uuid: 74abb7aa-152d-478f-b20b-46be42de05dd
---

Using video snapshots, you can capture and store still images from a live stream.

- How to configure for stills
- How to access stills

Still images can be grabbed as jpegs by utlizing the live stream [manifest](docs/consuming-a-livestream/play-a-stream-using-a-manifest) Each manifest returns a json object which contains standard http links to a *current* jpeg snapshots from the live stream. These images will update typically around every 15 seconds. You can request these urls at an interval to collect still image snapshots throughout a live broadcast. 

Example jpeg entries in a live stream manifest response:

```js
"formats": {
	"jpeg": {
		"encodings": [
			{
				"videoWidth": 256,
				"videoHeight": 144,
				"location": "https://border/snapshots/d75d4dc2-3a50-486a-bfc1-e8dc69c1538c_256x144.jpeg"
			},
			{
				"videoWidth": 768,
				"videoHeight": 432,
				"location": "https://border/snapshots/d75d4dc2-3a50-486a-bfc1-e8dc69c1538c_768x432.jpeg"
			},
			{
				"videoWidth": 1280,
				"videoHeight": 720,
				"location": "https://border/snapshots/d75d4dc2-3a50-486a-bfc1-e8dc69c1538c_1280x720.jpeg"
			}
		]
	}
}

```

{% feedback /%}