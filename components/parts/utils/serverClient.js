/**
 * Purely a set of functions that interact directly with the server
 * No additional validation should be done here prior to sending a request to the server (See serverClientWrapper.js)
 */
import config from "../../../config.json";

const SERVER_URL = config.serverURL;
const endpoints = config.serverEndpointBaseURLs;

export async function exchangePassword(password) {
	const result = {
		ok: false,
		messages: [],
		api_key: null
	};

	let res;
	try {
		res = await fetch(`${SERVER_URL}${endpoints.exchangePassword}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				password: password
			})
		});
	} catch(err) {
		result.messages.push(`Unable to fetch status. Are you connected to the internet?`);
		return result;
	}

	if(res.status === 404) {
		result.messages.push("Sorry, it looks like you don't exist\nOr that's the wrong password...\nBoth possibilities are equally likely");
		return result;
	}

	if(!res.ok) {
		result.messages.push(`Server behaved unexpectedly and gave this error: [${res.status}] ${res.statusText}`);
		return result;
	}

	const exchangeResponse = await res.json();
	result.ok = true;
	result.api_key = exchangeResponse.api_key;
	return result;
}

export async function verifyPassword(password) {
	const result = {
		ok: false,
		messages: [],
		data: {
			verified: false,
			user: null
		}
	};

	const apiKeyResult = await exchangePassword(password);
	if(!apiKeyResult.ok) {
		result.messages.push(...apiKeyResult.messages);
		return result;
	}

	const apiKey = apiKeyResult.api_key;
	result.ok = true;
	result.data.verified = true;
	result.data.user = {
		name: null,
		apiKey: apiKey,
		// Is 0 if signed out. Otherwise, the actual time logged in is fetched or set to the current time if unable to be found
		signedIn: null
	};

	const userResult = await verifyApiKey(apiKey);

	if(!userResult.ok) {
		result.messages.push(...userResult.messages);
		return result;
	}

	return userResult;
}

export async function verifyApiKey(apiKey) {
	const result = {
		ok: false,
		messages: [],
		data: {
			verified: false,
			user: null
		}
	};

	let res;
	try {
		res = await fetch(`${SERVER_URL}${endpoints.getUserStatus}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${apiKey}`
			}
		});
	} catch(err) {
		result.messages.push(`Unable to fetch status. Are you connected to the internet?`);
		return result;
	}

	if(!res.ok) {
		result.messages.push(`Server behaved unexpectedly during exchange and gave this error: [${res.status}] ${res.statusText}`);
		return result;
	}

	const tokenJsonResponse = await res.json();
	const user = tokenJsonResponse.user;
	result.ok = true;
	result.data.verified = true;
	result.data.user = {
		name: `${user.first_name} ${user.last_name}`,
		apiKey: apiKey,
		// Is 0 if signed out. Otherwise, the actual sign in time is set
		signedIn: (!user.session || user.session.endTime) ? 0 : user.session.startTime
	};

	return result;
}

/**
 * Signs a user in or out
 * @param {string} apiKey API key of the user to sign in or out
 * @param {boolean} signInMode If set to false, will sign the user out instead
 * @return {Promise<Object>} Resolves after a response is received from the server and parsed
 */
async function signInOut(apiKey, signInMode) {
	const url = `${SERVER_URL}${endpoints.signIn}`;
	const result = {
		ok: false,
		messages: [],
		data: null
	};

	let res;
	try {
		res = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				method: signInMode ? "sign_in" : "sign_out"
			})
		});
	} catch(err) {
		result.messages.push(`Unable to fetch status. Are you connected to the internet?`);
		return result;
	}

	if(res.status === 400) {
		result.ok = true;
		result.messages.push(await res.text());
		return result;
	}

	if(!res.ok) {
		result.messages.push(`Unable to sign ${signIn ? "in" : "out"}: [${res.status}] ${res.statusText}`);
		return result;
	}

	const verified = await verifyApiKey(apiKey);
	result.ok = verified.ok && verified.data.verified;
	if(result.ok) {
		result.data = verified.data.user;
	}

	return result;
}

export function signIn(apiKey) {
	return signInOut(apiKey, true);
}

export function signOut(apiKey) {
	return signInOut(apiKey, false);
}

export function getLeaderboard() {
	return fetch(endpoints.getData)
		.then(res => res.json())
		.then(data => {
			// Sorted by sign in status, total time, then username
			return data
				.sort((a, b) => {
					if(a.signedIn !== b.signedIn) {
						return b.signedIn - a.signedIn;
					}
					if(a.totalTime !== b.totalTime) {
						return b.totalTime - a.totalTime;
					}
					if(a.username < b.username) {
						return -1;
					}
					if(a.username > b.username) {
						return 1;
					}
					return 0;
				});
		})
		.catch(err => {
			console.log("Failed to fetch all users' basic data:");
			console.error(err);
			return [];
		});
}

export function addUser(newUserObject) {
	return fetch(`${SERVER_URL}${endpoints.admin.addUser}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer A-Berd"
		},
		body: JSON.stringify(newUserObject)
	})
		.then(res => res.text());
}

export function addSession(newSession) {
	return fetch(`${SERVER_URL}${endpoints.admin.addSession}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer A-Berd"
		},
		body: JSON.stringify(newSession)
	})
		.then(res => res.text());
}