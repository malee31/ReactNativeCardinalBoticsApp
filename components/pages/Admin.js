import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileScreen, MobileScreenScrollable } from "../parts/StyledParts/ScreenWrappers";
import LargeLogo from "../parts/StyledParts/LargeLogo";
import useModal from "../parts/ContextProviders/ModalProvider";
import client from "../parts/utils/serverClient";
import { parseDatePart, partToDate, splitDateParts } from "../parts/utils/flexibleDateParser";
import config from "../../config.json";

const colors = config.colors;
const endpoints = config.serverEndpointBaseURLs;

const adminStyles = StyleSheet.create({
	adminContainer: {
		width: "100%",
		maxWidth: 600,
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center"
	},
	adminSection: {
		width: "100%",
		paddingBottom: 16,
		alignItems: "center",
		justifyContent: "center"
	},
	adminHeader: {
		fontSize: 30
	},
	adminInput: {
		width: "100%",
		color: "#7D1120",
		backgroundColor: colors.lighterGray,
		marginBottom: 8
	}
});

export default function Admin() {
	const modal = useModal();
	const [authorized, setAuthorized] = useState(false);

	// Load admin password from storage and validate it
	useEffect(() => {
		AsyncStorage.getItem("admin_key")
			.then(val => client.validate(val || ""))
			.then(valid => setAuthorized(valid))
			.catch(err => modal.showMessage(`Unable to validate existing admin password: ${err.message}`));
	}, []);


	const onExitAdmin = () => {
		AsyncStorage.removeItem("admin_key")
			.catch(err => modal.showMessage(err));
	};

	if(!authorized) {
		return (
			<AdminPasswordNeeded setAuthorized={setAuthorized}/>
		);
	}

	return (
		<MobileScreenScrollable centered={true}>
			<View style={adminStyles.adminContainer}>
				<RegisterUserSection/>

				<InsertHoursSection/>

				<Button
					mode="outlined"
					style={{ marginBottom: 24 }}
					onPress={onExitAdmin}
				>
					Exit Admin Controls
				</Button>
			</View>
		</MobileScreenScrollable>
	);
}

function RegisterUserSection() {
	const modal = useModal();
	const defaultUser = {
		firstName: "",
		lastName: "",
		password: ""
	};
	const [newUser, setNewUser] = useState(defaultUser);
	const updateUser = (key, val) => {
		setNewUser(oldUser => ({
			...oldUser,
			[key]: val
		}));
	};

	const onUserAdd = () => {
		if(newUser.password && newUser.firstName && newUser.lastName) {
			client.request("POST", endpoints.admin.addUser, {
				admin: true,
				body: JSON.stringify(newUser)
			})
				.then(user => modal.showMessage(`Created "${user.first_name} ${user.last_name}" [User ID #${user.id}]`))
				.catch(err => modal.showMessage(err));
			setNewUser(defaultUser);
		} else {
			modal.showMessage("All fields for adding a new user must be filled!");
		}
	};

	return (
		<View style={adminStyles.adminSection}>
			<Text style={adminStyles.adminHeader}>
				Register Users
			</Text>
			<TextInput
				mode="outlined"
				label="First Name"
				value={newUser.firstName}
				style={adminStyles.adminInput}
				onChange={newText => updateUser("firstName", newText.nativeEvent.text)}
			/>
			<TextInput
				mode="outlined"
				label="Last Name"
				value={newUser.lastName}
				style={adminStyles.adminInput}
				onChange={newText => updateUser("lastName", newText.nativeEvent.text)}
			/>
			<TextInput
				mode="outlined"
				label="Password"
				secureTextEntry={true}
				value={newUser.password}
				style={adminStyles.adminInput}
				onChange={newText => updateUser("password", newText.nativeEvent.text)}
			/>
			<Button
				mode="elevated"
				style={{ marginBottom: 4 }}
				onPress={onUserAdd}
			>
				Register User
			</Button>
		</View>
	);
}

function InsertHoursSection() {
	const modal = useModal();
	// Used to get a reference time. Gets stale the longer the app is open but that is fine
	const dateRef = useRef(new Date());
	const dateClone = new Date(dateRef.current);
	dateClone.setTime(dateClone.getTime() - 60 * 60 * 1000);
	const defaultAmend = {
		password: "",
		startTime: dateClone.toLocaleString(),
		endTime: dateRef.current.toLocaleString()
	};

	const [amend, setAmend] = useState(defaultAmend);
	const updateAmend = (key, val) => {
		setAmend(oldAmend => ({
			...oldAmend,
			[key]: val
		}));
	};

	const onSessionAdd = () => {
		if(amend.password && amend.startTime && amend.endTime) {
			client.request("POST", endpoints.admin.addSession, {
				admin: true,
				body: JSON.stringify({
					password: amend.password,
					startTime: Number(amend.startTime),
					endTime: Number(amend.endTime)
				})
			})
				.then(session => modal.showMessage(`Added: ${JSON.stringify(session)}`))
				.catch(err => modal.showMessage(err));
			setAmend(defaultAmend);
		} else {
			modal.showMessage("All fields for adding a new session must be filled!");
		}
	};

	return (
		<View style={adminStyles.adminSection}>
			<Text style={adminStyles.adminHeader}>
				Insert Hours
			</Text>
			<Text>The date range format is very lax (Use " - " or " to " to separate start and end)</Text>
			<TextInput
				mode="outlined"
				label="Password for Amended User"
				secureTextEntry={true}
				value={amend.password}
				style={adminStyles.adminInput}
				onChange={newText => updateAmend("password", newText.nativeEvent.text)}
			/>
			<DateInput
				setStart={newStart => updateAmend("startTime", newStart)}
				setEnd={newEnd => updateAmend("endTime", newEnd)}
			/>
			<Button
				mode="elevated"
				style={{ marginVertical: 8 }}
				onPress={onSessionAdd}
			>
				Add Session
			</Button>
		</View>
	);
}

function AdminPasswordNeeded({ setAuthorized }) {
	const [adminInput, setAdminInput] = useState("");
	const [error, setError] = useState("");

	const confirmAdminPassword = () => {
		Keyboard.dismiss();
		if(!adminInput.startsWith("A-")) {
			setError("Invalid Admin Password Format (Must start with 'A-')")
			return;
		}

		client.login(adminInput)
			.then(valid => {
				if(!valid) {
					setError("Incorrect Password");
					return;
				}

				setError("");
				setAuthorized(true);
			});
	};


	return (
		<MobileScreen style={{ height: "100%", alignItems: "center" }}>
			<LargeLogo/>
			<TextInput
				label="Admin Login"
				value={adminInput}
				style={adminStyles.adminInput}
				secureTextEntry={true}
				error={Boolean(error)}
				onChange={newText => setAdminInput(newText.nativeEvent.text)}
				onSubmitEditing={confirmAdminPassword}
			/>
			{Boolean(error) && (
				<Text
					style={{
						color: "red",
						marginBottom: 8
					}}
				>
					{error}
				</Text>
			)}
			<Button
				mode="elevated"
				onPress={confirmAdminPassword}
			>
				Use Admin Password
			</Button>
		</MobileScreen>
	);
}

function DateInput({ setStart, setEnd }) {
	const { current: dateRef } = useRef(new Date());
	dateRef.setSeconds(0);
	dateRef.setMilliseconds(0);

	const [timeRangeInput, setTimeRangeInput] = useState("");
	const [startParts, endParts] = splitDateParts(timeRangeInput);

	const start = parseDatePart(startParts);
	const end = parseDatePart(endParts);
	// Inherit omitted fields from each other
	Object.keys(start).forEach(key => {
		if(start[key] === undefined) {
			if(end[key] !== undefined) {
				start[key] = end[key];
			}
			return;
		}
		if(end[key] !== undefined) return;
		end[key] = start[key];
	})

	const startDate = partToDate(dateRef, start);
	const endDate = partToDate(dateRef, end);
	const dateStringOpts = {
		weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	};
	const parsedStart = startDate.toLocaleString("en-US", dateStringOpts);
	const parsedEnd = endDate.toLocaleString("en-US", dateStringOpts);

	useEffect(() => {
		setStart(startDate.getTime());
	}, [parsedStart]);
	useEffect(() => {
		setEnd(endDate.getTime());
	}, [parsedEnd]);

	return (
		<>
			<TextInput
				mode="outlined"
				value={timeRangeInput}
				label="Amended Time Range"
				onChange={newText => setTimeRangeInput(newText.nativeEvent.text)}
				style={adminStyles.adminInput}
			/>

			<Text>
				Start: {parsedStart}
			</Text>
			<Text>
				Ends: {parsedEnd}
			</Text>
		</>
	);
}