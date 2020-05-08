import API from '../../_api';
// import moment from 'moment';
import {
    GET_FEEDS_ERROR,
    GET_FEEDS_REQUEST,
    GET_FEEDS_SUCCESS,
    GET_FEEDS_BY_ID_SUCCESS,
    CREATE_FEED_ERROR,
    CREATE_FEED_REQUEST,
    CREATE_FEED_SUCCESS,
    GET_FEEDS_URLS_SUCCESS,
    GET_FEEDS_URLS_ERROR,
    GET_FEEDS_URLS_REQUEST,
} from '../../_constants';
export const getFeeds = (id) => (
    (dispatch) => {
        dispatch(getFeedsRequest());
        return getFeedsAPI(id)
            .then((data) => {
                if (id)
                    dispatch(getFeedsByIdSuccess(data));
                else
                    dispatch(getFeedsSuccess(data));
            })
            .catch((err) => {
                dispatch(getFeedsError())
            });
    }
);

export const getFeedsRequest = () => (
    {
        type: GET_FEEDS_REQUEST,
        payload: { isLoading: true },
    }
);

export const getFeedsSuccess = (data) => (
    {
        type: GET_FEEDS_SUCCESS,
        payload: { data },
    }
);

export const getFeedsByIdSuccess = (data) => (
    {
        type: GET_FEEDS_BY_ID_SUCCESS,
        payload: { data },
    }
);

export const getFeedsError = () => (
    {
        type: GET_FEEDS_ERROR,
    }
);

export const getFeedsAPI = (id) => {
    return new Promise((resolve, reject) => {
        if (id)
            API().get(`/user/feeds/${id}`)
                .then(res => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        else
            API().get(`/user/feeds`)
                .then(res => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
    });
}

export const createFeed = (data) => (
    (dispatch) => {
        // dispatch(createFeedRequest());
        return createFeedAPI(data)
            .then(() => {
                dispatch(createFeedSuccess())
            })
            .catch((err) => {
                if (err.response.status === 450)
                    dispatch(createFeedError('This RSS is already in register.'))
            });
    }
);

export const createFeedRequest = () => (
    {
        type: CREATE_FEED_REQUEST,
        payload: { isLoading: true },
    }
);

export const createFeedSuccess = () => (
    {
        type: CREATE_FEED_SUCCESS,
        payload: {},
    }
);

export const createFeedError = (err) => (
    {
        type: CREATE_FEED_ERROR,
        payload: {err}
    }
);

export const createFeedAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().post(`/user/feeds`, data)
            .then(res => {
                resolve(res.data.feeds);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getFeedsUrls = (url) => (
    (dispatch) => {
        dispatch(getFeedsUrlsRequest());
        return getFeedsUrlsAPI(url)
            .then((feed) => {
                    // dispatch(createFeed({
                    //     title: data[0].title,
                    //     rss_link: data[0].url,
                    //     website_link: url,
                    // }));
                    dispatch(getFeedsUrlsSuccess(feed))
            })
            .catch((err) => {
                dispatch(getFeedsUrlsError())
            });
    }
);

export const getFeedsUrlsAPI = (url) => {
    return new Promise((resolve, reject) => {
        API().get(`/user/urls?url=${url}`)
            .then(res => {
                resolve(res.data.feed);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getFeedsUrlsRequest = () => (
    {
        type: GET_FEEDS_URLS_REQUEST,
        payload: { isLoading: true },
    }
);

export const getFeedsUrlsSuccess = (feed) => (
    {
        type: GET_FEEDS_URLS_SUCCESS,
        payload: { feed },
    }
);

export const getFeedsUrlsError = () => (
    {
        type: GET_FEEDS_URLS_ERROR,
    }
);

export const deleteFeed = (feed) => (
    (dispatch) => {
        dispatch(deleteFeedRequest());
        return deleteFeedAPI(feed)
            .then(() => {
                dispatch(getFeeds());
                dispatch(deleteFeedSuccess());
            })
            .catch((err) => {
                dispatch(deleteFeedError())
            });
    }
);

export const deleteFeedRequest = () => (
    {
        type: GET_FEEDS_REQUEST,
        payload: { isLoading: true },
    }
);

export const deleteFeedSuccess = (data) => (
    {
        type: GET_FEEDS_SUCCESS,
    }
);

export const deleteFeedError = () => (
    {
        type: GET_FEEDS_ERROR,
    }
);

export const deleteFeedAPI = (feed) => {
    return new Promise((resolve, reject) => {
        API().delete(`/user/feeds/${feed.id}`)
            .then(res => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
