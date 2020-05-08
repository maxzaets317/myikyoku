import React from 'react';
import PublicSplash from './Splash'
import NavigationService from '@Service/Navigation'
import {AsyncStorage} from "react-native";

export default class SplashScreen extends React.Component {
  componentWillMount() {
    setTimeout(() => {
      AsyncStorage.getItem('token')
        .then((value) => {
          if (value) {
            NavigationService.navigate('PublicMain')
          }
          else {
            NavigationService.navigate('PublicLogin')
          }
        });

    }, 2000) //TIME OF WAITING
  }
  render() {
    return (
        <PublicSplash />
    )
  }
}
