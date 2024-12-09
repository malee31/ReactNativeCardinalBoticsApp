import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Saves a password to storage after a few basic checks. Does not validate that the password is valid, only that it is not blank
 * @param {string} apiKey API key to save to storage
 * @return {Promise} Resolves once the password is saved or rejects if the password could not be saved
 * @throws {TypeError} Thrown if password is not a string
 * @throws {RangeError} Thrown if the password is blank
 * @throws {Error} Thrown when unable to save the password to storage
 */
export async function saveApiKey(apiKey) {
	if(typeof apiKey !== "string") throw new TypeError("API key must be a string");
	if(apiKey.length === 0) throw new RangeError("API key cannot be blank");
	try {
		await AsyncStorage.setItem("api_key", apiKey);
	} catch(err) {
		throw new Error("Note: Failed to save logins to your device, you will have to log in again next time");
	}
}

/**
 * Fetches api key saved in storage if it exists
 * @return {Promise<string|null>} Returns the password or null if it does not exist
 */
export function getApiKey() {
	return AsyncStorage.getItem("api_key");
}