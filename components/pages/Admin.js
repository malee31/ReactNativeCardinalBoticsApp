import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Screen from "../parts/StyledParts/ScreenWrapper";
import { Button, TextInput } from "react-native-paper";
import config from "../../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useModal from "../parts/ContextProviders/ModalProvider";
import { addSession, addUser } from "../parts/utils/serverClient";

const colors = config.colors;

// TODO: As long as the web version has it hard-coded. So will this.
//       I will personally rewrite the backend to make the validation server-side at a later date if I haven't been beat to it
const CORRECT_PASSWORD = "Berd";

const adminStyles = StyleSheet.create({
	adminContainer: {
		width: "100%",
		maxWidth: 600,
		alignItems: "center",
		paddingHorizontal: 8
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
	// Used to get a reference time. Gets stale the longer the app is open but that is fine
	const dateRef = useRef(new Date());
	const defaultUser = {
		firstName: "",
		lastName: "",
		password: ""
	};

	const dateClone = new Date(dateRef.current);
	dateClone.setTime(dateClone.getTime() - 60 * 60 * 1000);
	const defaultAmend = {
		password: "",
		startTime: dateClone.toLocaleString(),
		endTime: dateRef.current.toLocaleString()
	};

	const modal = useModal();
	const [adminPassword, setAdminPassword] = useState("");
	useEffect(() => {
		AsyncStorage.getItem("admin_password")
			.then(val => setAdminPassword(val || ""))
			.catch(err => modal.showMessage(`Unable to load admin password: ${err.message}`));
	}, []);
	const setAndSaveAdminPassword = newAdminPassword => {
		// Fire-and-forget
		AsyncStorage.setItem("admin_password", newAdminPassword)
			.catch(err => modal.showMessage(`Unable to save admin password: ${err.message}`));
		setAdminPassword(newAdminPassword);
	}

	const [newUser, setNewUser] = useState(defaultUser);
	const updateUser = (key, val) => {
		setNewUser(oldUser => ({
			...oldUser,
			[key]: val
		}));
	};
	const [amend, setAmend] = useState(defaultAmend);
	const updateAmend = (key, val) => {
		setAmend(oldAmend => ({
			...oldAmend,
			[key]: val
		}));
	};

	if(adminPassword !== CORRECT_PASSWORD) {
		return (
			<AdminPasswordNeeded setAdminPassword={setAndSaveAdminPassword}/>
		);
	}

	const onUserAdd = () => {
		if(newUser.password && newUser.firstName && newUser.lastName) {
			addUser(newUser)
				.then(modal.showMessage)
				.catch(err => modal.showMessage(err));
			setNewUser(defaultUser);
		} else {
			modal.showMessage("All fields for adding a new user must be filled!");
		}
	};
	const onSessionAdd = () => {
		if(amend.password && amend.startTime && amend.endTime) {
			addSession({
				password: amend.password,
				startTime: (new Date(amend.startTime)).getTime(),
				endTime: (new Date(amend.endTime)).getTime()
			})
				.then(modal.showMessage)
				.catch(err => modal.showMessage(err));
			setAmend(defaultAmend);
		} else {
			modal.showMessage("All fields for adding a new session must be filled!");
		}
	};
	const onExitAdmin = () => {
		setAdminPassword("");
		AsyncStorage.removeItem("admin_password")
			.catch(err => modal.showMessage(err));
	};

	return (
		<Screen>
			<View style={adminStyles.adminContainer}>
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

				<Text style={adminStyles.adminHeader}>
					Insert Hours
				</Text>
				<TextInput
					mode="outlined"
					label="Password for Amended User"
					secureTextEntry={true}
					value={amend.password}
					style={adminStyles.adminInput}
					onChange={newText => updateAmend("password", newText.nativeEvent.text)}
				/>
				<DateInput/>
				<Text>Validation is a WIP. Try to keep the format consistent</Text>
				<TextInput
					mode="outlined"
					label="Amended Start Time"
					value={amend.startTime}
					style={adminStyles.adminInput}
					onChange={newText => updateAmend("startTime", newText.nativeEvent.text)}
				/>
				<TextInput
					mode="outlined"
					label="Amended End Time"
					value={amend.endTime}
					style={adminStyles.adminInput}
					onChange={newText => updateAmend("endTime", newText.nativeEvent.text)}
				/>
				<Button
					mode="elevated"
					style={{ marginBottom: 4 }}
					onPress={onSessionAdd}
				>
					Add Session
				</Button>

				<Button
					mode="outlined"
					style={{ marginVertical: 16 }}
					onPress={onExitAdmin}
				>
					Exit Admin Controls
				</Button>
			</View>
		</Screen>
	);
}

function AdminPasswordNeeded({ setAdminPassword }) {
	const [adminInput, setAdminInput] = useState("");
	const [error, setError] = useState("");
	const confirmAdminPassword = () => {
		if(adminInput === CORRECT_PASSWORD) {
			setAdminPassword(adminInput);
			return;
		}

		setError("Incorrect Password");
	}

	return (
		<Screen>
			<View style={adminStyles.adminContainer}>
				<Text style={adminStyles.adminHeader}>
					Admin Login
				</Text>
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
							color: "red"
						}}
					>
						{error}
					</Text>
				)}
			</View>
		</Screen>
	);
}

function DateInput({ setStart, setEnd }) {
	const { current: dateRef } = useRef(new Date());
	dateRef.setSeconds(0);
	dateRef.setMilliseconds(0);


	const [timeRangeInput, setTimeRangeInput] = useState("");
	// Split by commas, periods, and spaces. With extra spaces removed
	const dateParts = timeRangeInput.split(/\s+|\s*\.\s*|\s*,\s*/g).map(val => {
		return {
			raw: val,
			lower: val.toLowerCase()
		};
	});

	// Parsing
	const delimitIndex = dateParts.findIndex(val => val.lower === "to" || val.lower === "until" || val.lower === "-");
	const startParts = dateParts;
	let endParts = [];
	if(delimitIndex !== -1) {
		endParts = startParts.splice(delimitIndex, startParts.length - delimitIndex);
		endParts.shift();
	}

	const start = parseDatePart(startParts);
	const end = parseDatePart(endParts);

	const parsedStart = "";
	const parsedEnd = "";
	console.log(dateParts)

	return (
		<>
			<Text>
				{JSON.stringify(start)} to {JSON.stringify(end)}
			</Text>
			<TextInput
				mode="outlined"
				value={timeRangeInput}
				label="Amended Time Range"
				onChange={newText => setTimeRangeInput(newText.nativeEvent.text)}
				style={adminStyles.adminInput}
			/>
		</>
	);
}

function parseDatePart(parts) {
	const result = {
		year: undefined,
		month: undefined,
		day: undefined,
		hour: undefined,
		minute: undefined,
		second: undefined,
		milliseconds: undefined
	};

	for(let partIndex = 0; partIndex < parts.length; partIndex++) {
		const part = parts[partIndex];
		const nextPart = partIndex + 1 !== parts.length ? parts[partIndex + 1] : null;
		let partStr = part.lower;

		// Parse like a date: (1/1/1999, 1/1, 1999/1/1, 1/1999, and '-' equivalents)
		// Leading years must be in 4-digit form but trailing years can be in short form
		if(partStr.includes("-") || partStr.includes("/")) {
			const sections = partStr.split(/[\-\/]/g);
			// Reorder sections into Year, Month, Day order with heuristics

			// Take out leading or trailing years in full 4-digit form
			if(sections[0].length === 4 && !isNaN(Number(sections[0]))) {
				result.year = Number(sections.shift());
			}
			const lastSection = sections[sections.length - 1];
			if(lastSection.length === 4 && !isNaN(Number(lastSection))) {
				result.year = Number(sections.pop());
			}

			// Parse remaining mm/dd/yy forms
			if(sections.length) {
				result.month = Math.min(12, Number(sections.shift()));
			}
			if(sections.length) {
				result.day = Math.min(31, Number(sections.shift()));
			}
			if(sections.length) {
				result.year = Number(sections.shift());
			}
			continue;
		}

		// Parse days in the form of 1st, 2nd, 3rd, etc
		if((/^\d+(st|nd|th|rd)$/).test(partStr)) {
			const dayStr = partStr.match(/^\d+/)[0];
			if(Number(dayStr) < 31) {
				result.day = Number(dayStr);
			}
			continue;
		}

		// Parse full years
		if(partStr.length === 4 && !isNaN(Number(partStr))) {
			result.year = Number(partStr);
			continue;
		}

		// Parse month names
		// Index-sensitive array of months
		const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		const monthIndex = months.findIndex(month => partStr.length >= 3 && month.toLowerCase().startsWith(partStr));
		if(monthIndex !== -1) {
			result.month = monthIndex + 1;
			continue;
		}

		// Parse lone hours or days
		// If a number is alone, it is assumed to be a day unless immediately followed by AM/PM
		if(!isNaN(Number(partStr))) {
			if(nextPart && (/^[ap]m$/).test(nextPart.lower)) {
				result.hour = Number(partStr);
				continue;
			}
			result.day = Number(partStr);
			continue;
		}

		// Parse times in 8:00 format
		if(partStr.includes(":")) {
			const sections = partStr.split(":");
			const lastSection = sections[sections.length - 1];
			let pm = false;
			if(lastSection.endsWith("am") | lastSection.endsWith("pm")) {
				// Edit final section to remove am/pm
				pm = lastSection.slice(-2) === "pm";
				sections[sections.length - 1] = lastSection.substring(0, lastSection.length - 2);
			}

			// Take parts off one at a time until none are left
			// Order is expected to be hh:mm:ss:ms and can be cut short (so hh:mm is valid)
			// AM/PM will be taken into account
			if(sections.length) {
				result.hour = Math.min(23, Number(sections.shift()));
				if(pm || (nextPart && nextPart.lower === "pm")) {
					result.hour = (result.hour % 12) + 12;
				}
			}
			if(sections.length) {
				result.minute = Math.min(59, Number(sections.shift()));
			}
			if(sections.length) {
				result.second = Math.min(59, Number(sections.shift()));
			}
			if(sections.length) {
				result.milliseconds = Math.min(999, Number(sections.shift()));
			}
			continue;
		}

		// Just an hour and a am/pm
		if((/^\d+[ap]m$/g).test(partStr)) {
			result.hour = Number(partStr.match(/^\d+/));
			if(partStr.endsWith("pm")) {
				result.hour = (result.hour % 12) + 12;
			}
			continue;
		}

		console.log(`Unknown part in date: ${part.raw}`);
	}

	return result;
}