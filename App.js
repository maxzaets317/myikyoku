import React from 'react'
import {AsyncStorage, Dimensions, Linking, NativeModules} from 'react-native'
import {createDrawerNavigator, createStackNavigator} from "react-navigation"
import AppInfo from './app';

import {Provider} from 'react-redux';
import configureStore from './app/_store';

import DrawerContent from '@Component/Menu/Left'

import PublicIntro from '@Screen/Public/Intro'

import PublicLogin from '@Screen/Public/Login/login'
import PublicMain from '@Screen/Public/Main'

import PublicNews from '@Screen/Public/News'
import PublicNewsDetail from '@Screen/Public/NewsDetail'
import PublicNewsDetailFullData from '@Screen/Public/NewsDetailFullData'

import PublicRSS from '@Screen/Public/RSS'
import PublicRSSDetail from '@Screen/Public/RSSDetail'
import PublicRSSDetailFullData from '@Screen/Public/RSSDetailFullData'

import PublicRSSRegister from '@Screen/Public/RSSRegister/Register'

import PublicClip from '@Screen/Public/Clip'
import PublicClipDetail from '@Screen/Public/ClipDetail'
import PublicClipDetailFullData from '@Screen/Public/ClipDetailFullData'

import PublicNotifications from '@Screen/Public/Notifications'

import PublicUserInfo from '@Screen/Public/Menu/Userinfo'
import PublicQRCode from '@Screen/Public/Menu/QRCode'
import PublicServiceIntro from '@Screen/Public/Menu/ServiceIntro'
import PublicQA from '@Screen/Public/Menu/QA'
import PublicContact from '@Screen/Public/Menu/Contact'
import PublicTermServ from '@Screen/Public/Menu/TermServ'
import PublicPrivacyPolicy from '@Screen/Public/Menu/PrivacyPolicy'
import PublicOperComp from '@Screen/Public/Menu/OperComp'
import PublicViewer from '@Screen/Public/Viewer'

import NavigationService from '@Service/Navigation';
import DeepLinking from '@Component/DeepLinking';

import {PushNotificationIOS, Platform} from 'react-native';
import Repro from 'react-native-repro';
import {firstOpen, getUserInfo} from "./app/_actions/analytics-action";

const deviceWidth = Dimensions.get("window").width;

const Drawer = createDrawerNavigator(
    {
        PublicMain: {
            screen: PublicMain
        },
        PublicNews: {
            screen: PublicNews
        },
        PublicRSS: {
            screen: PublicRSS
        },
    },
    {
        contentComponent: DrawerContent,
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        headerMode: "none",
        initialRouteName: "PublicMain",
        drawerWidth: deviceWidth - 50
    }
)

const AppNav = createStackNavigator(
    {
        PublicIntro: {
            screen: PublicIntro
        },
        PublicLogin: {
            screen: PublicLogin
        },

        // news pages
        PublicNewsDetail: {
            screen: PublicNewsDetail
        },
        PublicNewsDetailFullData: {
            screen: PublicNewsDetailFullData
        },

        // RSS pages
        PublicRSSDetail: {
            screen: PublicRSSDetail
        },
        PublicRSSDetailFullData: {
            screen: PublicRSSDetailFullData
        },
        PublicRSSRegister: {
            screen: PublicRSSRegister
        },

        // Clip pages
        PublicClip: {
            screen: PublicClip
        },
        PublicClipDetail: {
            screen: PublicClipDetail
        },
        PublicClipDetailFullData: {
            screen: PublicClipDetailFullData
        },

        PublicNotifications: {
            screen: PublicNotifications
        },

        // menu part
        PublicUserInfo: {
            screen: PublicUserInfo
        },
        PublicQRCode: {
            screen: PublicQRCode
        },
        PublicServiceIntro: {
            screen: PublicServiceIntro
        },
        PublicQA: {
            screen: PublicQA
        },
        PublicContact: {
            screen: PublicContact
        },
        PublicTermServ: {
            screen: PublicTermServ
        },
        PublicPrivacyPolicy: {
            screen: PublicPrivacyPolicy
        },
        PublicOperComp: {
            screen: PublicOperComp
        },
        PublicViewer: {
            screen: PublicViewer
        },

        Drawer: {
            screen: Drawer
        }
    },
    {
        headerMode: "none",
        initialRouteName: "Drawer"
    }
)

const defaultGetStateForAction = AppNav.router.getStateForAction;

AppNav.router.getStateForAction = (action, state) => {
    if (state && action.type === 'Navigation/BACK' && action.immediate) {
        if (state.routes[1].routeName === "PublicNewsDetail" && !state.routes[2]) {
            let category_id = state.routes[1].params.category_id;
        }
    }
    return defaultGetStateForAction(action, state);
};

const store = configureStore({});

type Props = {};
export default class App extends React.Component<Props> {
    constructor(props) {
        super(props);
        AsyncStorage.setItem('isFirstLogin', 'true');
    }

    componentDidMount() {
        store.dispatch(firstOpen());
        if (Platform.OS === 'ios') {
            PushNotificationIOS.addEventListener("register", (deviceToken) => {
                Repro.setPushDeviceTokenString(deviceToken);
            });

            PushNotificationIOS.requestPermissions();
        }

        // add user profile
        Repro.setStringUserProfile("ユーザータイプ", "非ログインユーザー");
        Repro.setStringUserProfile("App Version", AppInfo.version);
        if (Platform.OS === 'ios') {
            Repro.setStringUserProfile("Platform", "iOS");
        } else {
            Repro.setStringUserProfile("Platform", "Android");
        }

        if (Platform.OS != 'ios') {
            NativeModules.BackgroundColor.setColor('#FFFFFF');
        }
        Linking.getInitialURL().then(url => {
            this._handleOpenURL({url: url});
        });

        Linking.addEventListener('url', this._handleOpenURL);
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL);
    }

    _handleOpenURL = (event) => {
        if (!event.url) {
            return false;
        }

        if (!DeepLinking.open(event.url)) {
            NavigationService.navigate('PublicMain');
        }

        return true;
    };


    render() {
        return (
            <Provider store={store}>
                <AppNav ref={(r) => {
                    NavigationService.setTopLevelNavigator(r)
                }}/>
            </Provider>
        );
    }
}
