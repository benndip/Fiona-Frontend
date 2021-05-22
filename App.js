import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {enableScreens} from 'react-native-screens'
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
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;