import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {vw, vh} from 'react-native-css-vh-vw';
import Colors from '../../theme/Colors';
import {StackActions, useIsFocused} from '@react-navigation/native';

interface SignIn_SingUpProps {
  navigation: any;
}
const SignIn_SingUp = (props: SignIn_SingUpProps) => {
  const onPress = (route: string) => {
    props.navigation.dispatch(
      StackActions.replace(route, {callback: 'performSignIn'}),
    );
    // props.navigation.navigate(route, props.navigation);
  };
  return (
    <View style={{...styles.container}}>
      <Image
        style={styles.imageStyle}
        source={require('../../images/cake2.png')}
      />
      <Text style={styles.title}>Welcome to our store !</Text>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={styles.touchableButton}
          onPress={() => onPress('SignIn')}>
          <Text style={styles.touchbleTextStyle}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableButton}
          onPress={() => onPress('SignUp')}>
          <Text style={styles.touchbleTextStyle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn_SingUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.PRIMERY_COLOR,
  },
  title: {
    fontSize: 24,
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 16,
  },
  imageStyle: {
    alignSelf: 'center',
    width: 140,
    height: 140,
    resizeMode: 'center',
    margin: 5,
  },
  button: {
    width: 159,
    color: Colors.WHITE,
    borderRadius: 23,
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    fontWeight: '800',
    marginVertical: 10,
    marginHorizontal: 4,
    borderColor: Colors.WHITE,
  },
  touchableButton: {
    width: vw(40),
    borderRadius: 30,
    alignItems: 'center',
    borderColor: Colors.WHITE,
    borderWidth: 2,
    padding: 10,
    marginVertical: 10,
  },
  touchbleTextStyle: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: '800',
  },
});
