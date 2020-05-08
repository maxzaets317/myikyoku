import React from 'react'
import {Image, WebView, ScrollView, Linking, Dimensions} from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Left, Body, Right } from 'native-base'
import MyWebView from '@Screen/Public/Component/MyWebView'

import Style from '@Theme/Style'

var { height, width } = Dimensions.get('window');

export default class extends React.Component {

    state = {
        url: this.props.navigation.state.params.url,
    };

    render() {
        const { goBack } = this.props.navigation;
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <Left style={{ flex: 0.3 }}>
                    <Button transparent onPress={() => {
                        goBack();
                    }}>
                        <Image source={require('@Asset/images/back.png')} style={Style.backIcon} />
                    </Button>
                </Left>
                <Body style={Style.headerLink}>
                    <ScrollView
                        style={Style.headerScroll}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View>
                            <Text style={Style.headerLinkText}>{this.state.url}</Text>
                        </View>
                    </ScrollView>
                </Body>
                <Right style={{ flex: 0.15 }}>
                    <Button transparent onPress={() => {
                        Linking.openURL(this.state.url);
                    }}>
                        <Image source={require('@Asset/images/popup_black_symbol.png')} style={{ width: 24, height: 24 }} />
                    </Button>
                </Right>
            </Header>
            <MyWebView
                onLoad={() => this.setState({ isLoadingWebView: false })}
                automaticallyAdjustContentInsets={true}
                source={{ uri: this.state.url }} />
        </Container >
    }
}
