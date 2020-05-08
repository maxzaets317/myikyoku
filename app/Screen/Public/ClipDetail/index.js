import React from 'react'
import { Image, TouchableOpacity, ImageBackground, Dimensions, ScrollView, Linking, Clipboard } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Left, Right } from 'native-base'
import { Dialog } from 'react-native-paper';
import Toast, {DURATION} from 'react-native-easy-toast'

import NavigationService from '@Service/Navigation'

import Style from '@Theme/Style'
import HTML from "react-native-render-html";
import LinearGradient from "react-native-linear-gradient";
import {createClip, deleteClip} from "../../../_actions/clip-action";
import {connect} from "react-redux";
import {createRead} from "../../../_actions/status-action";
import PulseLoader from "../../../Component/PulseLoader/PulseLoader";
import {createLog} from "../../../_actions/analytics-action";
import {CLIP_ANIMATE_DURATION} from "../../../_constants";

class PublicClipDetail extends React.Component {
    state = {
        defaultAnimationDialog: false,
        isShowClip: false,
        article: this.props.navigation.state.params.article,
        clipped: true,
        clipboardContent: null,
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.createLog({
            event: 'pageview',
            page: 'CLIP CUSHION',
            guid: this.state.article.guid
        });
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
                pub_date: news.pub_date,
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

    htmlContent() {
        let content = this.state.article.content;
        if (content) {
            if (/(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/g.test(content))
                return content.replace(/<img .*?>/g, "").replace(/<p><\/p>/g, "");
            else
                return '<p>' + content + '</p>';
        }
        else {
            return '<div></div>';
        }
    }

    shareTwitter = () => {
        let url = "https://twitter.com/intent/tweet?text=" + this.state.article.link + "\n" + "shared by #my医局";
        Linking.openURL(url)
            .then(data => {
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }

    shareFacebook = () => {
        let url = "https://www.facebook.com/sharer/sharer.php?u=" + this.state.article.link;
        Linking.openURL(url)
            .then(data => {
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }

    shareLine = () => {
        let url = "https://timeline.line.me/social-plugin/share?url=" + this.state.article.link;
        Linking.openURL(url)
            .then(data => {
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }

    showFullData = () => {
        let news = this.state.article;
        news.clipped = this.state.clipped;
        news.categories = [];
        this.props.createRead({
            guid: this.state.article.guid
        });
        this.props.createLog({
            event: 'pageview',
            page: 'CLIP DETAIL',
            guid: this.state.article.guid
        });
        if (!this.state.article.isNor)
            NavigationService.navigate('PublicClipDetailFullData', { news: news });
        else
            NavigationService.navigate('PublicRSSDetailFullData', { news: news });
    }

    render() {
        const { goBack } = this.props.navigation;
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <Left style={Style.flex1}>
                    <Button transparent onPress={() => goBack()}>
                        <Image source={require('@Asset/images/back.png')} style={Style.backIcon} />
                    </Button>
                </Left>
                <Right>
                    <Button transparent onPress={() => this._handleCreateClip(this.state.article)}>
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

            <View style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <PulseLoader loading={this.state.isShowClip} />
                <View>
                    <View>
                        {
                            this.state.article.image
                                ? <ImageBackground source={{ uri: this.state.article.image }} defaultSource={require("@Asset/images/noImage.jpg")} style={Style.topImage}></ImageBackground>
                                : <ImageBackground source={require('@Asset/images/noImage.jpg')} style={Style.topImage}></ImageBackground>
                        }
                    </View>
                    <View style={Style.articleView}>
                        <Text style={Style.articleTitle}>{this.state.article.title}</Text>
                    </View>
                    <View style={[Style.articleView, Style.articleSpaceBetween]}>
                        <View>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={Style.articleDate}>{this.state.article.pub_date && this.state.article.pub_date.slice(0, 10).split('-').join('/')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={Style.articlePubName}>{this.state.article.isNor ? this.state.article.author : this.state.article.feed_title}</Text>
                        </View>
                    </View>
                    <View style={Style.articleView}>
                        <HTML html={this.htmlContent()} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={Style.htmlFontStyle} />
                    </View>
                </View>
            </View>
            <LinearGradient colors={['rgba(255, 255, 255,0)', 'rgba(255, 255, 255,0.5)', 'rgba(255, 255, 255,0.9)', 'rgba(255, 255, 255, 1)']} style={Style.lastSpace}>
                <Button style={Style.lastButton} locations={[0,0.5,0.9]} onPress={() => { this.showFullData() }}>
                    <Text style={Style.buttonText}> サイトを見る </Text>
                </Button>
            </LinearGradient>

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
                                {/* <FontAwesomeIcon name="line" type="FontAwesome5" style={Style.lineIcon} /> */}
                                <ImageBackground source={require('@Asset/images/line.png')} style={[Style.iconImg, Style.lineImage]} imageStyle={Style.crv} />
                            </TouchableOpacity>
                            <View style={Style.viewDialogButton}>
                                <Button style={Style.dialogButton} onPress={() => Linking.openURL(this.state.article.link)}>
                                    <Text style={Style.buttonText}>ブラウザで開く</Text>
                                </Button>
                            </View>
                            <View style={Style.multiComLine}>
                                <View>
                                    <Text style={Style.linkText} onPress={async () => {
                                        await Clipboard.setString(this.state.article.link);
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
    createRead: (news) => dispatch(createRead(news)),
    createLog: (data) => dispatch(createLog(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicClipDetail);
