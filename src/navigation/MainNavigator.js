import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Splash, Onboarding } from '../screens';

const stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <stack.Navigator
            initialRouteName='Splash'
            detachInactiveScreens
            screenOptions={{ headerShown: false }}
        >
            <stack.Screen name="Splash" component={Splash} />
            <stack.Screen name="Onboarding" component={Onboarding} />
        </stack.Navigator>
    );
};

export default MainNavigator