import React, { Fragment } from 'react'
import { StatusBar, Image, FlatList, TouchableHighlight, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Button, Icon, View, Text, Left, Right, Body } from 'native-base'

import NavigationService from '@Service/Navigation'

import PublicFooter from '@Screen/Public/Component/Footer'

import Style from '@Theme/Style'
import Loader from '@Component/Loader/Loader'

import { deleteClip, getClipArticles } from "../../../_actions/clip-action";
import { getClipArticlesSelector } from "../../../_reducers/clip-reducer";
import { connect } from "react-redux";
var { height, width } = Dimensions.get('window');
var dataViewHeight = height - 205;

class PublicClip extends React.Component {
    state = {
        articles: [],
    };
    constructor(props) {
        super(props);
        this.props.getClipArticles();
        this._handleShowDetail = this._handleShowDetail.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            articles: nextProps.clipArticles
        })
    }

    _handleShowDetail(article) {
        NavigationService.navigate('PublicClipDetail', {
            article: article
        });
    }

    _handleDeleteClip = (news) => {
        this.props.deleteClip(news.guid);
        this.setState({
            articles: this.state.articles.filter(function (article) {
                return article.guid !== news.guid
            })
        });
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
                    <Text style={Style.headerTitle}>myCLIP</Text>
                </Body>
                <Right style={{ flex: 0.3 }}>
                    <Button transparent>
                    </Button>
                </Right>
            </Header>
            </View>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                {
                    (this.state.articles && this.state.articles.length) ?
                        <FlatList
                            data={this.state.articles}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, separators }) => (
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
                                                </View>
                                                <Text numberOfLines={2} ellipsizeMode='tail' style={Style.listTitle}>{item.title}</Text>
                                                <View style={Style.listRightView}>
                                                    <Text numberOfLines={1} ellipsizeMode='tail' style={Style.listOrigin}>{item.isNor ? item.author : item.feed_title}</Text>
                                                    <View style={[Style.listIconRight, Style.listSource]}>
                                                        <TouchableOpacity onPress={() => { this._handleDeleteClip(item) }}>
                                                            <Image source={require('@Asset/images/clip.png')} style={Style.menuImageIcon} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.listDivider} />
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                        : !this.props.isLoading ? <View style={{ height: dataViewHeight, justifyContent: 'center', alignSelf: 'center', paddingLeft: 10, paddingRight: 10 }}><Text style={{ color: 'black' }}>
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

const mapStateToProps = (state) => getClipArticlesSelector;

const mapDispatchToProps = (dispatch) => ({
    getClipArticles: () => dispatch(getClipArticles()),
    deleteClip: (data) => dispatch(deleteClip(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicClip);
