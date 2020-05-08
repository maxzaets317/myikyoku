import {
    CREATE_CLIP_ERROR,
    CREATE_CLIP_REQUEST,
    CREATE_CLIP_SUCCESS, GET_CLIP_ARTICLES_COUNT,
    GET_CLIP_ARTICLES_ERROR,
    GET_CLIP_ARTICLES_REQUEST,
    GET_CLIP_ARTICLES_SUCCESS,
} from "../_constants";

const initialState = {
    clipArticles: [],
    isLoading: false,
    error: false,
};

export const getClipArticlesSelector = (state) => ({ ...state.clipArticles });
export const getClipArticleSelector = (state) => ({ ...state.clipArticle });

export const clipArticlesReducer = (state = {
    clipArticles: [],
    isLoading: false,
    error: false,
}, action) => {
    switch (action.type) {
        case GET_CLIP_ARTICLES_SUCCESS: {
            return {
                isLoading: false,
                error: false,
                clipArticles: action.payload.clipArticles,
                clipStatus: action.payload.clipStatus,
            };
        }
        case GET_CLIP_ARTICLES_REQUEST: {
            return {
                isLoading: true,
                error: false,
                clipArticles: [],
            };
        }
        case GET_CLIP_ARTICLES_ERROR: {
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

export const clipArticleReducer = (state = {
    clipArticle: {},
    isLoading: false,
    error: false,
}, action) => {
    switch (action.type) {
        case CREATE_CLIP_SUCCESS: {
            return {
                isLoading: false,
                error: false,
                clipArticle: action.payload.clipArticle,
            };
        }
        case CREATE_CLIP_REQUEST: {
            return {
                isLoading: true,
                error: false,
                clipArticle: {},
            };
        }
        case CREATE_CLIP_ERROR: {
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

export const clipCountReducer = (state = {clipCount: 0}, action) => {
    switch (action.type) {
        case GET_CLIP_ARTICLES_COUNT: {
            return {
                clipCount: action.payload.count,
            }
        }
        default: {
            return state;
        }

    }
};