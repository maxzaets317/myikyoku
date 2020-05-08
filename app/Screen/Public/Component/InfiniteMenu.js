import React, { Fragment } from 'react'
import { Image, TouchableOpacity, Platform } from 'react-native'
import { View } from 'native-base'
import PathData from '@Screen/Public/Component/PathData'
import SmoothPicker from './SmoothPicker';

import NavigationService from '@Service/Navigation'

import Styles from '@Screen/Public/Component/Style'
import Style from '@Theme/Style'

import { getToken } from "../../../_actions/auth-action";
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';

class InfiniteMenu extends React.Component {
    state = {
        token: '',
        isPress: true,
        selectedIndex: 30
    };
    constructor(props) {
        super(props);
        this.props.getToken();
    }

    _handleOnCategory() {
        this.props.onShowOverlay(this.state.isPress);
        this.setState({ isPress: !this.state.isPress });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isPress: !nextProps.isPress,
        });

        if (nextProps.selectedIndex % 5 != this.state.selectedIndex % 5) {
            const index = this.state.selectedIndex - this.state.selectedIndex % 5 + nextProps.selectedIndex % 5;
            this.selectItemManually(PathData[index], index);
        }
    }

    selectItemManually = (item, index) => {
        this.refs.myref._handleSelection(item, index, null, true);
        this.setState({
            selectedIndex: index
        }, () => {
            this.props.onChangeItem(item.index)
        });
    }

    render() {
        return <View style={Style.menuWrapper}>
            <SmoothPicker
                {...this.props}
                magnet
                scrollAnimation
                snapToAlignment={'start'}
                onSelected={({ item, index }) => {
                    this.setState({
                        selectedIndex: index
                    }, () => {
                        this.props.onChangeItem(item.index);
                    });
                }}
                style={[Style.menu, { backgroundColor: "#ccc" }]}
                data={PathData}
                initialScrollToIndex={this.state.selectedIndex}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    if (item.index == this.state.selectedIndex % 5)
                        return <TouchableOpacity style={Styles.mFocusButton} activeOpacity={1} underlayColor='transparent' onPress={() => {
                                this.setState({
                                    selectedIndex: index
                                });
                                this.props.onClickSelected(item.index);
                            }}>
                                {
                                    item.icon
                                        ? <View style={Styles.multiComLine}>
                                            {(() => {
                                                switch (item.title) {
                                                    case 'NEWS':
                                                        return <View style={Styles.flex9}><Image source={require('@Asset/images/news_service_logo_enable.png')}
                                                                                                style={[Styles.iconPosition, { height: 22, width: 82, marginLeft:15 }]} /></View>
                                                    case 'RSS':
                                                        return <View style={Styles.flex9}><Image source={require('@Asset/images/rss_service_logo_enable.png')}
                                                                                                 style={[Styles.iconPosition, { height: 22, width: 55, marginLeft:25 }]} /></View>
                                                    default:
                                                        return null;
                                                }
                                            })()}

                                            {
                                                item.title == 'RSS' || item.title == 'NEWS'
                                                    ? <TouchableOpacity style={{backgroundColor: 'transparent', marginRight: -10, height: 20, width: 20}} onPress={() => { this._handleOnCategory() }}><Image source={this.state.isPress ? require('@Asset/images/enclose_down_triangle_enable.png') : require('@Asset/images/enclose_up_triangle_enable.png')}
                                                        style={{ height: 20, width: 20 }} /></TouchableOpacity> : <Fragment></Fragment>
                                            }
                                        </View>
                                        : <View style={Styles.multiComLine}>
                                            {(() => {
                                                switch (item.title) {
                                                    case 'Magazine':
                                                        return <Image source={require('@Asset/images/doctor_magazine_service_logo_enable.png')}
                                                            style={[Styles.iconPosition, Styles.iconButton]} />;
                                                    case '民間医局':
                                                        return <Image source={require('@Asset/images/ikyoku_service_logo_enable.png')}
                                                            style={[Styles.iconPosition, Styles.iconButton]} />;
                                                    case 'レジナビ':
                                                        return <Image source={require('@Asset/images/residentnavi_service_logo_enable.png')}
                                                            style={[Styles.iconPosition, Styles.iconButton]} />;
                                                    default:
                                                        return null;
                                                }
                                            })()}
                                        </View>
                                }
                            </TouchableOpacity>
                    else
                        return <TouchableOpacity style={Styles.mButton} underlayColor='transparent' activeOpacity={1} onPress={() => {
                            this.selectItemManually(item, index);
                        }}>
                            {
                                index !== 39 && this.state.selectedIndex && item.index == (this.state.selectedIndex - 1) % 5 ? <Image source={require('@Asset/images/left_triangle.png')}
                                       style={{position: 'absolute', right: 0, height: 45, width: 30}}/> : <Fragment />
                            }
                            {
                                item.icon
                                    ? <View style={Styles.multiComLine}>
                                        {(() => {
                                            switch (item.title) {
                                                case 'NEWS':
                                                    return <View style={Styles.flex9}><Image source={require('@Asset/images/news_service_logo_disable.png')}
                                                                                             style={[Styles.iconPosition, { height: 22, width: 82, marginLeft:15 }]} /></View>
                                                case 'RSS':
                                                    return <View style={Styles.flex9}><Image source={require('@Asset/images/rss_service_logo_disable.png')}
                                                                                             style={[Styles.iconPosition, { height: 22, width: 55, marginLeft:25 }]} /></View>
                                                default:
                                                    return null;
                                            }
                                        })()}
                                        {
                                            item.title == 'RSS' || item.title == 'NEWS'
                                                ? <Image source={require('@Asset/images/enclose_down_triangle_disable.png')}
                                                    onPress={() => { this._handleOnCategory() }} style={[Styles.caretPosition, { marginLeft: -10, height: 20, width: 20}]} /> : <Fragment></Fragment>
                                        }
                                    </View>
                                    : <View style={Styles.multiComLine}>
                                        {(() => {
                                            switch (item.title) {
                                                case 'Magazine':
                                                    return <Image source={require('@Asset/images/doctor_magazine_service_logo_disable.png')}
                                                        style={[Styles.iconPosition, Styles.iconButton]} />;
                                                case '民間医局':
                                                    return <Image source={require('@Asset/images/ikyoku_service_logo_disable.png')}
                                                        style={[Styles.iconPosition, Styles.iconButton]} />;
                                                case 'レジナビ':
                                                    return <Image source={require('@Asset/images/residentnavi_service_logo_disable.png')}
                                                        style={[Styles.iconPosition, Styles.iconButton]} />;
                                                default:
                                                    return null;
                                            }
                                        })()}
                                    </View>
                            }
                            {
                                index !== 0 && item.index == (this.state.selectedIndex + 1) % 5 ? <Image source={require('@Asset/images/right_triangle.png')}
                                       style={{position: 'absolute', left: 0, height: 45, width: 30}}/> : <Fragment />
                            }
                        </TouchableOpacity>
                }}
                ref="myref"
            />
        </View>
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
};

const mapDispatchToProps = (dispatch) => ({
    getToken: () => dispatch(getToken()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(InfiniteMenu);
