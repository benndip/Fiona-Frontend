import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import styles from './Login.style';

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const [loading, setLoading] = useState(false)

  const textInputChange = value => {
    if (value.length !== 0 && _validateEmail(value)) {
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
    if (value.length !== 0) {
      setData({
        ...data,
        password: value,
        check_textInputChange: false,
      });
    } else {
      setData({
        ...data,
        password: value,
        check_textInputChange: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleLogin = () => {
    setLoading(true)
    let userData = {
      email: data.email,
      password: data.password,
    }
    console.log(JSON.stringify(userData))
    fetch('http://192.168.0.109:8000/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then((response) => {
      const statusCode = response.status;
      const responseJson = response.json();
      return Promise.all([statusCode, responseJson]);
    })
      .then((res) => {
        const statusCode = res[0];
        const responseJson = res[1];
        if (statusCode == 200) {
          storage.save({
            key: 'TOKEN',
            data: responseJson.access_token,
            expires: 1000 * 3600 * 24 * 365,
          });
          Alert.alert(
            `🌟Login Successful🌟`,
            ` Welcome to NutrimentFact.. where you track your growth🙌`,
            [
              { text: `Get Home`, onPress: () => navigation.navigate('DrawerNaigation') },
            ],
            { cancelable: false },
          )
        } else if (statusCode == 422) {
          Alert.alert(`Invalid parameters`, _gen422Errors(responseJson));
        } else if (statusCode == 401) {
          Alert.alert(`Error`, responseJson.error);
        } 
         else {
          Alert.alert('Please check your internet connection and try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false)
      }).finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View useNativeDriver={true} animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={value => textInputChange(value)}
            value={data.email}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={value => handlePasswordChange(value)}
            value={data.password}
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
          {
            !loading
              ?
              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={handleLogin}
              >
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={[styles.signIn]}>
                  <Text style={[styles.textSign, { color: 'white' }]}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
              :
              <ActivityIndicator color='#009387' size='large' />
          }

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={[
              styles.signIn,
              { borderColor: '#009387', borderWidth: 1, marginTop: 15 },
            ]}>
            <Text style={[styles.textSign, { color: '#009387' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Login;
