import API from '../../_api';
import { AsyncStorage } from 'react-native';
import {
    GET_NOTIFICATIONS_ERROR,
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_COUNT_SUCCESS
} from "../../_constants";

export const getNotifications = (data) => (
    (dispatch: Function) => {
        dispatch(getNotificationsRequest());
        return getNotificationsAPI(data)
            .then((notifications) => {
                dispatch(getNotificationsSuccess(notifications));
            })
            .catch((err) => {
                dispatch(getNotificationsError());
            });
    }
);

export const getNotificationsRequest = () => (
    {
        type: GET_NOTIFICATIONS_REQUEST,
        payload: { isLoading: true },
    }
);

export const getNotificationsSuccess = (notifications: object) => (
    {
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: { notifications },
    }
);

export const getNotificationsError = () => (
    {
        type: GET_NOTIFICATIONS_ERROR,
    }
);

export const getNotificationsAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().get(`/user/notifications?limit=${data.limit}&offset=${data.offset}`)
            .then(res => {
                resolve(res.data.notifications);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getNotificationCount = (data) => (
    (dispatch: Function) => {
        return getNotificationCountAPI(data)
            .then((count) => {
                dispatch(getNotificationCountSuccess(count));
            })
            .catch((err) => {
            });
    }
);

export const getNotificationCountSuccess = (count) => (
    {
        type: GET_NOTIFICATIONS_COUNT_SUCCESS,
        payload: { count }
    }
);

export const getNotificationCountAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().get(`/user/notifications-count?release_date=${data}`)
            .then(res => {
                resolve(res.data.count);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
