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

} from '../_constants';

const initialState = {
  feeds: [],
  isLoading: false,
  error: false,
  success: false
};

export const getFeedsSelector = (state) => ({ ...state.feeds });
export const getCreateFeedSelector = (state) => ({ ...state.createFeed });

export const feedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEEDS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        feeds: action.payload.data.feeds,
        articles: action.payload.data.articles,
      };
    }
    case GET_FEEDS_BY_ID_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        feeds: action.payload.data.feeds,
        articles: action.payload.data.articles,
      };
    }
    case GET_FEEDS_REQUEST: {
      return {
        isLoading: true,
        error: false,
        feeds: [],
      }
    }
    case GET_FEEDS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    }
    case CREATE_FEED_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        success: true,
      };
    }
    case CREATE_FEED_REQUEST: {
      return {
        isLoading: true,
        error: false,
      }
    }
    case CREATE_FEED_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    }
    default: {
      return state;
    }
  }
};

export const createFeedReducer = (state = {
  feed: {},
  isLoadingCreate: false,
  errorCreate: false,
  successCreate: false,
}, action) => {
  switch (action.type) {
    case CREATE_FEED_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorCreate: false,
        successCreate: true,
      };
    }
    case CREATE_FEED_REQUEST: {
      return {
        isLoading: true,
        errorCreate: false,
        successCreate: false,
      }
    }
    case CREATE_FEED_ERROR: {
      return {
        ...state,
        isLoading: false,
        successCreate: false,
        errorCreate: true,
      }
    }
    default: {
      return state;
    }
  }
};

export const getFeedsUrlsReducer = (state = {
  feedinfo: {},
  isLoading: false,
  error: false,
  errorCreate: false,
  successCreate: false,
}, action) => {
  switch (action.type) {
    case GET_FEEDS_URLS_SUCCESS: {
      return {
        ...state,
        feedinfo: action.payload.feed,
        isLoading: false,
        error: false,
        errorCreate: false,
        successCreate: true,
      };
    }
    case GET_FEEDS_URLS_REQUEST: {
      return {
        isLoading: true,
        error: false,
        feeds_urls: [],
        errorCreate: false,
        successCreate: false,
      }
    }
    case GET_FEEDS_URLS_ERROR: {
      return {
        ...state,
        feedinfo: {},
        isLoading: false,
        error: true,
        errorCreate: true,
        successCreate: false,
      }
    }
    default: {
      return state;
    }
  }
};
