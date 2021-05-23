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
        }).start(({ finished }) => {
            checkRouteToGo()
        })
    }

    const checkRouteToGo = async () => {
        try {
            let notFirstTime = await storage.load({ key: 'NOTFIRSTTIME' });
            if (notFirstTime) {
                try {
                    let token = await storage.load({ key: 'TOKEN' })
                    if (token) {
                        navigation.navigate("Home")
                    }
                } catch (error) {
                    navigation.navigate("Signup")
                }
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