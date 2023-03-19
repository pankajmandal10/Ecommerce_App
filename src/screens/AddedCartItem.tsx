import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Colors from '../theme/Colors';
import {CartItemStackPrams} from '../route/Routing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {vw, vh} from 'react-native-css-vh-vw';
import {useAppDispatch, useAppSelector} from '../hokes';
import {
  countTotalPrice,
  decrementQuantity,
  incrementQuantity,
  remove,
} from '../store/redux/CartSlice';
import EmptyCartScreen from './EmptyCartScreen';
import {setAsyncItem} from '../services';
// type Props = NativeStackScreenProps<CartItemStackPrams, 'Cart'>;

interface AddProductProps {
  navigation: any;
  route: any;
}

const Cart = ({route, navigation}: AddProductProps) => {
  const [addMoreItem, setAddMoreItem] = useState(1);
  const [grand, setGrand] = useState(0);
  const dispatch = useAppDispatch();
  const {
    cart: cart,
    grandTotal: grandTotal,
    status,
  }: any = useAppSelector(state => state.cart);
  console.warn('cart', cart);

  const handleRemove = productId => {
    dispatch(remove(productId));
  };

  const handleMoreItem = productId => {
    dispatch(incrementQuantity(productId));
  };
  const handleDecrimentItem = productId => {
    dispatch(decrementQuantity(productId));
  };
  // const handleGrandTotal = () => {
  //   dispatch(countTotalPrice(countTotalPrices));
  // };
  let grandTotalPrices: any = 0;
  const Item = ({item, index}) => {
    grandTotalPrices = grandTotalPrices + item.price * item.quantity;
    // dispatch(countTotalPrice(grandTotalPrices));
    setGrand(grandTotalPrices);
    return (
      <View style={styles.container}>
        <View style={styles.cartDetails}>
          <Image style={styles.imageStyle} source={{uri: item.image}} />
          <View
            style={{
              marginHorizontal: vw(3),
            }}>
            <Text style={styles.textStyle}>{item.category}</Text>
            <Text style={styles.textStyle}>Ratting *****</Text>
            <Text style={styles.textStyle}>
              Rs: {item.price * item.quantity}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: vh(13),
                  flexDirection: 'row',
                  alignSelf: 'baseline',
                  padding: 2,
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: Colors.WHITE,
                }}>
                <TouchableOpacity
                  onPress={() => handleDecrimentItem(item._id)}
                  style={styles.touchableButton}>
                  <Text style={styles.touchableTextStyle}>-</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    paddingHorizontal: 20,
                    color: Colors.WHITE,
                  }}>
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => handleMoreItem(item._id)}
                  style={styles.touchableButton}>
                  <Text style={styles.touchableTextStyle}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleRemove(item._id);
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

  return (
    <View style={{flex: 1}}>
      {cart.length === 0 ? (
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
              position: 'absolute',
              backgroundColor: Colors.DARK_SECONDRY_COLOR,
              bottom: vh(0.5),
              width: vw(100),
              alignSelf: 'center',
              padding: 7,
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
                onPress={() => navigation.navigate('Home')}
                style={styles.buttonStyle}>
                <Text style={{...styles.textStyle, textAlign: 'center'}}>
                  Continue Shopping
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await setAsyncItem('grandTotal', grand);
                  navigation.navigate('OrderDetails');
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
    width: vw(5),
    borderRadius: 4,
    alignItems: 'center',
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
});
