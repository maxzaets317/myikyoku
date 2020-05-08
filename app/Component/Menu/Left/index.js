import React, {Component, Fragment} from "react";
import { AsyncStorage, Image, Linking } from "react-native";
import { Content, Text, List, ListItem, Icon, Container, View, Left, Right, Badge } from "native-base";
import Styles from "./Style";
import NavigationService from './../../../Service/Navigation'
import VersionNumber from 'react-native-version-number';

import { connect } from "react-redux";
import { getSetting } from "../../../_actions/setting-action";
import { SafeAreaView } from 'react-native';
import AppInfo from '../../../../app';
import {getToken, logout} from "../../../_actions/auth-action";
import {createLog} from "../../../_actions/analytics-action";

const data = [
  {
    name: "ユーザー情報編集",   // news
    route: "PublicUserEdit",
    icon: "user",
    type: "FontAwesome",
    url: require('@Asset/images/user_info.png'),
    width: 24,
    height: 24,
  },
  {
    name: "イベント用QRコード",
    route: "PublicQRCode",
    icon: "qrcode",
    type: "AntDesign",
    url: require('@Asset/images/qr_code.png'),
    width: 24,
    height: 24,
  },
  {
    name: "サービス紹介",
    route: "PublicServiceIntro",
    icon: "flag",
    type: "FontAwesome",
    url: require('@Asset/images/intro_service.png'),
    width: 24,
    height: 24,
  },
  {
    name: "Q&A",
    route: "PublicQA",
    icon: "question",
    type: "AntDesign",
    url: require('@Asset/images/qa_symbol.png'),
    width: 24,
    height: 24,
  },
  {
    name: "お問い合わせ",
    route: "PublicContact",
    icon: "paper-plane",
    type: "FontAwesome",
    url: require('@Asset/images/inquiry.png'),
    width: 24,
    height: 24,
  },
  {
    name: "利用規約",
    route: "PublicTermServ",
    icon: "book",
    type: "FontAwesome",
    url: require('@Asset/images/terms_of_use.png'),
    width: 24,
    height: 24,
  },
  {
    name: "プライバシーポリシー",
    route: "PublicPrivacyPolicy",
    icon: "key",
    type: "SimpleLineIcons",
    url: require('@Asset/images/privacy.png'),
    width: 24,
    height: 24,
  },
  {
    name: "運営会社",
    route: "PublicOperComp",
    icon: "building-o",
    type: "FontAwesome",
    url: require('@Asset/images/management_company.png'),
    width: 24,
    height: 24,
  },
  {
    name: "ログアウト",
    route: "PublicLogout",
    icon: "sign-out",
    type: "FontAwesome",
    url: require('@Asset/images/management_company.png'),
    width: 24,
    height: 24,
  },
];

class MenuLeft extends React.Component {
  updateUserInfoURL = 'https://www.doctor-agent.com/mypage/profile-setting/member-update';
  state = {
    shadowOffsetWidth: 1,
    shadowRadius: 4,
    name: '',
    isQRButton: false,
    token: '',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getToken();
  }

  componentWillReceiveProps = async (nextProps, nextContext) => {
    let end_date = new Date(nextProps.setting.event_end_date);
    let start_date = new Date(nextProps.setting.event_start_date);
    let current = new Date();
    if (current.getTime() > start_date.getTime() && current.getTime() < end_date.getTime()) {
      this.setState({
        isQRButton: true,
      });
    }
    else {
      this.setState({
        isQRButton: false,
      });
    }

    if (nextProps.token) {
      if (nextProps.token !== this.state.token) {
        this.props.getSetting();
      }
      let value = await AsyncStorage.getItem('name');
      this.setState({
        name: value + ' 様',
        token: nextProps.token,
      });
    }
    else {
      this.setState({
        name: '',
        token: '',
        isQRButton: false,
      })
    }
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, top: -1 }}
          render
        >

          <SafeAreaView />

          <View style={Styles.drawerCover}>
            <Text style={Styles.drawerText}>{this.state.name}</Text>
          </View>

          <List
            style={{ backgroundColor: '#FFF' }}
            dataArray={data}
            renderRow={data => {
              if (data.route == 'PublicUserEdit') {
                if (this.state.token) {
                  return <View>
                    <ListItem
                      button
                      noBorder
                      onPress={() => {
                        NavigationService.navigate('PublicUserInfo')
                        this.props.createLog({
                          event: 'pageview',
                          page: 'USER INFO EDIT',
                        });
                      }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <View style={Styles.viewStyle}>
                          <Image style={Styles.imageStyle} source={data.url} />
                        </View>
                        <View style={Styles.viewStyle}>
                          <Text style={Styles.text}>
                            {data.name}
                          </Text>
                        </View>
                      </View>
                      {
                        data.types &&
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                          <Badge>
                            <Text
                              style={Styles.badgeText}
                            >{`${data.types}`}</Text>
                          </Badge>
                        </View>
                      }
                    </ListItem>
                    <View style={Styles.divider}></View>
                  </View>
                }
                else {
                  return <View>
                    <ListItem
                      button
                      noBorder
                      onPress={() => {
                        this.props.navigation.closeDrawer();
                        NavigationService.navigate('PublicMain', {showLogin: true})
                      }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <View style={Styles.viewStyle}>
                          <Image style={Styles.imageStyle} source={data.url} />
                        </View>
                        <View style={Styles.viewStyle}>
                          <Text style={Styles.text}>
                            ログイン
                      </Text>
                        </View>
                        {
                          data.types &&
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Badge>
                              <Text
                                style={Styles.badgeText}
                              >{`${data.types}`}</Text>
                            </Badge>
                          </View>
                        }
                      </View>
                    </ListItem>
                    <View style={Styles.divider}></View>
                  </View>
                }
              }
              else if (data.route == 'PublicQRCode') {
                if (this.state.isQRButton == true) {
                  return <View>
                    <ListItem
                      button
                      noBorder
                      onPress={() => {
                        NavigationService.navigate(data.route);
                        this.props.createLog({
                          event: 'pageview',
                          page: 'QR CODE',
                        });
                      }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <View style={Styles.viewStyle}>
                          <Image style={Styles.imageStyle} source={data.url} />
                        </View>
                        <View style={Styles.viewStyle}>
                          <Text style={Styles.text}>
                            {data.name}
                          </Text>
                        </View>
                      </View>
                      {
                        data.types &&
                        <Right style={{ flex: 1 }}>
                          <Badge>
                            <Text
                              style={Styles.badgeText}
                            >{`${data.types}`}</Text>
                          </Badge>
                        </Right>
                      }
                    </ListItem>
                    <View style={Styles.divider}></View>
                  </View>
                }
                else {

                }
              }
              else if (data.route == 'PublicLogout') {
                if (this.state.token) {
                  return <View>
                    <ListItem
                        button
                        noBorder
                        onPress={() => {
                          this.props.logout();
                          this.props.navigation.closeDrawer();
                          NavigationService.navigate('PublicMain', {showLogin: true})
                        }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <View style={Styles.viewStyle}>
                          <Icon
                              active
                              name={data.icon}
                              type={data.type || 'FontAwesome'}
                          />
                        </View>
                        <View style={Styles.viewStyle}>
                          <Text style={Styles.text}>
                            {data.name}
                          </Text>
                        </View>
                      </View>
                      {
                        data.types &&
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                          <Badge>
                            <Text
                                style={Styles.badgeText}
                            >{`${data.types}`}</Text>
                          </Badge>
                        </View>
                      }
                    </ListItem>
                    <View style={Styles.divider}></View>
                  </View>
                }
                else {
                  return <Fragment />
                }
              }
              else return <View>
                <ListItem
                  button
                  noBorder
                  onPress={() => {
                    NavigationService.navigate(data.route);
                    let page = '';
                    switch (data.route) {
                      case "PublicServiceIntro":
                        page = 'SERVICE INTRODUCTION';
                        break;
                      case "PublicQA":
                        page = 'FAQ';
                        break;
                      case "PublicContact":
                        page = 'CONTACT US';
                        break;
                      case "PublicTermServ":
                        page = 'TERMS OF SERVICE';
                        break;
                      case "PublicPrivacyPolicy":
                        page = 'PRIVACY POLICY';
                        break;
                      case "PublicOperComp":
                        page = 'OPERATING COMPANY';
                        break;
                    }
                    this.props.createLog({
                      event: 'pageview',
                      page: page
                    })
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View style={Styles.viewStyle}>
                      <Image style={Styles.imageStyle} source={data.url} />
                    </View>
                    <View style={Styles.viewStyle}>
                      <Text style={Styles.text}>
                        {data.name}
                      </Text>
                    </View>
                  </View>
                  {
                    data.types &&
                    <Right style={{ flex: 1 }}>
                      <Badge>
                        <Text
                          style={Styles.badgeText}
                        >{`${data.types}`}</Text>
                      </Badge>
                    </Right>
                  }
                </ListItem>
                <View style={Styles.divider}></View>
              </View>
            }}
          />
          <Text style={Styles.versionText}>ver. {AppInfo.version}</Text>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.setting,
    ...state.auth,
  }
};

const mapDispatchToProps = (dispatch) => ({
  getSetting: () => dispatch(getSetting()),
  getToken: () => dispatch(getToken()),
  logout: () => dispatch(logout()),
  createLog: (data) => dispatch(createLog(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuLeft);
