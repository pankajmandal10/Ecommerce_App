import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Button from '../../components/common/Button';
import Colors from '../../theme/Colors';
import {StackActions, useIsFocused} from '@react-navigation/native';

interface SignIn_SingUpProps {
  navigation: any;
}
const onPress = () => {};
const SignIn_SingUp = (props: SignIn_SingUpProps) => {
  const onPress = (route: string) => {
    props.navigation.dispatch(StackActions.replace(route, props.navigation));
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
        <Button
          onPress={() => onPress('SignIn')}
          title="Sign In"
          style={styles.button}
        />
        <Button
          onPress={() => onPress('SignUp')}
          title="Sign Up"
          style={styles.button}
        />
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
});
