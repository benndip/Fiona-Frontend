import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {enableScreens} from 'react-native-screens'

import MainNavigator from './src/navigation/MainNavigator';
enableScreens()

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;