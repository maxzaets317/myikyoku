import React, { Fragment } from 'react'
import { FlatList, Image, Dimensions, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Title, Left, Right, Body, List, ListItem } from 'native-base'

import NavigationService from '@Service/Navigation'

import PublicFooter from '@Screen/Public/Component/Footer'
import Loader from '@Component/Loader/Loader'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/Menu/Style'

import { connect } from "react-redux";
import { getQA } from "../../../_actions/qa-action";
import { getQASelector } from "../../../_reducers/qa-reducer";
import HTML from 'react-native-render-html';

var { height } = Dimensions.get('window');
var dataViewHeight = height - 205;

class PublicQA extends React.Component {
    constructor(props) {
        super(props);
        this.props.getQA({
            limit: 20,
            offset: 0,
        });

        this._handleLoadMore = this._handleLoadMore.bind(this);
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;
    };

    _handleLoadMore({ nativeEvent }) {
        if (this.isCloseToBottom(nativeEvent) && this.props.QA.length % 20 === 0 && this.props.QA.length !== 0) {
            this.props.getQA({
                limit: 20,
                offset: this.props.QA.length,
            });
        }
    }

    renderHtml = (content) => {
        if (/(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/g.test(content)) {
            return content;
        }
        else {
            return '<p>'+content+'</p>';
        }
    };

    render() {
        const regex = /(<([^>]+)>)/ig;
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
                <Body style={Style.positionCenter}>
                    <Text style={Style.headerTitle}>Q&A</Text>
                </Body>
                <Right style={{ flex: 0.3 }}>
                    <Button transparent>
                    </Button>
                </Right>
            </Header>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                {/* {
                    (JSON.stringify(this.props.questions) != '[]')
                        ? <List style={Styles.list}>
                            <ListItem>
                                <FlatList
                                    data={this.props.questions}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, separators }) => (
                                        <Body style={Styles.body}>
                                            <Text style={Styles.title}>{item.question}</Text>
                                            <View style={Styles.textContent, {paddingLeft: 12, paddingRight: 12}}>
                                                <HTML html={item.answer} baseFontStyle={Style.htmlFontStyle} />
                                            </View>
                                        </Body>
                                    )}
                                />
                            </ListItem>
                        </List>
                        : <View style={{ height: height }}></View>
                } */}
                {
                    (JSON.stringify(this.props.questions) != '[]')
                        ? <List style={Styles.list}>
                            <FlatList
                                data={this.props.questions}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, separators }) => (
                                    <View style={Styles.infoBox}>
                                        <View style={Styles.QAList}>
                                            <View style={Styles.ques}>
                                                <Text style={Styles.q}>Q</Text>
                                                <Text style={Styles.qText}>{item.question}</Text>
                                            </View>
                                            <View style={Styles.ans}>
                                                <HTML html={this.renderHtml(item.answer)} baseFontStyle={Styles.htmlFontStyle} containerStyle={Styles.aText}/>
                                                <Text style={Styles.a}>A</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                        </List>
                        :  !this.props.isLoading ? <View style={{ height: dataViewHeight, justifyContent: 'center', alignSelf: 'center', paddingLeft: 10, paddingRight: 10 }}><Text style={{ color: 'black' }}>
                        データがありません。</Text></View> : <Fragment></Fragment>
                }
                {this.props.isLoading ?
                    <ActivityIndicator
                        size="large"
                        style={Style.indicatorPosition}
                        animating={this.props.isLoading} /> : <Fragment />}
            </Content>
        </Container>
    }
}

const mapStateToProps = (state: Object) => getQASelector;

const mapDispatchToProps = (dispatch: Function) => ({
    getQA: (data) => dispatch(getQA(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicQA);

