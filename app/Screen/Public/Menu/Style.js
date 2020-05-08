import { Dimensions, Platform } from 'react-native';
const isIOS = Platform.OS === 'ios';
const lineHeightRatio = isIOS ? 1 : 1.5;

export default {

    list: {
        marginTop: 20,
        marginBottom: 30,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    body: {
        textAlgin: 'justify',
    },

    mainTitle: {
        fontSize: 18,
        lineHeight: 18 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Bold',
        color: '#333',
        marginTop: 12,
        marginBottom: 8,
        textAlign: 'center',
        opacity: 1,
    },
    title: {
        fontSize: 16,
        lineHeight: 16 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Bold',
        color: '#333',
        textAlign: 'left',
        opacity: 1,
        marginTop: 12,
        marginBottom: 8,
    },
    textContent: {
        fontSize: 14,
        lineHeight: 14 * lineHeightRatio,
        color: '#333',
        opacity: 1,
        textAlgin: 'justify',
        fontFamily: 'NotoSansCJKjp-Regular',
    },
    multiComLine: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        position: 'relative',
        marginTop: 5,
        marginBottom: 0,
    },

    infoBox: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    QAList: {
        width: '90%',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    ques: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    q: {
        flex: 0.1,
        padding: 10,
        fontSize: 28,
        textAlign: 'left',
        fontFamily: 'NotoSansCJKjp-Bold',
    },
    qText: {
        fontSize: 14,
        lineHeight: 14 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Regular',
        flex: 0.9,
        padding: 10,
        color: '#333333',
    },
    ans: {
        flexDirection: 'row',
    },
    aText: {
        paddingLeft: 10,
        flex: 0.9,
    },
    a: {
        flex: 0.1,
        fontSize: 28,
        paddingVertical: 10,
        paddingRight: 10,
        textAlign: 'right',
        fontFamily: 'NotoSansCJKjp-Bold',
    },
    htmlFontStyle: {
        fontSize: 14,
        lineHeight: 14 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Regular',
        color: '#000'
    },

}
