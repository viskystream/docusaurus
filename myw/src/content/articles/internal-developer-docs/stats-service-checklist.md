---
route: /internal-developer-docs/engineering-standards/stats-service-checklist
pageTitle: Service Checklist - Stats
kind: concept
access_role: "admin"
uuid: 8b344b06-ac53-48c8-97fd-3e45eb40a91f
---

### Basic Information


|**Service Name**      | **Project Name** | **Service Owner** | **Umbrella deployment?**| **Database migrations?** | **External service?** | **Github link** |
| :---        |    :----   |       :--- | :--- | :--| :--| :--| 
| Stats      | Stats       | Amir   |No|No|No|https://github.com/LivelyVideo/stats |


### Naming conventions


- [x] The service name complies with the help text listed above.
- [ ] The service name is suffixed with a `-api` if it is a the specific backend of a `-client` of the same name.
- [ ] The same service name is used for the following:

- [x] Helm chart
- [ ] Kubernetes resources
- [x] Container name within the Kubernetes pods
- [x] Kubernetes label `app:` for all Kubernetes resources in the chart.

### DevOps Requirements


- [ ] DevOps requirements are committed to a cue config in the git repo.
- [x] What is the service root path/endpoint? `/` and `/multistreams`
- [x] What port does the service run on? `80`
- [ ] Where/IF should a config file be mounted? Did not find any entry in the yaml files.
- [ ] Are there environment vars? Can these utilize config files instead? Did not find any entry in yaml file
- [ ] Is it part of umbrella?
- [x] Does it need access from the world or just internal?
- [ ] Is there a migration script? Database connection?
- [x] Config-Manager OPS Schema + Cue Files [https://github.com/LivelyVideo/stats/tree/main/goexporter/server/conf]
- [ ] Devspace sync / restart (hot reload) commands 
- [ ] What are some dependencies?
- [x] GoCD Image Build with latest & Deployment?
- [x] Helm chart?
- [x] Versioning schemas?
- [ ] Client/Product Specific or global?
- [ ] Host Network?
- [ ] Deployment affinity? Deployment type (daemon/deployment/replicaset)?
- [x] Horizontal Pod Autoscaling? 
- [ ] Replacing or additive service?
- [ ] Unique DNS or unique pathing?
- [x] Logging? File base logging or k8s logging?
- [ ] Logstash parsing? Any tags want pulled from log for easier queries in Kibana
- [ ] Keycloak Groups?
- [ ] Prometheus scraping/metrics endpoint?

### Devspace setup


- [ ] This service runs in devspace with `devspace deploy` using a `latest` tag.
- [ ] This service syncs local files from the primary codebase to a devspace-run container for development with `devspace dev`.
- [ ] This service syncs generated boilerplate from service definitions.
- [ ] The devspace container is deployed with debugging tools like `--inspect` for node services.
- [ ] Logs for this service run in devspace are available in Kibana.
- [ ] If required, this service is part of a top level profile that deploys an entire stack.

### Service Definitions and Documentation


- [x] The service code repository has at least one document usable for dev center consumption. The README.md
- [x] The service has openAPI specs in the service definitions repo.
- [ ] The service has versioning in sync with the service definitions repo.
- [ ] The service uses code generation from the service definitions repo.
- [ ] Service docs are scraped by docutil.

### Service Configuration


- [ ] The service can be entirely configured through a file (excluding environment variables settable by Helm).
- [x] The service can be configured with Cue.
- [ ] The service **is exclusively** configured with Cue.
- [ ] Service configuration is published to Config Manager.

### Code Cleanliness


- [x] The code has an established peer review process.
- [ ] Code checked into the repository is linted before commit using a linting configuration committed in git or standard to the language.

### Versioning and CI/CD


- [ ] The service version is semver and is prefixed with `v`.
- [ ] The service definitions repo is tagged with a version prefixed by the path to the service definitions files in the repo. (ex. `umbrella/status/v1.1.0` for [https://github.com/LivelyVideo/service-definitions/tree/umbrella/status/v1.1.0/umbrella/status](https://github.com/LivelyVideo/service-definitions/tree/umbrella/status/v1.1.0/umbrella/status) )
- [ ] Versions are tagged in the git repo.
- [x] The service has a CI job to publish main/master branch builds.
- [ ] Semantic PR titles are checked prior to merge. `Manual process`
- [ ] Merges are done with rebase through PR. `Sqaush and merge`
- [x] The service has a CI job that publishes a `latest` tag.
- [x] The service has a CI job to publish develop branch (configurable in GoCD) builds.
- [ ] The service has a CD job to automatically publish to lively dev.
- [ ] The service has a CD job to automatically publish to staging environments.
- [x] The service has a CD job that QA can trigger to manually publish to production environments.
- [ ] A changelog is automatically generated.
- [ ] PR titles use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). `Manual process`

### Service Monitoring


- [x] Logs for this service are available in Kibana.
- [ ] If using file-based logging, the container running the service does log rotation.
- [ ] Logs contain “aggregates” data.
- [ ] Alerts are set up for this service on “error” level logs.
- [ ] The service exposes Prometheus stats.
- [ ] The service has a configured grafana dashboard.