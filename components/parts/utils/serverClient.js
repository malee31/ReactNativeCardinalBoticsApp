/**
 * Purely a set of functions that interact directly with the server
 * No additional validation should be done here prior to sending a request to the server (See serverClientWrapper.js)
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../config.json";

const endpoints = config.serverEndpointBaseURLs;

// Fetch and retries whenever fetch() throws an error (No connection or non-JSON response)
// Has a 100ms wait between attempts
async function _fetchRetry(url, options = {}, retries = 3) {
	let response = {
		ok: false,
		code: "fetch_failed"
	};

	for(let attempt = 0; attempt < retries; attempt++) {
		try {
			const req = await fetch(url, {
				...options,
				headers: {
					"Content-Type": "application/json",
					...(options?.headers || {})
				}
			});
			response = await req.json();

			response.status = req.status;
			break;
		} catch(err) {
			console.error(`Fetch attempt ${attempt + 1}/${retries} failed: ${err}`);
		}

		// Wait 100ms before retrying
		await new Promise(resolve => setTimeout(resolve, 100));
	}

	return response;
}

class Client {
	apiKey = "";
	adminKey = "";
	initialized = false;

	constructor(_serverURL) {
		this.serverURL = "http://localhost:3000";
		if(_serverURL) {
			this.serverURL = _serverURL;
		}
	}

	// May run multiple times if called repeatedly before the first call is done loading from storage
	async initialize() {
		if(this.initialized) return;

		const savedApiKey = await AsyncStorage.getItem("api_key");
		const savedAdminKey = await AsyncStorage.getItem("admin_key");

		if(await this.validate(savedApiKey)) {
			this.apiKey = savedApiKey;
		} else if(savedApiKey) {
			await AsyncStorage.removeItem("api_key");
		}

		if(await this.validate(savedAdminKey)) {
			this.adminKey = savedAdminKey;
		} else if(savedAdminKey) {
			await AsyncStorage.removeItem("admin_key");
		}

		this.initialized = true;
	}

	// Adds fetch headers for Authorization and JSON response
	_generateHeaders(opts = {}) {
		const options = {
			auth: true,
			admin: false,
			apiKey: this.apiKey,
			adminKey: this.adminKey,
			...opts
		};

		const headers = {
			"Content-Type": "application/json"
		};

		if(!options.auth) {
			return headers;
		}

		if(options.admin) {
			headers["Authorization"] = `Bearer ${options.adminKey}`;
			return headers;
		}

		headers["Authorization"] = `Bearer ${options.apiKey}`;
		return headers;
	}

	async validate(credential) {
		if(typeof credential !== "string") return false;
		if(!credential.startsWith("U-") && !credential.startsWith("A-")) return false;

		if(credential.startsWith("A-")) {
			// Attempt to delete a non-existent user to test admin keys
			const response = await this.request("DELETE", "/user", {
				admin: true,
				adminKey: credential,
				body: JSON.stringify({
					password: "nonexistent-password-that-should-never-exist-9999"
				})
			});

			return response.warning === "already_deleted";
		}

		// Attempt to fetch user status to test user keys
		const response = await this.request("GET", endpoints.getUserData, {
			apiKey: credential
		});

		// User is authorized if it has both an 'ok' response and a user id
		return response.ok && response.id;
	}

	// Call to attempt a login with an admin or user password.
	// Returns true and stores the resulting API key on success
	async login(password) {
		// Admin password exception
		if(password.startsWith("A-")) {
			const adminValid = await this.validate(password);
			if(!adminValid) return false;

			this.adminKey = password;
			await AsyncStorage.setItem("admin_key", password);
			return true;
		}

		const exchangeResponse = await client.request("POST", "/user/auth/exchange", {
			auth: false,
			body: JSON.stringify({
				password: password
			})
		});
		const apiKey = exchangeResponse.api_key;

		if(await this.validate(apiKey)) {
			this.apiKey = apiKey;
			await AsyncStorage.setItem("api_key", apiKey);
			return true;
		}

		return false;
	}

	async request(method, endpoint, opts = {}) {
		const url = `${this.serverURL}${endpoint}`;
		const options = {
			...opts,
			method: method,
			headers: this._generateHeaders(opts)
		};

		return await _fetchRetry(url, options);
	}
}

// Only one client instance exists by default
const client = new Client("https://slack.team4159.org");

// Export the client for use everywhere
export default client;
