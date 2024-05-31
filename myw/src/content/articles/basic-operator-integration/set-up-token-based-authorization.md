---
route: /basic-operator-integration/methods-of-authorization/authentication-tokens/set-up-token-based-authorization
pageTitle: Set up token-based authorization
kind: guide
uuid: e2a8c70f-2a29-4cf1-ad48-8ce1ccf0e0cf
---

Once you have fully implemented our token-based authorization, your end users will be able to make authorized requests to {% company-name /%} and perform critical actions like broadcasting a new stream.  The next step in the authentication/authorization process is to set up the mechanisms for authorizing users to consume streams.


Identify where in your server-side code you wish to implement endpoints that generate authorization tokens for clients.  We recommended doing this as part of a service that already has an established paradigm of authorizing end users.  A good spot to do this in your code is where you normally check for a cookie.  However, you know your server-side code better than we do, so place this code wherever it makes the most sense for your application.

#### Note

In this guide, we'll be using a basic [NodeJS Express](https://expressjs.com/) server to facilitate requests from the client to the platform. 

## Guide

1. Register a new endpoint in your service:

 ```js
const createClientBearerToken = async (req, res) => {
	...
};

 app.post('/users/me/external/tokens', createClientBearerToken);
```

1. Fill in the body of the `createClientBearerToken` handler. The first thing it should do is check that the client is authorized to ask for a *Bearer Token* to be used on the platform in the first place. For the sake of this guide, let's make the assumption that our service already has an `isUserAllowed` function that knows about what a cookie-identified user can or can't do. With this, we can check whether the user is authenticated and authorized.

 ```js
const createClientBearerToken = async (req, res) => {
	if (!req.cookie.user) {
		res && res.status(401).send('user unauthenticated');
	}
	if (!isUserAllowed(req.cookie.user)) {
		res && res.status(403).send('user unauthorized');
	}

	...
};
```

3. Create the token on the platform. This is done by making a **POST** request to the `/auth/v1/access-tokens` endpoint (in this exercise, we're using the [got](https://www.npmjs.com/package/got) npm package to make requests).

 Three variables are assumed in the following snippet:

 - `globalHostUrl` - your [global host URL value](/config).
 - `operatorBearerToken` - your [operator bearer token value](/config).
 - `reqBody` - the request body to be sent to the endpoint. See [Auth Service](#) for details.

 ```js
const createClientBearerToken = async (req, res) => {
	...

	let body;
	try {
		const resp = await got({
			url: `${globalHostUrl}/auth/v1/access-tokens`,
			headers: {
				authorization: `Bearer ${operatorBearerToken}`
			},
			responseType: `json`,
			method: 'POST',
			json: {
				ttl: 60 * 60 * 24,
				...reqBody,
			},
		});
		body = resp.body;
	} catch (err) {
		res && res.status(err?.response?.statusCode || 500).send('internal auth error');
		return;
	}

	...
 };
 ```

1. Pass back the token to the client which then can utilize it for any platform requests. See [Using an authorization token in the browser](/docs/basic-operator-integration/methods-of-authorization/authentication-tokens/using-an-auth-token-in-the-browser).


 ```js
const createClientBearerToken = async (req, res) => {
	...

	res && res.json(body);
};

### Using the correct client referrer

If you are using token authorization for broadcasting and viewing, ensure that you are starting broadcasts with the client referrer set to `token-auth`.

{% feedback /%}