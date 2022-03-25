import { SafeAreaView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import React, { useState } from "react";

export default function DummyProducer(text = "N/A") {
	return () => (
		<SafeAreaView>
			<Text>{text}</Text>
		</SafeAreaView>
	);
};