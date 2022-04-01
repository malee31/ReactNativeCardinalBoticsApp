import React, { createContext, useContext, useEffect, useState } from "react";
import { getPassword } from "./storageManager";
import { getLeaderboard, verifyPassword } from "./serverClient";

/**
 * @typedef UserInfoWritable
 * @property {function} updateData Method that takes in an object and merges it with the current UserInfo object. Will always cause a rerender.
 * @property {UserInfo} data Readable data about the user
 */

/**
 * @typedef UserInfo
 * @property {boolean} loaded Initially false until the first time user info is both read from storage and fetched from the server
 * @property {boolean} loggedIn Initially false until either the user logs in or their login information is fetched from storage
 * @property {number} signedIn Set to 0 when not signedIn. Stores the time that the user signed in at if currently signed in
 * @property {string} name The user's name
 * @property {string} password The user's password for API calls. Stored in plain-text
 */

// Note: Default value is never used
const userInfoContext = createContext({
	updateData: () => {},
	data: {
		loaded: false,
		loggedIn: false,
		signedIn: 0,
		name: "",
		password: ""
	}
});

export function UserInfoProvider({ children }) {
	const [userInfo, setUserInfo] = useState({
		loaded: false,
		loggedIn: false,
		signedIn: 0,
		name: "",
		password: ""
	});

	/** @type UserInfoWritable */
	const contextValue = {
		updateData: newUserInfo => {
			setUserInfo({
				...userInfo,
				...newUserInfo
			});
		},
		data: userInfo
	};

	useEffect(() => {
		getPassword()
			.then(async storedPassword => {
				const updatedData = { loaded: true };
				if(storedPassword) {
					// Does not load password if unable to verify. Silently drops errors
					const result = await verifyPassword(storedPassword);
					if(result.ok && result.data.verified) {
						updatedData.loggedIn = true;
						updatedData.name = result.data.user.name;
						updatedData.password = result.data.user.password;
						// TODO: Get signed in status and time
						const val = await getLeaderboard();
						const user = val.find(entry => entry.name.trim() === updatedData.name.trim());
						const clockedIn = Date.now() - user.timeIn;
						if(Boolean(user.signedIn) !== Boolean(userInfo.signedIn)) {
							// console.log("RESYNC");
							if(user.signedIn) {
								updatedData.signedIn = clockedIn;
							} else {
								updatedData.signedIn = 0;
							}
						} else if(user.signedIn && Math.abs(userInfo.signedIn - clockedIn) > 2000 /* 2 second desync tolerance */) {
							// console.log(`Resync gap: ${Math.abs(userInfo.data.signedIn - clockedIn)}`);
							updatedData.signedIn = clockedIn;
						}
					}
				}

				contextValue.updateData(updatedData);
			});
	}, []);

	return (
		<userInfoContext.Provider value={contextValue}>
			{children}
		</userInfoContext.Provider>
	);
}

/**
 * Hook for using the user info
 * @param {boolean} [readOnly=true] When set to false, user data will be returned as the data property and a method to update the data will be provided
 * @return {UserInfo|UserInfoWritable} Returns information about the user by default. If readOnly is false, this information is found in the data property instead and an updateData function is also provided
 */
export default function useUserInfo(readOnly = true) {
	const userContextValue = useContext(userInfoContext);
	return !readOnly ? userContextValue : userContextValue.data;
}