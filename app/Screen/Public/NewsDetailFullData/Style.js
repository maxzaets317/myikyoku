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
        marginTop: 10,
        marginBottom: 10,
    },
    chipView: {
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        textAlignVertical: "flex-end",
        marginLeft: 10,
        marginRight: 20,
        height: 25,
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    chipViewTitle: {
        color: '#fff',
        fontSize: 12,
    },
    roundView: {
        height: 25,
        paddingTop: 3,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 5,
        borderRadius: 6,
        backgroundColor: 'grey',
    },
    listVerticalDivider: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        marginBottom: 30,
        marginRight: -15,
        width: 0.7,
        backgroundColor: "#CCCCCC"
    },
    listTopDivider: {
        borderColor: '#999999',
        borderWidth: 1,
        width: '93%',
        justifyContent: "center",
        alignSelf: "center",
        textAlignVertical: "center",
    },
    listDivider: {
        borderColor: '#CCCCCC',
        borderWidth: 0.5,
        width: '93%',
    },
}
