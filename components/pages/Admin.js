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

function DateInput() {

}