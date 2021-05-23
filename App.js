import React, { useRef, useEffect } from 'react';
import { ToastAndroid, BackHandler } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens'
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

import MainNavigator from './src/navigation/MainNavigator';
enableScreens()

global.storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: 1000 * 3600 * 24 * 366,
  enableCache: true,
});

global._validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

global._gen422Errors = errors => {
  return Object.values(Object.entries(errors)[1][1]).map(error => error[0]).toString();
}

const App = () => {
  let clicks = 0
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const backAction = () => {
    if (navigationRef.current.getCurrentRoute().name === 'Home') {
      ToastAndroid.show(
        'click again to exit NutrimentFact',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
      if (clicks > 0) {
        BackHandler.exitApp()
      } else {
        clicks++
      }
      setTimeout(() => {
        clicks = 0
      }, 1500);
      return true
    }
    return false
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
    >
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;