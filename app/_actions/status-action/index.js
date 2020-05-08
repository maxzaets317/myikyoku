import {AsyncStorage} from "react-native";
import {GET_CLIP_STATUS, GET_READ_STATUS} from "../../_constants";
import API from "../../_api";
import {getClipCountSuccess} from "../clip-action";

const setClipStatus = (result) => {
    return {
        type: "GET_CLIP_STATUS",
        payload: {clipStatus: result},
    };
};


const setReadStatus = (result) => {
    return {
        type: "GET_READ_STATUS",
        payload: {readStatus: result},
    };
};

export const getReadStatus = () => {
    return (dispatch) => {
        AsyncStorage.getItem('readStatus')
            .then((result) => {
                dispatch(setReadStatus(JSON.parse(result)))
            });
    };
};

const createReadAPI = (data) => {
    return new Promise((resolve, reject) => {
        API().post(`/user/articles/read`, data)
            .then(res => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const createRead = (data) => (
    (dispatch, getState) => {
        let {news, feeds} = getState();
        for (let i = 0;i < news.news.length;i ++) {
            if (news.news[i].guid === data.guid) {
                news.news[i].read = true;
            }
        }
        news.news = news.news.slice();
        let articles = [];
        if (feeds.articles) {
            var l = feeds.articles.length;
            for (let i = 0; i < l; i++) {
                if (feeds.articles[i].guid === data.guid) {
                    feeds.articles[i].read = true;
                }
                articles.push(feeds.articles[i]);
            }
            feeds.articles = articles;
        }
        return createReadAPI(data)
            .then((res) => {
                dispatch(getClipCountSuccess(res.count));
            })
            .catch((err) => {
            });
    }
);
