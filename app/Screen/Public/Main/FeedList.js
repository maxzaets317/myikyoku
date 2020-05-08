import React from 'react'
import {Image, ScrollView, View, TouchableOpacity} from 'react-native';
import {Button, Text} from "native-base";

import Styles from './Style';

class FeedList extends React.Component {
    render() {
        return <ScrollView contentContainerStyle={Styles.feedList}>
            {
                this.props.feeds.map((feed) => {
                    return <View style={Styles.feed}>
                            <Text style={Styles.feedTitle} onPress={() => { this.props.onFilter(feed.id)}}>{`#${feed.title}`}</Text>
                            <TouchableOpacity style={Styles.feedRemoveButton} onPress={() => { this.props.onDelete(feed) }}>
                                <Image source={require('@Asset/images/enclose_minus_symbol.png')} style={Styles.feedRemoveButtonIcon}/>
                            </TouchableOpacity>
                    </View>
                })
            }
        </ScrollView>
    };
}

export default FeedList;
