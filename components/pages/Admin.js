import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import Screen from "../parts/StyledParts/ScreenWrapper";
import { TextInput } from "react-native-paper";
import config from "../../config.json";

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
	const [adminPassword, setAdminPassword] = useState("");
	const [newUser, setNewUser] = useState({
		firstName: "",
		lastName: "",
		password: ""
	});
	const updateUser = (key, val) => {
		setNewUser(oldUser => ({
			...oldUser,
			[key]: val
		}));
	};
	const [amend, setAmend] = useState({
		password: "",
		startTime: "",
		endTime: ""
	});
	const updateAmend = (key, val) => {
		setAmend(oldAmend => ({
			...oldAmend,
			[key]: val
		}));
	};

	if(adminPassword !== CORRECT_PASSWORD) {
		return (
			<AdminPasswordNeeded setAdminPassword={setAdminPassword}/>
		);
	}

	return (
		<Screen>
			<View style={adminStyles.adminContainer}>
				<Text style={adminStyles.adminHeader}>
					Register Users
				</Text>
				<TextInput
					label="First Name"
					value={newUser.firstName}
					style={adminStyles.adminInput}
					onChange={newText => updateUser("firstName", newText.nativeEvent.text)}
				/>
				<TextInput
					label="Last Name"
					value={newUser.lastName}
					style={adminStyles.adminInput}
					onChange={newText => updateUser("lastName", newText.nativeEvent.text)}
				/>
				<TextInput
					label="Password"
					secureTextEntry={true}
					value={newUser.password}
					style={adminStyles.adminInput}
					onChange={newText => !isNaN(Number(newText.nativeEvent.value)) && updateUser("password", newText.nativeEvent.text)}
				/>

				<Text style={adminStyles.adminHeader}>
					Amend Hours
				</Text>
				<TextInput
					label="Password for Amended User"
					secureTextEntry={true}
					value={amend.password}
					style={adminStyles.adminInput}
					onChange={newText => !isNaN(Number(newText.nativeEvent.value)) && updateAmend("password", newText.nativeEvent.text)}
				/>
				<TextInput
					label="Amended Start Time"
					secureTextEntry={true}
					value={amend.startTime}
					style={adminStyles.adminInput}
					onChange={newText => updateAmend("startTime", newText.nativeEvent.text)}
				/>
				<TextInput
					label="Amended End Time"
					secureTextEntry={true}
					value={amend.endTime}
					style={adminStyles.adminInput}
					onChange={newText => updateAmend("endTime", newText.nativeEvent.text)}
				/>

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