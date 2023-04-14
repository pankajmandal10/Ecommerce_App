import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../theme/Colors';
import BottomSheet from '../BottomSheet';
import {useAppDispatch, useAppSelector} from '../../hokes';
import {signInPost, STATUSES} from '../../store/redux/UserSlice';
import {vw, vh} from 'react-native-css-vh-vw';

import {StackActions} from '@react-navigation/native';
import {setAsyncItem} from '../../services';
import CustomeLoading from '../../components/common/CustomeLoading';

interface SignInProps {
  navigation: any;
}

const SignIn = (props: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const dispatch = useAppDispatch();

  // Retrieve the callback function name on the SignIn screen
  const callbackName = props.navigation?.callback;

  // Convert the callback function name to a function object and call it
  if (callbackName) {
    const callback = eval(callbackName);
    callback();
  }

  const {loginUser: loginUser, status}: any = useAppSelector(
    state => state.loginUser,
  );
  const {height} = useWindowDimensions();
  const bottomSheetRef: any = useRef();

  const pressHandler = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []);

  const handleSignIn = async () => {
    if (email !== '' || password !== '') {
      let data = {
        email: email,
        password: password,
      };
      await dispatch(signInPost(data))
        .then(async response => {
          if (response.payload.error) {
            alert(response.payload.error);
          } else {
            await setAsyncItem('loginCredentials', 1);
            props.navigation.dispatch(StackActions.replace('Main'));
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert('Please fill the all details');
    }
  };

  if (status === STATUSES.LOADING) {
    return (
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          alignSelf: 'center',
        }}>
        <CustomeLoading />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            paddingVertical: 10,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
          }}>
          SignIn
        </Text>
        <View style={styles.container1}>
          <ScrollView>
            <Image
              style={styles.imageStyle}
              source={require('../../images/cake2.png')}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#EECDAB"
              onChangeText={email => {
                setEmail(email);
              }}
              value={email}
              placeholder="Email id..."
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#EECDAB"
              placeholder="Password..."
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry
              value={password}
              enablesReturnKeyAutomatically
              onChangeText={password => setPassword(password)}
            />
            <TouchableOpacity onPress={() => pressHandler()}>
              <Text style={styles.forgotPass}>Forgot Password?</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginVertical: 20,
                flexWrap: 'wrap',
                paddingHorizontal: 25,
              }}>
              <TouchableOpacity
                style={{
                  ...styles.touchableButton,
                  backgroundColor: Colors.WHITE,
                }}
                onPress={() => {
                  handleSignIn();
                }}>
                <Text
                  style={{
                    ...styles.touchbleTextStyle,
                    color: Colors.BLACK,
                  }}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() =>
                  // Navigate to SignIn screen with callback function name
                  props.navigation.navigate('SignUp', {
                    callback: 'performSignUp',
                  })
                }>
                <Text style={styles.touchbleTextStyle}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* Bottom sheet show on button call only */}
      <BottomSheet
        ref={bottomSheetRef}
        activeHeight={height * 0.5}
        backgroundColor={'#08A092'}
        backDropColor={'black'}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Enter Your Email</Text>
            <TextInput
              style={{...styles.input, width: '100%', alignSelf: 'center'}}
              placeholderTextColor="#EECDAB"
              onChangeText={email => {
                setForgotEmail(email);
              }}
              value={forgotEmail}
              placeholder="Enter Email..."
            />
            <TouchableOpacity
              style={{...styles.touchableButton, alignSelf: 'center'}}
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={styles.touchbleTextStyle}>Submite</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View></View>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.PRIMERY_COLOR,
  },
  container1: {
    marginTop: '50%',
    height: '50%',
    backgroundColor: Colors.SECONDRY_COLOR,
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    elevation: 20,
  },
  imageStyle: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'center',
    margin: 5,
    // flex: 1,
  },
  input: {
    height: 48,
    marginHorizontal: 35,
    marginVertical: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    borderColor: Colors.WHITE,
    color: 'white',
    paddingRight: 25,
    paddingLeft: 25,
  },
  forgotPass: {
    textAlign: 'right',
    flexDirection: 'row-reverse',
    fontSize: 16,
    color: 'white',
    marginLeft: 55,
  },
  buttonSignIn: {
    width: 150,
    color: Colors.WHITE,
    borderRadius: 25,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    // marginHorizontal: 35,
    borderColor: Colors.WHITE,
  },
  buttonSignUP: {
    width: 150,
    color: Colors.BLACK,
    borderRadius: 25,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    // marginHorizontal: 35,
    borderColor: 'red',
    backgroundColor: Colors.WHITE,
  },

  container2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContaier: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContaierExample2: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: undefined,
    aspectRatio: 1,
  },
  imageExample2: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.65636588,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  buttonText: {
    color: '#DAD3C8',
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
  textPrice: {
    color: '#000000',
    marginVertical: 20,
    fontSize: 16,
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
