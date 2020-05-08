import React from 'react'
import { AsyncStorage, Image, Linking, TouchableOpacity } from 'react-native'
import {Dialog, TextInput} from 'react-native-paper';
import { Container, Header, Content, Button, Icon, View, Text, Left, Right, Body } from 'native-base'
import NavigationService from '@Service/Navigation'
import Style from '@Theme/Style'
import Styles from '@Screen/Public/Login/Style'
import { getAuthSelector } from "../../../_reducers/auth-reducer";
import { login } from "../../../_actions/auth-action";
import { connect } from "react-redux";

import Loader from '@Component/Loader/Loader'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      email_error: '',
      password_error: '',
      isFocused: false,
      errorMessage: '',
    }
  }

  resetPasswordURL = 'https://www.doctor-agent.com/login/reminder';
  forgetPasswordURL = 'https://www.doctor-agent.com/inquiry';
  memberRegisterURL = 'https://www.doctor-agent.com/Member-Registration?utm_source=myikyoku&utm_medium=app&utm_campaign=app_reg';
  aboutUserRegisterURL = 'https://www.doctor-agent.com/about';

  login = () => {
    var isError = false;
    if (this.state.email.length === 0) {
      this.setState({
        email_error: 'メールアドレスは必ずご入力ください。',
        isError: true
      });
      isError = true;
    }
    if (this.state.password.length === 0) {
      this.setState({
        password_error: 'パスワードは必ずご入力ください。',
        isError: true
      });
      isError = true;
    }
    if (!isError) {
      this.props.login({
        email: this.state.email,
        password: this.state.password,
        onSuccess: this.props.onSuccess
      });
    }
  };

  onChangeEmailText = (text) => {
    this.setState({ email: text, email_error: '' });
  };

  onChangePasswordText = (text) => {
    this.setState({ password: text, password_error: '' });
  };

  render() {
    return <Container style={Style.bgMain}>
      <Content style={Style.layoutInner} contentContainerStyle={{
        borderTopWidth: 0,
        borderWidth: 2,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: '#ebcaca',
        shadowColor: '#ebcaca',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
      }}>
        <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: 65 }}>
          </View>
          <View style={Style.positionCenter}>
            <Image style={Style.loginLogo} source={require('@Asset/images/medialogo.png')} />
          </View>
          <View style={{ width: 65, justifyContent: 'flex-end' }}>
            {
              this.props.firstLogin === true
                ? <Button style={Styles.skipBtn} onPress={() => { this.props.onClose() }}>
                  <Text style={Styles.skipText}>SKIP</Text>
                  <Icon name='chevrons-right' type='Feather' style={Styles.skipButtonIcon}></Icon>
                </Button>
                : <Button style={Styles.closeButton} onPress={() => { this.props.onClose() }}>
                  <Image source={require('@Asset/images/close.png')} style={Style.closeIcon} />
                </Button>
            }
          </View>
        </View>
        <View style={Style.positionCenter}>
          <Loader loading={this.props.isLoading} />
          <Text style={[Style.title, { marginTop: 20, fontSize: 25 }]}>会員様向けサービスです</Text>
          <Text adjustsFontSizeToFit={true} style={Styles.text}>会員様限定で記事全文の閲覧やその他アプリの全機能をご利用いただけます。レジナビや民間医局のログイン情報でログインしていただけます。</Text>
          <Text style={Styles.comment}>{this.props.err}</Text>
          <TextInput
            ref="email"
            label="Mail-address"
            mode="flat"
            placeholder='example@sample.com'
            style={Styles.textInput}
            underlineColor="transparent"
            onChangeText={(text) => this.onChangeEmailText(text)}
            keyboardType={'email-address'}
            theme={{ colors: { primary: "#b71547" }, roundness: 0 }}
          />
          <Text style={Styles.comment}>{this.state.email_error}</Text>
          <TextInput
            ref="password"
            label="Password"
            mode="flat"
            placeholder='Password'
            style={Styles.textInput}
            secureTextEntry={true}
            underlineColor="transparent"
            onChangeText={(text) => this.onChangePasswordText(text)}
            theme={{ colors: { primary: "#b71547" }, roundness: 0 }}
          />
          <Text style={Styles.comment}>{this.state.password_error}</Text>
          <Button onPress={() => this.login()} style={Style.button}>
            <Text style={Style.buttonText}>ログイン</Text>
          </Button>
          <View style={[Styles.multiComLine, { marginBottom: 15, }]}>
            <View>
              <Text style={Style.linkText} onPress={() => {
                NavigationService.navigate('PublicViewer', {url: this.resetPasswordURL});
              }}>
                パスワード再設定
              </Text>
              <View style={Style.dividerText}></View>
            </View>
          </ View>
          <View style={[Styles.multiComLine, { marginBottom: 10, }]}>
            <View>
              <Text style={Style.linkText} onPress={() => {
                NavigationService.navigate('PublicViewer', {url: this.forgetPasswordURL});
              }}>
                ログイン情報を忘れた方へ
              </Text>
              <View style={Style.dividerText}></View>
            </View>
          </View>
          <View style={Styles.divider} />
          <Text style={Styles.text}>ご登録されていらっしゃらない方はこちらから無料登録をお願いします。</Text>
          <Button onPress={() => {
            NavigationService.navigate('PublicViewer', {url: this.memberRegisterURL});
          }} style={[Style.button, Styles.registerButton]}>
            <Text style={Style.buttonText}>
              新規登録(無料)
            </Text>
          </Button>
          <View style={Styles.multiComLine}>
            <View>
              <Text style={Style.linkText} onPress={() => {
                NavigationService.navigate('PublicViewer', {url: this.aboutUserRegisterURL});
              }}>
                会員登録について
              </Text>
              <View style={Style.dividerText}></View>
            </View>
          </View>
          <View style={Style.lastLinkText}></View>
        </View>
      </Content>
    </Container>
  }
}

const mapStateToProps = () => getAuthSelector;

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
