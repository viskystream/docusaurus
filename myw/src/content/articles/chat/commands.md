---
route: /chat/commands
pageTitle: Commands
kind: guide
uuid: dc7f45ac-5b13-4b74-b9ad-3c00fa546d31
---

Commands are strings sent to the {% company-name /%} Chat service which form the main form of user interaction with the system. It is expected that anything typed into a "chat message box" in a user interface will be directly forwarded to the {% company-name /%} Chat service but commands can also be used as a programatic API by chat bots or by the client application.

Chat commands are structured in the form /{command} [argument1 argument2 ...]. If no /command prefix is present, the command verb is defaulted to say and the entirety of the string is parsed as a chat message to be published the appropriate room.

Only authenticated users are able to issue commands.

Issue commands to the public chat API.

## Valid commands

All commands below, other than the /ignore and /unignore are specific to the context of the room to which the command is issued (as set by the {roomname} parameter in the route)

| Name | Desciption | Command | 
| ------- | ---------- | ------- |
| Help | Show all chat commands in a single returned 'info' level API message. | `/help` |
| Say | Send a message to the room. {% company-name /%} parses chat emoticons, username mentions, links, blacklisted words, and tags. Mentions of other users are added to the published chat message when a valid username is prefixed by a @ in the chat message. The client organization is able to configure a URL template to into which the username is injected so that end users are able to follow a link to get to a page related to the mentioned user. Similarly, words without a space prefixed by # are treated as tags and are injected into their own URL template to be presented to the end user. Detected links are parsed and attached to a 'links' key in the published message. If a blacklisted word is encountered, the command rejects the message and returns a validation warning letting the end user know not to use the word. | `/say {text to say}` or `{text to say}` |
| Role Say | Send a message only to users with roles that have the CAN_CHAT_IN_ALL or CAN_CHAT_IN:{role} (where role is the role specified in the command) permission. | `/rolesay {role to message} {text to say}` |
| Ignore | Ignore the specified user. When a user is ignored, their id is added to a set of ignored user ids saved with the ignoring user's resource. Upon being parsed, any message from a user in this list is marked with an 'ignore' flag (see the parsed chat object i the chat client). The UI is responsible for hiding these messages in whatever manner desired. | `/ignore {username to ignore}` |
| Unignore | Unignore the specified user. Removes the user from the ignoring user's list of ignored user ids. | `/unignore {username to unignore}` |
| Mute | Mute the specified user in this room. Requires mod privileges. | `/mute {username to mute}` |
| Unmute | Unmute the specified user in this room. Requires mod privileges. | `/unmute {username to unmute}` |
| Ban | Ban the specified user in this room. Requires mod privileges. | `/ban {username to ban}` |
| Unban | Unban the specified user in this room. Requires mod privileges. | `/unban {username to unban}`|
| Blacklist | Add a word to the room blacklist. Any message with this word will be rejected with a validation message. Requires mod privileges. Use * in the word to wildcard multiple characters. For example, /blacklist cat* will disallow the use of 'cat' or 'catwalk' in chat messages. | `/blacklist {word you want to blacklist}` |
| Remove From Blacklist | Remove a word from the room blacklist. Requires mod privileges. | /unblacklist {word you want to unblacklist} |
| Rate limit | Update the current rate limit setting for the room. The first parameter is maximum number of allowed chat messages from a single user in a certain period of time. The second parameter is the period of time in seconds. For example, /limit 5 3 will set the rate limit to a maximum of 5 chats every 3 seconds. | `/limit {allowed chats per number of seconds} {number of seconds (default 3)}` |
| Mode | Specify a mode for the room. Only users with roles that have the CAN_CHAT_IN_ALL or CAN_CHAT_IN:{role} (where role is the specified mode) permission can chat when a room is in this mode. The default room mode is specified in the chat config. | `/mode {user|moderator|owner|{custom role}}` |
| Delete | Remove a message. Issuing this command will remove the message from the room's history and publish a 'delete' event with the id of the message to all listening websocket/http longpoll interfaces. Upon receiving a 'delete' event, it is the resposibility of the UI implementation to hide or remove the chat message. Chat message ids are uuids, so it is unlikely that this would be used a human entered command. It it kept as part of the command interface for use by bots. | `/delete {id of the message to delete}` |
| Change role | Switch the role of a user to another role. Acceptable roles are "user", "moderator", or any custom configured role. | `/changerole {username of who you want change the role of} {new role}` |
| Change owner | Switch the owner of a room. | `/owner {username of who should become the new owner}` |
| Mod | Make another user a moderator in this room. Command is only available to room owners and admins by default. This is an alias of /changerole {username} moderator. | `/mod {username to mod}` |
| Unmod | Remove a user's mod privileges. Command is only available to room owners and admins by default. This is an alias of /changerole {username} user. | `/unmod {username to unmod}` |
| Caps | Toggle capital letter spam protection. | `/caps {on|off}` |
| Links | Toggle link spam protection. `/links {on|off}` |
| Domain Whitelist | Add a domain to the room whitelist. If link protection is on, any url with the specified domain will be accepted. | `/whitelist {word you want to whitelist}` |
| Remove From Domain Whitelist | Remove a domain to the room whitelist. | `/unwhitelist {word you want to unwhitelist}` |
