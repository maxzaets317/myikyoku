import React from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Modal } from 'react-native';
import Pulse from './Pulse';


export default class LocationPulseLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            circles: []
        };

        this.counter = 1;
        this.anim = new Animated.Value(1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading) {
            this.counter =  1;
            this.setCircleInterval();
        }
    }

    setCircleInterval() {
        this.state = {
            circles: []
        };
        setTimeout(() => {this.addCircle();}, 50);
        setTimeout(() => {this.addCircle();}, 200);
    }

    addCircle() {
        this.setState({ circles: [...this.state.circles, this.counter] });
        this.counter++;
    }

    render() {
        const { size, avatar, avatarBackgroundColor, interval } = this.props;

        return (
            <Modal
                transparent={true}
                visible={this.props.loading}
                animationType='fade'
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {this.state.circles.map((circle, index) => (
                    <Pulse
                        key={index}
                        {...this.props}
                    />
                ))}

                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        transform: [{
                            scale: this.anim
                        }],
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        backgroundColor: '#00000040',
                    }}
                >
                    <View
                        style={{
                            width: size,
                            height: size,
                            borderRadius: size/2,
                            backgroundColor: 'black',
                            opacity: 0.8,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{
                            fontSize: 36,
                            fontFamily: 'NotoSansCJKjp-Bold',
                            color: 'white',
                        }}>
                            CLIP!
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                        }}>
                            myCLIPに
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                        }}>
                            追加しました
                        </Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}
LocationPulseLoader.defaultProps = {
    interval: 600,
    size: 150,
    pulseMaxSize: 360,
    avatarBackgroundColor: 'black',
    pressInValue: 0.5,
    pressDuration: 500,
    pressInEasing: Easing.in,
    pressOutEasing: Easing.in,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    getStyle: undefined,
};