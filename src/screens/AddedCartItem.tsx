import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
} from 'react-native';
import Colors from '../theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {vw, vh} from 'react-native-css-vh-vw';
import {useAppDispatch, useAppSelector} from '../hokes';
import EmptyCartScreen from './EmptyCartScreen';
import {getAsyncItem, setAsyncItem} from '../services';
import {
  deleteAddCartItem,
  fetchCartItems,
  STATUSES,
  updateCartItem,
} from '../store/redux/addCartSlice';
import CustomeLoading, {
  CustomeItemLoading,
} from '../components/common/CustomeLoading';
import ErrorNetwork from '../components/common/ErrorNetwork';
import axios from 'axios';
import {StackActions} from '@react-navigation/core';
import MyModal from '../components/modal/MyModal';
import {LoadingMyOrderSkeleton} from '../components/common/SkeletonLoading/LoadingCartSkeleton';

interface AddProductProps {
  navigation: any;
  route: any;
}

const Cart = ({route, navigation}: AddProductProps) => {
  const [grand, setGrand] = useState(0);
  const [productId, setProductId] = useState('');
  const [visible, setVisible] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(true);
  const dispatch = useAppDispatch();
  const {
    cart: cart,
    grandTotal: grandTotal,
    status,
  }: any = useAppSelector(state => state.addcart);

  // const [cart, setCartData] = useState(cart);
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setPageLoaded(false);
    }, 3000); // Adjust this delay to match your actual loading time
  }, []);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await dispatch(fetchCartItems());
  };

  const handleRemove = async (item: any) => {
    await dispatch(deleteAddCartItem({uId: item.userId, pId: item.key})).then(
      res => {
        init();
      },
    );
  };

  if (pageLoaded) {
    return <LoadingMyOrderSkeleton itemCount={cart.length} />;
  }

  const handleUpdatetItem = async (item: any, action: any) => {
    setProductId(item._id);
    const dataSource = {
      body: item,
      action: action,
    };
    if (action === 'increment') {
      await dispatch(updateCartItem(dataSource)).then(res => init());
    } else {
      if (item.qty > 1) {
        await dispatch(updateCartItem(dataSource)).then(res => init());
      }
    }
  };

  const renderItemLoader = item => {
    if (status === STATUSES.LOADING && item._id === productId) {
      return (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            marginHorizontal: 34,
          }}>
          <CustomeItemLoading />
        </View>
      );
    }
  };

  // if (status === STATUSES.LOADING) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignContent: 'center',
  //         alignSelf: 'center',
  //       }}>
  //       <CustomeLoading />
  //     </View>
  //   );
  // }

  if (status === STATUSES.ERROR) {
    return <Text>Something went wrong!</Text>;
  }

  let grandValue = 0;
  const Item = ({item, index}) => {
    grandValue += item.updatedPrice;
    setGrand(grandValue);
    return (
      <View key={index} style={styles.container}>
        <View style={styles.cartDetails}>
          <Image style={styles.imageStyle} source={{uri: item.product.image}} />
          <View
            style={{
              marginHorizontal: vw(3),
            }}>
            <Text style={styles.textStyle}>{item.product.title}</Text>
            <Text style={styles.textStyle}>
              Ratting: {item.product.rating.rate}
            </Text>
            <Text style={styles.textStyle}>
              Rs: {Math.round(item.updatedPrice)}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  // width: vh(13),
                  flexDirection: 'row',
                  alignSelf: 'baseline',
                  alignContent: 'center',
                  padding: 2,
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: Colors.WHITE,
                }}>
                <TouchableOpacity
                  onPress={() => handleUpdatetItem(item, 'decrement')}
                  style={styles.touchableButton}>
                  <AntDesign name="minus" size={20} color="white" />
                  {/* <Text style={styles.touchableTextStyle}>-</Text> */}
                </TouchableOpacity>
                {renderItemLoader(item)}
                <Text
                  style={{
                    fontSize: 20,
                    paddingHorizontal: 20,
                    color: Colors.WHITE,
                  }}>
                  {item.qty}
                </Text>
                <TouchableOpacity
                  onPress={() => handleUpdatetItem(item, 'increment')}
                  style={styles.touchableButton}>
                  <AntDesign name="plus" size={20} color="white" />
                  {/* <Text style={styles.touchableTextStyle}>+</Text> */}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Alert',
                    'Would you really like to remove this product?.',
                    [
                      {
                        text: 'NO',
                      },
                      {
                        text: 'YES',
                        onPress: () => handleRemove(item),
                      },
                    ],
                  );
                }}
                style={{
                  alignItems: 'center',
                  // marginLeft: vw(8),
                  width: vw(20),
                  padding: vw(1),
                  alignSelf: 'center',
                }}>
                <AntDesign name="delete" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const handleClose = () => {
    navigation.dispatch(StackActions.replace('SignIn'));
    setVisible(false);
  };

  const renderDialogBox = () => {
    return (
      <MyModal
        visible={visible}
        onClose={() => setVisible(false)}
        animationType="fade">
        <Text style={{fontSize: 18, color: 'black'}}>
          You are not logged in please login to procced...!
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>Log In</Text>
        </TouchableOpacity>
      </MyModal>
    );
  };

  return (
    <ErrorNetwork>
      <View style={{flex: 1}}>
        {status === STATUSES.IDLE && cart.length === 0 ? (
          <View style={{width: '100%', flex: 1}}>
            <EmptyCartScreen navigation={navigation} />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={cart}
              renderItem={({item, index}) => Item({item, index})}
              keyExtractor={(item, index) => String(index)}
            />
            <View
              style={{
                // position: 'absolute',
                backgroundColor: Colors.DARK_SECONDRY_COLOR,
                bottom: vh(0),
                width: vw(100),
                alignSelf: 'center',
                padding: 10,
                elevation: 9,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text style={styles.textStyle}>Grand Total</Text>
                <Text style={styles.textStyle}>
                  Rs: {cart.length === 0 ? 0 : Math.round(grand)}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 7,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Homes')}
                  style={styles.buttonStyle}>
                  <Text style={{...styles.textStyle, textAlign: 'center'}}>
                    Continue Shopping
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    const userCradential = await getAsyncItem(
                      'loginCredentials',
                    );
                    userCradential === null
                      ? setVisible(true)
                      : await setAsyncItem(
                          'grandTotal',
                          Math.round(grand),
                        ).then(res => {
                          navigation.navigate('Orderdetails');
                        });
                  }}
                  style={styles.buttonStyle}>
                  <Text style={{...styles.textStyle, textAlign: 'center'}}>
                    PLACE ORDER
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
      {renderDialogBox()}
    </ErrorNetwork>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartDetails: {
    flexDirection: 'row',
    backgroundColor: Colors.SECONDRY_COLOR,
    padding: vw(1),
    margin: vw(1),
    borderRadius: 4,
    opacity: 0.9,
  },
  textStyle: {
    fontSize: vw(4),
    margin: 2,
    color: Colors.WHITE,
  },
  imageStyle: {
    width: vw(35),
    height: vh(13),
    resizeMode: 'center',
  },
  touchableButton: {
    // width: vw(5),
    marginVertical: vh(0.4),
    borderRadius: 4,
    // alignItems: 'center',
  },
  touchableTextStyle: {
    fontSize: vw(5),
    fontWeight: '400',
    color: Colors.WHITE,
  },
  buttonStyle: {
    width: '44%',
    borderRadius: 4,
    borderWidth: 1,
    padding: 4,
    borderColor: Colors.WHITE,
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
});
