import { StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.PRIMARY_COLOR
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 90
  },
  txt: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default styles;