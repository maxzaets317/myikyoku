import { Dimensions, Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { elevationShadowStyle } from '@Component/StyleUtility';

const { height, width } = Dimensions.get('window');

const isIOS = Platform.OS === 'ios';
const isIPhoneX = isIOS && (width > 800 || height > 800);

let systemStatusBarHeight = isIOS ? (isIPhoneX ? 23 : 23) : 0;

let systemBottomHeight = getBottomSpace();
if (isIOS && systemBottomHeight > 10) {
    systemBottomHeight = 10;
}

const LOGO_HEIGHT = 30;
const headerPadding = isIOS ? (isIPhoneX ? 20 : 10) : 10;
const headerHeight = (isIOS ? (isIPhoneX ? 0 : systemStatusBarHeight) : 0) + headerPadding + LOGO_HEIGHT + headerPadding;
const navigationHeight = headerHeight;
const footerHeight = 55;

const menuHeight = 45;

const dialogContentHeight = height - systemStatusBarHeight - navigationHeight;

const lineHeightRatio = isIOS ? 1 : 1.5;

const indicatorPosition = (height - headerHeight - menuHeight - footerHeight - systemBottomHeight) / 2 - 36 / 2; // 36 means height of large indicator.

export default {
    pageModal: {
        position: 'absolute',
        top: (isIOS ? (isIPhoneX ? systemStatusBarHeight : 0) : 0) + headerHeight + menuHeight,
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 12,
        zIndex: 100,

        padding: 15
    },

    // *** row *** //
    layout: {
        marginLeft: 20,
        marginRight: 20,
    },
    layoutInner: {
        width: '100%',
    },
    layoutInnerMain: {
        // marginTop: 40,
        width: '100%',
    },
    layoutCenter: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    layoutStart: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    layoutEnd: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    // *** row *** //
    row: {
        marginLeft: -5,
        marginRight: -5,
        flexDirection: 'row'
    },
    row1: {
        flexDirection: 'row'
    },

    // *** grid *** //
    col1: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    },
    col2: {
        flex: 2,
        marginLeft: 10,
        marginRight: 10
    },
    col3: {
        flex: 3,
        marginLeft: 10,
        marginRight: 10
    },
    col4: {
        flex: 4,
        marginLeft: 10,
        marginRight: 10
    },

    // *** text alignment *** //
    textLeft: {
        textAlign: 'left'
    },
    textCenter: {
        textAlign: 'center',
    },
    textRight: {
        textAlign: 'right'
    },

    // *** space ***//
    spaceTint: {
        height: 8,
    },
    spaceSmall: {
        height: 12,
    },
    spaceMedium: {
        height: 16,
    },
    spaceLarge: {
        height: 24,
    },
    spaceExtraLarge: {
        height: 36,
    },

    // *** font size *** //
    textTint: {
        fontSize: 8,
    },
    textSmall: {
        fontSize: 12,
    },
    textMedium: {
        fontSize: 16,
    },
    textLarge: {
        fontSize: 24,
    },
    textExtraLarge: {
        fontSize: 36,
    },

    // *** position *** //
    positionLeft: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    positionCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    positionRight: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },


    // *** button *** //
    btnPrimary: {
        backgroundColor: '#b78fc3',
        color: '#FFF',
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        minWidth: '60%',
        alignItems: 'center',
        textAlign: 'center',
    },
    btnPink: {
        backgroundColor: '#b78fc3',
        color: '#FFF',
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        textAlign: 'center',
    },
    btnCancel: {
        backgroundColor: '#CCC',
        color: '#999',
        borderWidth: 0,
        borderRadius: 5,
    },
    btnTransparent: {
        backgroundColor: 'transparent',
        color: '#666',
    },
    btnFacebook: {
        backgroundColor: '#26497f',
        color: '#FFF',
        marginBottom: 50,
        paddingLeft: 30,
        paddingRight: 30,
    },


    // *** background colors *** //

    bgMainIntro: {
        backgroundColor: '#466DF0',
    },
    bgMain: {
        backgroundColor: '#FFF',
    },
    bgWhite: {
        backgroundColor: '#fceae5',
    },
    bgBlack: {
        backgroundColor: '#433c3a',
    },
    bgGreen: {
        backgroundColor: '#28BFBD',
    },
    bgYellow: {
        backgroundColor: '#F7941E',
    },
    bgRed: {
        backgroundColor: '#000',
    },
    bgYellowDark: {
        backgroundColor: '#e4932a',
    },
    bgPink: {
        backgroundColor: '#EC87C0',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

    // *** text colors *** //
    textWhite: {
        color: '#FFFFFF',
        fontSize: 12.5,
        fontFamily: "Montserrat-SemiBold",
    },
    textBlack: {
        color: '#3f3b38',
        fontFamily: "Montserrat-SemiBold",
        marginTop: 15
    },
    textGreyLight: {
        color: '#999',
        fontFamily: "Montserrat-SemiBold",
    },
    textGrey: {
        color: '#666',
        fontFamily: "Montserrat-SemiBold",
    },
    textGreyDark: {
        color: '#333',
        fontFamily: "Montserrat-SemiBold",
    },
    textYellow: {
        color: '#F7941E',
        fontFamily: "Montserrat-SemiBold",
    },
    textBlue: {
        color: '#999',
        fontFamily: "Montserrat-SemiBold",
    },

    // *** flex *** //
    flex1: {
        flex: 1,
    },

    flex2: {
        flex: 2,
    },

    iconRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },

    // *** row *** //
    logo: Platform.select({
        ios: {
            width: 76,
            height: 24,
            marginTop: 3,
        },
        android: {
            width: 76,
            height: 24,
            marginTop: 3,
            // marginLeft: (width * 10 / 18 - 104) / 2
        }
    }),

    loginLogo: {
        width: 76,
        height: 24,
        marginTop: 30,
    },

    // *** text header *** //
    textHeader: {
        fontSize: 24,
        color: '#FFF'
    },
    textDesc: {
        fontSize: 16,
        color: '#FFF'
    },

    // *** inputText *** //
    inputText: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        fontFamily: 'Roboto',
        color: '#FFF',
        borderBottomWidth: 0,
        borderColor: '#746f76',
        fontSize: 14,
        placeholderTextColor: '#FFF'
    },
    input: {
        fontSize: 12,
    },
    textarea: {
        textAlignVertical: 'top',
    },

    // *** line *** //
    blueTopLine: {
        borderTopWidth: 1,
        borderColor: '#2A3C54'
    },
    greyBottomLine: {
        borderTopWidth: 0.5,
        borderColor: '#DDD',
        marginLeft: 0,
    },
    borderWhite: {
        borderBottomColor: '#FFF',
    },
    iconImg: {
        height: 45,
        width: 65,
    },

    // *** menu icon style *** //
    menuHamburger: {
        width: 21,
        height: 18,
        marginLeft: isIOS ? 5 : 0,
        marginTop: 3,
        opacity: 0.7
    },
    menuImageIcon: {
        width: 20,
        height: 21,
    },
    menuIcon: {
        color: '#999999',
        fontSize: 32,
    },
    mainMenuIcon: {
        color: '#999999',
        fontSize: 40,
        marginLeft: 10,
        marginTop: -5,
    },

    // *** new style *** //
    headerWrapper: {
        backgroundColor: '#fff',
        ...elevationShadowStyle(3),
        zIndex: 20
    },
    header: {
        height: headerHeight,
        paddingTop: isIOS ? (isIPhoneX ? 10 : systemStatusBarHeight) : 0,
        backgroundColor: '#fff',
        borderBottomWidth: 0,
    },
    navigationWrapper: {
        ...elevationShadowStyle(2),
        backgroundColor: '#fff',
        zIndex: 20
    },
    navigation: {
        height: navigationHeight,
        backgroundColor: '#fff',
        borderBottomColor: '#CCC',
        borderBottomWidth: 0.5,
    },

    menuWrapper: {
        zIndex: 10,
        ...elevationShadowStyle(2),
        backgroundColor: '#fff'
    },
    menu: {
        height: menuHeight,
        backgroundColor: '#fff',
        borderBottomColor: '#CCC',
        borderBottomWidth: 0.5,
    },

    footer: {
        ...elevationShadowStyle(3),
        zIndex: 5,
        backgroundColor: '#fff',
        height: footerHeight - (isIOS ? (isIPhoneX ? 10 : 0) : 0),
    },
    footerInner: {
        borderTopWidth: isIOS ? 0 : 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        height: footerHeight,
        position: 'relative'
    },
    footerItem: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    footerItemDivider: {
        backgroundColor: '#ddd',
        width: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        marginRight: -0.25,
        marginTop: 17,
        marginBottom: 17
    },

    badgeStyle: {
        backgroundColor: '#b91e4e',
        marginTop: 4,
    },

    ///////////////////////////////////////////////////////
    // common button style
    button: {
        backgroundColor: '#b71648',
        minWidth: '60%',
        marginTop: 10,
        marginBottom: 15,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#999',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 1,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'NotoSansCJKjp-Bold',
        lineHeight: 34,
        shadowColor: '#666',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 1,
    },
    buttonIcon: {
        color: '#FFF',
        fontSize: 30,
        textDecorationLine: 'none',
        marginLeft: -10,
        shadowColor: '#333',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    // common title style
    title: {
        textAlign: 'center',
        fontSize: 30,
        lineHeight: isIOS ? 30 * lineHeightRatio : 30 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Bold',
        marginTop: 10,
        marginBottom: 5,
    },
    // common content text style
    text: {
        width: '80%',
        textAlign: 'justify',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 5,
        marginBottom: 5,
    },

    // common slide style
    slide: {
        width: '100%',
        height: 240,
        marginRight: 0,
        flex: 1,
    },
    slideImage: {
        height: 240,
        borderRadius: 8,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    slideDate: {
        height: 16,
        color: '#FFF',
        fontSize: 10,
        fontFamily: 'NotoSansCJKjp-Bold',
        paddingTop: isIOS ? 1.5 : 1,
        paddingRight: 10,
        paddingLeft: 20,
        marginTop: 100,
        backgroundColor: '#333333',
        opacity: 1,
    },
    slideTitle: {
        width: '90%',
        color: '#FFF',
        fontSize: 14,
        lineHeight: isIOS ? 14 * lineHeightRatio : 14 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Medium',
        paddingLeft: 20,
        paddingRight: 10,
        // paddingTop: 5,
        paddingTop: isIOS ? 5 : 4,
        paddingBottom: isIOS ? 0 : 4,
        marginTop: 8,
        backgroundColor: '#333333',
        opacity: 1,
    },
    slideSource: {
        height: 24,
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'NotoSansCJKjp-Medium',
        paddingLeft: 20,
        // paddingTop: 3,
        paddingTop: isIOS ? 3 : 5,
        marginTop: 8,
        backgroundColor: '#333333',
        opacity: 1,
        paddingRight: 10,
    },
    // common item list
    listView: {
        flexDirection: 'row',
        height: 100,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#FFF',
        borderColor: '#000',
    },
    listImage: {
        width: 140,
        height: 100,
        borderRadius: 0,
    },
    listInfo: {
        flex: 1,
        marginLeft: 15,
    },
    listRightView: {
        flexDirection: 'row',
        height: 25,
    },
    listDate: {
        color: '#999999',
        fontSize: 10,
        fontFamily: 'NotoSansCJKjp-Medium',
        paddingVertical: 1,
    },
    listPoint: {
        width: 5,
        height: 5,
        borderRadius: 5 / 2,
        backgroundColor: '#b71547',
    },
    listIconRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
    listIcon: {
        color: '#666666',
        fontSize: 20,
        marginTop: 2,
    },
    listIconGrey: {
        color: '#BBBBBB',
        fontSize: 20,
        marginTop: 2,
    },
    listOrigin: {
        color: '#999999',
        fontSize: 12,
        fontFamily: 'NotoSansCJKjp-Regular',
        marginTop: 8,
        width: '80%',
    },
    listTitle: {
        color: '#333',
        height: 50,
        fontSize: 14,
        lineHeight: 14 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Bold',
        flexWrap: 'wrap',
    },
    listDivider: {
        borderColor: '#DDD',
        borderWidth: 0.5,
        width: '93%',
        justifyContent: "center",
        alignSelf: "center",
    },

    // for detail pages(news, rss, clip detail pages)
    topImage: {
        width: width,
        height: width * 0.6,
        marginBottom: 10,
    },
    articleTitle: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        textAlignVertical: "center",
        textAlgin: "left",
        fontSize: 18,
        lineHeight: 18 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Bold',
    },
    articleView: {
        justifyContent: "center",
        alignSelf: "center",
        textAlignVertical: "center",
        textAlgin: "center",
        width: '90%',
        marginTop: 5
    },
    articleSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 13,
    },
    articleDate: {
        color: '#999999',
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
    },
    articlePubName: {
        color: '#999999',
        fontSize: 12,
        fontFamily: 'NotoSansCJKjp-Regular',
        textAlign: 'right',
        width: '70%'
    },

    // space from last component
    categoryTitle: {
        color: '#333',
        marginTop: isIOS ? 24 : 16,
        marginBottom: 16,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'NotoSansCJKjp-Bold'
    },
    lastSpace: {
        flex: 1,
        width: '100%',
        height: 150,
        position: 'absolute',
        top: height - 150,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0
    },

    lastButton: {
        backgroundColor: '#b71648',
        width: '60%',
        opacity: 1,
        justifyContent: "center",
        alignSelf: "center",
        textAlignVertical: "center",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#999',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 1,
    },

    // common dialog style
    dialogStyles: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        marginLeft: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        paddingTop: 30 + systemStatusBarHeight,
        paddingBottom: 30 + systemBottomHeight,
        paddingLeft: 30,
        paddingRight: 30,
        zIndex: 50,
        elevation: 50
    },
    dialogCloseButton: {
        width: 26,
        height: 26,
        marginTop: isIOS ? 60 : 30,
        marginRight: isIOS ? 20 : 10,
        backgroundColor: '#333333',
        borderRadius: 0,
    },
    dialogCloseButtonIcon: {
        color: '#FFF',
        fontsize: 36,
        marginLeft: 3,
        marginRight: -3,
        marginTop: -2,
    },
    socialButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: width * 0.2,
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1,
    },
    twitterButton: {
        backgroundColor: '#1da1f3',
    },
    twitterIcon: {
        color: '#FFFFFF',
        fontSize: width * 0.25,
    },
    facebookButton: {
        backgroundColor: '#1977f3',
    },
    circleView: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.15 / 2,
        backgroundColor: '#FFFFFF',
    },
    facebookIcon: {
        color: '#1977f3',
        fontSize: width * 0.2,
        marginTop: 5,
        marginLeft: -5,
    },
    lineButton: {
        backgroundColor: '#01b901',
    },
    lineImage: {
        width: width * 0.2,
        height: width * 0.2,
    },
    lineIcon: {
        color: '#FFFFFF',
        fontSize: width * 0.2,
    },
    viewDialogButton: {
        justifyContent: "center",
        alignSelf: "center",
        textAlignVertical: "center",
        width: '70%',
        marginBottom: 20,
    },
    dialogButton: {
        backgroundColor: '#c2053b',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignSelf: "center",
        textAlignVertical: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c2053b',
        color: '#FFF',
        fontSize: 32,
        fontFamily: 'Montserrat-Regular',
        shadowColor: '#999',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 1,
    },
    linkText: {
        fontSize: 14,
        lineHeight: 14 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Regular',
        color: '#333333',
        marginTop: 0,
        marginBottom: 0,
    },
    dividerText: {
        borderBottomColor: '#333333',
        borderBottomWidth: 1,
        width: "100%",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: -4,
    },
    lastLinkText: {
        marginBottom: 25,
    },

    // common webview style
    largeWebViewContainer: {
        height: dialogContentHeight,
    },

    // QR code button style
    QRButton: {
        backgroundColor: '#a71a44',
        width: 70,
        height: 22,
        marginRight: 5,
        // marginTop: 15,
        shadowColor: '#333',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 5,
    },
    QRButtonText: {
        fontSize: 12,
        fontFamily: 'NotoSansCJKjp-Bold',
        marginLeft: isIOS ? -13 : -13,
        marginRight: isIOS ? -15 : -30,
        textAlign: 'center',
        shadowColor: '#333',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 6,
    },

    multiComLine: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        position: 'relative',
        marginTop: 10,
        marginBottom: 15,
    },

    // back icon style
    backIcon: {
        width: 14,
        height: 26,
        marginTop: -1,
        marginLeft: isIOS ? 10 : 0,
    },
    closeIcon: {
        width: 26,
        height: 26,
    },
    clipIcon: {
        width: 23,
        height: 24,
    },
    shareIcon: {
        width: 23,
        height: 24,
    },

    headerLink: {
        marginLeft: -25,
        marginRight: 35,
        justifyContent: 'center',
        textAlignVertical: 'center',
        height: 24,
        borderRadius: 4,
        backgroundColor: '#dcdcdc',
        paddingLeft: 5,
        paddingRight: 5,
    },
    headerLinkText: {
        color: '#333',
        paddingTop: isIOS ? 3 : 0,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'Roboto-Light',
    },
    headerTitle: {
        fontSize: 16,
        lineHeight: 16 * lineHeightRatio,
        paddingTop: isIOS ? 10 : 0,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'NotoSansCJKjp-Regular',
    },
    htmlFontStyle: {
        fontSize: 14,
        lineHeight: 14 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Regular'
    },
    indicatorPosition: {
        marginTop : indicatorPosition,
    }
}
