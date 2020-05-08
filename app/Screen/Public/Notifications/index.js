import React, { Fragment } from 'react'
import { FlatList, Image, Dimensions, Linking, ActivityIndicator, AsyncStorage } from 'react-native'
import { Container, Header, Content, View, Button, Icon, Text, Left, Right, Body, List, ListItem } from 'native-base'

import NavigationService from '@Service/Navigation';
import DeepLinking from '@Component/DeepLinking';

import Loader from '@Component/Loader/Loader'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/Notifications/Style'

import { connect } from "react-redux";
import { getNotifications } from "../../../_actions/notification-action";
import { getNotificationsSelector } from "../../../_reducers/notification-reducer";

var { height } = Dimensions.get('window');

class PublicNotifications extends React.Component {
    state = {
        notifications: [],
    }

    constructor(props) {
        super(props);
        this.props.getNotifications({
            limit: 20,
            offset: 0,
        });

        AsyncStorage.setItem('active_time', '');

        this._handleLoadMore = this._handleLoadMore.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let new_data = nextProps.notifications;
        let data = this.state.notifications;
        if (new_data.length > 0) {
            data.push(
                <FlatList
                    data={new_data}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, separators }) => (
                        <ListItem style={Style.greyBottomLine} onPress={() => {
                            const url = item.url;
                            if(url){
                                if (url.indexOf('http') === 0) {
                                    NavigationService.navigate('PublicViewer', { url });
                                } else {
                                    DeepLinking.open(url);
                                }
                            }
                        }}>
                            <Image source={require('@Asset/images/bell.png')} style={Styles.notify} />
                            <Body>
                                <Text style={Styles.arrival}>{item.created_at}</Text>
                                <Text style={Styles.title}>{item.content}</Text>
                            </Body>
                        </ListItem>
                    )}
                />
            );
            this.setState({notifications: data});
        }
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;
    };

    _handleLoadMore({ nativeEvent }) {
        if (this.isCloseToBottom(nativeEvent) && this.props.notifications.length % 20 === 0 && this.props.notifications.length !== 0) {
            this.props.getNotifications({
                limit: 20,
                offset: this.props.notifications.length,
            });
        }
    }

    render() {
        const { goBack } = this.props.navigation;
        return <Container style={Style.bgMain}>
            <View style={Style.navigationWrapper}>
            <Header style={Style.navigation}>
                <Left style={{ flex: 0.3 }}>
                    <Button transparent onPress={() => {
                        goBack();
                    }}>
                        <Image source={require('@Asset/images/back.png')} style={Style.backIcon} />
                    </Button>
                </Left>
                <Body style={Style.positionCenter}>
                    <Text style={Style.headerTitle}>お知らせ</Text>
                </Body>
                <Right style={{flex: 0.3}}>
                    <Button transparent>
                    </Button>
                </Right>
            </Header>
            </View>
            <Content onScroll={({ nativeEvent }) => { this._handleLoadMore({ nativeEvent }) }} style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <View ref="listView">
                    {
                        this.state.notifications.map((item) => {
                            return item;
                        })
                    }
                </View>
                {this.props.isLoading ?
                    <ActivityIndicator
                        size="large"
                        style={Style.indicatorPosition}
                        animating={this.props.isLoading} /> : <Fragment />}
            </Content>
        </Container>
    }
}

const mapStateToProps = (state: Object) => getNotificationsSelector;

const mapDispatchToProps = (dispatch: Function) => ({
    getNotifications: (data) => dispatch(getNotifications(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicNotifications);
