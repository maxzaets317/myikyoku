import {GET_CATEGORIES_ERROR, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS} from "../_constants";

export const getCategoriesSelector = (state: Object) => ({ ...state.categories });

export const categoriesReducer = (state: Object = {
    categories: [],
    isLoading: false,
    isEnd: false,
    error: false,
}, action: Object) => {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: false,
                categories: action.payload.categories
            };
        }
        case GET_CATEGORIES_REQUEST: {
            return {
                isLoading: true,
                error: false,
                categories: [],
            };
        }
        case GET_CATEGORIES_ERROR: {
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
