import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Animated,
} from 'react-native';
import Colors from '../theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {vw, vh} from 'react-native-css-vh-vw';
import {useAppDispatch, useAppSelector} from '../hokes';
import {any, number} from 'prop-types';
import {add} from '../store/redux/CartSlice';
import {ToasterHelper} from 'react-native-customizable-toast';
import Toast from './common/toast';
import {ToastType} from './common/toast/common';
import Button from './button';
import {
  STATUSES,
  addToCartPost,
  fetchCartItems,
} from '../store/redux/addCartSlice';
import {getAsyncItem, setAsyncItem} from '../services';
import CustomeLoading, {
  CustomeDotIndicatorLoading,
  CustomeItemLoading,
} from './common/CustomeLoading';
import MyModal from './modal/MyModal';
import {StackActions} from '@react-navigation/core';

interface AddProductProps {
  navigation: any;
  route: any;
}

const AddProduct = (props: AddProductProps): JSX.Element => {
  const [liked, setLiked] = useState(false);
  const [counter, setCounter] = useState(-1);
  const [cart, setCart] = useState(false);
  const [countercart, setCountercart] = useState(-1);
  const [showTopToast, setShowTopToast] = useState(false);
  const [showBottomToast, setShowBottomToast] = useState(false);
  const [showButtonType, setshowButtonType] = useState(false);
  const [userId, setUserId] = useState('');
  const [clicked, setClicked] = useState(-1);
  // const [userCradential, setUserCradential] = useState();

  const {product: product, status}: any = useAppSelector(state => state.cart);
  const data: any = useAppSelector(state => state.addcart);
  const dispatch = useAppDispatch();

  const windowHeight = Dimensions.get('window').height;
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;

  const init = async () => {
    const userId = await getAsyncItem('userId');
    setUserId(userId);
  };

  useEffect(() => {
    init();
  }, []);

  const handleAdd = async () => {
    await dispatch(fetchCartItems());
    props.navigation.navigate('My Cart');
  };

  const onBuyNow = async () => {
    const data = {product: product, userId: userId};
    setClicked(2);
    await dispatch(addToCartPost(data));
    props.navigation.navigate('My Cart');
  };

  const onPressShowBottomToast = (): void => {
    const data = {product: product, userId: userId};
    setClicked(1);
    setShowBottomToast(true);
    setshowButtonType(true);
    setCart(!cart);
    setCountercart(1);
    dispatch(addToCartPost(data));
    setTimeout(() => {
      setShowBottomToast(false);
    }, 3000);
  };

  const loadingAddToCart = () => {
    if (data.status === STATUSES.LOADING && clicked === 1) {
      return (
        <View
          style={{
            width: '25%',
            justifyContent: 'center',
          }}>
          <CustomeItemLoading />
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={!showButtonType ? onPressShowBottomToast : handleAdd}
          style={{
            flexDirection: 'row',
            height: '50%',
            marginTop: 5,
            alignSelf: 'center',
          }}>
          <MaterialCommunityIcons
            name={cart && 1 == countercart ? 'cart' : 'cart-outline'}
            style={{marginHorizontal: 15, marginVertical: -3}}
            size={27}
            color={cart && 1 == countercart ? '#F50B5C' : 'white'}
            onPress={!showButtonType ? onPressShowBottomToast : handleAdd}
          />
          <Text
            style={{
              ...styles.TouchableTextStyle,
              color: cart && 1 == countercart ? '#F50B5C' : 'white',
            }}>
            {showButtonType ? 'GO TO CART' : 'ADD TO CART'}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const renderByNow = () => {
    if (data.status === STATUSES.LOADING && clicked === 2) {
      return (
        <View
          style={{
            width: '25%',
            justifyContent: 'center',
          }}>
          <CustomeItemLoading />
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            onBuyNow();
            setLiked(!liked);
            setCounter(0);
          }}
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignSelf: 'center',
          }}>
          <AntDesign
            style={{marginRight: 15}}
            name="hearto"
            size={24}
            color="white"
            onPress={() => {
              onBuyNow();
            }}
          />
          <Text
            style={{
              ...styles.TouchableTextStyle,
              color: 'white',
            }}>
            BUY NOW
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <>
      <View style={styles.container1}>
        <Toast
          showToast={showBottomToast}
          type={ToastType.Bottom}
          message="Product Added to Cart."
        />
      </View>
      <View style={styles.container}>
        {loadingAddToCart()}

        <View
          style={{
            width: 1,
            height: 60,
            columnGap: 1,
            backgroundColor: 'white',
          }}></View>
        {renderByNow()}
      </View>
    </>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: vh(6.5),
    backgroundColor: Colors.SECONDRY_COLOR,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
  },
  TouchableTextStyle: {
    fontSize: vw(4),
    fontWeight: '400',
    color: Colors.WHITE,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    margin: 8,
  },
});
