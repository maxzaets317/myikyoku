import React, { Fragment } from 'react'
import { TouchableOpacity, ImageBackground, Dimensions, AsyncStorage, ScrollView, Linking, TouchableHighlight, Image, FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Left, Right, Body } from 'native-base'
import { Dialog } from 'react-native-paper';
import Toast, {DURATION} from 'react-native-easy-toast'

import NavigationService from '@Service/Navigation'
import { RNChipView } from 'react-native-chip-view'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/NewsDetail/Style'
import FullDataStyles from '@Screen/Public/NewsDetailFullData/Style'

import { getNews } from "../../../_actions/news-action";
import {createClip, deleteClip} from "../../../_actions/clip-action";
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
    };

    constructor(props) {
        super(props);
        AsyncStorage.getItem('token')
            .then((value) => this.setState({ token: value ? value : '', isFullData: false }));
    };

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

    htmlContent = () => {
        let content = this.state.newsDetail.content;
        if (content) {
            if (/(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/g.test(content))
                return content.replace(/<img .*?>/g, "").replace(/<p><\/p>/g, "");
            else
                return '<p>' + content + '</p>';
        }
        else {
            return '<div></div>';
        }
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
                                    return <Image source={require('@Asset/images/clip.png')} style={Style.clipIcon}/>;
                                else
                                    return <Image source={require('@Asset/images/unclip.png')} style={Style.clipIcon}/>;
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

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <Loader loading={this.props.isLoading} />
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
                            !!this.state.newsDetail.categories && this.state.newsDetail.categories.map((category) => {
                                return <View style={Styles.overlayChip}>
                                    <View style={Styles.roundView}>
                                        <Text style={Style.textWhite}>{'#' + category.name}</Text>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                    <View style={Style.articleView}>
                        <Text style={Style.articleTitle}>{this.state.newsDetail.title}</Text>
                    </View>
                    <View style={[Style.articleView, Style.articleSpaceBetween]}>
                        <View>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={Style.articleDate}>{this.state.newsDetail.pub_date.slice(0, 10).split('-').join('/')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={Style.articlePubName}>{this.state.newsDetail.isNor ? this.state.newsDetail.author : this.state.newsDetail.feed_title}</Text>
                        </View>
                    </View>
                    <View style={Style.articleView}>
                        <HTML html={this.htmlContent()} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={Style.htmlFontStyle} />
                    </View>
                </View>
            </Content>

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
                            <View style={Style.viewDialogButton}>
                                <Button style={Style.dialogButton} onPress={() => Linking.openURL(this.state.newsDetail.link)}>
                                    <Text style={Style.buttonText}>ブラウザで開く</Text>
                                </Button>
                            </View>
                            <View style={Style.multiComLine}>
                                <View>
                                    <Text style={Style.linkText} onPress={async () => {
                                        await Clipboard.setString(this.state.newsDetail.link);
                                        this.refs.toast.show('記事のURLをコピー!');
                                    }}>
                                        記事のURLをコピー
                                </Text>
                                    <View style={Style.dividerText}></View>
                                </View>
                            </View>
                            <View style={Style.lastLinkText}></View>
                        </View>
                    </ScrollView>
                </Dialog.ScrollArea>
            </Dialog>
            <Toast
                ref="toast"
                style={{backgroundColor:'black'}}
                position='center'
                positionValue={0}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.9}
                textStyle={{color:'white'}}
            />
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicNewsDetail);
