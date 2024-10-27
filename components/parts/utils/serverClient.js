/**
 * Purely a set of functions that interact directly with the server
 * No additional validation should be done here prior to sending a request to the server (See serverClientWrapper.js)
 */
import config from "../../../config.json";

const SERVER_URL = config.serverURL;
const endpoints = config.serverEndpointBaseURLs;

export async function verifyPassword(password) {
	const url = `${SERVER_URL}${endpoints.getUserData}?password=${encodeURIComponent(password)}`;
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
		res = await fetch(url);
	} catch(err) {
		result.messages.push(`Unable to fetch status. Are you connected to the internet?`);
	}

	if(!res) {
		// Do nothing if fetch errors. No internet message already added by catch ^ above.
	} else if(res.ok) {
		const jsonResponse = await res.json();
		result.ok = true;
		result.data.verified = true;
		result.data.user = {
			name: jsonResponse.name,
			password: password,
			// Is 0 if signed out. Otherwise, the actual time logged in is fetched or set to the current time if unable to be found
			signedIn: !jsonResponse.signedIn ? 0 : await getLeaderboard()
				.then(val => val.find(entry => entry.name.trim() === jsonResponse.name.trim()))
				.then(additionalUserData => Date.now() - additionalUserData.timeIn)
				.catch(() => Date.now())
		};
	} else if(res.status === 404) {
		result.messages.push("Sorry, it looks like you don't exist\nOr that's the wrong password...\nBoth possibilities are equally likely");
	} else {
		result.messages.push(`Server behaved unexpectedly and gave this error: [${res.status}] ${res.statusText}`);
	}

	return result;
}

/**
 * Signs a user in or out
 * @param {string} password Password of the user to sign in or out
 * @param {boolean} signInMode If set to false, will sign the user out instead
 * @return {Promise<Object>} Resolves after a response is received from the server and parsed
 */
async function signInOut(password, signInMode) {
	const url = signInMode ? endpoints.signIn : endpoints.signOut;
	const result = {
		ok: false,
		messages: [],
		data: null
	};

	let res;
	try {
		res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ password: password })
		});
	} catch(err) {
		result.messages.push(`Unable to fetch status. Are you connected to the internet?`);
	}

	if(!res) {
		// Do nothing. No internet message already added by catch ^ above.
	} else if(res.status === 400) {
		result.ok = true;
		result.messages.push(await res.text());
	} else if(!res.ok) {
		result.messages.push(`Unable to sign ${signIn ? "in" : "out"}: [${res.status}] ${res.statusText}`);
	} else {
		const verified = await verifyPassword(password);
		result.ok = verified.ok && verified.data.verified;
		if(result.ok) {
			result.data = verified.data.user;
		}
	}

	return result;
}

export function signIn(password) {
	return signInOut(password, true);
}

export function signOut(password) {
	return signInOut(password, false);
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
			console.log(`Failed to update basic data. F. ${JSON.stringify(err)}`);
			return [];
		});
}

export function addUser(newUserObject) {
	return fetch(endpoints.admin.addUser, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newUserObject)
	})
		.then(res => res.text());
}

export function addSession(newSession) {
	return fetch(endpoints.admin.addSession, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newSession)
	})
		.then(res => res.text());
}