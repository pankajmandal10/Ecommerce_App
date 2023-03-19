import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TextInput} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../components/common/Button';
import Colors from '../../theme/Colors';
import {vw, vh} from 'react-native-css-vh-vw';
import {useAppDispatch} from '../../hokes';
import {signUpPost} from '../../store/redux/UserSlice';
import {number} from 'prop-types';

interface SignUpProps {
  navigation: any;
}

const SignUp = (props: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useAppDispatch();
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
      dispatch(signUpPost(userData))
        .then(async response => {
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
            source={require('../../images/cake2.png')}
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
              setEmail(email);
            }}
            value={email}
            placeholder="Enter Email Id..."
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#EECDAB"
            onChangeText={phone => {
              setPhone(phone);
            }}
            value={phone}
            placeholder="Enter Phone..."
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#EECDAB"
            placeholder="Enter Password..."
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            secureTextEntry
            value={password}
            enablesReturnKeyAutomatically
            onChangeText={password => setPassword(password)}
          />
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
            <Button
              onPress={handleToSignUp}
              title="Sign Up"
              style={styles.buttonSignUP}
            />
            <Button
              onPress={() => props.navigation.navigate('SignIn')}
              title="Sign In"
              style={styles.buttonSignIn}
            />
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
    borderRadius: 15,
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
    // marginHorizontal: 35,
    borderColor: 'red',
    backgroundColor: Colors.WHITE,
  },
});
