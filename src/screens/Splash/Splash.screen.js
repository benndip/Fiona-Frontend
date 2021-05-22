import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { View, Text, StatusBar, Animated } from 'react-native'


import styles from './Splash.style'
import theme from '../../theme'

const Splash = ({ navigation }) => {

    const opacity = useRef(new Animated.Value(0)).current

    const animateOpacity = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1600,
            useNativeDriver: true
        }).start()
    }

    const checkRouteToGo = async () => {
        try {
            let notFirstTime = await storage.load('NOTFIRSTTIME');
            if (notFirstTime) {
                navigation.navigate("Home")
            }
        } catch (error) {
            storage.save({
                key: 'NOTFIRSTTIME',
                data: true,
                expires: 1000 * 3600 * 24 * 365,
              });
            navigation.navigate("Onboarding")
        }
    }

    useEffect(() => {
        animateOpacity()
        checkRouteToGo()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
            <Animated.Image
                source={require('../../../res/ecbc_logo.png')}
                style={[styles.logo, { opacity }]}
            />
            <Animated.Text style={[styles.txt, { opacity }]}>Nutriment Facts</Animated.Text>
        </View>
    )
}

export default Splash