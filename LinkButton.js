import {Button} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import React from "react"

export default class LinkButton extends React.Component {
    constructor(props) {
        super(props);
        this.redirector = this.redirector.bind(this);
        this.state = {
            url: props.url,
            title: props.title
        }
    }

    redirector = async () => {
        await WebBrowser.openBrowserAsync(this.state.url);
    }

    render() {
        return (
            <Button title={this.state.title} onPress={this.redirector}/>
        );
    }
}