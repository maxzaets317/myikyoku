import { Platform } from 'react-native';
const isIOS = Platform.OS === 'ios';
const lineHeightRatio = isIOS ? 1 : 1.5;

export default {
  text: {
    width: '80%',
    textAlign: 'justify',
    fontSize: 16,
    lineHeight: isIOS ? 16 * lineHeightRatio : 16 * lineHeightRatio,
    fontFamily: 'NotoSansCJKjp-Medium',
    marginTop: 5,
    marginBottom: 5,
  },
  navigation: {
    shadowOpacity: 0,
    elevation: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
    width: '100%',
    height: 70,
    borderWidth: 0,
    borderColor: '#c2053b',
    backgroundColor: '#FFF',
  },
  skipBtn: {
    backgroundColor: '#333333',
    height: 28,
    width: 80,
    marginRight: -20,
    marginBottom: 3,
    borderRadius: 0,
  },
  skipText: {
    marginLeft: -10,
    fontSize: 14,
    marginTop: 1,
    fontFamily: 'NotoSansCJKjp-Bold',
  },
  skipButtonIcon: {
    color: '#FFF',
    fontSize: 22,
    // textDecorationLine: 'none',
    marginTop: isIOS ? -5 : 0,
    marginLeft: -25,
  },
  closeButton: {
    backgroundColor: '#333333',
    color: '#ffffff',
    marginRight: 30,
    marginBottom: 3,
    borderRadius: 0,
    width: 26,
    height: 26,
  },
  viewStyle: {
    width: "80%",
  },

  textInput: {
    width: '80%',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 0,
  },

  icon: {
    fontSize: 28,
    textDecorationLine: 'none',
    marginTop: 15,
  },
  registerButton: {
    backgroundColor: '#0a73b4',
  },
  divider: {
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
    width: '80%',
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  comment: {
    color: 'red',
    width: '80%',
  },
  multiComLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
    marginTop: 5,
    marginBottom: 0,
  },

}
