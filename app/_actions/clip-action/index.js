import API from '../../_api';
import { AsyncStorage } from 'react-native';
import {
    CREATE_CLIP_ERROR,
    CREATE_CLIP_REQUEST,
    CREATE_CLIP_SUCCESS, GET_CLIP_ARTICLES_COUNT,
    GET_CLIP_ARTICLES_ERROR,
    GET_CLIP_ARTICLES_REQUEST,
    GET_CLIP_ARTICLES_SUCCESS,
} from "../../_constants";

export const getClipArticles = () => (
    (dispatch) => {
        dispatch(getClipArticlesRequest());
        return getClipArticlesAPI()
            .then((clipArticles) => {
                let clips = [];
                for (let i = 0; i< clipArticles.length;i ++) {
                    clips.push(clipArticles[i].guid);
                }
                dispatch(getClipArticlesSuccess(clipArticles, clips));
            })
            .catch((err) => {
                var errorMessage = '';
                switch (err.response.status) {
                    case 401:
                        AsyncStorage.removeItem('token');
                        errorMessage = 'ログインエラー';
                        break;
                    case 500:
                        errorMessage = 'Network Error';
                        break;
                    default:
                        errorMessage = '';
                        break;
                }
                dispatch(getClipArticlesError(errorMessage))
            });
    }
);

export const getClipArticlesRequest = () => (
    {
        type: GET_CLIP_ARTICLES_REQUEST,
        payload: { isLoading: true },
    }
);

export const getClipArticlesSuccess = (clipArticles, clips) => (
    {
        type: GET_CLIP_ARTICLES_SUCCESS,
        payload: { clipArticles: clipArticles, clipStatus: clips },
    }
);

export const getClipArticlesError = (err) => (
    {
        type: GET_CLIP_ARTICLES_ERROR,
        payload: { err: err },
    }
);

export const getClipArticlesAPI = () => {
    return new Promise((resolve, reject) => {
        API().get(`/user/articles/clip`)
            .then(res => {
                resolve(res.data.clip_articles);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const createClip = (data) => (
    (dispatch, getState) => {
        let { news, feeds } = getState();
        for (let i = 0;i < news.news.length;i ++) {
            if (news.news[i].guid === data.guid) {
                news.news[i].clipped = true;
            }
        }
        news.news = news.news.slice();
        let articles = [];
        if (feeds.articles) {
            var l = feeds.articles.length
            for (let i = 0; i < l; i++) {
                if (feeds.articles[i].guid === data.guid) {
                    feeds.articles[i].clipped = true;
                }
                articles.push(feeds.articles[i]);
            }
            feeds.articles = articles;
        }
        dispatch(createClipRequest());
        return createClipAPI(data)
            .then((res) => {
                dispatch(createClipSuccess(res.clipArticle));
                dispatch(getClipCountSuccess(res.count));
            })
            .catch((err) => {
                var errorMessage = '';
                switch (err.response.status) {
                    case 401:
                        AsyncStorage.removeItem('token');
                        errorMessage = 'ログインエラー';
                        break;
                    case 500:
                        errorMessage = 'Network Error';
                        break;
                    default:
                        errorMessage = '';
                        break;
                }
                dispatch(createClipError(errorMessage))
            });
    }
);

export const createClipRequest = () => (
    {
        type: CREATE_CLIP_REQUEST,
        payload: { isLoading: true },
    }
);

export const createClipSuccess = (clipArticle) => (
    {
        type: CREATE_CLIP_SUCCESS,
        payload: { clipArticle },
    }
);

export const createClipError = (err) => (
    {
        type: CREATE_CLIP_ERROR,
        payload: { err: err },
    }
);

export const createClipAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().post(`/user/articles/clip`, data)
            .then(res => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const deleteClip = (data) => (
    (dispatch, getState) => {
        let { news, feeds } = getState();
        for (let i = 0;i < news.news.length;i ++) {
            if (news.news[i].guid === data) {
                news.news[i].clipped = false;
            }
        }
        news.news = news.news.slice();
        let articles = [];
        if (feeds.articles) {
            var l = feeds.articles.length;
            for (let i = 0; i < l; i++) {
                if (feeds.articles[i].guid === data) {
                    feeds.articles[i].clipped = false;
                }
                articles.push(feeds.articles[i]);
            }
            feeds.articles = articles;
        }
        return deleteClipAPI(data)
            .then((res) => {
                dispatch(getClipCountSuccess(res.count));
            })
            .catch((err) => {
                var errorMessage = '';
                switch (err.response.status) {
                    case 401:
                        AsyncStorage.removeItem('token');
                        errorMessage = 'この操作が可能な権限がありません。';
                        break;
                    case 500:
                        errorMessage = 'ネットワークの状況がよくありません。電波環境の良い場所で改めてお試しください。';
                        break;
                    default:
                        errorMessage = '';
                        break;
                }
            });
    }
);

export const deleteClipAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().delete(`/user/articles/clip?guid=${data}`)
            .then(res => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getClipCount = () => (
    (dispatch) => {
        return clipCountAPI()
            .then((count) => {
                dispatch(getClipCountSuccess(count));
            })
            .catch((err) => {

            });
    }
);

export const getClipCountSuccess = (count) => (
    {
        type: GET_CLIP_ARTICLES_COUNT,
        payload: { count },
    }
);

export const clipCountAPI = () => {
    return new Promise((resolve, reject) => {
        API().get(`/user/articles/clip-count`)
            .then(res => {
                resolve(res.data.count);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
