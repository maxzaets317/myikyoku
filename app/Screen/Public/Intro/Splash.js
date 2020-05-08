import React from 'react';
import { StatusBar, View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Footer, FooterTab } from 'native-base'

import Style from '@Theme/Style'

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 170,
    alignItems: 'stretch',
    resizeMode: 'stretch',
  },
  footerText: {
    color: '#666666',
    fontSize: 10,
    position: 'absolute',
    bottom: 20
  }
});

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Image style={styles.image} source={require('@Asset/images/intro.png')} />
        <ActivityIndicator color={'white'} />
        <Text style={styles.footerText}>©MEDICAL PRINCIPLE CO.,LTD. ALL RIGHTS RESERVED</Text>
      </View>
    )
  }
}