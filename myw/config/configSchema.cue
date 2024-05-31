package config

// Main Configuration Schema
config: {
	// http port of the service api
	port: *8765 | uint
	// log level
	logLevel: *"debug" | string
	// elastic search username
	elasticUsername: *"admin" | string
	// elastic search password
	elasticPassword: string
	// elastic search config params
	elastic: {
		endpoint: *"https://devcenter-lsea2-kibana-client.livelyvideo.tv" | string
		index: *"documentation" | string
	}
	// global host url
	globalHostUrl: string
	// company name seen across site
	companyName: *"Lively Video" | string
	// company contact email address
	companyEmail: *"support@livelyvideo.tv" | string
	// company token
	COMPANY_TOKEN: *"4zFTA36Ow7Ca" | string
	public?: {
	    clientId: *"prod" | string
    	globalHostUrl: string
    	keycloakUrl: string
		// project token used by the mixpanel used for native frame
    	mixpanelProjectToken?: string
	}
	// manifest to use for the sport demo video playback
	sportsUrl: *"https://lively-dev-usc1a-manifest2.livelyvideo.tv/live/sportsdemo.json" | string
	// app routes; use the default routes definition by default, but accept a new array of routes if given
	routes: *#DefaultRoutes | [...#Route]
}

// default list of routes
#DefaultRoutes: [
	#ComplianceRoute,
	#LgbxConsoleRoute,
	#PulseRoute,
	#WebhookEventsRoute,
	#KubernetesDashboardRoute,
	#DemosRoute,
]

// schema for a single route
#Route: {
	name: string
	key: string
	description: string
	href: string
	icon: string
	color: string
	category: {
		name: string
		key: string
	}
	groups: [...string]
}

// Route definitions that can be re-used for different deployments
#ComplianceRoute: #Route & {
    name: "Compliance"
    key: "compliance"
    description: "Review and report content or compliance issues with running streams"
    href: "/apps/stream-monitor"
    icon: "ClipboardDocumentCheckIcon"
    color: "red"
    category: {
        name: "Admin"
        key: "admin"
    }
    groups: [
        "any",
        "compliance-agent",
        "compliance-agent-admin",
        "compliance-agent-private",
    ]
}

#LgbxConsoleRoute: #Route & {
    name: "Stream Console"
    key: "stream-console"
    description: "Live stream operations monitoring"
    href: "/apps/stream-console"
    icon: "CloudIcon"
    color: "blue"
    category: {
        name: "Admin"
        key: "admin"
    }
    groups: [
        "any"
    ]
}

#PulseRoute: #Route & {
	name: "Pulse"
	key: "stats"
	description: "Real-time streaming stats dashboard"
	href: "/apps/stats"
	icon: "ChartBarIcon"
	color: "yellow"
	category: {
		name: "Admin"
		key: "admin"
	}
	groups: [
		"any"
	]
}

#WebhookEventsRoute: #Route & {
	name: "Webhook Events"
	key: "webhook-events"
	description: "Manage webhook settings and visualize event history"
	href: "/apps/events"
	icon: "FireIcon"
	color: "green"
	category: {
		name: "Admin"
		key: "admin"
	}
	groups: [
		"any"
	]
}

#KubernetesDashboardRoute: #Route & {
	name: "Kubernetes Dashboard"
	key: "kubernetes-dashboard"
	description: "Deploy and troubleshoot applications and manage cluster resources"
	href: "/apps/kubernetes-dashboard/"
	icon: "CubeIcon"
	color: "sky"
	category: {
		name: "Admin"
		key: "admin"
	}
	groups: [
		"kubernetes-dashboard"
	]
}

#DemosRoute: #Route & {
	name: "Demos"
	key: "demos"
	description: "Livestreaming demos to visualize product use cases"
	href: "/apps/demos"
	icon: "BeakerIcon"
	color: "cyan"
	category: {
		name: "Product"
		key: "product"
	}
	groups: [
		"any"
	]
}

#ShowcasesRoute: #Route & {
	name: "Showcases"
	key: "showcases"
	description: "Product case studies to show real world applications"
	href: "/apps/showcases"
	icon: "PresentationChartLineIcon"
	color: "orange"
	category: {
		name: "Product"
		key: "product"
	}
	groups: [
		"any"
	]
}