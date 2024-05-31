---
route: /chat/roles
pageTitle: Roles
kind: guide
uuid: d47f6224-283f-4c62-a367-22795c2d83d4
---

### Role based access control
Roles are applied to room users, so a user can have one role in one room and a different role in another.

### Permissions
The following are the permissions which can be applied to any role. Certain permissions are formed by concatenating the permission prefix and a variable. The variable is denoted as `{variable}` and explained in the description.

- CAN_RECEIVE_IN_ALL - Will receive chat messages in any room mode and from any /rolesay command
- CAN_RECEIVE_IN:{role} - Will receive chat messages in {role} room mode and from any /rolesay {role} command
- CAN_CHAT_IN_ALL - Is able to chat in any room mode and issue a /rolesay command to any role
- CAN_CHAT_IN:{role} - Is able to chat in {role} room mode and issue a /rolesay {role} command
- CAN_RECEIVE_WHISPER_FROM_ALL - Is able to receive whispers from any role
- CAN_RECEIVE_WHISPER_FROM:{role} - Is able to receive whispers from {role}
- CAN_WHISPER_TO_ALL - Is able to whisper to any role
- CAN_WHISPER_TO:{role} - Is able to whisper to {role}
- CAN_CHANGE_ROLE_ALL - Is able to change any user's role to any other role (excluding 'guest', 'owner', or 'admin')
- CAN_CHANGE_ROLE:{role} - Is able to change a user with {role} to {role}. For example. In order to be able to change a 'user' to a 'moderator', the user issuing the role change must have CAN_CHANGE_OWN_ROLE:user and CAN_CHANGE_OWN_ROLE:moderator permissions
- CAN_CHANGE_OWN_ROLE:{role} - Is able to change the user's own {role} to {role}. The user should have both the CAN_CHANGE_OWN_ROLE:{role} of the role they are switching from and a CAN_CHANGE_OWN_ROLE:{role} of the role they are switching to.
- CAN_MUTE_ALL - Can mute any users
- CAN_MUTE:{role} - Can mute users with {role}
- CAN_BAN_ALL - Can ban any users
- CAN_BAN:{role} - Can ban users with {role} user issuing the changerole must have both the CAN_CHANGE_ROLE:user and the CAN_CHANGE_ROLE:moderator permissions
- CAN_IGNORE_RATE_LIMIT - Is not affected by the room's rate limit
- CAN_SPAM - Is not affected by the room's caps spam protection
- CAN_IGNORE_MUTE - Can not be muted
- CAN_IGNORE_BAN - Can not be banned
- CAN_SET_SPAM - Can set caps spam protection
- CAN_MANAGE_LINKS - Can turn on link protection, modify the domain whitelist, and post links even when link protection is on
- CAN_CHANGE_MODE - Can change the mode of a room
- CAN_DELETE_MESSAGES - Can delete messages
- CAN_BLACKLIST - Can blacklist words
- CAN_SET_RATE_LIMIT - Can set the room rate limit

### Role rules
Rules follow the following contract:

| Name | Schema	|
| ------ | ---- |
| name *required* | string |
| alias | string |
| color | 	string (hexcode) |
| removeRoles | < string > array |
| addPermissions | < string > array |
| removePermissions | < string > array |

Each rule modifies the a role with the same "name".

- If a role with the name does not exist, it is created.
- If the rule contains an alias, users with the specified role will publicly appear to have the role alias.
- If the rule contains a color, the specified color is the default color used to display the username in chat.
- If the rule contains addRoles, the role will inherit all permissions from the specified role
- If the rule contains removeRoles, the role will remove all permissions which are allowed in the specified role
- If the rule contains addPermissions, the role will get all the specified permissions
- If the rule contains removePermissions, all the specified permissions will be removed from the role

Rules are applied iteratively, so each rule modifies the current state of a role after application of the previous role.

### Default rules
All default rules are defined with variable based permissions set explicitly except for 'admin' which uses the _ALL permission types.

**guest** - The guest rule is applied to unauthenticated users:
- CAN_RECEIVE_IN:user
- CAN_RECEIVE_IN:moderator
- CAN_RECEIVE_IN:owner

**user** - The user rule is the default role for authenticated users:
- CAN_RECEIVE_IN:user
- CAN_RECEIVE_IN:moderator
- CAN_RECEIVE_IN:owner
- CAN_CHAT_IN:user
- CAN_RECEIVE_WHISPER_FROM:user
- CAN_WHISPER_TO:user
- CAN_RECEIVE_WHISPER_FROM:moderator
- CAN_WHISPER_TO:moderator
- CAN_RECEIVE_WHISPER_FROM:owner
- CAN_WHISPER_TO:owner

**moderator** - The moderator rule is a role that can be assigned to users by owners, giving them certain moderation permissions for the room:
- CAN_RECEIVE_IN:user
- CAN_RECEIVE_IN:moderator
- CAN_RECEIVE_IN:owner
- CAN_CHAT_IN:user
- CAN_CHAT_IN:moderator
- CAN_CHANGE_ROLE:user
- CAN_CHANGE_ROLE:moderator
- CAN_IGNORE_RATE_LIMIT
- CAN_SPAM
- CAN_IGNORE_MUTE
- CAN_SET_SPAM
- CAN_MANAGE_LINKS
- CAN_CHANGE_MODE
- CAN_DELETE_MESSAGES
- CAN_BLACKLIST
- CAN_SET_RATE_LIMIT
- CAN_MUTE:guest
- CAN_MUTE:user
- CAN_BAN:guest
- CAN_BAN:user

**owner** - The owner rule has almost all permissions in a room:
- CAN_RECEIVE_IN:user
- CAN_RECEIVE_IN:moderator
- CAN_RECEIVE_IN:owner
- CAN_CHAT_IN:user
- CAN_CHAT_IN:moderator
- CAN_CHAT_IN:owner
- CAN_CHANGE_ROLE:user
- CAN_CHANGE_ROLE:moderator
- CAN_CHANGE_ROLE:owner
- CAN_IGNORE_RATE_LIMIT
- CAN_SPAM
- CAN_IGNORE_MUTE
- CAN_IGNORE_BAN
- CAN_SET_SPAM
- CAN_MANAGE_LINKS
- CAN_CHANGE_MODE
- CAN_DELETE_MESSAGES
- CAN_BLACKLIST
- CAN_SET_RATE_LIMIT
- CAN_MUTE:guest
- CAN_MUTE:user
- CAN_MUTE:moderator
- CAN_BAN:guest
- CAN_BAN:user
- CAN_BAN:moderator

**admin** - The admin rule has all permissions in a room. Unlike like the owner role, no user has the 'admin' permission stored, but rather it, along
with any rule definied in the `rbacAdminRule` config, it is applied dynamically to any user who authenticates as an admin.

- CAN_RECEIVE_IN_ALL
- CAN_CHAT_IN_ALL
- CAN_CHANGE_ROLE_ALL
- CAN_IGNORE_RATE_LIMIT
- CAN_SPAM
- CAN_IGNORE_MUTE
- CAN_IGNORE_BAN
- CAN_SET_SPAM
- CAN_MANAGE_LINKS
- CAN_CHANGE_MODE
- CAN_DELETE_MESSAGES
- CAN_BLACKLIST
- CAN_SET_RATE_LIMIT
- CAN_MUTE_ALL
- CAN_BAN_ALL

### Custom rules
Custom rules can be applied from the chat configuration to modify the permissions of existing roles or to add new roles.

The chat config value rbacRules may contain a json array rules, which will be applied in order after the default rules above. The chat config value rbacAdminRule may contain a single json rule object, which will be applied to the dynamic 'admin' role.

### Banning
Banning a user results in the user not being able to chat in the room for a period of 15 days. A user does not get notified when they are banned.

### Muting
Muting a user results in the user not being able to chat in the room for a period of 10 minutes. Messages they attempt to send to the room result in a validation error notifying them that they are muted.