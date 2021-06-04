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
      source={{uri: `https://nutriment-fact.herokuapp.com/`}}
      renderLoading={Load}
      startInLoadingState={true}
    />
  );
};

export default Home;
