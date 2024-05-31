---
route: /Internal Developer Docs/Dev Center/Dev Center Groups
pageTitle: Dev Center Groups
kind: concept
access_role: "admin"
uuid: c94bf3b1-94a1-4138-b68d-588266713130
---

## Keycloak group mappings for dev center

{% table %}

* Name
* Description

---

* any
* Default group (required for access to any resource)

---

* umbrella / umbrella:{company} / umbrella:{company}:{environment}
* The default group that gates access to any umbrella client that doesn’t require a special permission.

---

* compliance-agent
* Default Stream Monitor (Compliance) group.

---

* compliance-agent-private
* Grants permissions to `private` streams in Stream Monitor (Compliance)

---

* compliance-agent-admin
* Grants permissions to problem streams in Stream Monitor (Compliance)

---

* dev
* Default organizational contributor group
{% /table %}
