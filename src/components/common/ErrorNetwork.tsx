import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {vw, vh} from 'react-native-css-vh-vw';
import Colors from '../../theme/Colors';
import NetInfo from '@react-native-community/netinfo';

interface ErrorNetworkProps {
  isNetworkConnected: Boolean;
}

const ErrorNetwork = ({children}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  };
  return (
    <View style={{flex: 1}}>
      {isConnected ? (
        children
      ) : (
        <View style={styles.container}>
          <Image
            style={{
              width: 190,
              height: 190,
              alignSelf: 'center',
              resizeMode: 'center',
            }}
            source={require('../../images/error.png')}
          />
          <Text
            style={{
              ...styles.textStyle,
              fontWeight: '800',
              fontSize: 22,
              color: 'black',
            }}>
            Connection Error
          </Text>
          <Text style={styles.textStyle}>
            Oops! Looks like your device is not connected to the internet
          </Text>
          {/* <TouchableOpacity onPress={() => init()}>
            <Ionicons
              name="reload-circle-sharp"
              size={50}
              color={Colors.DARK_SECONDRY_COLOR}
            />
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

export default ErrorNetwork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMERY_COLOR,
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#CE3C21',
    fontWeight: '600',
    paddingVertical: 10,
  },
  textContainer: {
    marginHorizontal: 20,
  },
  text: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
  },
  textExample2: {
    color: '#000000',
    fontSize: 26,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  touchableButton: {
    width: vw(40),
    borderRadius: 30,
    alignItems: 'center',
    borderColor: Colors.WHITE,
    borderWidth: 2,
    padding: 8,
    marginVertical: 10,
  },
  touchbleTextStyle: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});
