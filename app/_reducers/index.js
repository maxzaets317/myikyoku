import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import {newsReducer, newsDetailReducer, topReducer} from './news-reducer';
import {feedsReducer, feedsDetailReducer, createFeedReducer, getFeedsUrlsReducer} from './rss-reducer';
import {clipArticleReducer, clipArticlesReducer, clipCountReducer} from "./clip-reducer";
import {categoriesReducer} from "./category-reducer";
import {clipStatusReducer, readStatusReducer} from "./status-reducer";
import {settingReducer} from "./setting-reduer";
import {notificationsReducer} from './notification-reducer';
import {QAReducer} from './qa-reducer';

// Root Reducer
const rootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer,
    top: topReducer,
    newsDetail: newsDetailReducer,
    feeds: feedsReducer,
    createFeed: createFeedReducer,
    clipArticle: clipArticleReducer,
    clipArticles: clipArticlesReducer,
    categories: categoriesReducer,
    feeds_urls: getFeedsUrlsReducer,
    clipStatus: clipStatusReducer,
    readStatus: readStatusReducer,
    setting: settingReducer,
    notifications: notificationsReducer,
    questions: QAReducer,
    clipCount: clipCountReducer,
});

export default rootReducer;
