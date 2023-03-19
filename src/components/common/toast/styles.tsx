import {StyleSheet} from 'react-native';
import Colors from '../../../theme/Colors';

const styles = StyleSheet.create({
  commonToastStyle: {
    height: 52,
    backgroundColor: 'red',
    borderRadius: 8,
    margin: 8,
    padding: 16,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 100,
  },
  topToastStyle: {
    backgroundColor: '#FCFCFC',
    top: 0,
  },
  bottomToastStyle: {
    backgroundColor: '#0D333E',
    bottom: 45,
    paddingBottom: 7,
    borderLeftWidth: 7,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.SECONDRY_COLOR,
  },
  button: {
    backgroundColor: '#FCFCFC',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    margin: 8,
  },
});

export default styles;
