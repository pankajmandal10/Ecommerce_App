import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/Colors';
import {useAppDispatch, useAppSelector} from '../../hokes';
import {STATUSES, signUpPost} from '../../store/redux/UserSlice';
import {vh, vw} from 'react-native-expo-viewport-units';
import CustomeLoading from '../../components/common/CustomeLoading';

interface SignUpProps {
  navigation: any;
}

const SignUp = (props: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Retrieve the callback function name on the SignIn screen
  const callbackName = props.navigation?.callback;

  // Convert the callback function name to a function object and call it
  if (callbackName) {
    const callback = eval(callbackName);
    callback();
  }

  const dispatch = useAppDispatch();
  const {user: user, status}: any = useAppSelector(state => state.user);

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
  const handleToSignUp = async () => {
    if (
      name != '' ||
      email != '' ||
      address != '' ||
      phone != '' ||
      password != ''
    ) {
      let userData = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        address: address,
      };
      await dispatch(signUpPost(userData))
        .then(response => {
          if (response.payload.error) {
            alert(response.payload.error);
          } else {
            props.navigation.navigate('SignIn', {props});
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert('Please fill the all details');
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      <Text
        style={{
          paddingVertical: 10,
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
        }}>
        SignUp
      </Text>
      <View style={styles.container1}>
        <ScrollView>
          <Image
            style={styles.imageStyle}
            source={require('../../images/cakelicious.png')}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#EECDAB"
            onChangeText={name => {
              setName(name);
            }}
            value={name}
            placeholder="Enter Name"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#EECDAB"
            onChangeText={email => {
              // Remove spaces and commas from input text
              const formattedEmail: any = email.replace(/[\s,]/g, '');
              setEmail(formattedEmail);
            }}
            value={email}
            placeholder="Enter Email Id..."
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#EECDAB"
            onChangeText={phone => {
              // Remove spaces and commas from input text
              const formattedPhone: any = phone.replace(/[\s,.]/g, '');
              setPhone(formattedPhone);
            }}
            maxLength={10}
            value={phone}
            placeholder="Enter Phone..."
            keyboardType="number-pad"
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={{
                flex: 1,
                paddingVertical: 10,
                fontSize: 16,
                color: Colors.WHITE,
              }}
              placeholderTextColor="#EECDAB"
              placeholder="Password..."
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry={!showPassword}
              value={password}
              enablesReturnKeyAutomatically
              onChangeText={password => {
                // Remove spaces and commas from input text
                const formattedPassword: any = password.replace(/[\s,]/g, '');
                setPassword(formattedPassword);
              }}
            />
            <TouchableOpacity style={styles.icon}>
              <MaterialIcons
                onPress={toggleShowPassword}
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={24}
                color={Colors.WHITE}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholderTextColor="#EECDAB"
            onChangeText={address => {
              setAddress(address);
            }}
            value={address}
            placeholder="Enter Address..."
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginVertical: 10,
              flexWrap: 'wrap',
              paddingHorizontal: 25,
            }}>
            <TouchableOpacity
              style={{
                ...styles.touchableButton,
                backgroundColor: Colors.WHITE,
              }}
              onPress={() => handleToSignUp()}>
              <Text
                style={{
                  ...styles.touchbleTextStyle,
                  color: Colors.BLACK,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={() => props.navigation.navigate('SignIn')}>
              <Text style={styles.touchbleTextStyle}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.PRIMERY_COLOR,
  },
  container1: {
    marginTop: vw(40),
    height: vh(70),
    backgroundColor: Colors.SECONDRY_COLOR,
    flex: 1,
    justifyContent: 'space-around',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    elevation: 20,
  },
  imageStyle: {
    alignSelf: 'center',
    width: vw(100),
    height: vh(12),
    resizeMode: 'center',
    margin: 5,
  },
  input: {
    height: 48,
    marginHorizontal: 35,
    marginVertical: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.WHITE,
    color: 'white',
    paddingRight: 25,
    paddingLeft: 25,
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
    borderColor: 'red',
    backgroundColor: Colors.WHITE,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginHorizontal: 35,
  },
  icon: {
    padding: 10,
  },
});
