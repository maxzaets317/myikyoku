import API from '../../_api';
import { AsyncStorage } from 'react-native';
import {
    GET_NEWS_ERROR,
    GET_NEWS_REQUEST,
    GET_NEWS_SUCCESS,
    GET_NEW_ARTICLES_ERROR,
    GET_NEW_ARTICLES_REQUEST,
    GET_NEW_ARTICLES_SUCCESS,
    GET_NEWS_DETAIL_ERROR,
    GET_NEWS_DETAIL_REQUEST,
    GET_NEWS_DETAIL_SUCCESS,
    GET_NEWS_RELATED_SUCCESS, GET_TOP_SUCCESS, GET_TOP_ERROR
} from "../../_constants";

export const getNews = (data) => (
    (dispatch) => {
        dispatch(getNewsRequest());
        return getNewsAPI(data)
            .then((news) => {
                let isEnd = false;
                if (news.length < data.limit)
                    isEnd = true;
                if (data.offset == 0) {
                    dispatch(getNewsSuccess(news, true, isEnd));
                }
                else {
                    dispatch(getNewsSuccess(news, false, isEnd));
                }

            })
            .catch((err) => {
                dispatch(getNewsError())
            });
    }
);

export const getNewsRelated = (data) => (
    (dispatch) => {
        dispatch(getNewsRequest());
        return getNewsAPI(data)
            .then((news) => {
                dispatch(getNewsRelatedSuccess(news));
            })
            .catch((err) => {
                dispatch(getNewsError())
            });
    }
);

export const getNewsRequest = () => (
    {
        type: GET_NEWS_REQUEST,
        payload: { isLoading: true },
    }
);
export const getNewsRelatedSuccess = (newsRelated) => (
    {
        type: GET_NEWS_RELATED_SUCCESS,
        payload: { newsRelated },
    }
);

export const getNewsSuccess = (news, isFirst = true, isEnd = false) => (
    {
        type: GET_NEWS_SUCCESS,
        payload: { news, isFirst, isEnd },
    }
);

export const getNewsError = () => (
    {
        type: GET_NEWS_ERROR,
    }
);

export const getNewsAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().get(`/user/articles/news?limit=${data.limit}&offset=${data.offset}&category_id=${data.category_id}`)
            .then(res => {
                resolve(res.data.articles);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getNewsDetail = (data) => (
    (dispatch) => {
        dispatch(getNewsDetailRequest());
        return getNewsDetailAPI(data)
            .then((newsDetail) => {
                dispatch(getNewsDetailSuccess(newsDetail));
            })
            .catch((err) => {
                dispatch(getNewsDetailError())
            });
    }
);

export const getNewsDetailRequest = () => (
    {
        type: GET_NEWS_DETAIL_REQUEST,
        payload: { isLoading: true },
    }
);

export const getNewsDetailSuccess = (newsDetail) => (
    {
        type: GET_NEWS_DETAIL_SUCCESS,
        payload: { newsDetail },
    }
);

export const getNewsDetailError = () => (
    {
        type: GET_NEWS_DETAIL_ERROR,
    }
);

export const getNewsDetailAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().get(`/user/articles/news/${data.id}`)
            .then(res => {
                resolve(res.data.article);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getTop = () => (
    (dispatch) => {
        return getTopAPI()
            .then((top) => {
                dispatch(getTopSuccess(top));
            })
            .catch((err) => {
                dispatch(getTopError())
            });
    }
);

export const getTopSuccess = (top) => (
    {
        type: GET_TOP_SUCCESS,
        payload: { top },
    }
);

export const getTopError = () => (
    {
        type: GET_TOP_ERROR,
    }
);

export const getTopAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().get(`/user/articles/top`)
            .then(res => {
                resolve(res.data.top);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getNewArticles = (data) => (
    (dispatch) => {
        dispatch(getNewArticlesRequest());
        return getNewArticlesAPI(data)
            .then((new_articles) => {
                dispatch(getNewArticlesSuccess(new_articles));
            })
            .catch((err) => {
                dispatch(getNewArticlesError())
            });
    }
);

export const getNewArticlesRequest = () => (
    {
        type: GET_NEW_ARTICLES_REQUEST,
    }
);

export const getNewArticlesSuccess = (new_articles) => (
    {
        type: GET_NEW_ARTICLES_SUCCESS,
        payload: { new_articles },
    }
);

export const getNewArticlesError = () => (
    {
        type: GET_NEW_ARTICLES_ERROR,
    }
);

export const getNewArticlesAPI = (data) => {
    let category_id = data.category_id;
    if (!category_id)
        category_id = '';
    return new Promise((resolve, reject) => {
        API().get(`/user/articles/new-articles?guid=${data.guid}&category_id=${category_id}`)
            .then(res => {
                resolve(res.data.new_articles);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
