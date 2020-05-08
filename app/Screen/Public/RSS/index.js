import React, { Fragment } from 'react'
import {Image, FlatList, TouchableHighlight, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Left, Right, Body } from 'native-base'

import NavigationService from '@Service/Navigation'

import Loader from '@Component/Loader/Loader'

import Style from '@Theme/Style'

import { connect } from "react-redux";

import { deleteFeed, getFeeds } from "../../../_actions/rss-action";
import { getFeedsSelector } from "../../../_reducers/rss-reducer";
import { createClip, deleteClip, getClipArticles } from "../../../_actions/clip-action";

import { Dimensions } from 'react-native';
import {createRead, getReadStatus} from "../../../_actions/status-action";
import PublicNews from "../News";
var { height, width } = Dimensions.get('window');
var dataViewHeight = height - 205;

class PublicRSS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            items: [],
            categories: [],
            isShowClip: false,
            clipStatus: [],
            readStatus: [],
            articles: [],
        };
        this.props.checkLogin(() => {
            this.props.getFeeds();
            this.props.getReadStatus();
            this.setState({
                showLoginModal: false,
            })
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            articles: nextProps.articles
        })
    }

    _handleCreateClip = (news) => {
        this.setState({
            isShowClip: true
        });
        this.props.createClip({
            title: news.title,
            author: news.author,
            thumbnail: news.thumbnail,
            content_html: news.content,
            copyright: news.copyright,
            link: news.link,
            guid: news.guid,
            pub_date: news.pub_date,
            feed_title: news.feed_title,
            feed_link: news.feed_link,
            image: news.image,
        });
        setTimeout(() => {
            this.setState({
                isShowClip: false,
            })
        }, 2000);
    };

    _handleDeleteClip = (news) => {
        this.props.deleteClip(news.guid);
    };

    _handleShowCategory = (isPress) => {
        this.setState({ isShowFeeds: isPress });
    };

    _handleDeleteFeed = (feed) => {
        this.props.deleteFeed(feed);
    };

    _handleShowDetail = (item) => {
        this.props.createRead({
            guid: item.guid
        });
        NavigationService.navigate('PublicRSSDetail', {
            article: item
        });
    };

    render() {
        return (
            <Content style={Style.layoutInnerMain} contentContainerStyle={Style.layoutContent}>
                {
                    (this.state.articles && this.state.articles.length)
                        ? <View>
                            <FlatList
                                data={this.state.articles}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, separators, index }) => (
                                    <TouchableHighlight underlayColor='transparent' onPress={() => this._handleShowDetail(item)}>
                                        <View>
                                            <View style={Style.listView}>
                                                {
                                                    item.image
                                                        ? <Image source={{ uri: item.image }} defaultSource={require("@Asset/images/noImage.jpg")} style={Style.listImage} />
                                                        : <Image source={require('@Asset/images/noImage.jpg')} style={Style.listImage} />
                                                }
                                                <View style={Style.listInfo}>
                                                    <View style={Style.listRightView}>
                                                        <Text numberOfLines={1} ellipsizeMode='tail' style={Style.listDate}>{item.pub_date.slice(0, 10).split('-').join('/')}</Text>
                                                        <View style={[Style.listIconRight]}>
                                                            {(() => {
                                                                if (item.read !== true)
                                                                    return <View style={Style.listPoint} />;
                                                                else <Fragment></Fragment>
                                                            })()}
                                                        </View>
                                                    </View>
                                                    <Text numberOfLines={2} ellipsizeMode='tail' style={Style.listTitle}>{item.title}</Text>
                                                    <View style={Style.listRightView}>
                                                        <Text numberOfLines={1} ellipsizeMode='tail' style={Style.listOrigin}>{item.feed_title}</Text>
                                                        <View style={Style.listIconRight}>
                                                            {
                                                                (() => {
                                                                    if (item.clipped === true)
                                                                        return <TouchableOpacity onPress={() => this._handleDeleteClip(item)} >
                                                                            <Image source={require('@Asset/images/clip.png')} style={Style.menuImageIcon}/>
                                                                        </TouchableOpacity>;
                                                                    else
                                                                        return <TouchableOpacity onPress={() => this._handleCreateClip(item)} >
                                                                            <Image source={require('@Asset/images/unclip.png')} style={Style.menuImageIcon}/>
                                                                        </TouchableOpacity>
                                                                })()
                                                            }
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            {
                                                index  < this.state.articles.length  - 1 ? <View style={Style.listDivider}/> : <Fragment />
                                            }
                                        </View>
                                    </TouchableHighlight>
                                )}
                            />
                        </View>
                        : !this.props.isLoading ? <View style={{ height: dataViewHeight, justifyContent: 'center', alignSelf: 'center', paddingLeft: 10, paddingRight: 10 }}><Text style={{ color: 'black' }}>
                            まだRSSが登録されていないか、データが届いておりません。
                            ニュースを取得したいサイトを「＋」ボタンから追加してください。</Text></View> : <Fragment></Fragment>
                }
                {this.props.isLoading ?
                    <ActivityIndicator
                        size = "large"
                        style = {Style.indicatorPosition}
                        animating={this.props.isLoading} /> : <Fragment />}
            </Content>
        )
    }
}

const mapStateToProps = (state) => getFeedsSelector;

const mapDispatchToProps = (dispatch) => ({
    getFeeds: (data) => dispatch(getFeeds(data)),
    deleteFeed: (feed) => dispatch(deleteFeed(feed)),
    createClip: (data) => dispatch(createClip(data)),
    deleteClip: (data) => dispatch(deleteClip(data)),
    getReadStatus: () => dispatch(getReadStatus()),
    getClipArticles: () => dispatch(getClipArticles()),
    createRead: (data) => dispatch(createRead(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicRSS);
