# New API Plan
This document outlines the endpoints and specifications for creating a new version of the outdated server API currently in use.  
To be PR'd into the original as a replacement at a later date

# Specifications
Namespace: /api/v1/*

GET /users - List all user data (No passwords ofc)
# Convenience methods
GET /users/status - List all user data WITH their latest sessions
WS /ws/users/status - Invoked each time a user has their status change (Provides the new user status)

GET /user - User data
POST /user - Add user (Admin auth header)
PUT /user - Edit user (Changing passwords etc) (Auth header)
(Option) PATCH /user/password - Alternative user edit options (Changing passwords etc) (Auth header)
DELETE /user - Delete the user (Admin auth header)

GET /user/sessions - All user sessions (Auth header)
PUT /user/sessions - For ending a session (Auth header)
DELETE /user/session/:session-id - For removing a specific session (Admin auth header)

GET /user/session/latest - Latest session (Auth header)
PATCH /user/session/latest - Switch to log out (Auth header)

POST /user/auth/exchange - Given a password, returns a randomly generated, valid api key that does not expire for the user
POST /user/auth/revoke - Revokes and regenerates the api key

# Auth notes
As a side effect of revoke, all auth-related endpoints can fail with `error: "AUTH_REVOKED_BY_USER"`

# API Responses
```json
{
	"ok": "true/false",
	"warning": "UNKNOWN_WARNING",
	"error": "UNKNOWN_ERROR",
	"other data": {
		"...stuff": "etc"
	}
}
```
