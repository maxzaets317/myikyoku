import {
    GET_NOTIFICATIONS_COUNT_SUCCESS,
    GET_NOTIFICATIONS_ERROR,
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
} from "../_constants";

const initialState = {
    notifications: [],
    notification_count: 0,
    isLoading: false,
    isEnd: false,
    error: false,
};

export const getNotificationsSelector = (state: Object) => ({ ...state.notifications });

export const notificationsReducer = (state: Object = initialState, action: Object) => {
    switch (action.type) {
        case GET_NOTIFICATIONS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: false,
                notifications: [...action.payload.notifications, ...state.notifications],
                notification_count: 0,
            };
        }
        case GET_NOTIFICATIONS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: false,
                notifications: [],
            };
        }
        case GET_NOTIFICATIONS_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        }
        case GET_NOTIFICATIONS_COUNT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: false,
                notification_count: action.payload.count
            };
        }
        default: {
            return state;
        }
    }
};
