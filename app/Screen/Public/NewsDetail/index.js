import React, { Fragment } from 'react'
import { TouchableOpacity, ImageBackground, Dimensions, AsyncStorage, ScrollView, Linking, TouchableHighlight, Image, FlatList, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Left, Right, Body } from 'native-base'
import { Dialog } from 'react-native-paper';
import LoginModal from "../Component/LoginModal";

import NavigationService from '@Service/Navigation'
import { RNChipView } from 'react-native-chip-view'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/NewsDetail/Style'

import { getNews } from "../../../_actions/news-action";
import { createClip, deleteClip } from "../../../_actions/clip-action";
import { connect } from "react-redux";
import Loader from '@Component/Loader/Loader'
import HTML from 'react-native-render-html';
import PulseLoader from "../../../Component/PulseLoader/PulseLoader";
import LinearGradient from 'react-native-linear-gradient';
import { createRead } from "../../../_actions/status-action";
import {getToken} from "../../../_actions/auth-action";
import {createLog} from "../../../_actions/analytics-action";
import {CLIP_ANIMATE_DURATION} from "../../../_constants";

var { height, width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

class PublicNewsDetail extends React.Component {
    state = {
        defaultAnimationDialog: false,
        showLoginModal: false,
        onLoginSuccess: null,
        token: this.props.token,
        isFullData: false,
        isShowClip: false,
        newsDetail: this.props.navigation.state.params.news,
        clipped: this.props.navigation.state.params.news.clipped,
        screenHeight: 0,
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.getToken();
        this.props.createLog({
            event: 'pageview',
            page: 'NEWS CUSHION',
            guid: this.state.newsDetail.guid
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.token !== nextProps.token) {
            this.setState({
                token: nextProps.token
            });
        }
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        this.setState({ screenHeight: contentHeight });
    };

    _handleCreateClip = (news, loggedIn = false) => {
        if (!loggedIn && !this.state.token) {
            this.setState({
                showLoginModal: true,
                onLoginSuccess: () => {
                    this.props.getToken();
                    this._handleCreateClip(news, true);
                }
            });
        } else {
            if (this.state.clipped === true) {
                this.setState({
                    clipped: false,
                });
                this.props.deleteClip(news.guid);
            }
            else {
                this.setState({
                    isShowClip: true,
                    clipped: true,
                });
                this.props.createClip({
                    title: news.title,
                    author: news.author,
                    thumbnail: news.thumbnail,
                    content_html: news.content,
                    copyright: news.copyright,
                    link: news.link,
                    guid: news.guid,
                    pub_date: news.release_date ? news.release_date : news.pub_date,
                    feed_title: news.feed_title,
                    feed_link: news.feed_link,
                    image: news.image,
                });
                setTimeout(() => {
                    this.setState({
                        isShowClip: false,
                    })
                }, CLIP_ANIMATE_DURATION);
            }
        }
    };

    showFullData = (loggedIn = false) => {
        if (!loggedIn && !this.state.token) {
            this.setState({
                showLoginModal: true,
                onLoginSuccess: () => {
                    this.props.getToken();
                    this.showFullData(true);
                }
            });
        } else {
            this.props.createLog({
                event: 'pageview',
                page: 'NEWS DETAIL',
                guid: this.state.newsDetail.guid
            });
            if (!this.state.newsDetail.isNor) {
                NavigationService.navigate('PublicNewsDetailFullData', { news: this.state.newsDetail, onSelectCategory: (category) => {
                    this.selectCategory(category);
                }});
            }
            else {
                NavigationService.navigate('PublicRSSDetailFullData', {news: this.state.newsDetail});
            }
        }
    };

    htmlContent = () => {
        if (!this.state.newsDetail.content) return `<div></div>`;
        let content = this.state.newsDetail.content;
        if (/(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/g.test(content))
            return content.replace(/<img .*?>/g, "").replace(/<p><\/p>/g, "");
        else
            return '<p>' + content + '</p>';
    };

    shareTwitter = () => {
        let url = "https://twitter.com/intent/tweet?text=" + this.state.newsDetail.link + "\n" + "shared by #my医局";
        Linking.openURL(url)
            .then(data => {
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }

    shareFacebook = () => {
        let url = "https://www.facebook.com/sharer/sharer.php?u=" + this.state.newsDetail.link;
        Linking.openURL(url)
            .then(data => {
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }

    shareLine = () => {
        let url = "https://timeline.line.me/social-plugin/share?url=" + this.state.newsDetail.link;
        Linking.openURL(url)
            .then(data => {
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }

    selectCategory(category) {
        this.props.navigation.goBack();
        this.props.navigation.state.params.onSelectCategory(category);
    }

    render() {
        const { goBack } = this.props.navigation;
        const scrollEnabled = this.state.screenHeight > height;
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <Left style={Style.flex1}>
                    <Button transparent onPress={() => {
                        goBack();
                    }}>
                        <Image source={require('@Asset/images/back.png')} style={Style.backIcon} />
                    </Button>
                </Left>
                <Right>
                    <Button transparent onPress={() => this._handleCreateClip(this.state.newsDetail)}>
                        {
                            (() => {
                                if (this.state.clipped === true)
                                    return <Image source={require('@Asset/images/clip.png')} style={Style.clipIcon} />;
                                else
                                    return <Image source={require('@Asset/images/unclip.png')} style={Style.clipIcon} />;
                            })()
                        }
                    </Button>
                    <Button transparent onPress={() => {
                        this.setState({
                            defaultAnimationDialog: true,
                        });
                    }}>
                        <Image source={require('@Asset/images/share.png')} style={Style.shareIcon} />
                    </Button>
                </Right>
            </Header>

            <View style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <PulseLoader loading={this.state.isShowClip} />

                <View>
                    <View>
                        {
                            this.state.newsDetail.image
                                ? <ImageBackground source={{ uri: this.state.newsDetail.image }} defaultSource={require("@Asset/images/noImage.jpg")} style={Style.topImage}></ImageBackground>
                                : <ImageBackground source={require('@Asset/images/noImage.jpg')} style={Style.topImage}></ImageBackground>
                        }
                    </View>
                    <View style={Styles.chipView}>
                        {
                            this.state.newsDetail.categories && this.state.newsDetail.categories.map((category) => {
                                return <View style={Styles.category}>
                                    <RNChipView
                                        title={`${category.name}`}
                                        titleStyle={Styles.categoryTitle}
                                        backgroundColor="#666666"
                                        height={25}
                                        avatar={false}
                                        onPress={() => {this.selectCategory(category)}}
                                    />
                                </View>
                            })
                        }
                    </View>
                    <View style={Style.articleView}>
                        <Text style={Style.articleTitle}>{this.state.newsDetail.title}</Text>
                    </View>
                    <View style={[Style.articleView, Style.articleSpaceBetween]}>
                        <View>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={Style.articleDate}>{this.state.newsDetail.release_date ? this.state.newsDetail.release_date.slice(0, 10).split('-').join('/') : this.state.newsDetail.pub_date.slice(0, 10).split('-').join('/')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={Style.articlePubName}>{this.state.newsDetail.isNor ? this.state.newsDetail.author : this.state.newsDetail.feed_title}</Text>
                        </View>
                    </View>
                    <View style={Style.articleView}>
                        <HTML html={this.htmlContent()} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={Style.htmlFontStyle} />
                    </View>
                </View>
                {this.props.isLoading ?
                    <ActivityIndicator
                        size="large"
                        style={Style.indicatorPosition}
                        animating={this.props.isLoading} /> : <Fragment />}
            </View>
            <LinearGradient colors={['rgba(255, 255, 255,0)', 'rgba(255, 255, 255,0.5)', 'rgba(255, 255, 255,0.9)', 'rgba(255, 255, 255, 1)']} style={Style.lastSpace}>
                <Button style={Style.lastButton} locations={[0, 0.5, 0.9]} onPress={() => this.showFullData()}>
                    <Text style={Style.buttonText}>続きを読む</Text>
                </Button>
            </LinearGradient>

            <Dialog
                onDismiss={() => {
                    this.setState({ defaultAnimationDialog: false });
                }}
                // width={0.9}
                visible={this.state.defaultAnimationDialog}
                rounded
                actionsBordered
                style={[Style.dialogStyles, { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }]}
            >
                <Dialog.ScrollArea>
                    <View style={Style.positionRight}>
                        <Button onPress={() => {
                            this.setState({ defaultAnimationDialog: false });
                        }}
                            style={Style.dialogCloseButton}
                        >
                            <Image source={require('@Asset/images/close.png')} style={Style.closeIcon} />
                        </Button>
                    </View>
                    <ScrollView onContentSizeChange={this.onContentSizeChange}>
                        <View style={Style.positionCenter}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ defaultAnimationDialog: false });
                                    this.shareTwitter();
                                }}
                                style={[Style.socialButton, Style.twitterButton]}
                            >
                                <Icon name="sc-twitter" type="EvilIcons" style={Style.twitterIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ defaultAnimationDialog: false });
                                    this.shareFacebook();
                                }}
                                style={[Style.socialButton, Style.facebookButton]}
                            >
                                <View style={Style.circleView}>
                                    <Icon name="sc-facebook" type="EvilIcons" style={Style.facebookIcon} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ defaultAnimationDialog: false });
                                    this.shareLine();
                                }}
                                style={[Style.socialButton, Style.lineButton]}
                            >
                                <ImageBackground source={require('@Asset/images/line.png')} style={[Style.iconImg, Style.lineImage]} imageStyle={Styles.crv} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Dialog.ScrollArea>
            </Dialog>
            <LoginModal show={this.state.showLoginModal} onSuccess={this.state.onLoginSuccess} closeModal={() => { this.setState({ showLoginModal: false }); }} />
        </Container >
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.news,
        ...state.auth,
    }
};

const mapDispatchToProps = (dispatch) => ({
    createClip: (data) => dispatch(createClip(data)),
    deleteClip: (data) => dispatch(deleteClip(data)),
    getNews: (data) => dispatch(getNews(data)),
    createRead: (data) => dispatch(createRead(data)),
    getToken: () => dispatch(getToken()),
    createLog: (data) => dispatch(createLog(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicNewsDetail);
