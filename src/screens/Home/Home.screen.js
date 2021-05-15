import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

import styles from './Home.style';

const Load = () => {
  return <ActivityIndicator color="grey" size="large" />;
};

const Home = () => {
  return (
    <WebView
      // styles={{width: '100%'}}
      source={{uri: '192.168.0.101:3000'}}
      renderLoading={Load}
      startInLoadingState={true}
    />
  );
};

export default Home;
