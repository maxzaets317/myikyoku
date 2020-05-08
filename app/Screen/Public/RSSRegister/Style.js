import { Dimensions, Platform } from 'react-native';
const isIOS = Platform.OS === 'ios';
const lineHeightRatio = isIOS ? 1 : 1.5;


export default {
  comment: {
    color: 'red',
    width: '100%',
  },
  menuLeftView: {
    flex: 0.2,
  },
  menuCenterView: {
    flex: 0.8,
  },
  menuTitle: {
    fontSize: 20,
    marginTop: 15,
    width: '100%',
    justifyContent: "center",
    alignItem: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    textAlign: "center",
  },
  menuRightView: {
    marginRight: -10,
    flex: 0.2,
  },
  divider: {
    borderBottomColor: '#999999',
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    marginTop: 7,
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: '#c2053b',
    color: '#ffffff',
    width: '60%',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    width: "70%",
    marginBottom: 20,
  },
  textContent: {
    fontSize: 15.8,
    lineHeight: 15.8 * lineHeightRatio,
    color: '#333',
    opacity: 1,
    textAlign: 'justify',
    fontFamily: 'NotoSansCJKjp-Regular',
},

  // dialog style
  dialogCloseButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 26,
    height: 26,
    backgroundColor: '#333333',
    borderRadius: 0,
    zIndex: 1
  },
  dialogCloseButtonIcon: {
    color: '#FFF',
  },
  dialogRSSButton: {
    borderWidth: 1,
    borderColor: '#666666',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#666666',
  },
  dialogRSSIcon: {
    color: '#FFFFFF',
    fontSize: 70,
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 28,
    color: '#333333',
  },
  dialogText: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 20,
    color: '#000000',
    lineHeight: 30,
    widht: '85%'
  },
  dialogTextInput: {
    width: '100%',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  dialogTextBackgroundStyle: {
    backgroundColor: '#333',
    color: '#FFF',
    marginTop: 15,
    padding: 12,
    paddingBottom: isIOS ? 3 : 10,
    textAlign: 'center',
    fontSize: 15.5,
    lineHeight: 15.5 * lineHeightRatio,
  },
  dialogImageStyle: {
    width: 156,
    height: 156,
    marginTop: 30,
    marginBottom: 26,
  },
  dialogSuccessButtonStyle: {
    backgroundColor: '#c2053b',
    color: '#ffffff',
    marginTop: 25,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
  },
  dialogFailureButtonStyle: {
    backgroundColor: '#b3b3b3',
    color: '#ffffff',
    width: '85%',
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'center',
    textAlignVertical: "center",
    borderRadius: 10,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    position: 'relative'
  },
  dialogButtonIcon: {
    color: '#FFF',
    fontSize: 30,
    textDecorationLine: 'none',
    marginLeft: -20,
  },
  title_custom: {
    fontSize: 26,
    lineHeight: 26 * lineHeightRatio,
    textAlign: 'center',
    fontFamily: 'NotoSansCJKjp-Bold',
  },
  dialogCloseButtonViewPositionRight: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 26,
    height: 26
  },
  positionCenter: {
    alignItems: 'center',
  },

  boxWithShadow: {
    height: '100%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ebcaca',
    shadowColor: '#ebcaca',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    padding: 26,
    backgroundColor: '#fff',
    position: 'relative'
  },
}
