import API from '../../_api';
import {
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
} from "../../_constants";

export const getCategories = () => (
    (dispatch: Function) => {
        dispatch(getCategoriesRequest());
        return getCategoriesAPI()
            .then((categories) => {
                dispatch(getCategoriesSuccess(categories));
            })
            .catch((err) => {
                dispatch(getCategoriesError())
            });
    }
);

export const getCategoriesRequest = () => (
    {
        type: GET_CATEGORIES_REQUEST,
        payload: { isLoading: true },
    }
);

export const getCategoriesSuccess = (categories) => (
    {
        type: GET_CATEGORIES_SUCCESS,
        payload: { categories },
    }
);

export const getCategoriesError = () => (
    {
        type: GET_CATEGORIES_ERROR,
    }
);

export const getCategoriesAPI = () => {
    return new Promise((resolve, reject) => {
        API().get(`/user/categories`)
            .then(res => {
                resolve(res.data.categories);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
