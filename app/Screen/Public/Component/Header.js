import React, {Fragment} from 'react'
import {Image, AsyncStorage, View} from 'react-native'
import { Header, Button, Text, Left, Right, Body } from 'native-base'

import NavigationService from '@Service/Navigation'

import Style from '@Theme/Style'
import {connect} from "react-redux";
import {getSetting} from "../../../_actions/setting-action";

class PublicHeader extends React.Component {
    state = {
        isQRButton: false,
    };
    constructor(props) {
        super(props);

        this.props.getSetting();

        // AsyncStorage.getItem('token')
        //     .then((value) => {
        //         if (value)
        //             this.props.getSetting();
        //         else
        //             this.setState({
        //                 isQRButton: false,
        //             })
        //     });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        let end_date = new Date(nextProps.setting.event_end_date);
        let start_date = new Date(nextProps.setting.event_start_date);
        let current = new Date();
        if (current.getTime() > start_date.getTime() && current.getTime() < end_date.getTime())
            this.setState({
                isQRButton: true,
            });
        else
            this.setState({
                isQRButton: false,
            });
    }

    render() {
        return <View style={Style.headerWrapper}>
            <Header style={Style.header}>
                <Left style={{flex: 0.4}}>
                    <Button transparent onPress={() => {
                        NavigationService.openDrawer()
                    }} style={{paddingLeft: 0}}>
                        <Image source={require('@Asset/images/hamburger.png')} style={Style.menuHamburger}/>
                    </Button>
                </Left>
                <Body style={[Style.positionCenter, {flex: 1}]}>
                    <Image style={Style.logo} source={require('@Asset/images/medialogo.png')} />
                </Body>
                <Right style={{flex: 0.4}}>
                    {
                        this.state.isQRButton ? <Button style={Style.QRButton} onPress={() => {NavigationService.navigate('PublicQRCode')}}><Text style={Style.QRButtonText}>QRコード</Text></Button>
                            : <Fragment></Fragment>

                    }
                </Right>
            </Header>
        </View>
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.setting,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getSetting: () => dispatch(getSetting()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicHeader);
