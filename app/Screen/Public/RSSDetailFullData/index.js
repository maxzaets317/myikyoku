import React from 'react'
import { Image, Platform, TouchableOpacity, ImageBackground, WebView, ActivityIndicator, ScrollView, Linking, Clipboard } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Left, Body, Right } from 'native-base'
import { Dialog } from 'react-native-paper';
import Toast, {DURATION} from 'react-native-easy-toast';
import MyWebView from '@Screen/Public/Component/MyWebView'

import Style from '@Theme/Style'
import { createClip, deleteClip } from "../../../_actions/clip-action";
import { connect } from "react-redux";
import PulseLoader from "../../../Component/PulseLoader/PulseLoader";
import {CLIP_ANIMATE_DURATION} from "../../../_constants";

class PublicRSSDetailFulldata extends React.Component {

    state = {
        defaultAnimationDialog: false,
        isLoadingWebView: false,
        isShowClip: false,
        clipboardContent: null,
        news: this.props.navigation.state.params.news,
        clipped: this.props.navigation.state.params.news.clipped,
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

    shareTwitter = () => {
        let url = "https://twitter.com/intent/tweet?text=" + this.state.news.link + "\n" + "shared by #my医局";
        Linking.openURL(url)
            .then(data => {
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }

    shareFacebook = () => {
        let url = "https://www.facebook.com/sharer/sharer.php?u=" + this.state.news.link;
        Linking.openURL(url)
            .then(data => {
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }

    shareLine = () => {
        let url = "https://timeline.line.me/social-plugin/share?url=" + this.state.news.link;
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
                <Left style={{ flex: 0.3 }}>
                    <Button transparent onPress={() => {
                        goBack();
                    }}>
                        <Image source={require('@Asset/images/back.png')} style={Style.backIcon} />
                    </Button>
                </Left>
                <Body style={Style.headerLink}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View>
                            <Text style={Style.headerLinkText}>{this.state.news.isNor ? this.state.news.guid : this.state.news.link}</Text>
                        </View>
                    </ScrollView>
                </Body>
                <Right style={{ flex: 0.3 }}>
                    <Button transparent onPress={() => this._handleCreateClip(this.state.news)}>
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

            <PulseLoader loading={this.state.isShowClip} />
            <MyWebView onLoad={() => this.setState({ isLoadingWebView: false })} automaticallyAdjustContentInsets={true} source={{ uri: this.state.news.isNor ? this.state.news.guid : this.state.news.link }} />
            {
                this.state.isLoadingWebView && (
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size='large' />
                    </View>
                )
            }

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
                                <ImageBackground source={require('@Asset/images/line.png')} style={[Style.iconImg, Style.lineImage]} imageStyle={Style.crv} />
                            </TouchableOpacity>
                            <View style={Style.viewDialogButton}>
                                <Button style={Style.dialogButton} onPress={() => Linking.openURL(this.state.news.link)}>
                                    <Text style={Style.buttonText}>ブラウザで開く</Text>
                                </Button>
                            </View>
                            <View style={Style.multiComLine}>
                                <View>
                                    <Text style={Style.linkText} onPress={async () => {
                                        await Clipboard.setString(this.state.news.link);
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicRSSDetailFulldata);
