import React from 'react'
import { Image, ImageBackground, SafeAreaView, TouchableWithoutFeedback, Keyboard, Animated, Dimensions } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Left, Right, Body } from 'native-base'
import { TextInput } from 'react-native-paper';
import { Dialog } from 'react-native-paper';
import Loader from '@Component/Loader/Loader'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/RSSRegister/Style'

import { createFeed, getFeedsUrls } from "../../../_actions/rss-action";
import { getCreateFeedSelector } from "../../../_reducers/rss-reducer";
import { connect } from "react-redux";

const SYSTEM_HEIGHT = Dimensions.get('window').height;

class PublicRSSRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultHelpDialog: false,
            helpDialogAnimation: new Animated.Value(0),
            defaultResultDialog: false,
            resultDialogAnimation: new Animated.Value(0),
            defaultFailureDialog: false,
            failureDialogAnimation: new Animated.Value(0),
            url: '',
            error: ''
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.state.defaultResultDialog !== nextProps.successCreate) {
            this.setState((prevState) => {
                Animated.spring(this.state.resultDialogAnimation, {
                    toValue: !nextProps.successCreate ? 0 : 1,
                }).start();

                return {
                    defaultResultDialog: nextProps.successCreate
                };
            });
        }

        if (this.state.defaultFailureDialog !== nextProps.errorCreate) {
            this.setState((prevState) => {
                Animated.spring(this.state.failureDialogAnimation, {
                    toValue: !nextProps.errorCreate ? 0 : 1,
                }).start();

                return {
                    defaultFailureDialog: nextProps.errorCreate
                };
            });
        }
    };

    onChangeURLText = (text) => {
        this.setState({ url: text, error: '' });
    };

    isURL = (str) => {
        var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)/g);
        return (res !== null)
    };

    _handleRegister = () => {
        Keyboard.dismiss();
        if (!this.isURL(this.state.url)) {
            this.setState({
                error: 'サイトのURLが正しくありません。'
            });
            return;
        }
        let url = !/^https?:\/\//i.test(this.state.url) ? `http://${this.state.url}` : this.state.url;
        this.props.getFeedsUrls(url);
    };

    toggleHelpDialog = () => {
        this.setState((prevState) => {
            Animated.spring(this.state.helpDialogAnimation, {
                toValue: prevState.defaultHelpDialog ? 0 : 1,
            }).start();

            return {
                defaultHelpDialog: !prevState.defaultHelpDialog
            };
        })
    };

    toggleResultDialog = () => {
        this.setState((prevState) => {
            Animated.spring(this.state.resultDialogAnimation, {
                toValue: prevState.defaultResultDialog ? 0 : 1,
            }).start();

            return {
                defaultResultDialog: !prevState.defaultResultDialog
            };
        })
    };

    toggleFailureDialog = () => {
        this.setState((prevState) => {
            Animated.spring(this.state.failureDialogAnimation, {
                toValue: prevState.defaultFailureDialog ? 0 : 1,
            }).start();

            return {
                defaultFailureDialog: !prevState.defaultFailureDialog
            };
        })
    };

    render() {
        const { goBack } = this.props.navigation;
        return <Container style={Style.bgMain}>
            <View style={Style.navigationWrapper}>
            <Header style={Style.navigation}>
                <Left style={{ flex: 0.3 }}>
                    <Button transparent onPress={() => {
                        goBack();
                    }}>
                        <Image source={require('@Asset/images/back.png')} style={Style.backIcon} />
                    </Button>
                </Left>
                <Body style={Style.positionCenter}>
                    <Text style={Style.headerTitle}>好きなサイトのRSSを登録</Text>
                </Body>
                <Right style={{ flex: 0.3 }}>
                    <Button transparent onPress={() => {
                        Keyboard.dismiss();
                        this.toggleHelpDialog();
                    }}>
                        <Icon name="question" type="EvilIcons" style={Style.menuIcon} />
                    </Button>
                </Right>
            </Header>
            </View>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <Loader loading={this.props.isLoading} />
                <View style={Style.positionCenter}>
                    <Image style={{ width: 100, height: 100, marginTop: 20, marginBottom: 30 }} source={require('@Asset/images/rss_large_symbol_enable.png')} />
                    <View style={Styles.viewStyle}>
                        <Text style={Styles.textContent}>登録したいRSS機能を持ったサイトのURLを入力してください。</Text>
                        <Text style={[Styles.textContent, { marginTop : 20, marginBottom: 0, fontFamily: 'NotoSansCJKjp-Bold' }]}>登録URL</Text>
                        <TextInput
                            ref="url"
                            label="URLを入力"
                            mode="flat"
                            placeholder=''
                            style={Styles.dialogTextInput}
                            underlineColor="transparent"
                            onChangeText={(text) => this.onChangeURLText(text)}
                            theme={{ colors: { primary: "#b71547" }, roundness: 0 }}
                        />
                        <Text style={Styles.comment}>{this.state.error ? this.state.error : ''}</Text>
                    </View>
                    <Button onPress={() => { this._handleRegister() }}
                        style={Style.button}>
                        <Text style={Style.buttonText}>登 録</Text>
                    </Button>
                </View>
            </Content>

            {/* show help dialog */}
            <Animated.View
                width={0.9}
                rounded
                actionsBordered
                style={[Style.dialogStyles, {
                    top: this.state.helpDialogAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [SYSTEM_HEIGHT, 0]
                    }),
                    opacity: this.state.helpDialogAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    }),
                }]}
            >
                <View transparent style={Styles.boxWithShadow}>
                    <View style={Styles.positionCenter}>
                        <Image style={{ width: 100, height: 100, marginBottom: 30 }} source={require('@Asset/images/rss_large_symbol_enable.png')} />
                    </View>
                    <Text style={[Styles.title_custom, {marginBottom: 20}]}>お好きなサイトを{"\n"}登録できます</Text>
                    <Text style={Styles.textContent}>よく見るニュースサイトやキュレーションサイト、学会サイトのニュースなど更新情報を手軽に把握したい場合ここからRSS登録することでいつでも簡単にニュースを閲覧することが可能になります。</Text>
                    <Text style={[Styles.textContent, Styles.dialogTextBackgroundStyle]}> 二ュ一スやブ口グ機能を持ち、RSS 対応している必要あります。</Text>

                    <View style={Styles.dialogCloseButtonViewPositionRight}>
                        <Button transparent onPress={this.toggleHelpDialog}
                            style={Styles.dialogCloseButton}
                        >
                            <Image source={require('@Asset/images/close.png')} style={Style.closeIcon} />
                        </Button>
                    </View>
                </View>
            </Animated.View>

            {/* show success dialog */}
            <Animated.View
                width={0.9}
                rounded
                actionsBordered
                style={[Style.dialogStyles, {
                    top: this.state.resultDialogAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [SYSTEM_HEIGHT, 0]
                    }),
                    opacity: this.state.resultDialogAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    }),
                }]}
            >
                <View transparent style={Styles.boxWithShadow}>
                    <Text style={[Styles.title_custom, {marginTop: 15}]}>サイトが{"\n"}登録できました</Text>
                    <View style={Styles.positionCenter}>
                        <Image source={require('@Asset/images/success.png')} style={{width: 180, height: 180, marginTop: 25, marginBottom: 0}} />
                    </View>
                    <Button onPress={() => {
                        this.props.navigation.navigate('PublicMain');
                        this.props.navigation.state.params.onRSSRegisterSuccess(this.props.feedinfo);
                    }}
                        style={[Style.button, Styles.dialogSuccessButtonStyle]}>
                        <Text style={Style.buttonText} ellipsizeMode='tail' numberOfLines={1}>登録したRSSをチェック</Text>
                    </Button>

                    <View style={Styles.dialogCloseButtonViewPositionRight}>
                        <Button transparent onPress={this.toggleResultDialog}
                            style={Styles.dialogCloseButton}
                        >
                            <Image source={require('@Asset/images/close.png')} style={Style.closeIcon} />
                        </Button>
                    </View>
                </View>
            </Animated.View>

            {/* show failure dialog */}
            <Animated.View
                width={0.9}
                rounded
                actionsBordered
                style={[Style.dialogStyles, {
                    top: this.state.failureDialogAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [SYSTEM_HEIGHT, 0]
                    }),
                    opacity: this.state.failureDialogAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    }),
                }]}
            >
            <View transparent style={Styles.boxWithShadow}>
                    <Text style={[Styles.title_custom, {marginTop: 5}]}>サイト登録に{"\n"}失敗しました</Text>
                    <View style={Styles.positionCenter}>
                        <Image source={require('@Asset/images/failure.png')} style={Styles.dialogImageStyle} />
                    </View>
                    <Button onPress={this.toggleFailureDialog}
                        style={[Style.button, Styles.dialogFailureButtonStyle]}>
                        <Text style={[Style.buttonText, { fontSize: 16 }]}>登録ページに戻る</Text>
                        <Image style={{ width: 24, height: 24, position: 'absolute', top: '50%', marginTop: -8, right: 16 }} source={require('@Asset/images/return_symbol.png')} />
                    </Button>
                    <Text style={[Styles.textContent, { marginTop: 20 }]}>登録したいサイトがRSSに対応していない可能性がございます。詳しくはQ&Aページに「サイトがRSSリーダーに登録できない」をご参照ください。</Text>

                    <View style={Styles.dialogCloseButtonViewPositionRight}>
                        <Button transparent onPress={this.toggleFailureDialog}
                            style={Styles.dialogCloseButton}
                        >
                            <Image source={require('@Asset/images/close.png')} style={Style.closeIcon} />
                        </Button>
                    </View>
                </View>
            </Animated.View>
        </Container>
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.feeds_urls,
    }
};

const mapDispatchToProps = (dispatch) => ({
    createFeed: (data) => dispatch(createFeed(data)),
    getFeedsUrls: (data) => dispatch(getFeedsUrls(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicRSSRegister);
