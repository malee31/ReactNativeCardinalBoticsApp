import * as WebBrowser from 'expo-web-browser';
import React from "react"
import config from "../../config.json";
import { Button } from 'react-native-paper';

export default class LinkButton extends React.Component {
    constructor(props) {
        super(props);
        this.redirector = this.redirector.bind(this);
        this.state = {
            url: props.url,
            title: props.title,
            icon: props.icon,
        }
    }

    redirector = async () => {
        await WebBrowser.openBrowserAsync(this.state.url);
    }

    render() {
        return (
            <Button
                icon={this.state.icon}
                mode="contained"
                color={config.colors.secondary}
                onPress={this.redirector}>
                {this.state.title}
            </Button>
        );
    }
}