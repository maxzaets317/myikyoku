import React from 'react'
import { Image, WebView, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Title, Left, Right, Body, List, ListItem } from 'native-base'

import NavigationService from '@Service/Navigation'

import PublicFooter from '@Screen/Public/Component/Footer'
import MyWebView from '@Screen/Public/Component/MyWebView'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/Menu/Style'

export default class extends React.Component {
    state = {
        isLoadingWebView: false,
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
                <Body style={Style.positionCenter}>
                    <Text style={Style.headerTitle}>運営会社</Text>
                </Body>
                <Right style={{ flex: 0.3 }}>
                    <Button transparent>
                    </Button>
                </Right>
            </Header>

            <MyWebView onLoad={() => this.setState({isLoadingWebView: false})} automaticallyAdjustContentInsets={true} source={{ uri: 'https://www.medical-principle.co.jp/company/profile.html' }} />
                {
                    this.state.isLoadingWebView && (
                        <View style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator size='large' />
                        </View>
                    )
                }
        </Container>
    }
}

