import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
} from 'react-native';
import {WebView} from 'react-native-webview';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import styles from './Login.style';

const Login = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = value => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = value => {
    setData({
      ...setData,
      password: value,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const OpenWeb = () => {
    return <WebView source={{uri: 'https://google.com'}} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={value => textInputChange(value)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={value => handlePasswordChange(value)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={15} />
            ) : (
              <Feather name="eye" color="grey" size={15} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => navigation.navigate('Home')}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={[styles.signIn]}>
              <Text style={[styles.textSign, {color: 'white'}]}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={[
              styles.signIn,
              {borderColor: '#009387', borderWidth: 1, marginTop: 15},
            ]}>
            <Text style={[styles.textSign, {color: '#009387'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Login;
