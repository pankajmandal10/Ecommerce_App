import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {vw, vh} from 'react-native-css-vh-vw';
import Button from '../components/common/Button';
import CustomeLoading from '../components/common/CustomeLoading';
import {useAppDispatch, useAppSelector} from '../hokes';
import {getAsyncItem} from '../services';
import {getLoggedUser, STATUSES} from '../store/redux/UserSlice';
import Colors from '../theme/Colors';
import ErrorNetwork from '../components/common/ErrorNetwork';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen = (props: ProfileScreenProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const readItemFromStorage = async () => {
    const savedUser = await getAsyncItem('loggedData');
    dispatch(getLoggedUser(savedUser.savedUser._id));
  };
  useEffect(() => {
    readItemFromStorage();
  }, []);

  const {user: user, status}: any = useAppSelector(state => state.user);

  if (status === STATUSES.LOADING || loading === true) {
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

  if (status === STATUSES.ERROR) {
    return <Text>Something went wrong!</Text>;
  }

  const handleSignOut = async () => {
    setLoading(true);
    await AsyncStorage.removeItem('loginCredentials');
    props.navigation.dispatch(StackActions.replace('Main'));
  };
  return (
    <ErrorNetwork>
      <>
        <View
          style={{
            flexDirection: 'row',
            // flex: 1,
            margin: 10,
            width: '100%',
            justifyContent: 'space-around',
          }}>
          <Image
            style={styles.imageStyle}
            source={require('../images/user.png')}
          />
          <View
            style={{
              flex: 3,
              paddingHorizontal: 10,
              marginVertical: 12,
            }}>
            <Text style={styles.textStyle}>{user?.name}</Text>
            <Text style={{...styles.textStyle, fontSize: 15}}>
              {user?.email}
            </Text>
            <Text
              style={{
                ...styles.textStyle,
                fontSize: 15,
                textDecorationLine: 'underline',
                color: 'red',
                paddingVertical: 5,
              }}>
              View activity
            </Text>
          </View>
        </View>
        <View
          style={{width: '100%', padding: 0.2, backgroundColor: 'red'}}></View>
        <View style={{margin: 12}}>
          <Text style={{fontSize: 14, fontFamily: '#f1f1f1', color: 'gray'}}>
            ONLINE ORDERING
          </Text>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontSize: 18,
                paddingHorizontal: 5,
                marginVertical: 10,
                color: 'black',
              }}>
              Order History
            </Text>
            <View
              style={{
                width: '100%',
                padding: 0.2,
                marginVertical: 10,
                backgroundColor: 'red',
              }}></View>
            <Text style={{fontSize: 18, paddingHorizontal: 5, color: 'black'}}>
              My address
            </Text>
            <Text style={{fontSize: 16, paddingHorizontal: 5, color: 'gray'}}>
              {user.address}
            </Text>
            <View
              style={{
                width: '100%',
                padding: 0.1,
                marginVertical: 15,
                backgroundColor: 'red',
              }}></View>
            <Text style={{fontSize: 18, paddingHorizontal: 5, color: 'black'}}>
              Favorite Orders
            </Text>
            <View
              style={{
                width: '100%',
                padding: 0.1,
                marginVertical: 15,
                backgroundColor: 'red',
              }}></View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: 10,
            justifyContent: 'flex-end',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => handleSignOut()}>
            <Text style={styles.touchbleTextStyle}>Log out</Text>
          </TouchableOpacity>
        </View>
      </>
    </ErrorNetwork>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    width: vw(28),
    height: vw(28),
    resizeMode: 'center',
    padding: 10,
    borderRadius: 100,
    borderColor: 'red',
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 19,
    padding: 3,
    color: 'black',
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
  touchableButton: {
    width: vw(40),
    borderRadius: 20,
    alignItems: 'center',
    borderColor: Colors.WHITE,
    borderWidth: 2,
    padding: 9,
    marginVertical: 10,
    backgroundColor: Colors.DARK_SECONDRY_COLOR,
  },
  touchbleTextStyle: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});
