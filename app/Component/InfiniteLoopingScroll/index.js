import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types'

export default class InfiniteScroll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            end: true,
        }
        length = this.state.data.length
        data = this.state.data.slice()
    }
    checkScroll({ layoutMeasurement, contentOffset, contentSize }) {

        if (this.state.data.length >= length * 3)
            this.setState(prevState => ({
                data: data.concat(prevState.data.slice(length))
            }))

        if (contentOffset.x <= this.props.offset) {
            this.setState(prevState => ({
                data: [...prevState.data, ...data],
            }), () => this.infListRef.scrollToIndex({ index: length, animated: false }))
        }
        if (layoutMeasurement.width + contentOffset.x >= contentSize.width - this.props.offset && this.state.end) {
            this.setState(prevState => ({
                data: [...prevState.data, ...data],
                end: false
            }))
        }
        else {
            this.setState({
                end: true
            })
        }

    }
    
    componentDidMount() {
        this.setState(prevState => ({
            data: [...prevState.data, ...prevState.data]
        }))
    }
    
    render() {
        return (
            <FlatList
                {...this.props}
                ref={(ref) => { this.infListRef = ref; }}
                data={this.state.data}
                renderItem={this.props.renderItem}
                onScroll={({ nativeEvent }) => this.checkScroll(nativeEvent)}
                showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
            />
        );
    }
}

InfiniteScroll.propTypes = {
    offset: PropTypes.number,
    showsHorizontalScrollIndicator: PropTypes.bool
}

InfiniteScroll.defaultProps = {
    offset: 20,
    showsHorizontalScrollIndicator: false
};
