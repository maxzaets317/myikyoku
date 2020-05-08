import React from 'react'
import { ScrollView, View } from 'react-native';
import { RNChipView } from "react-native-chip-view";
import Styles from './Style';

class CategoryList extends React.Component {
    render() {
        return <ScrollView contentContainerStyle={[Styles.categoryList]}>
            <View style={Styles.category}>
                <RNChipView
                    title={`ALL`}
                    titleStyle={Styles.categoryTitle}
                    backgroundColor="#666"
                    height={25}
                    avatar={false}
                    onPress={() => this.props.onSelect(null)}
                />
            </View>
            {
                this.props.categories.map((category) => {
                    return <View style={Styles.category}>
                        <RNChipView
                            title={`${category.name}`}
                            titleStyle={Styles.categoryTitle}
                            backgroundColor="#666"
                            height={25}
                            avatar={false}
                            onPress={() => this.props.onSelect(category.id)}
                        />
                    </View>
                })
            }
        </ScrollView>
    };
}

export default CategoryList;
