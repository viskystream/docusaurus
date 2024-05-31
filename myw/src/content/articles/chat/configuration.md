---
route: /chat/configuration
pageTitle: Configuration
kind: guide
uuid: 0ae26501-6423-4b71-b965-4a981333916c
---

## Configuration
Configuration is currently managed by {% company-name /%}. Configuration changes through your client console are coming soon. In the meantime, please send a email to {% company-email /%} with desired configuration changes.

| Config | Environment Variable	| Description	| String Format |
| ------ | -------------------- | ----------- | ------------- |
| AllowUserEmoticons | CHAT_ALLOW_USER_EMOTICONS | Allow users to upload custom emoticons which they can then use in chat. | "true" or "false" |
| ManageAvatars | CHAT_MANAGE_AVATARS | Manage user avatars through your own system. (Disables user avatar uploads and enables avatar changes via the auth route) | "true" or "false" |
| DisableSystemEmoticons | CHAT_DISABLE_SYSTEM_EMOTICONS | Disable system emoticons. Allow cache propagation time. | "true" or "false" |
| AllowRoomEmoticons | CHAT_ALLOW_ROOM_EMOTICONS | Allow room owners to upload custom emoticons which then anyone in their room can use in chat. | "true" or "false" |
| ChannelLinkTemplate | CHAT_CHANNEL_LINK_TEMPLATE | A url template to construct a link to a user in the client application. In the template, use the placeholder {{n}} for the username. For example: `https://www.example.com/users/{{n}}` | string |
| TagLinkTemplate | CHAT_TAG_LINK_TEMPLATE | For example: `https://www.example.com/search?tag={{n}}` | string |
| ImageSourceHost | CHAT_IMAGE_SOURCE_HOST | The host (including any additional path) from where images are served. For example: `http://storage.googleapis.com` | string |
| RoomThrottle | CHAT_ROOM_THOTTLE | The number above which we throttle the number of chats per second | integer |
| InputMax | CHAT_INPUT_MAX | The maximum character count for chat messages and commands. | integer |
| WordBlacklist | CHAT_WORD_BLACKLIST | A company provided blacklist. | comma separated string values |
| DomainWhitelist | CHAT_DOMAIN_WHITELIST | 	A company provided domain whitelist. | comma separated string values |
| PublicRoles | CHAT_PUBLIC_ROLES | The list of roles displayed in the /chat/v1/roles endpoint | comma separated string values |
| RBACRules | CHAT_RBAC_RULES | A list of rbac rules | JSON: array of |
| RBACAdminRule | CHAT_RBAC_ADMIN_RULE | An rbac rule for the admin role to be applied after all other rules | JSON: single  object |
| DefaultRoomMode | CHAT_DEFAULT_ROOM_MODE | The default mode for any new room | string |
| DefaultRoomUserRole | CHAT_DEFAULT_ROOM_USER_ROLE | The default role for any new room user | | string |
| TreatSayAsRoleSay | CHAT_TREAT_SAY_AS_ROLE_SAY | All says are treated as /rolesay {role of the sayer} | "true" or "false" |
| ShadowChatBlocked | CHAT_SHADOW_CHAT_BLOCKED | Shadow message all chats instead of blocking them (includes: muted, blacklisted, link protected) | "true" or "false" |
| MaxHistory | CHAT_MAX_HISTORY | The maximum number of messages sent in history. With role based message viewing permissions, history may be lower than this number | integer |
| LoggerEndpoint | CHAT_LOGGER_ENDPOINT | See Message Logging. This configuration persists for the lifetime of the service. | string |
