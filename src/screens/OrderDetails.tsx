import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {vh, vw} from 'react-native-expo-viewport-units';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomeLoading from '../components/common/CustomeLoading';
import {useAppDispatch, useAppSelector} from '../hokes';
import {getAsyncItem} from '../services';
import {getLoggedUser, STATUSES, userUpdate} from '../store/redux/UserSlice';
import Colors from '../theme/Colors';
import Radio from '../components/common/RadioButton';
import ErrorNetwork from '../components/common/ErrorNetwork';

interface OrderDetailsProps {
  navigation: any;
}
const paymentMethodOptions = [
  'Other UPI Apps',
  'Pay with Debit/Credit/ATM Cards',
  'Net Banking',
  'EMI',
  'Cash on Delivery',
];

const OrderDetails = (props: OrderDetailsProps) => {
  const [grand, setGrand] = useState(0);
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [hide, setHide] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Cash on Delivery');
  const {cart: cart}: any = useAppSelector(state => state.addcart);
  const dispatch = useAppDispatch();

  const init = async () => {
    const grandTotal = await getAsyncItem('grandTotal');
    const savedUser = await getAsyncItem('loggedData');
    dispatch(getLoggedUser(savedUser.savedUser._id));
    setGrand(grandTotal);
  };

  useEffect(() => {
    init();
  }, []);

  const {user: user, status: responsestatus}: any = useAppSelector(
    state => state.user,
  );

  if (responsestatus === STATUSES.LOADING) {
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

  if (responsestatus === STATUSES.ERROR) {
    return <Text>Something went wrong!</Text>;
  }

  function onChangeHandler() {
    // dispatch(userUpdate(id, body));
    return (
      <Modal
        animationType="fade"
        visible={visible}
        transparent
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.dialogBGStyle}>
          <View style={styles.dialogStyle}>
            <MaterialIcons
              onPress={() => setVisible(false)}
              style={{
                position: 'absolute',
                flex: 1,
                alignSelf: 'flex-end',
                top: 0,
                padding: 7,
              }}
              name="cancel"
              size={28}
              color="tomato"
            />
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
                      setVisible(false);
                      init();
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
        </View>
      </Modal>
    );
  }

  const handleSelect = option => {
    setSelectedOption(option);
  };

  return (
    <ErrorNetwork>
      <>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.textStyle}>Delevering to</Text>
            <View style={styles.card}>
              <Image
                style={styles.imageStyle}
                source={require('../images/user.png')}
              />
              <View style={{paddingHorizontal: 10, justifyContent: 'center'}}>
                <Text style={{...styles.textStyle, fontSize: 15}}>
                  {user.phone}
                </Text>
                <Text style={{...styles.textStyle, fontSize: 15}}>
                  {user.name}
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <Ionicons name="location-sharp" size={24} color="tomato" />
              <View
                style={{
                  flexDirection: 'column',
                  width: '95%',
                }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={{...styles.textStyle, fontSize: 15}}>
                    Delevery Address
                  </Text>
                  <TouchableOpacity onPress={() => setVisible(true)}>
                    <Text
                      style={{
                        ...styles.textStyle,
                        fontSize: 15,
                        color: 'tomato',
                      }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    width: '90%',
                  }}>
                  <Text style={styles.textStyle1}>Home</Text>
                  <Text style={styles.textStyle1}>{user.address}</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Ionicons name="ios-timer-outline" size={24} color="tomato" />
              <View
                style={{
                  flexDirection: 'column',
                  width: '95%',
                }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={{...styles.textStyle, fontSize: 15}}>
                    Delevery Time
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        ...styles.textStyle,
                        fontSize: 15,
                        color: 'tomato',
                      }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                  }}>
                  <Text style={styles.textStyle1}>10 March,2023 9:30am </Text>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <MaterialIcons name="payment" size={24} color="tomato" />
              <View
                style={{
                  flexDirection: 'column',
                  width: '95%',
                }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={{...styles.textStyle, fontSize: 15}}>
                    Payment Method
                  </Text>
                  <TouchableOpacity
                    onPress={() => setHide(hide ? false : true)}>
                    <Text
                      style={{
                        ...styles.textStyle,
                        fontSize: 15,
                        color: 'tomato',
                      }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
                {selectedOption && (
                  <View
                    style={{
                      width: '100%',
                      borderRadius: 7,
                      borderWidth: 1,
                      borderColor: 'tomato',
                      padding: 10,
                      marginTop: 7,
                      flexDirection: 'row',
                    }}>
                    <MaterialIcons
                      name="done-outline"
                      style={{fontWeight: 'bold', paddingHorizontal: 10}}
                      size={24}
                      color="green"
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        width: '87%',
                        color: '#000000',
                      }}>
                      {selectedOption}
                    </Text>
                  </View>
                )}
                {hide ? (
                  <View
                    style={
                      {
                        // paddingHorizontal: 10,
                      }
                    }>
                    <TouchableOpacity>
                      <Radio
                        options={paymentMethodOptions}
                        onSelect={handleSelect}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 3,
                }}>
                <Text style={styles.textStyle1}>Item Total</Text>
                <Text style={styles.textStyle1}>Rs. {grand}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingVertical: 3,
                }}>
                <Text style={styles.textStyle1}>Delevery Charge</Text>
                <Text style={styles.textStyle1}>Rs. 50</Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingVertical: 3,
                }}>
                <Text style={styles.textStyle1}>Promo - (PROMO10)</Text>
                <Text style={styles.textStyle1}>Item Total</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {onChangeHandler()}
        <View
          style={{
            position: 'absolute',
            backgroundColor: Colors.DARK_SECONDRY_COLOR,
            bottom: 0,
            width: vw(100),
            alignSelf: 'center',
            padding: 7,
            elevation: 9,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="rupee"
                style={{paddingTop: 4}}
                size={30}
                color="white"
              />
              <Text
                style={{
                  fontSize: 28,
                  paddingHorizontal: 3,
                  fontWeight: '600',
                  color: 'white',
                }}>
                {Math.round(grand + 50)}
              </Text>
            </View>
            <Text style={{fontSize: 14, color: 'white'}}>
              Your order ({cart.length} items)
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              selectedOption == null
                ? alert('Please Select the Payment Method')
                : props.navigation.navigate('Order Successful');
            }}
            style={{
              padding: 7,
              alignContent: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'white',
              height: 40,
              top: 12,
            }}>
            <Text
              style={{
                fontWeight: '600',
                top: 2,
                color: 'white',
                textAlign: 'center',
              }}>
              PLACE ORDER
            </Text>
          </TouchableOpacity>
        </View>
      </>
    </ErrorNetwork>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    marginBottom: 60,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 7,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: 'red',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    borderColor: Colors.PRIMERY_COLOR,
    color: '#222',
    width: '95%',
  },
  imageStyle: {
    width: vw(18),
    height: vw(18),
    resizeMode: 'center',
    padding: 10,
    borderRadius: 100,
    borderColor: 'red',
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  textStyle1: {
    fontSize: 14,
    fontWeight: '400',
    color: '#222',
  },
  buttonStyle: {
    width: '44%',
    borderRadius: 4,
    borderWidth: 1,
    padding: 4,
    borderColor: Colors.WHITE,
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
    padding: 24,
    elevation: 3,
  },
  modalTextStyle: {
    fontSize: 17,
    color: '#000',
    padding: 15,
  },
  radioStyle: {
    width: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
