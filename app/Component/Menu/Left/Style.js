const React = require("react-native");
const { Platform, Dimensions } = React;

const isIOS = Platform.OS === 'ios';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    alignSelf: "stretch",
    height: 150,
    width: null,
    position: "relative",
    justifyContent: 'center',
  },
  drawerImage: {
    position: "absolute",
    // left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    // top: Platform.OS === "android" ? deviceHeight / 6 : deviceHeight / 4,
    left: deviceWidth / 10,
    top: deviceHeight / 8,
    width: undefined,
    height: 30,
    aspectRatio: 512 / 168,
  },
  drawerText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    color: '#222',
    fontFamily: 'NotoSansCJKjp-Bold',
  },
  icon: {
    color: "#333",
    fontSize: 20,
    width: 30,
    marginTop: 3,
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 20,
    paddingTop: isIOS ? 8 : 0,
    color: '#333',
    fontFamily: 'NotoSansCJKjp-Bold',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined,
    justifyContent: "center",
  },
  divider: {
    borderColor: '#eeeeee',
    borderWidth: 0.5,
    width: '93%',
    justifyContent: "center",
    alignSelf: "center",
  },
  versionText: {
    fontWeight: '100',
    fontSize: 14,
    color: '#ccc',
    fontFamily: 'NotoSansCJKjp-Bold',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  viewStyle: {
    justifyContent: 'center',
  },
  imageStyle: {
    width: 24,
    height: 24,
    justifyContent: 'center',
  }

};
