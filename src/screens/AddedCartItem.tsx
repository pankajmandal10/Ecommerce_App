import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
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
import CustomeLoading from '../components/common/CustomeLoading';

interface AddProductProps {
  navigation: any;
  route: any;
}

const Cart = ({route, navigation}: AddProductProps) => {
  const [grand, setGrand] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let data = 0;
    cart.forEach(element => {
      data = data + element.updatedPrice;
    });
    console.warn(data);
    setGrand(data);
    const userId = await getAsyncItem('userId');
    await dispatch(fetchCartItems(userId));
  };

  const {
    cart: cart,
    grandTotal: grandTotal,
    status,
  }: any = useAppSelector(state => state.addcart);

  const dispatch = useAppDispatch();
  const handleRemove = async (item: any) => {
    await dispatch(deleteAddCartItem({uId: item.userId, pId: item.key})).then(
      res => {
        init();
      },
    );
  };

  const handleUpdatetItem = async (item: any, action: any) => {
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

  if (status === STATUSES.ERROR) {
    return <Text>Something went wrong!</Text>;
  }

  const Item = ({item, index}) => {
    return (
      <View style={styles.container}>
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
                  width: vh(13),
                  flexDirection: 'row',
                  alignSelf: 'baseline',
                  padding: 2,
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: Colors.WHITE,
                }}>
                <TouchableOpacity
                  onPress={() => handleUpdatetItem(item, 'decrement')}
                  style={styles.touchableButton}>
                  <Text style={styles.touchableTextStyle}>-</Text>
                </TouchableOpacity>
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
                  <Text style={styles.touchableTextStyle}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleRemove(item);
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
                  await setAsyncItem('grandTotal', grand);
                  navigation.navigate('Order Details');
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
