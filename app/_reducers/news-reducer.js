import {
    GET_NEWS_ERROR,
    GET_NEWS_REQUEST,
    GET_NEWS_SUCCESS,
    GET_TOP_ERROR,
    GET_TOP_REQUEST,
    GET_TOP_SUCCESS,
    GET_NEWS_DETAIL_ERROR,
    GET_NEWS_DETAIL_REQUEST,
    GET_NEWS_DETAIL_SUCCESS,
    GET_NEWS_RELATED_SUCCESS,
    GET_NEW_ARTICLES_REQUEST,
    GET_NEW_ARTICLES_ERROR,
    GET_NEW_ARTICLES_SUCCESS,
} from "../_constants";

const initialState = {
    news: [],
    newsRelated: [],
    isLoading: false,
    isNewLoading: false,
    isEnd: false,
    error: false,
};

export const getNewsSelector = (state) => ({ ...state.news });
export const getNewsDetailSelector = (state) => ({ ...state.newsDetail });

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS_SUCCESS: {
            if (action.payload.isFirst)
                return {
                    ...state,
                    isLoading: false,
                    error: false,
                    news: action.payload.news,
                    isEnd: action.payload.isEnd,
                };
            else
                return {
                    ...state,
                    isLoading: false,
                    error: false,
                    news: state.news.concat(action.payload.news),
                    isEnd: action.payload.isEnd,
                };
        }
        case GET_NEWS_RELATED_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: false,
                newsRelated: action.payload.newsRelated,
            };
        }
        case GET_NEWS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: false,
            };
        }
        case GET_NEWS_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        }
        case GET_NEW_ARTICLES_REQUEST: {
            return {
                ...state,
                isNewLoading: true,
                error: false,
            };
        }
        case GET_NEW_ARTICLES_ERROR: {
            return {
                ...state,
                isNewLoading: false,
                error: true,
            };
        }
        case GET_NEW_ARTICLES_SUCCESS: {
            return {
                ...state,
                news: action.payload.new_articles.concat(state.news),
                isNewLoading: false,
                error: false,
            };
        }

        default: {
            return state;
        }
    }
};

export const newsDetailReducer = (state = {
    news: [],
    isLoading: false,
    isEnd: false,
    error: false
}, action) => {
    switch (action.type) {
        case GET_NEWS_DETAIL_SUCCESS: {
            return {
                isLoading: false,
                error: false,
                newsDetail: action.payload.newsDetail,
            };
        }
        case GET_NEWS_DETAIL_REQUEST: {
            return {
                isLoading: true,
                error: false,
                newsDetail: {},
            };
        }
        case GET_NEWS_DETAIL_ERROR: {
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

export const topReducer = (state = {
    top: [],
    error: false,
}, action) => {
    switch (action.type) {
        case GET_TOP_SUCCESS: {
            return {
                ...state,
                error: false,
                top: action.payload.top,
            };
        }
        case GET_TOP_REQUEST: {
            return {
                ...state,
            };
        }
        case GET_TOP_ERROR: {
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
