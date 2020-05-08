import {
    GET_QA_ERROR,
    GET_QA_REQUEST,
    GET_QA_SUCCESS,
} from "../_constants";

const initialState = {
    questions: [],
    isLoading: false,
    isEnd: false,
    error: false,
};

export const getQASelector = (state: Object) => ({ ...state.questions });

export const QAReducer = (state: Object = initialState, action: Object) => {
    switch (action.type) {
        case GET_QA_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: false,
                questions: [...action.payload.questions, ...state.questions]
            };
        }
        case GET_QA_REQUEST: {
            return {
                isLoading: true,
                error: false,
                questions: [],
            };
        }
        case GET_QA_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        }
        default: {
            return state;
        }
    }
};
