# cc-test-doc1

Test doc TEST!!

```go
	if res.IsError() {
		log.Fatalf("Error deleting document: %s", res.Status())
	}
	
```

# Umbrella

# Installation

This is a monorepo using yarn workspaces. **All commands should be run from the root of the project.** See more documentation [here](https://yarnpkg.com/features/workspaces).

Clone the repo:

```bash
git clone git@github.com:LivelyVideo/umbrella.git
```

Make Sure you have the correct node version:

`nvm use`

Install the dependencies without modifying the package-lock:

```bash
yarn install --immutable
```

If you get the following error:

```bash
The lockfile would have been modified by this install, which is explicitly forbidden.
```

Run:

```bash
yarn install --mode update-lockfile && yarn install --immutable
```

## Starting clients

```
yarn start-client:umbrella
yarn start-client:demos
yarn start-client:events
yarn start-client:showcases
yarn start-client:xcode-console
yarn start-client:lgbx-console
yarn start-client:stream-monitor
yarn start-client:stats
yarn start-client:status
```

#### Options

| Name | Default | Description |
|----|----|----|
| DOMAIN | `umbrella.dev1.devspace.lsea4.livelyvideo.tv` | Any deployed environment |
| THEME | `default` | `nativeframe` or `generflow` |
| UMBRELLA | `qa` | Any devspace |

Examples:

```bash
# Change theme
$ THEME=generflow yarn start-client:demos
# Change host
$ DOMAIN=eplay.generflow.com yarn start-client:demos
# Use devspace host
$ UMBRELLA=kim yarn start-client:demos:umbrella
```

## Umbrella API

```
yarn start-api:umbrella
```

## Ripple

To build Ripple:

```
yarn build:ripple
```

## VS code

To get eslint working correctly in VS Code you may need to add this to your settings.json

```
{
  "eslint.workingDirectories": [
    "./client",
    "./apis"
  ]
}
```

## Installing a dependency

To install a dependency, from the root folder run:

```
yarn workspace @dev-center/umbrella add package-name
```

Installing dependencies by manually updating the `package.json` should be avoided if possible. The command also updates the lock file. This will cause us to have fewer merge conflicts in `yarn.lock`.

## Core Packages

Because some packages are relied on frequently by projects within the monorepo (such as `@dev-center/ts-log` in `core/log` or `@dev-center/ts-mysql` in `core/mysql`), we version the `dist` folders which are generated. If you make changes to these files, commit the `dist` and `.tsbuildinfo` files too.

## Troubleshooting

### `yarn.lock` merge conflicts

To resolve conflicts in the lock file and reinstall all packages run:

```
yarn run install:clean
```

To resolve conflicts in the lock file only:

```
yarn install --mode update-lockfile
```

#### GoCD Build Steps

```
1. git clone https://github.com:LivelyVideo/umbrella.git (Fresh Clone)
2. git submodule update --init --recursive (Installs/clones the video-client repo into umbrella)
3. yarn --immutable (From root of umbrella repo)
4. cd modules/video-client (video-client repo)
5. yarn --immutable
```

#### ERROR: The lockfile would have been modified by this install, which is explicitly forbidden.

Referencing GoCD Build Steps

* If step #3 fails, then the lockfile in umbrella needs to be updated.
* If step #5 fails, then the lockfile in modules/video-client or video-client branch it's pointed to needs to be updated.

### Running Docker Build Locally To Test if Everything Builds

```
// From root of umbrella repo
docker build --progress=plain -t demos-client-test -f clients/demos/Dockerfile .
```

#### Additional Troubleshooting

[Video Client Testing](https://lively-video.atlassian.net/wiki/spaces/LV/pages/292880392/Video+Client+Testing)

### codegen error

A common error when trying to start a client is `Error: Cannot find module 'ajv/dist/compile/codegen'`. To fix this run:

```
yarn run install:clean
```

### Conventions

#### Making network requests

* If the request is to a path that start with /apps, use the domain that is configured in REACT_APP_HOST
* If the request does NOT start with /apps, use the domain that is provided by status-api as the value of globalHostUrl.

## Pushing latest demos-client to devspace

**Umbrella root**

```
DOCKER_BUILDKIT=1 BUILDKIT_PROGRESS=plain docker build -t gcr.io/lively-video/demos-client:devspace-[devspace-namespace] -f clients/demos/Dockerfile .
```

**Then push the image by running**

```
docker push gcr.io/lively-video/demos-client:devspace-[devspace-namespace]
```

**Then in Devspace root**

```
devspace run upgrade-service demos-client devspace-[devspace-namespace]
```

## Pushing latest umbrella-client to devspace

**Umbrella root**

```
DOCKER_BUILDKIT=1 BUILDKIT_PROGRESS=plain docker build -t gcr.io/lively-video/umbrella-client:devspace-[devspace-namespace] -f clients/umbrella/Dockerfile .
```

**Then push the image by running**

```
docker push gcr.io/lively-video/umbrella-client:devspace-[devspace-namespace]
```

**Then in Devspace root**

```
devspace run upgrade-service umbrella-client devspace-[devspace-namespace]
```


