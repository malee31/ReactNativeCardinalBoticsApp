# New API Plan
This document outlines the endpoints and specifications for creating a new version of the outdated server API currently in use.  
To be PR'd into the original as a replacement at a later date

# Specifications
Namespace: /api/v1/*

GET /users - List all user data (No passwords ofc)  
Response:
- (200) Should always be ok unless the server is unreachable

> Convenience methods:  
> GET /users/status - List all user data WITH their latest sessions  
> Responses: User objects with a `session` key in each containing their latest session (See `/user` and `/session/latest`)

WS /ws/users/status - Invoked each time any user has their status change (Provides the new user status)  
Response:
- (200) Contains the changed user in the `user` key and `message_id` and `next_message_id` to detect missed messages

GET /user - Public user data (Auth header)  
Response:
- (200) User object is returned. Not in a `user` key
Errors: 
- 404 `user_not_found` when the user with the corresponding auth header does not exist

POST /user - Add user (Admin auth header)  
Input: New user object in body  
Response:
- (200) New user object is returned (Same form as `/user`)
Errors:
- 401 `not_authed` when no admin header is provided
- 401 `invalid_admin_auth` when admin header is invalid
- 409 `user_already_exists` when a user with the same password exists

PUT /user - Edit user (Changing passwords etc) (Auth header)  
Input: New user object in body  
Response:
- (200) New user object is returned (Same form as `/user`)
Errors:
- 401 `not_authed` when no admin header is provided
- 401 `invalid_admin_auth` when admin header is invalid
- 404 `user_not_found` when a user with the same password exists

(Option) PATCH /user/password - Alternative user edit options (Changing passwords etc) (Auth header)  
Response:
- (204) No content is returned. Success.
Errors:
- 422 `invalid_password` Password is invalid. Other errors may be more specific in the future

DELETE /user - Delete the user (Admin auth header)
Response:
- (204) No content is returned
Warnings:
- (204) `user_already_deleted` User has already been deleted. No content is returned
Errors:
- 401 `not_authed` when no admin header is provided
- 401 `invalid_admin_auth` when admin header is invalid
- 404 `user_not_found` when a user with the same password exists

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
After consuming/checking the status of the request, deleting the keys `ok`, `warning`, and `error` should leave a standard response for the endpoint for storing in a variable or state
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

# Considerations
Since not being able to find the user is also indicates an invalid API key, the code returned could be unauthorized instead