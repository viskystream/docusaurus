---
route: /Internal Developer Docs/Documentation/Documentation Guide Template
index: 1
pageTitle: Guide Template
kind: guide
access_role: "admin"
uuid: 932b1397-530d-43a5-ba2d-32616448b750
---

## What is a Guide?

A guide is a piece of documentation that provides a series of steps. In most cases, it is intended for someone who already has working knowledge of the platform.  It may include more complex use cases or advanced setup, but it should not include detailed explanations.

In some cases, your audience is a developer who is new to the platform, where the goal is to get set up with our system as quickly as possible (a quickstart guide). In these cases, we refer to the guide as a "Quickstart". You may want to include how to access credentials, as well as a walk-through of the happy path for the most common use cases. If there are detailed explanations and/or more complex use cases, these should be written as separate guides or explanations and referenced as links.

***********************************************
## How to [whatever specific goal to be achieved]

**Intro Statement**  
Length: No more than a few sentences  
Content: Brief description of what this is about and why the developer should care about it.  
Prompts:
- By the end of this guide, what should the developer be able to do?
- What are the benefits of doing this?

{% callout title="Before you start (optional, if applicable)" %}
  Length: Usually a sentence or two  
  Content: What the developer needs to do before starting on this task  
  Prompts:
  - Are there prerequisite steps the developer should perform before continuing? 
  - If so, what are they? Editors will link out to the appropriate how to guide an/or API references
{% /callout %}

**Developer Instructions**  
Length: Will vary  
Content: Step by step instructions to accomplish a single task  
Prompts:
- List out the various steps in plain language to accomplish this task. Example: “Create a room”, “Set up video”
- If possible, break down larger steps into smaller tasks. It should be sufficiently simple but not overly reductive that a user can follow all the steps while having a rough understanding of what, why, and how they're doing them. 
- Wherever applicable, include in each step:
- Which concepts should the developer know about? Simply list the concept; editors will link out to its relevant concept page for explanation
- What are the glossary terms that we should define? Simply highlight these terms. Editors will facilitate the creation of a glossary reference and include its definition on hover.
- Are there any dense, complicated, or difficult to visualize/comprehend points that could use a visual aid? If so, reach out to Christina James and/or Kate Migliazzo to help with asset design and creation
- Are there any rules or limitations that the developer should know about? Editors will flag this information with its own UI element and/or link out to various resources
- Is there a repository available with the full code ? If so, provide a url so that editors can link it, and include it in the reference docs.
- Code examples
  - Will the code change based on a decision, option, or the language being used? If so, provide a snippet of each variation. Editors will create a tabbed view of each variation
