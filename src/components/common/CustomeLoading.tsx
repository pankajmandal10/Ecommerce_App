import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../theme/Colors';
import Spinner from 'react-native-loading-spinner-overlay';

function CustomeLoading() {
  const [color, setColor] = useState('teal');
  return (
    <Spinner
      visible={true}
      overlayColor="rgba(0, 0, 0, 0.5)"
      textStyle={{color: '#222'}}
      color={Colors.SECONDRY_COLOR}
      animation="fade"
      size="large"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomeLoading;
