import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Saves a password to storage after a few basic checks. Does not validate that the password is valid, only that it is not blank
 * @param {string} password Password to save to storage
 * @return {Promise} Resolves once the password is saved or rejects if the password could not be saved
 * @throws {TypeError} Thrown if password is not a string
 * @throws {RangeError} Thrown if the password is blank
 * @throws {Error} Thrown when unable to save the password to storage
 */
export async function savePassword(password) {
	if(typeof password !== "string") throw new TypeError("Password must be a string");
	if(password.length === 0) throw new RangeError("Password cannot be blank");
	try {
		await AsyncStorage.setItem("password", password);
	} catch(err) {
		throw new Error("Note: Failed to save password on your device, you will have to log in again next time");
	}
}

/**
 * Fetches password saved in storage if it exists
 * @return {Promise<string|null>} Returns the password or null if it does not exist
 */
export async function getPassword() {
	return AsyncStorage.getItem("password");
}