package config

// Main Configuration Schema
config: {
	// http port of the service api
	port: 8765
	// log leve
	logLevel: "debug"
	// default user is 'admin' in schema
	elasticPassword: "d3Vc3n73r!"
	// elastic search config params
	elastic: {
		endpoint: "https://devcenter-lsea2-kibana-client.livelyvideo.tv"
		index: "documentation"
	}
	globalHostUrl: "https://lively-prod-usc1c.livelyvideo.tv"
	// company name seen across site
	companyName: "Lively Video"
	// company contact email address
	companyEmail: "support@livelyvideo.tv"
	// manifest to use for the sport demo video playback
	sportsUrl: "https://lively-dev-usc1a-manifest2.livelyvideo.tv/live/sportsdemo.json"
	// app routes
	// non specified; use defaults
}