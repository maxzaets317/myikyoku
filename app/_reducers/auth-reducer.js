import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_ERROR,
    INIT,
    LOGOUT,
    GET_USER_INFO
} from '../_constants';

const initialState = {
    user: {},
    token: '',
    isLoading: false,
    error: false,
};

export const getAuthSelector = (state) => ({ ...state.auth });

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT: {
            return {
                ...state,
                token: action.payload.token
            }
        }
        case LOGIN_SUCCESS: {
            return {
                isLoading: false,
                error: false,
                user: action.payload.user,
                token: action.payload.user.token,
            };
        }
        case LOGIN_REQUEST: {
            return {
                isLoading: true,
                error: false,
                user: {},
                token: ''
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true,
                err: action.payload.err
            };
        }
        case LOGOUT: {
            return {
                ...initialState
            }
        }
        case GET_USER_INFO: {
            return {
                ...state,
                user: action.payload.user
            }
        }
        default: {
            return state;
        }
    }
};

export default authReducer;
