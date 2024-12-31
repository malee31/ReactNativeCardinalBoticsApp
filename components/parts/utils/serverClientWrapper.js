/**
 * Additional convenience functions that wrap around the server request client
 */
import client from "./serverClient";
import config from "../../../config.json";

const SERVER_URL = config.serverURL;
const endpoints = config.serverEndpointBaseURLs;

export async function getStatus() {
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
		res = await client.request("GET", endpoints.getUserStatus);
	} catch(err) {
		result.messages.push(`Unable to fetch status. Are you connected to the internet?`);
		return result;
	}

	if(!res.ok) {
		result.messages.push(`Server behaved unexpectedly during exchange and gave this error: [${res.status}] ${res.statusText}`);
		return result;
	}

	const user = res.user;
	result.ok = true;
	result.data.verified = true;
	result.data.user = {
		name: `${user.first_name} ${user.last_name}`,
		// Is 0 if signed out. Otherwise, the actual sign in time is set
		signedIn: (!user.session || user.session.endTime) ? 0 : user.session.startTime
	};

	return result;
}

/**
 * Signs a user in or out
 * @param {boolean} signInMode If set to false, will sign the user out instead
 * @return {Promise<Object>} Resolves after a response is received from the server and parsed
 */
async function signInOut(signInMode) {
	const result = {
		ok: false,
		messages: [],
		data: null
	};

	const res = await client.request("PATCH", endpoints.signIn, {
		body: JSON.stringify({
			method: signInMode ? "sign_in" : "sign_out"
		})
	});

	if(!res.ok) {
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

	const verified = await getStatus();
	result.ok = verified.ok && verified.data.verified;
	if(result.ok) {
		result.data = verified.data.user;
	}

	return result;
}

export function signIn() {
	return signInOut(true);
}

export function signOut() {
	return signInOut(false);
}

export function getLeaderboard() {
	return fetch(`${SERVER_URL}${endpoints.getData}`)
		.then(res => res.json())
		.then(data => {
			// Sorted by sign in status, total time, then username
			return data.users
				.sort((a, b) => {
					// Active users appear first
					const aActive = a.session && !a.session.endTime;
					const bActive = a.session && !a.session.endTime;
					if(aActive !== bActive) {
						return aActive ? -1 : 1;
					}

					// Signed in for longer appears first
					if(aActive && bActive) {
						return a.session.startTime - b.session.startTime;
					}

					// Sort by name if both are signed out
					const aName = `${a.first_name} ${a.last_name}`;
					const bName = `${b.first_name} ${b.last_name}`;
					if(aName < bName) {
						return -1;
					}
					if(aName > bName) {
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
