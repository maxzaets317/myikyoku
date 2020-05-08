import React, { Fragment } from 'react'
import {
    Image,
    ImageBackground,
    FlatList,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    ActivityIndicator, Platform
} from 'react-native'
import { Container, Header, Content, Button, View, Text, Icon, Left, Right, Body } from 'native-base'

import NavigationService from '@Service/Navigation'

import Loader from '@Component/Loader/Loader'

import Style from '@Theme/Style'

import { connect } from "react-redux";
import { getToken } from "../../../_actions/auth-action";
import {getNewArticles, getNews, getTop} from "../../../_actions/news-action";
import { getCategories } from "../../../_actions/category-action";
import {createClip, getClipArticles, deleteClip, getClipCount} from "../../../_actions/clip-action";
import {createRead, getReadStatus} from "../../../_actions/status-action";
import { RNChipView } from "react-native-chip-view";
import PulseLoader from "../../../Component/PulseLoader/PulseLoader";
import Carousel from 'react-native-looped-carousel';

import { Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
var { height, width } = Dimensions.get('window');
var dataViewHeight = height - 205;

import * as Animatable from 'react-native-animatable';

class PublicNews extends React.Component {
    state = {
        end: false,
        isShowCategories: false,
        category_id: null,
        isShowClip: false,
        noData: false,
        clipStatus: [],
        readStatus: [],
        carouselElements: [{ color: '#BADA55' }, { color: '#BFFA55' }, { color: '#BA1155' }],
        articles: [],
        currentPage: 0,
    };

    constructor(props) {
        super(props);
        this.props.getToken();
        this.props.getNews({
            limit: 20,
            offset: 0,
            category_id: this.props.category_id
        });
        this.props.getCategories();

        this.showNewsDetail = this.showNewsDetail.bind(this);
        this._handleLoadMore = this._handleLoadMore.bind(this);
        this._handleCreateClip = this._handleCreateClip.bind(this);
        this._handleSetCategory = this._handleSetCategory.bind(this);

        this.offset = 0;
        this.status = false;
    }

    componentDidMount() {
        this.props.getTop();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            articles: nextProps.news,
        });
        if (this.state.category_id !== nextProps.category_id) {
            this.setState({
                category_id: nextProps.category_id,
                category_name: nextProps.category_name
            });
            this.props.getNews({
                limit: 20,
                offset: 0,
                category_id: nextProps.category_id,
            })
        }
    }

    _handleCreateClip = (news) => {
        this.props.checkLogin(() => {
            this.setState({
                isShowClip: true,
            });

            this.props.createClip({
                title: news.title,
                author: news.author,
                thumbnail: news.thumbnail,
                content_html: news.content,
                copyright: news.copyright,
                link: news.link,
                guid: news.guid,
                pub_date: news.release_date,
                feed_title: news.feed_title,
                feed_link: news.feed_link,
                image: news.image,
            });

            setTimeout(() => {
                this.setState({
                    isShowClip: false,
                });
            }, 2000);
        });
    };

    _handleDeleteClip = (news) => {
        this.props.deleteClip(news.guid);
    };

    showNewsDetail = (news) => {
        this.props.createRead({
            guid: news.guid
        });
        NavigationService.navigate('PublicNewsDetail', {
            news: news,
            onSelectCategory: this._handleSetCategory
        });
    };

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;
    };

    isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
        var currentOffset = contentOffset.y;
        var direction = currentOffset > this.offset ? 'down' : 'up';
        this.offset = currentOffset;
        return contentOffset.y < 3 && direction === 'up';
    };

    _handleLoadMore({ nativeEvent }) {
        if (this.isCloseToTop(nativeEvent) && !this.status && !this.props.isNewLoading && this.props.news.length > 0) {
            this.status = true;
            this.props.getNewArticles({
                guid: this.props.news[0].guid,
                category_id: this.state.category_id,
            });
            setTimeout(() => {
                this.status = false;
            }, 200);
        }
        if (this.isCloseToBottom(nativeEvent) && this.props.news.length !== 0 && !this.props.isEnd && !this.props.isLoading) {
            this.props.getNews({
                limit: 20,
                offset: this.props.news.length,
                category_id: this.state.category_id,
            });
        }
    }

    _handleShowCategory = (isPress) => {
        this.setState({ isShowCategories: isPress });
    };

    _handleSetCategory = (category) => {
        this.props.changeCategory(category);
    };

    render() {
        const carouselHeight = 230;
        return (
            <Content onScroll={({ nativeEvent }) => { this._handleLoadMore({ nativeEvent }) }} style={[Style.layoutInnerMain, {position: 'relative'}]} contentContainerStyle={Style.layoutContent}>
                {
                    !this.state.category_id && this.props.top.length > 0 ?
                    <Carousel
                        ref={ref => (this.carousel = ref)}
                        leftArrowText={'＜'}
                        leftArrowStyle={{color: 'black', fontSize: 0, marginLeft: -50}}
                        rightArrowText={'＞'}
                        rightArrowStyle={{color: 'white', fontSize: 0, marginRight: -50}}
                        delay={4000}
                        style={{height: carouselHeight}}
                        autoplay={true}
                        isLooped={true}
                        arrows={true}
                        onPageBeingChanged={(value) => this.setState({currentPage: value})}
                        currentPage={this.state.currentPage}>
                        {this.props.top.map((item, index) => (
                            <TouchableHighlight style={Style.slide} underlayColor='transparent' key={index}
                                                                onPress={() => this.showNewsDetail(item)}>
                                <Fragment>
                                    <ImageBackground
                                        source={item.image ? {uri: item.image} : require('@Asset/images/noImage.jpg')}
                                        style={Style.slideImage}>
                                    </ImageBackground>

                                    {
                                        this.state.currentPage === index ? <Animatable.View duration={600} delay={200} animation={"fadeInLeftBig"} style={{backgroundColor: 'rgba(51, 51, 51, 0.25)', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%',
                                            flexWrap: 'wrap',
                                            alignItems: 'flex-start',
                                            flexDirection: 'column'}}>

                                            <Animatable.Text duration={600} delay={1100} animation="fadeInUp" numberOfLines={1}
                                                  style={Style.slideDate}>{item.relase_date ? item.release_date.slice(0, 10).split('-').join('/') : item.pub_date.slice(0, 10).split('-').join('/')}</Animatable.Text>
                                            <Animatable.View duration={600} delay={1300} animation="fadeInUp" style={{height: 60, width: '90%'}}>
                                                <Text numberOfLines={2} ellipsizeMode='tail'
                                                      style={Style.slideTitle}>{item.title}</Text>
                                            </Animatable.View>
                                            <Animatable.Text duration={600} delay={1500} animation="fadeInUp" numberOfLines={1}
                                                  style={Style.slideSource}>{item.isNor ? item.author : item.feed_title}</Animatable.Text>
                                        </Animatable.View>
                                            : <View style={{backgroundColor: 'rgba(51, 51, 51, 0.25)', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%',
                                                flexWrap: 'wrap',
                                                alignItems: 'flex-start',
                                                flexDirection: 'column'}}>

                                                <Text numberOfLines={1}
                                                                 style={Style.slideDate}>{item.relase_date ? item.release_date.slice(0, 10).split('-').join('/') : item.pub_date.slice(0, 10).split('-').join('/')}</Text>
                                                <View style={{height: 60, width: '90%'}}>
                                                    <Text numberOfLines={2} ellipsizeMode='tail'
                                                          style={Style.slideTitle}>{item.title}</Text>
                                                </View>
                                                <Text numberOfLines={1}
                                                                 style={Style.slideSource}>{item.isNor ? item.author : item.feed_title}</Text>
                                            </View>
                                    }
                                </Fragment>
                            </TouchableHighlight>
                        ))}
                    </Carousel>
                        : (this.state.category_id ? <View>
                            <Text style={Style.categoryTitle}>{this.state.category_name}
                            </Text>
                            <View style={Style.listDivider} />
                        </View> : <Fragment />)
                }
                {this.props.isNewLoading ?
                <ActivityIndicator
                    size = "large"
                    style= {{marginTop: this.props.top.length == 0 ? carouselHeight : 0}}
                    animating={this.props.isNewLoading} /> : <Fragment />}
                {

                    this.state.articles.length > 0 ? <Fragment>
                        <FlatList
                                ref='newslist'
                                data={this.state.articles}
                                keyExtractor={(item, index) => item.guid}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item, index}) => (
                                    <TouchableHighlight underlayColor='transparent'
                                                        onPress={() => this.showNewsDetail(item)}>
                                        <View>
                                            <View style={Style.listView}>
                                                {
                                                    item.image
                                                        ? <Image source={{uri: item.image}} defaultSource={require("@Asset/images/noImage.jpg")} style={Style.listImage}/>
                                                        : <Image source={require('@Asset/images/noImage.jpg')}
                                                                 style={Style.listImage}/>
                                                }
                                                <View style={Style.listInfo}>
                                                    <View style={Style.listRightView}>
                                                        <Text numberOfLines={1} ellipsizeMode='tail'
                                                              style={Style.listDate}>{item.release_date.slice(0, 10).split('-').join('/')}</Text>
                                                        <View style={[Style.listIconRight]}>
                                                            {
                                                                (() => {
                                                                    if (item.read !== true)
                                                                        return <View style={Style.listPoint}/>;
                                                                    else return <Fragment></Fragment>
                                                                })()
                                                            }
                                                        </View>
                                                    </View>
                                                    <Text numberOfLines={2} style={Style.listTitle}>{item.title}</Text>
                                                    <View style={Style.listRightView}>
                                                        {
                                                            !item.isNor ? <Text numberOfLines={1} ellipsizeMode='tail'
                                                                                style={Style.listOrigin}>{item.feed_title}</Text>
                                                                : <Text numberOfLines={1} ellipsizeMode='tail'
                                                                        style={Style.listOrigin}>{item.author}</Text>
                                                        }
                                                        <View style={Style.listIconRight}>
                                                            {
                                                                (() => {
                                                                    if (item.clipped === true)
                                                                        return <TouchableOpacity
                                                                            onPress={() => this._handleDeleteClip(item)}>
                                                                            <Image
                                                                                source={require('@Asset/images/clip.png')}
                                                                                style={Style.menuImageIcon}/>
                                                                        </TouchableOpacity>;
                                                                    else
                                                                        return <TouchableOpacity
                                                                            onPress={() => this._handleCreateClip(item)}>
                                                                            <Image
                                                                                source={require('@Asset/images/unclip.png')}
                                                                                style={Style.menuImageIcon}/>
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
                    </Fragment>
                    : !this.props.isLoading ? <View style={{ height: dataViewHeight, justifyContent: 'center', alignSelf: 'center', paddingLeft: 10, paddingRight: 10 }}><Text style={{ color: 'black' }}>
                        データがありません。</Text></View> : <Fragment></Fragment>
                }
                {this.props.isLoading ?
                    <ActivityIndicator
                        size = "large"
                        style= {{marginTop: this.props.top.length == 0 ? carouselHeight : 0}}
                        animating={this.props.isLoading} /> : <Fragment />}
            </Content>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.news,
        ...state.top
    }
};

const mapDispatchToProps = (dispatch) => ({
    getNews: (data) => dispatch(getNews(data)),
    getNewArticles: (data) => dispatch(getNewArticles(data)),
    getCategories: (data) => dispatch(getCategories(data)),
    createClip: (data) => dispatch(createClip(data)),
    deleteClip: (data) => dispatch(deleteClip(data)),
    getToken: () => dispatch(getToken()),
    getReadStatus: () => dispatch(getReadStatus()),
    getClipArticles: () => dispatch(getClipArticles()),
    getClipCount: () => dispatch(getClipCount()),
    createRead: (data) => dispatch(createRead(data)),
    getTop: () => dispatch(getTop()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicNews);
