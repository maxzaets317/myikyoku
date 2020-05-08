import React, {Fragment} from 'react'
import { Dialog } from 'react-native-paper';
import {View} from 'react-native';

import Style from '@Theme/Style'

import Login from './Login'

class LoginModal extends React.Component {

  state = {
    showModal: false
  };

  constructor(props) {

    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.show
    })
  }

  closeModal = () => {
    if (this.props.closeModal) {
      this.props.closeModal();
    } else {
      this.setState({
        showModal: false
      });
    }
  }

  render() {
    return this.state.showModal ? <View
                width={0.9}
                visible={this.state.showModal}
                rounded
                actionsBordered
                style={[Style.dialogStyles, { position: 'absolute', paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }]}
            >
                <Dialog.ScrollArea>
                  <Login firstLogin={this.props.firstLogin} onSuccess={() => {
                    if (this.props.onSuccess) {
                      this.closeModal();
                      this.props.onSuccess();
                    }
                  }} onClose={() => {this.closeModal();}} />
                </Dialog.ScrollArea>
            </View> : <View></View>
  }
}

export default (LoginModal);
