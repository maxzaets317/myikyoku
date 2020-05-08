import {AsyncStorage, Platform} from "react-native";
// import DeviceInfo from 'react-native-device-info';
import API from "../../_api";
import App from "../../../app"
import NavigationService from "../../Service/Navigation";
import {GET_USER_INFO, LOGIN_SUCCESS} from "../../_constants";
import {getToken} from "../auth-action";

const createLogAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().post(`/user/logs`, data)
            .then(res => {
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        API().get(`/user`)
            .then(res => {
                resolve(res.data.user);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const saveUserInfo = (user) => (
    {
        type: GET_USER_INFO,
        payload: { user },
    }
);

export const firstOpen = () => (
    async (dispatch) => {
        let token = await AsyncStorage.getItem('token');
        if (token) {
            getUserInfo()
                .then((user) => {
                    dispatch(saveUserInfo(user));
                    dispatch(createLog({
                        event: 'pageview',
                        page: 'NEWS'
                    }));
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        AsyncStorage.setItem('token', '');
                        AsyncStorage.setItem('name', '');
                        AsyncStorage.setItem('user_id', '');
                        AsyncStorage.setItem('user_type', '');
                        dispatch(getToken());
                        NavigationService.navigate('PublicMain', {showLogin: true})
                    }
                })
        } else {
            let device_token = await AsyncStorage.getItem('device_token');
            let version = await AsyncStorage.getItem('version');
            let info = {};
            if ((version && version !== App.version) || !version) {
                info = {
                    device_token: 'xxxxxxxx',
                    device_type: Platform.OS,
                    app_version: App.version,
                };
                AsyncStorage.setItem('version', App.version);
                AsyncStorage.setItem('device_token', 'xxxxxxxx');
                return createLogAPI(info);
            }
        }
    }
);


export const createLog = (data) => (
    async (dispatch, getState) => {
        let {auth} = getState();
        let device_token = await AsyncStorage.getItem('device_token');
        let version = await AsyncStorage.getItem('version');
        let user_id = auth.user.user_id.toString();
        let user_type = auth.user.level.toString();
        let info = {
            device_token: device_token,
            device_type: Platform.OS,
            app_version: version,
            user_id: user_id,
            user_type: user_type,
            event: data.event,
            page: data.page,
            guid: data.guid,
        };
        return createLogAPI(info);
    }
);
