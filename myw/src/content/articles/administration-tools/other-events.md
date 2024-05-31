---
route: /administration-tools/other-events
pageTitle: Other events
kind: guide
uuid: 4c1e5741-acdc-4968-a250-bd073831ddf3
---

Located within Umbrella > Webhook Events. 

Upper left corner of the screen, select Project > PVC

PVC encompasses 3 components:
- Load Balancer
- Selective Forwarding Unit (SFU)
- Load Balancer chooses the SFU for the user

The events service allows you to configure events. If you go to **Create** “Register new webhook”, it has multiple types prefilled to quicken your setup. (see image below)

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CHc1373842-d873-41d6-8715-8da3cd1b9373" alt="other events 1" /%}

These are configured under the PVC project, it specifies all these events and the event service you can register webhooks with them. So, the SFU or the LOAD BALANCER can send an event to the event service and on the other end, someone else can register a webhook to receive events.

2-part Process:

- we send events out to the event service 
- whoever else can create a webhook and register the events 

The current (active) webhooks will be listed just below the “Webhooks” indicator on the left panel. If you click on any of the existing webhooks, you will then be viewing the details and history of that webhook.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH51c1f2f6-416c-40ee-a2cb-5a7d5cb5112d" alt="other events 2" /%}

In order to modify an existing webhook, you must click into it from the left panel, then click **Edit** on the upper-right corner of the screen. 

On the far upper-left-hand corner of the page, you can change/flip between other Projects (if applicable).

There are controls on the upper right corner of the screen (see image below), that you can Filter, Refresh, or Trigger events with.

*It is always good to be extra careful when triggering events, especially if in a Live/Production environment.

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CHdad704e6-1235-4db8-a311-719a36b0d57e" alt="other events 3" /%}

View all project event history by clicking the History tab on the left panel. 

You can create a new Webhook by clicking the **Create** button on the left panel. This will open up a new webhook form for you to fill in the new specifications.

Proceed to fill out 3 sections:

- DETAILS -  webhook info
- REQUEST -  endpoint w/ payload to send on trigger
- RESPONSE -  custom response (ex. Code 200)

When filling out the middle section for **Request**, you can look at the URL & Header  Supports Variables. By clicking on the question mark button, or `?` icon, example variables will display (see both images below).

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CH3f889f67-516d-41aa-8ded-bd8665b98ba3" alt="other events 4" /%}

{% image src="https://storage.googleapis.com/markdoc-snippet-imgs/uploaded/PhilMok@devcenter/CHa54c1658-477b-427d-99d4-5d1e780abbf8" alt="other events 5" /%}

{% feedback /%}