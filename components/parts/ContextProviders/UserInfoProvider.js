import React, { createContext, useContext, useEffect, useState } from "react";
import { getApiKey } from "../utils/storageManager";
import { client, getLeaderboard, verifyApiKey } from "../utils/serverClient";

/**
 * @typedef UserInfoWritable
 * @property {function} updateData Method that takes in an object and merges it with the current UserInfo object. Will always cause a rerender.
 * @property {UserInfo} userInfo Readable data about the user
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
	userInfo: {
		loaded: false,
		loggedIn: false,
		signedIn: 0,
		name: "",
		apiKey: ""
	}
});

export function UserInfoProvider({ children }) {
	const [userInfo, setUserInfo] = useState({
		loaded: false,
		loggedIn: false,
		signedIn: 0,
		name: "",
		apiKey: ""
	});

	/** @type UserInfoWritable */
	const contextValue = {
		updateData: newUserInfo => {
			setUserInfo({
				...userInfo,
				...newUserInfo
			});
		},
		userInfo: userInfo
	};

	useEffect(() => {
		client.initialize()
			.then(async () => {
				const updatedData = { loaded: true };
				if(!client.apiKey) {
					contextValue.updateData(updatedData);
					return;
				}

				const user = await client.request("GET", "/user/status");

				// Update the following: loggedIn, name, apiKey (deprecated)
				updatedData.loggedIn = true;
				updatedData.name = `${user.first_name} ${user.last_name}`;
				updatedData.apiKey = client.apiKey;  // TODO: Remove after transitioning all fetch() to client.request()

				// Gets signed in status and time
				const clockedIn = user.signedIn;
				if(Boolean(user.signedIn) !== Boolean(userInfo.signedIn)) {
					// console.log("RESYNC");
					if(user.signedIn) {
						updatedData.signedIn = clockedIn;
					} else {
						updatedData.signedIn = 0;
					}
				} else if(user.signedIn && Math.abs(userInfo.signedIn - clockedIn) > 2000 /* 2 second desync tolerance */) {
					// console.log(`Resync gap: ${Math.abs(userInfo.signedIn - clockedIn)}`);
					updatedData.signedIn = clockedIn;
				}

				contextValue.updateData(updatedData);
			})
			.catch(err => {
				console.error("FATAL: Failed to initialize the client", err);
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
	return !readOnly ? userContextValue : userContextValue.userInfo;
}