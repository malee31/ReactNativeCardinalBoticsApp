import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const DefaultModalContent = props => (React.createElement(View, {style: styles.content},
    React.createElement(Text, {style: styles.contentTitle}, "Please write what you did today \uD83D\uDC4B!"),
    React.createElement(Button, {testID: 'close-button', onPress: props.onPress, title: "Sign Out"})));
const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
});
export default DefaultModalContent;