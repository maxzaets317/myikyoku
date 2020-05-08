import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';
const lineHeightRatio = isIOS ? 1 : 1.5;

export default {
    notify: {
        color: '#666666',
        marginLeft: 20,
        marginRight: 10,
        width: 15,
        height: 20,
    },
    title: {
        color: '#333333',
        fontSize: 14,
        lineHeight: 14 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Regular',
    },
    arrival: {
        color: '#999999',
        fontSize: 12,
        lineHeight: 12 * lineHeightRatio,
        fontFamily: 'NotoSansCJKjp-Regular',
    },
}