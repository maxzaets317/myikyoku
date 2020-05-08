import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

export default {
    category: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    categoryTitle: {
        color: '#fff',
        fontSize: 12.5,
        marginLeft: 5,
        marginRight: 5,
        // marginTop: 6,
        marginTop: isIOS ? 6 : 0,
        fontFamily: 'NotoSansCJKjp-Regular',
        textAlignVertical: 'center'
    },

    overlayChip: {
        marginLeft: 7,
        marginTop: 3.5,
        marginBottom: 3.5,
    },
    chipView: {
        flexDirection: 'row',
        position: 'relative',
        justifyContent: "flex-end",
        flexWrap:'wrap',
        alignContent: 'stretch',
        marginLeft: 10,
        marginRight: 20,
        marginTop: 8,
        marginBottom: 0,
    },
    chipViewTitle: {
        color: '#fff',
        fontSize: 12,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    roundView: {
        height: 28,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
        borderRadius: 14,
        backgroundColor: '#666666',
    }

}
