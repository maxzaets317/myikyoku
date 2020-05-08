import React from 'react';
import { WebView, Platform } from 'react-native';

export default class MyWebView extends React.Component {
    render() {
        const isIOS = Platform.OS === 'ios';
        return this.isIOS ? <WebView useWebKit={true} {...this.props}/>
            : <WebView {...this.props}/>

    }
}