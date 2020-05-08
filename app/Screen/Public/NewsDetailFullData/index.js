import React, { Fragment } from 'react'
import { TouchableOpacity, ImageBackground, Dimensions, AsyncStorage, ScrollView, Linking, TouchableHighlight, Image, FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Left, Right, Body } from 'native-base'
import { Dialog } from 'react-native-paper';

import NavigationService from '@Service/Navigation'
import { RNChipView } from 'react-native-chip-view'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/NewsDetail/Style'
import FullDataStyles from '@Screen/Public/NewsDetailFullData/Style'

import {getNews, getNewsRelated} from "../../../_actions/news-action";
import { createClip, deleteClip } from "../../../_actions/clip-action";
import { connect } from "react-redux";
import Loader from '@Component/Loader/Loader'
import HTML from 'react-native-render-html';
import PulseLoader from "../../../Component/PulseLoader/PulseLoader";
import LinearGradient from 'react-native-linear-gradient';
import {CLIP_ANIMATE_DURATION} from "../../../_constants";

var { height, width } = Dimensions.get('window');

class PublicNewsDetail extends React.Component {
    state = {
        defaultAnimationDialog: false,
        token: '',
        isFullData: false,
        isShowClip: false,
        newsDetail: this.props.navigation.state.params.news,
        clipped: this.props.navigation.state.params.news.clipped,
        articles: []
    };

    constructor(props) {
        super(props);
        if (this.state.newsDetail.categories.length === 0) return;
        let category = this.state.newsDetail.categories[0].id;
        for (let i = 1; i < this.state.newsDetail.categories.length; i++)
            category += ',' + this.state.newsDetail.categories[i].id;
        this.props.getNewsRelated({
            limit: 10,
            offset: 0,
            category_id: category,
        });
        AsyncStorage.getItem('token')
            .then((value) => this.setState({ token: value ? value : '', isFullData: false }));
    };

    componentWillReceiveProps(nextProps, nextContext) {
        let articles = nextProps.newsRelated;
        let filtered = articles.filter(e => e.guid !== this.state.newsDetail.guid);
        this.setState({
            articles: filtered,
        })
    }

    _handleCreateClip = (news) => {
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
                pub_date: news.release_date,
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
    };


    _handleCreateClipRelated = (news) => {
        if (this.state.clipped === true) {
            this.setState({
                clipped: false,
            });
            this.props.deleteClip(news.guid);
        }
        else {
            this.setState({
                isShowClip: true,
            });
            if (this.state.newsDetail.guid == news.guid) {
                this.setState({
                    clipped: true
                });
            }

            this.setState((prevState) => {
                let articles = prevState.articles.map((item) => {
                    if (item.guid == news.guid) {
                        item.clipped = true;
                    }
                    return item;
                });
                return {
                    articles,
                };
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
                })
            }, 2000);
        }
    };

    _handleDeleteClipRelated = (news) => {
        this.props.deleteClip(news.guid);
        if (this.state.newsDetail.guid == news.guid) {
            this.setState({
                clipped: false
            });
        }
        this.setState((prevState) => {
            let articles = prevState.articles.map((item) => {
                if (item.guid == news.guid) {
                    item.clipped = false;
                }
                return item;
            });
            return {
                articles,
            };
        });
    };

    htmlContent = () => {
        let content = this.state.newsDetail.content;
        if (content) {
            let content = this.state.newsDetail.content;
            if (/(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/g.test(content))
                return content.replace(/<img .*?>/g, "").replace(/<p><\/p>/g, "");
            else
                return '<p>' + content + '</p>';
        }
        else {
            return '<div></div>';
        }
    };


    showNewsDetail = (news) => {
        if (!news.isNor) {
            this.setState({
                newsDetail: news
            });
            if (news.categories === 0) return;
            let category = news.categories[0].id;
            for (let i = 1; i < news.categories.length; i++)
                category += ',' + news.categories[i].id;
            this.props.getNewsRelated({
                limit: 10,
                offset: 0,
                category_id: category,
            });
            setTimeout(() => {
                this.scrollToTop();
            }, 1);
        }
        else {
            NavigationService.navigate('PublicRSSDetailFullData', { news: news });
        }
    };

    scrollToTop = () => {
        this.scroll.scrollTo({x: 0, y:0, animated: false});
    }

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

    render() {
        const { goBack } = this.props.navigation;
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

            <ScrollView ref={(c) => {this.scroll = c}}>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <PulseLoader loading={this.state.isShowClip} />
                <View>
                    <View>
                        {
                            this.state.newsDetail.image
                                ? <ImageBackground source={{ uri: this.state.newsDetail.image }} style={Style.topImage}></ImageBackground>
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
                                        onPress={() => {
                                            this.props.navigation.goBack();
                                            this.props.navigation.state.params.onSelectCategory(category);
                                        }}
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
                            <Text numberOfLines={1} ellipsizeMode='tail' style={Style.articleDate}>{this.state.newsDetail.release_date.slice(0, 10).split('-').join('/')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={Style.articlePubName}>{this.state.newsDetail.isNor ? this.state.newsDetail.author : this.state.newsDetail.feed_title}</Text>
                        </View>
                    </View>
                    <View style={Style.articleView}>
                        <HTML html={this.htmlContent()} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={Style.htmlFontStyle} />
                    </View>
                    {
                        this.state.articles.length >= 1
                        ? <View>
                            <View style={{flexDirection: 'row', marginTop: 55}}>
                                <Image style={{width: 103, height: 20, marginLeft: 20}}
                                       source={require('@Asset/images/news_small_landscape_symbol.png')}/>
                            </View>
                            <View style={[FullDataStyles.listTopDivider, {marginBottom: 20, marginTop: 5}]}></View>
                            <Loader loading={this.props.isLoading}/>
                            {
                                this.state.token
                                    ? <FlatList
                                        ref='newslist'
                                        data={this.state.articles}
                                        showsHorizontalScrollIndicator={false}
                                        numColumns={2}
                                        renderItem={({item, index}) => (
                                            <TouchableHighlight underlayColor='transparent'
                                                                onPress={() => this.showNewsDetail(item)}>
                                                <View>
                                                    <View>
                                                        <View style={{
                                                            width: (width - 60) / 2,
                                                            marginLeft: 15,
                                                            marginRight: 15,
                                                            justifyContent: 'center',
                                                            position: 'relative'
                                                        }}>
                                                            <Image source={item.image ? {uri: item.image} : require('@Asset/images/noImage.jpg')}
                                                                   style={{
                                                                       width: (width - 60) / 2,
                                                                       height: (width - 60) / 2 * 0.8
                                                                   }}/>
                                                            <Text numberOfLines={1} ellipsizeMode='tail'
                                                                  style={[Style.listDate, {marginTop: 10}]}>{item.release_date.slice(0, 10).split('-').join('/')}</Text>
                                                            <Text numberOfLines={3} style={[Style.listTitle, {height: 70}]}>{item.title}</Text>
                                                            <Text numberOfLines={2} ellipsizeMode='tail'
                                                                  style={[Style.listOrigin, {width: (width - 60) / 2}]}>{item.isNor ? item.author : item.feed_title}</Text>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-end',
                                                                marginTop: 10
                                                            }}>
                                                                <TouchableOpacity
                                                                    onPress={() => {item.clipped === true ? this._handleDeleteClipRelated(item) : this._handleCreateClipRelated(item)}}>
                                                                    <Image
                                                                        source={item.clipped === true ? require('@Asset/images/clip.png') : require('@Asset/images/unclip.png')}
                                                                        style={Style.menuImageIcon}/>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={[FullDataStyles.listDivider, {
                                                                width: '110%',
                                                                marginTop: 15,
                                                                marginBottom: 15,
                                                                marginRight: index % 2 == 0 ? -5 : 0,
                                                                marginLeft: index % 2 == 0 ? 0 : -15
                                                            }]} />
                                                            <View style={index % 2 == 0 ? FullDataStyles.listVerticalDivider : null}/>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableHighlight>
                                        )}
                                    />
                                    : <Fragment></Fragment>
                            }
                        </View> : <Fragment />
                    }
                </View>
            </Content>
            </ScrollView>

            <Dialog
                onDismiss={() => {
                    this.setState({ defaultAnimationDialog: false });
                }}
                width={0.9}
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
                    <ScrollView>
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
        </Container >
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.news,
    }
};

const mapDispatchToProps = (dispatch) => ({
    createClip: (data) => dispatch(createClip(data)),
    deleteClip: (data) => dispatch(deleteClip(data)),
    getNews: (data) => dispatch(getNews(data)),
    getNewsRelated: (data) => dispatch(getNewsRelated(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicNewsDetail);
