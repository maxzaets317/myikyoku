import {GET_SETTING_ERROR, GET_SETTING_SUCCESS} from "../../_constants";
import API from "../../_api";

export const getSetting = () => (
    (dispatch) => {
        return getSettingAPI()
            .then((setting) => {
                dispatch(getSettingSuccess(setting));
            })
            .catch((err) => {
                dispatch(getSettingError())
            });
    }
);

export const getSettingSuccess = (setting) => (
    {
        type: GET_SETTING_SUCCESS,
        payload: { setting: setting },
    }
);

export const getSettingError = () => (
    {
        type: GET_SETTING_ERROR,
    }
);

export const getSettingAPI = () => {
    return new Promise((resolve, reject) => {
        API().get(`user/settings`)
            .then(res => {
                resolve(res.data.settings);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};