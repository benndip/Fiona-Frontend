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
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Signup = ({ navigation }) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    password_confirmation: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
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

  const handleName = value => {
    if (value.length !== 0) {
      setData({
        ...data,
        userName: value,
        check_textInputChange: false,
      });
    } else {
      setData({
        ...data,
        userName: value,
        check_textInputChange: false,
      });
    }
  }

  const handlePhone = (value) => {
    if (value.length !== 0) {
      setData({
        ...data,
        phone: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        phone: value,
        check_textInputChange: false,
      });
    }
  }

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

  const handleConfirmPasswordChange = value => {
    if (value.length !== 0) {
      setData({
        ...data,
        password_confirmation: value,
        check_textInputChange: false,
      });
    } else {
      setData({
        ...data,
        password_confirmation: value,
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
  const UpdateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleSignUp = () => {
    setLoading(true)
    let userData = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      phone: data.phone
    }
    console.log(JSON.stringify(userData))
    fetch('http://192.168.0.109:8000/api/auth/register', {
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
            key: 'USER',
            data: responseJson.user,
            expires: 1000 * 3600 * 24 * 365,
          });
          Alert.alert(
            `🌟Register Successful🌟`,
            ` You can now login🙌`,
            [
              { text: `login`, onPress: () => navigation.navigate('Login') },
            ],
            { cancelable: false },
          )
        } else if (statusCode == 422) {
          Alert.alert(`Invalid parameters`, _gen422Errors(responseJson));
        } else {
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
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <ScrollView >
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Now !</Text>
        </View>

        <Animatable.View useNativeDriver={true} animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <Ionicons name="person-outline" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={value => handleName(value)}
              value={data.userName}
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 10 }]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={value => textInputChange(value)}
              value={(data.email)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) :
              (!data.check_textInputChange && data.email.length > 0) ? (
                <Animatable.View animation="bounceIn">
                  <AntDesign name="closecircleo" color="red" size={20} />
                </Animatable.View>
              ) : null
            }
          </View>

          <Text style={[styles.text_footer, { marginTop: 10 }]}>Contact</Text>
          <View style={styles.action}>
            <AntDesign name="contacts" color="#05375a" size={20} />
            <TextInput
              placeholder="phone"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={value => handlePhone(value)}
              value={data.phone}
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 10 }]}>Password</Text>
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

          <Text style={[styles.text_footer, { marginTop: 10 }]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Password"
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              onChangeText={value => handleConfirmPasswordChange(value)}
              value={data.password_confirmation}
            />
            <TouchableOpacity onPress={UpdateConfirmSecureTextEntry}>
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
                  style={styles.signIn}
                  onPress={handleSignUp}
                >
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}>
                    <Text style={[styles.textSign, { color: 'white' }]}>Sign Up</Text>
                  </LinearGradient>
                </TouchableOpacity>
                :
                <ActivityIndicator color='#009387' size='large' />
            }

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={[
                styles.signIn,
                { borderColor: '#009387', borderWidth: 1, marginTop: 15 },
              ]}>
              <Text style={[styles.textSign, { color: '#009387' }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 10
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
