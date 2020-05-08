import API from '../../_api';
import { AsyncStorage } from 'react-native';
import {
    GET_QA_ERROR,
    GET_QA_REQUEST,
    GET_QA_SUCCESS,
} from "../../_constants";

export const getQA = (data) => (
    (dispatch: Function) => {
        dispatch(getQARequest());
        return getQAAPI(data)
            .then((questions) => {
                dispatch(getQASuccess(questions));
            })
            .catch((err) => {
                dispatch(getQAError());
            });
    }
);

export const getQARequest = () => (
    {
        type: GET_QA_REQUEST,
        payload: { isLoading: true },
    }
);

export const getQASuccess = (questions) => (
    {
        type: GET_QA_SUCCESS,
        payload: { questions },
    }
);

export const getQAError = () => (
    {
        type: GET_QA_ERROR,
    }
);

export const getQAAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().get(`/user/questions?limit=${data.limit}&offset=${data.offset}`)
            .then(res => {
                resolve(res.data.questions);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
