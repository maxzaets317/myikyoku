import React, {Fragment} from 'react'
import {TouchableOpacity, ScrollView, View, Image, AsyncStorage, WebView, Platform, AppState} from 'react-native'
import {Button, Container, Icon, Text} from 'native-base'

import PublicHeader from '@Screen/Public/Component/Header'
import PublicInfinteMenu from '@Screen/Public/Component/InfiniteMenu'
import PublicFooter from '@Screen/Public/Component/Footer'
import MyWebView from '@Screen/Public/Component/MyWebView'

import LoginModal from "../Component/LoginModal";
import Style from '@Theme/Style'

import { connect } from "react-redux";
import { getToken } from "../../../_actions/auth-action";
import { getCategories } from "../../../_actions/category-action";
import {getNews} from "../../../_actions/news-action";
import {getFeeds, deleteFeed} from "../../../_actions/rss-action";
import Styles from '@Screen/Public/Main/Style';

import PublicNews from '../News';
import PublicRSS from '../RSS';

import CategoryList from './CategoryList';
import FeedList from './FeedList';

import { Dimensions } from 'react-native';
import UserAgent from "react-native-user-agent";
import {createLog} from "../../../_actions/analytics-action";
import NavigationService from "../../../Service/Navigation";
import {getNotificationCount} from "../../../_actions/notification-action";
var { height, width } = Dimensions.get('window');

const URLs = [
    '', '',
    'http://mag.doctor-agent.com/',
    'https://www.doctor-agent.com/',
    'https://www.residentnavi.com/'
];

class PublicMain extends React.Component {
    state = {
        isShowOverlay: false,
        category_id: null,
        category_name: '',
        currentViewIndex: 0,
        showLoginModal: false,
        onLoginSuccess: null,
        urls: URLs,
        pushUrl: null,
        pushState: null,
        isFirstLogin: false,
        appState: null
    };

    constructor(props) {
        super(props);
        AsyncStorage.getItem('isFirstLogin')
            .then((value) => {
                if (value === 'true') {
                    AsyncStorage.setItem('isFirstLogin', 'false');
                    this.setState({
                        isFirstLogin: true,
                    })
                }
                else {
                    this.setState({
                        isFirstLogin: false,
                    })
                }
            });
        this.props.getCategories();
        this.props.getToken();
        this.props.getFeeds();
        this._handleCheckLogin(() => {
            this.setState({
                showLoginModal: false
            })
        });

        this._handleSetCategory = this._handleSetCategory.bind(this);
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        this.setState({appState: nextAppState});
    };

    componentWillUpdate(nextProps, nextState) {
        if (nextState.appState !== this.state.appState) {
            if (nextState.appState === 'active') {
                AsyncStorage.getItem('active_time')
                    .then(value => {
                        console.log(value, '+++++++++++++');
                        if (!value) {
                            AsyncStorage.setItem('active_time', Date.now().toString());
                            this.props.getNotificationCount(Date.now().toString());
                        }
                        else {
                            this.props.getNotificationCount(value);
                        }
                    });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params) {
            if (nextProps.navigation.state.params.pushState && this.state.pushState !== nextProps.navigation.state.params.pushState) {
                this.setState({
                    pushState: nextProps.navigation.state.params.pushState
                }, () => {
                    this._handleChangeItem(nextProps.navigation.state.params.index, nextProps.navigation.state.params.pushUrl, true);
                });
            }
            if (nextProps.navigation.state.params.showLogin) {
                this.setState({
                    showLoginModal: true,
                    onLoginSuccess: () => {
                        this.setState({
                            showLoginModal: false,
                        })
                    }
                });
                NavigationService.navigate('PublicMain', {showLogin: false})
            }
        }
    }

    _handleShowCategory = (isPress) => {
        this.setState({ isShowOverlay: isPress });
    };

    _handleSetCategory = (category_id) => {
        this.setState({ category_id: category_id, isShowOverlay: false });
        for (let i = 0;i < this.props.categories.length;i ++) {
            if (this.props.categories[i].id === category_id) {
                this.setState({
                    category_name: this.props.categories[i].name,
                });
                return ;
            }
        }
    };

    _handleChangeItem = (index, url, force) => {
        if (force || index !== this.state.currentViewIndex) {
            let page = '';
            switch (index) {
                case 0: page = 'NEWS'; break;
                case 1: page = 'RSS'; break;
                case 2: page = "DOCTOR' MAGAZINE"; break;
                case 3: page = '民間医局'; break;
                case 4: page = 'レジナビ'; break;
            }
            this.props.createLog({
                event: 'pageview',
                page: page
            });
            this.setState({
                currentViewIndex: index, isShowOverlay: false,
                pushUrl: url ? url : null
            });
        }
    };

    _handleDeleteFeed = (feed) => {
        this.props.deleteFeed(feed);
        this.setState({
            isShowOverlay: false
        });
    };

    _handleFilter = (id) => {
        this.props.getFeeds(id);
        this.setState({ isShowOverlay: false });
    };

    _handleCheckLogin = async (onSuccess) => {
        let value = await AsyncStorage.getItem('isFirstLogin');
        if (value === 'true') {
            AsyncStorage.setItem('isFirstLogin', 'false');
            this.setState({
                isFirstLogin: true,
            })
        }
        else {
            this.setState({
                isFirstLogin: false,
            })
        }
        let token = await AsyncStorage.getItem('token');
        if (token) {
            if (onSuccess) {
                onSuccess();
            }
        } else {
            this.setState({
                showLoginModal: true,
                onLoginSuccess: onSuccess
            })
        }
    };

    _handleClickSelected = (index) => {
        if(index == 0) {
            this.setState({
                category_id: null
            });
        }else if(index == 1) {
            this.props.getFeeds();
        }
        if (this.state.urls[index]) {
            const urls = Object.assign({}, this.state.urls);
            urls[index] = URLs[index] + '?_t=' + (new Date()).getTime();

            this.setState({
                pushUrl: null,
                urls: urls
            });
        }
    };

    _handleChangeCategory = (category) => {
        this.setState({
            category_id: category.id,
            category_name: category.name
        })
    };

    renderContent = () => {
        switch (this.state.currentViewIndex) {
            case 0:
                return <PublicNews checkLogin={this._handleCheckLogin} category_id={this.state.category_id} category_name={this.state.category_name} changeCategory={this._handleChangeCategory} />;
            case 1:
                return <PublicRSS checkLogin={this._handleCheckLogin} />;
            case 2:
            case 3:
            case 4:
                return <MyWebView source={{ uri: (this.state.pushUrl ? this.state.pushUrl : this.state.urls[this.state.currentViewIndex])}} userAgent={UserAgent.getWebViewUserAgent() + ' myikyokuapp'} automaticallyAdjustContentInsets={true} />;
            default:
                return <Fragment />
        }
    };

    renderPageModal = () => {
        return this.state.isShowOverlay
            ? <TouchableOpacity style={Style.pageModal}
                                onPress={() => {this.setState({ isShowOverlay: false })}}
            >
                {(() => {
                    switch(this.state.currentViewIndex) {
                        case 0:
                            return <CategoryList categories={this.props.categories} onSelect={this._handleSetCategory} />;
                        case 1:
                            return <FeedList feeds={this.props.feeds} onFilter={this._handleFilter} onDelete={this._handleDeleteFeed} />
                    }
                })()}
            </TouchableOpacity>
            : <View />;
    };

    render() {
        return <Container style={Style.bgMain}>

            <PublicHeader checkLogin={this._handleCheckLogin} />

            <PublicInfinteMenu selectedIndex={this.state.currentViewIndex} onChangeItem={this._handleChangeItem} onShowOverlay={this._handleShowCategory} isPress={this.state.isShowOverlay} checkLogin={this._handleCheckLogin} onClickSelected={this._handleClickSelected} />

            { this.renderContent() }

            <PublicFooter isShowOverlay={this.state.isShowOverlay} onChangeItem={this._handleChangeItem} onSelectFeed={this._handleFilter} checkLogin={this._handleCheckLogin} notificationCount={this.props.notification_count} />

            { this.renderPageModal() }

            <LoginModal firstLogin={this.state.isFirstLogin} show={this.state.showLoginModal} onSuccess={this.state.onLoginSuccess} closeModal={() => { this.setState({showLoginModal: false}); }} />
        </Container>
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.categories,
        ...state.auth,
        ...state.feeds,
        ...state.notifications
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCategories: (data) => dispatch(getCategories(data)),
    getToken: () => dispatch(getToken()),
    getFeeds: (data) => dispatch(getFeeds(data)),
    getNews: (data) => dispatch(getNews(data)),
    deleteFeed: (data) => dispatch(deleteFeed(data)),
    createLog: (data) => dispatch(createLog(data)),
    getNotificationCount: (data) => dispatch(getNotificationCount(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicMain);
