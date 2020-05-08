import React, {Component, PureComponent} from "react";
import {Dimensions} from "react-native";
import PropTypes from "prop-types";
import {View, FlatList} from "react-native";
import onSelect from "./functions/onSelect";
import alignSelect from "./functions/alignSelect";
import {marginStart, marginEnd} from "./functions/onMargin";

const SYSTEM_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 172;

class MenuItem extends PureComponent {

    render() {
        const {
            renderItem,
            horizontal,
            offsetSelection,
            startMargin,
            endMargin,
            data,
            item,
            index,
            info,
            widthParent
        } = this.props;
        return (
            <View
                key={index}
                // onLayout={({ nativeEvent: { layout } }) => {
                //   this._save(index, layout, item, horizontal);
                //   if (this.countItems === data.length) {
                //     this.countItems = 0;
                //     this._alignAfterMount();
                //   } else {
                //     this.countItems = this.countItems + 1;
                //   }
                // }}
                style={{
                    marginLeft: marginStart(
                        horizontal,
                        index,
                        widthParent,
                        offsetSelection,
                        startMargin
                    ),
                    marginRight: marginEnd(
                        horizontal,
                        data.length - 1,
                        index,
                        widthParent,
                        offsetSelection,
                        endMargin
                    ),
                }}
            >
                {renderItem(info)}
            </View>

        );
    }
}

class SmoothPicker extends Component {
    widthParent = SYSTEM_WIDTH;
    onMomentum = false;
    fingerAction = false;
    options = [];

    state = {
        data: this.props.data,
        end: true,
        selected: this.props.initialScrollToIndex || 0,
        scrollPosition: null
    };

    constructor(props) {
        super(props);

        length = this.state.data.length;
        const data = this.state.data.slice();

        data.forEach((item, index) => {
            this.options[index] = {
                index: index,
                item: item,
                left: index * ITEM_WIDTH,
                right: (index + 1) * ITEM_WIDTH,
                layout: {
                    width: ITEM_WIDTH
                }
            }
        });
    }

    componentDidMount() {
        // if (this.props.initialScrollToIndex) {
        //   this.refs["smoothPicker"].scrollToIndex({ index: this.props.initialScrollToIndex, animated: true })
        // }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return nextState.selected !== this.state.selected;
    // }

    // _alignAfterMount = () => {
    //   try {
    //     const { horizontal, scrollAnimation, initialScrollToIndex } = this.props;
    //     if (typeof initialScrollToIndex !== "undefined") {
    //       const option = this.options[initialScrollToIndex];
    //       if (option) {
    //         alignSelect(
    //           horizontal,
    //           false,
    //           option,
    //           this.refs["smoothPicker"]
    //         );
    //       }
    //     }
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // };

    // _save = (index, layout, item, horizontal) => {
    //   this.options[index] = {
    //     layout,
    //     item,
    //     index
    //   };

    //   for (let index in this.options) {
    //     if (horizontal) {
    //       let left = this.options[index - 1] ? this.options[index - 1].right : 0;
    //       let right = this.options[index - 1]
    //         ? left + this.options[index].layout.width
    //         : this.options[index].layout.width;
    //       this.options[index].right = right;
    //       this.options[index].left = left;
    //     } else {
    //       let top = this.options[index - 1] ? this.options[index - 1].bottom : 0;
    //       let bottom = this.options[index - 1]
    //         ? top + this.options[index].layout.height
    //         : this.options[index].layout.height;
    //       this.options[index].bottom = bottom;
    //       this.options[index].top = top;
    //     }
    //   }
    // };

    _handleSelection = (item, index, scrollPosition, manual = false) => {
        this.setState({
            selected: index,
            scrollPosition: scrollPosition
        }, () => {
            if (manual == true) {
                this._handleManualSelection(index);
            }

            this.props.onSelected({item, index});
        });
    };

    _handleManualSelection = (index) => {
        alignSelect(
            this.props.horizontal,
            this.props.scrollAnimation,
            this.options[index],
            this.refs["smoothPicker"]
        );
    };

    onScroll = (item, index, scrollPosition) => {
        this.scrollData = {
            item, index, scrollPosition
        };
    };

    onScrollEnd = () => {
        if (this.scrollData) {
            this._handleSelection(this.scrollData.item, this.scrollData.index, this.scrollData.scrollPosition);

            alignSelect(
                this.props.horizontal,
                this.props.scrollAnimation,
                this.options[this.scrollData.index],
                this.refs["smoothPicker"]
            );

            this.scrollData = null;
        }
    };

    _renderItem = info => {
        const {
            renderItem,
            horizontal,
            offsetSelection,
            startMargin,
            endMargin
        } = this.props;
        const data = this.state.data;
        const {item, index} = info;

        return <MenuItem {...{
            renderItem,
            horizontal,
            offsetSelection,
            startMargin,
            endMargin,
            data,
            item,
            index,
            info,
            widthParent: this.widthParent
        }} />;

    };

    checkScroll({layoutMeasurement, contentOffset, contentSize}) {

        // if (this.state.data.length >= length * 3){
        //   this.setState(prevState => ({
        //     data: data.concat(prevState.data.slice(0,length))
        //   }))
        // }

        // if (contentOffset.x <= this.props.offset) {
        //   this.setState(prevState => ({
        //     data: [...prevState.data, ...data],
        //   }), () => this.infListRef.scrollToIndex({ index: length, animated: false }))
        // }
        // if (layoutMeasurement.width + contentOffset.x >= contentSize.width - this.props.offset && this.state.end) {
        //   this.setState(prevState => ({
        //     data: [...prevState.data, ...data],
        //     end: false
        //   }))
        // }
        // else {
        //   this.setState({
        //     end: true
        //   })
        // }
    }

    render() {
        const {horizontal, magnet, snapInterval, snapToAlignment, selectedItem} = this.props;


        let snap = {};
        if (snapInterval) {
            snap = {
                snapToInterval: snapInterval,
                snapToAlignment: snapToAlignment
            };
        }
        return (
            <FlatList
                {...this.props}
                // {...snap}
                data={this.state.data}
                // initialNumToRender={15}
                // initialScrollIndex={this.state.selected}
                //extraData={this.state}
                onLayout={({nativeEvent: {layout}}) => {
                    // this.widthParent = layout.width;

                    alignSelect(
                        true,
                        false,
                        this.options[this.props.initialScrollToIndex],
                        this.refs["smoothPicker"]
                    );
                }}
                onScroll={({nativeEvent}) => {
                    if (this.fingerAction) {
                        // this.checkScroll(nativeEvent);
                        onSelect(
                            nativeEvent,
                            this.scrollData ? this.scrollData.index : this.state.selected,
                            this.options,
                            this.onScroll,
                            this.scrollData ? this.scrollData.scrollPosition : this.state.scrollPosition,
                            horizontal
                        );
                    }
                }}
                getItemLayout={(data, index) => {
                    return {
                        length: ITEM_WIDTH, offset: index * ITEM_WIDTH, index
                    }
                }}
                onScrollBeginDrag={() => {
                    this.onMomentum = true;
                    this.fingerAction = true;
                }}
                onMomentumScrollEnd={() => {
                    this.fingerAction = false;
                    if (this.onMomentum && magnet && !snapInterval) {
                        this.onMomentum = false;
                        this.onScrollEnd();
                    }
                }}
                renderItem={this._renderItem}
                ref={"smoothPicker"}
            />
        );
    }
}

SmoothPicker.defaultProps = {
    onSelected: data => data,
    horizontal: false,
    offsetSelection: 0,
    decelerationRate: 0.85,
    magnet: false,
    scrollAnimation: false,
    snapInterval: null,
    snapToAlignment: "left",
    offset: 50
};

SmoothPicker.propTypes = {
    onSelected: PropTypes.func.isRequired,
    offsetSelection: PropTypes.number.isRequired,
    scrollAnimation: PropTypes.bool.isRequired,
    magnet: PropTypes.bool.isRequired,
    snapInterval: PropTypes.number,
    initialScrollToIndex: PropTypes.number,
    startMargin: PropTypes.number,
    endMargin: PropTypes.number,
    offset: PropTypes.number
};

export default SmoothPicker;
