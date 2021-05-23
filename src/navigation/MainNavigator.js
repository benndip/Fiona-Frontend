import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Splash, Onboarding, Signup, Login, } from '../screens';
import DrawerNaigation from './DraweNavigation'

const stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <stack.Navigator
      initialRouteName="Splash"
      detachInactiveScreens
      screenOptions={{ headerShown: false }}>
      <stack.Screen name="Splash" component={Splash} />
      <stack.Screen name="Onboarding" component={Onboarding} />
      <stack.Screen name="Signup" component={Signup} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="DrawerNaigation" component={DrawerNaigation} />
    </stack.Navigator>
  );
};

export default MainNavigator;
