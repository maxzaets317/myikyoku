import {GET_SETTING_SUCCESS, GET_SETTING_ERROR} from "../_constants";

const initialState = {
    setting: {},
    error: false,
};

export const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SETTING_SUCCESS: {
            return {
                ...state,
                error: false,
                setting: action.payload.setting
            };
        }
        case GET_SETTING_ERROR: {
            return {
                ...state,
                error: true,
            };
        }
        default: {
            return state;
        }
    }
};
