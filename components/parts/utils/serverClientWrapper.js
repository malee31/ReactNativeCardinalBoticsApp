/**
 * Sets of functions that go around server calls to implement additional side effects.
 * May contain
 */
import { getLeaderboard, verifyPassword } from "./serverClient";
import { saveApiKey } from "./storageManager";

export async function login(userWritable, password) {
	const newPassword = password.trim();
	if(newPassword.length === 0) {
		throw new RangeError("Password cannot be empty");
	} else if(userWritable.userInfo.signedIn) {
		throw new Error("Cannot switch users while signed in");
	}

	const result = await verifyPassword(newPassword);
	if(!result.ok || !result.data.verified) {
		throw new Error(result.messages.join("\n"));
	}

	userWritable.updateData({
		loggedIn: true,
		name: result.data.user.name,
		apiKey: result.data.user.apiKey,
		signedIn: result.data.user.signedIn
	});

	try {
		await saveApiKey(result.data.user.apiKey);
	} catch(err) {
		return `Successfully Logged In!\n${err.message}`;
	}
	return `Success. You're now logged in as ${result.data.user.name.trim()} using ${result.data.user.apiKey}`;
}
