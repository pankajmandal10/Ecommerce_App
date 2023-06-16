import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import {vw, vh} from 'react-native-css-vh-vw';
import CustomeLoading from '../components/common/CustomeLoading';
import {useAppDispatch, useAppSelector} from '../hokes';
import {getAsyncItem} from '../services';
import {getLoggedUser, STATUSES, userUpdate} from '../store/redux/UserSlice';
import Colors from '../theme/Colors';
import ErrorNetwork from '../components/common/ErrorNetwork';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyModal from '../components/modal/MyModal';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen = (props: ProfileScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);
  const [logOutVisible, setLogOutVisible] = useState(false);
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
    return (
      <Text
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          color: 'tomato',
        }}>
        Something went wrong!
      </Text>
    );
  }

  const handleSignOut = async () => {
    setLoading(true);
    await AsyncStorage.removeItem('loginCredentials');
    setLogOutVisible(false);
    // props.navigation.StackActions.replace('SignIn');
    props.navigation.dispatch(StackActions.replace('SignIn'));
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleLogOut = () => {
    handleSignOut();
  };

  const renderLogOutDialogBox = () => {
    return (
      <MyModal
        visible={logOutVisible}
        onClose={() => setLogOutVisible(false)}
        animationType="fade">
        <Text style={{fontSize: 18, color: 'black'}}>
          Are sure you want to log out...!
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setLogOutVisible(false)}>
            <Text style={styles.closeButtonText}>NO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.closeButton, backgroundColor: 'tomato'}}
            onPress={handleLogOut}>
            <Text style={styles.closeButtonText}>YES</Text>
          </TouchableOpacity>
        </View>
      </MyModal>
    );
  };

  const renderDialogBox = () => {
    return (
      // <View style={{flex: 1, width: 200, height: 200}}>
      <MyModal visible={visible} onClose={handleClose} animationType="fade">
        <Text style={{fontSize: 18, color: 'black'}}>
          Feature will be available soon...!
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>OK</Text>
        </TouchableOpacity>
      </MyModal>
      // </View>
    );
  };

  const renderDialogAddressBox = () => {
    return (
      <MyModal
        visible={addressVisible}
        onClose={() => setAddressVisible(false)}
        animationType="fade">
        {/* <View style={styles.dialogBGStyle}> */}

        {!showUpdate ? (
          <>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  color: '#000',
                  fontWeight: '600',
                  padding: 6,
                }}>
                Address Details :
              </Text>
              <MaterialIcons
                onPress={() => setShowUpdate(true)}
                style={{
                  position: 'absolute',
                  flex: 1,
                  alignSelf: 'flex-end',
                  top: 0,
                  padding: 7,
                }}
                name="edit"
                size={22}
                color="tomato"
              />
            </View>
            <View
              style={{
                // width: '45%',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{fontSize: 16, paddingHorizontal: 5, color: 'gray'}}>
                {user.address}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.dialogStyle}>
            <Text style={styles.modalTextStyle}>Update Address</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#222"
              onChangeText={address => {
                setAddress(address);
              }}
              value={address}
              placeholder="Enter address..."
            />
            <TouchableOpacity
              onPress={async () => {
                let data = {id: user._id, address: {address}};
                address === ''
                  ? alert('Enter the address')
                  : await dispatch(userUpdate(data)).then(response => {
                      readItemFromStorage();
                      setAddressVisible(false);
                      setAddress('');
                    });
              }}
              style={{
                top: 10,
                padding: 10,
                width: 100,
                borderRadius: 3,
                backgroundColor: Colors.SECONDRY_COLOR,
              }}>
              <Text style={{textAlign: 'center', color: Colors.WHITE}}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* </View> */}
      </MyModal>
    );
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
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                Order History
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('My Order')}
                style={{paddingHorizontal: 10}}>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                padding: 0.2,
                marginVertical: 10,
                backgroundColor: 'red',
              }}></View>
            <View style={{width: '100%'}}>
              <Text
                style={{fontSize: 18, paddingHorizontal: 5, color: 'black'}}>
                My address
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 16, paddingHorizontal: 5, color: 'gray'}}>
                  {user.address}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowUpdate(false), setAddressVisible(true);
                  }}
                  style={{paddingHorizontal: 10}}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
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
            onPress={() => setLogOutVisible(true)}>
            <Text style={styles.touchbleTextStyle}>Log out</Text>
          </TouchableOpacity>
        </View>
        {renderDialogBox()}
        {renderLogOutDialogBox()}
      </>
      {renderDialogAddressBox()}
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
  closeButton: {
    backgroundColor: Colors.PRIMERY_COLOR,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    color: 'white',
    width: 90,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 30,
    borderRadius: 7,
    borderColor: Colors.PRIMERY_COLOR,
    color: '#222',
    width: 200,
    margin: 5,
    paddingHorizontal: 5,
    justifyContent: 'flex-start',
  },
  dialogBGStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000AA',
    padding: 40,
    height: undefined,
  },
  dialogStyle: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 34,
    // elevation: 3,
  },
  modalTextStyle: {
    fontSize: 17,
    color: '#000',
    fontWeight: '600',
    padding: 15,
  },
});
