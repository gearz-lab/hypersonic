Schema
===

Even though Gearz is document oriented, it's tables and fields must follow a convention.
 
Databases and tables that belong to gearz are preceded by an underscore. Ex: `_users`.

Tables
===

Users
---

Field | Type | Description
--- | --- | ---
id | UUID | Primary key
name | string | The user name
displayName | string | The user display name
email | string | The user e-mail
photo | string | The URI of the user's profile picture
