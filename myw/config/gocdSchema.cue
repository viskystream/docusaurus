package config

// This deployments image tag is maintained by GOCD - https://gocd.livelyvideo.tv/
#imageTag: string

// this sets the image tag definition onto the shared chart config
image: {
    tag: #imageTag
}