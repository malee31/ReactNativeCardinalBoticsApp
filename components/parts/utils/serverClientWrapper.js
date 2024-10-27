/**
 * Sets of functions that go around server calls to implement additional side effects.
 * May contain
 */
import { getLeaderboard, verifyPassword } from "./serverClient";
import { savePassword } from "./storageManager";

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
		password: result.data.user.password,
		signedIn: result.data.user.signedIn
	});

	try {
		await savePassword(newPassword);
	} catch(err) {
		return `Successfully Logged In!\n${err.message}`;
	}
	return `Success. You're now logged in as ${result.data.user.name.trim()} using ${result.data.user.password}`;
}

export async function updateSelf(userWritable) {
	if(!userWritable.userInfo.password) {
		return;
	}

	const leaderboard = await getLeaderboard();
	const user = leaderboard.find(entry => entry.name.trim() === userWritable.userInfo.name.trim());
	const clockedIn = Date.now() - user.timeIn;
	// Resync with server if needed. Has a 2-second margin of error tolerance
	if(Math.abs(userWritable.userInfo.signedIn - clockedIn) > 2000) {
		// console.log("Resynchronized clock-in time with server");
		userWritable.updateData({
			signedIn: user.signedIn ? clockedIn : 0
		});
	}

	return leaderboard;
}
