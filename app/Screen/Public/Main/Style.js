import { Dimensions, Platform } from 'react-native';
import { elevationShadowStyle } from '@Component/StyleUtility';

const isIOS = Platform.OS === 'ios';

var {height, width} = Dimensions.get('window');

export default {
    categoryList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
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

    feedList: {
    },
    feed: {
        flexDirection: 'row',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        paddingRight: 5
    },
    feedTitle: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    feedRemoveButton: {
        width: 20,
        height: 20,
        alignSelf: "center",
    },
    feedRemoveButtonIcon: {
        width: 20,
        height: 20,
    },
}
