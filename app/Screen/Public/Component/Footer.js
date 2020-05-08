import React, {Fragment} from 'react'
import { Image, AsyncStorage, TouchableOpacity } from 'react-native'
import { View, Button, Icon, Text, Footer, FooterTab, Badge } from 'native-base'

import NavigationService from '@Service/Navigation'
import { getClipCount } from "../../../_actions/clip-action";

import Style from '@Theme/Style'
import {connect} from "react-redux";

class PublicFooter extends React.Component {
  state = {
    clipCount: 0
  };

  constructor(props) {
    super(props);
    AsyncStorage.getItem('token')
        .then(value => {
          if (value) this.props.getClipCount();
          else this.setState({
            clipCount: 0
          })
        });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      clipCount: nextProps.clipCount,
    })
  }

  render() {
    return <Footer style={Style.footer}>
      <FooterTab style={Style.footerInner}>
        <TouchableOpacity style={Style.footerItem} onPress={() => {
          if (!this.props.isShowOverlay)
            this.props.onChangeItem(0);
        }}>
          <Image style={{ width: 40, height: 40 }} source={require('@Asset/images/footer_news_symbol.png')} />
          <View style={Style.footerItemDivider} />
        </TouchableOpacity>
        <TouchableOpacity style={Style.footerItem} onPress={() => { if (!this.props.isShowOverlay) this.props.onChangeItem(1); }}>
          <Image style={{ width: 40, height: 40 }} source={require('@Asset/images/footer_rss_symbol.png')} />
          <View style={Style.footerItemDivider} />
        </TouchableOpacity>
        <TouchableOpacity style={Style.footerItem} onPress={() => { if (!this.props.isShowOverlay) this.props.checkLogin(() => { NavigationService.navigate('PublicRSSRegister', {onRSSRegisterSuccess: (feedinfo) => {this.props.onChangeItem(1); this.props.onSelectFeed(feedinfo.id)}}) }) }}>
          <Image style={{ width: 40, height: 40 }} source={require('@Asset/images/footer_rss_add_symbol.png')} />
          <View style={Style.footerItemDivider} />
        </TouchableOpacity>
        <TouchableOpacity badge style={Style.footerItem} onPress={() => { if (!this.props.isShowOverlay)this.props.checkLogin(() => { NavigationService.navigate('PublicClip') }) }}>
          <Image style={{ width: 40, height: 40 }} source={require('@Asset/images/footer_myclip_symbol.png')} />
          {
              this.state.clipCount!==0 ? <View style={[Style.listPoint, {position: 'absolute', right: '30%', top: '15%'}]}/> : <Fragment />
          }
          <View style={Style.footerItemDivider} />
        </TouchableOpacity>
        <TouchableOpacity badge style={Style.footerItem} onPress={() => {
          if (!this.props.isShowOverlay)
            NavigationService.navigate('PublicNotifications')
        }}>
          <Image source={require('@Asset/images/footer_notification_symbol.png')} style={{ width: 40, height: 40 }} />
          {
            this.props.notificationCount!==0 ? <View style={[Style.listPoint, {position: 'absolute', right: '30%', top: '15%'}]}/> : <Fragment />
          }
        </TouchableOpacity>
      </FooterTab>
    </Footer>
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.clipCount
  }
};

const mapDispatchToProps = (dispatch) => ({
  getClipCount: () => dispatch(getClipCount())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicFooter);
