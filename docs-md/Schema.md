Schema
===

Even though Hypersonic is document oriented, it's tables and fields must follow a convention.
 
Databases and tables that belong to gearz are preceded by an underscore. Ex: `_users`.

Tables
===

Users
---

Field | Type | Description
--- | --- | ---
id | UUID | Primary key
name | String | The user name
displayName | string | The user display name
email | String | The user e-mail
photo | String | The URI of the user's profile picture
externalProfiles | Object { provider: { id: id, raw: profile } | An object containing one property for each identity provider. The value is an object with two properties. `id`, containing the `id`, and `raw`, containing the entire profile
