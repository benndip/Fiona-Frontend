import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

import styles from './Home.style';

const Home = () => {
  return (
    <View style={styles.container}>
      <WebView source={{uri: 'https://easycal.io/#/?onboard=true'}} />
    </View>
  );
};

export default Home;
