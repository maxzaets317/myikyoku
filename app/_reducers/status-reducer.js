import {GET_CLIP_STATUS, GET_READ_STATUS} from "../_constants";

export const clipStatusReducer = (state = {
    clipStatus: [],
}, action) => {
    switch (action.type) {
        case GET_CLIP_STATUS: {
            return {
                clipStatus: action.payload.clipStatus,
            };
        }
        default: {
            return state;
        }
    }
};

export const readStatusReducer = (state = {
    readStatus: [],
}, action) => {
    switch (action.type) {
        case GET_READ_STATUS: {
            return {
                readStatus: action.payload.readStatus,
            };
        }
        default: {
            return state;
        }
    }
};