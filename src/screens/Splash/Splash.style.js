import { StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 90
  },
  txt: {
    color: 'indigo',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default styles;