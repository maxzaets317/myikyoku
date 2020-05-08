import API from '../../_api';
import { AsyncStorage, Platform } from 'react-native';
import { INIT, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../_constants";
import NavigationService from '@Service/Navigation';
import Repro from 'react-native-repro';
import {getClipArticles, getClipCount} from "../../_actions/clip-action";
import {getNews} from "../news-action";

export const login = (data) => (
    async (dispatch) => {
        dispatch(loginRequest());
        data.device_token = await AsyncStorage.getItem('device_token');
        data.app_version = await AsyncStorage.getItem('version');
        data.device_type = Platform.OS;
        return userLogin(data)
            .then((user) => {
                Repro.getUserID((error, userID) => {
                    if (!userID || userID != user.member_id) {
	                    // user id
                        Repro.setUserID(user.member_id);

						// 1. user type
						if (user.level == 0) {
							Repro.setStringUserProfile("ユーザータイプ", "仮登録会員");
						}
						else if (user.level == 1) {
							Repro.setStringUserProfile("ユーザータイプ", "クラブ会員");
						}
						else if (user.level == 2) {
							Repro.setStringUserProfile("ユーザータイプ", "医師");
						}
						else if (user.level == 3) {
							Repro.setStringUserProfile("ユーザータイプ", "医学生");
						}
						else if (user.level == 4) {
							Repro.setStringUserProfile("ユーザータイプ", "初期研修医");
						}
						else {
							Repro.setStringUserProfile("ユーザータイプ", "非ログインユーザー");
						}

						// 2. user age
						Repro.setIntUserProfile("年齢", parseInt(user.birth_year));

						// 3. user pref
						Repro.setStringUserProfile("都道府県", user.pref);

						// 4. univercity
						Repro.setStringUserProfile("大学", user.univercity);

						// 5. license year
						Repro.setIntUserProfile("医師免許取得年度", parseInt(user.licenseyear));

						// 6. workplace
						if (user.workplace != null) {
							Repro.setStringUserProfile("勤務先", user.workplace);
						}
						else {
							Repro.setStringUserProfile("勤務先", "");
						}
                    }
                });
                dispatch(getClipArticles());
                dispatch(getNews({
                    limit: 20,
                    offset: 0,
                    category_id: null
                }));
                dispatch(getClipCount());
                dispatch(getToken());
                dispatch(loginSuccess(user));

                if (data.onSuccess) {
                    data.onSuccess();
                } else {
                    NavigationService.navigate('PublicMain', {showLogin: false})
                }
            })
            .catch((err) => {
                var errorMessage = '';
                switch (err.response.status) {
                    case 401:
                        errorMessage = 'メールアドレスかパスワードが違います。';
                        break;
                    case 422:
                        errorMessage = 'メールアドレスまたはパスワードが正しくありません。正しいログイン情報をご入力ください。';
                        break;
                    case 500:
                        errorMessage = 'ネットワークの状況がよくありません。電波環境の良い場所で改めてお試しください。';
                        break;
                    default:
                        errorMessage = '';
                        break;
                }
                dispatch(loginError(errorMessage))
            });
    }
);

export const loginRequest = () => (
    {
        type: LOGIN_REQUEST,
        payload: { isLoading: false },
    }
);

export const loginSuccess = (user) => (
    {
        type: LOGIN_SUCCESS,
        payload: { user },
    }
);

export const loginError = (err) => (
    {
        type: LOGIN_ERROR,
        payload: { err: err },
    }
);

export const userLogin = (data) => {
    return new Promise((resolve, reject) => {
        API().post(`/user/login`, data)
            .then(res => {
                if (res.data) {
                    const token = res.data.token;
                    AsyncStorage.setItem('token', token);
                    AsyncStorage.setItem('name', res.data.name_sei + " " + res.data.name_mei);
                    AsyncStorage.setItem('user_id', res.data.user_id.toString());
                    AsyncStorage.setItem('user_type', res.data.level.toString());
                    resolve(res.data);
                }
                else {
                    reject({
                        response: {
                            status: 500
                        }
                    });
                }
            })
            .catch((err) => {
                AsyncStorage.removeItem('token');
                reject(err ? err : {
                    response: {
                        status: 500
                    }
                });
            });
    });
};

const setInit = (result) => {
    return {
        type: "INIT",
        payload: {token: result},
    };
}

export const getToken = () => {
    return (dispatch) => {
        AsyncStorage.getItem('token')
            .then((result) => {
                dispatch(setInit(result))
            });
    };
};
export const logout = () => (
    (dispatch) => {
        return logoutAPI()
            .then(() => {
                AsyncStorage.setItem('token', '');
                AsyncStorage.setItem('name', '');
                AsyncStorage.setItem('user_id', '');
                AsyncStorage.setItem('user_type', '');
                dispatch(getNews({
                    limit: 20,
                    offset: 0,
                    category_id: null
                }));
                dispatch(getClipCount());
                dispatch(logoutSuccess())
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    AsyncStorage.setItem('token', '');
                    AsyncStorage.setItem('name', '');
                    AsyncStorage.setItem('user_id', '');
                    AsyncStorage.setItem('user_type', '');
                    dispatch(logoutSuccess())
                }
            })
    }
);

const logoutSuccess = () => {
    return {
        type: "LOGOUT",
    };
}

export const logoutAPI = () => {
    return new Promise((resolve, reject) => {
        API().get(`/user/logout`)
            .then(res => {
                resolve(res)
            })
            .catch((err) => reject(err));
    });
};
