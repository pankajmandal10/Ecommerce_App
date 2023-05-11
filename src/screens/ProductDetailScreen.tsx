import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Rating from '../components/common/Rating';
import {ExploreStackParams} from '../route/Routing';
import Colors from '../theme/Colors';
import AddProduct from '../components/AddProduct';
import {vh, vw} from 'react-native-expo-viewport-units';
import {useAppSelector} from '../hokes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ErrorNetwork from '../components/common/ErrorNetwork';
import Button from '../components/button/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<ExploreStackParams, 'Details'>;

interface ProductDetailScreenProps {
  route: any;
  navigation: any;
}

const ProductDetailScreen = ({route, navigation}: ProductDetailScreenProps) => {
  const [colorId, setColorId] = useState(0);
  const [checkBox, setCheckBox] = useState(-1);
  const [checkStatus, setCheckStatus] = useState(false);
  const [liked, setLiked] = useState(false);
  const [counter, setCounter] = useState(-1);
  const {product: product, status}: any = useAppSelector(state => state.cart);
  const data: any = product;
  const [otherCate, setOtherCate] = useState(product.price);
  const onPress = async (id: number) => {
    setColorId(id);
  };

  const cakeButtonList = [
    {id: 0, title: '0.5kg'},
    {id: 1, title: '1kg'},
    {id: 2, title: '2kg'},
    {id: 3, title: '3kg'},
    {id: 4, title: '4kg'},
    {id: 5, title: '5kg'},
  ];

  const coldDrinkButtonList = [
    {id: 0, title: '200 ML'},
    {id: 2, title: '500 ML'},
    {id: 3, title: '1 L'},
    {id: 4, title: '1.5 L'},
    {id: 5, title: '2 L'},
    {id: 6, title: '2.5 L'},
  ];

  const otherCategOptionButtonList = [
    {id: 0, title: 'King Fries', pries: 130},
    {id: 1, title: 'Medium Fries', pries: 150},
    {id: 2, title: 'Cheesy Fries', pries: 160},
    {id: 3, title: 'Boneless Fries', pries: 170},
  ];

  // for Cake
  const renderOptionButton = (category: Object) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: 4,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={{fontSize: vw(6), color: Colors.BLACK_OPACITY_7}}>
            {category == 'Cake' ? 'Weight' : null}
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            width: 'auto',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {(category == 'Cake' ? cakeButtonList : coldDrinkButtonList).map(
            item => {
              return (
                <Button
                  title={item.title}
                  onPress={() => onPress(item.id)}
                  style={{
                    ...styles.touchableButton,
                    backgroundColor:
                      colorId === item.id
                        ? Colors.SECONDRY_COLOR
                        : Colors.WHITE,
                  }}
                  titleStyle={{
                    ...styles.touchbleTextStyle,
                    color: colorId === item.id ? Colors.WHITE : Colors.BLACK,
                  }}
                />
              );
            },
          )}
        </View>
      </View>
    );
  };

  // for Other Categories
  const renderOtherCateOption = () => {
    return (
      <View
        style={{
          marginTop: 7,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 19, color: 'black'}}>
          Choose Your Sides
          <Text style={{fontSize: 15, color: 'gray'}}>(Optional)</Text>
        </Text>
        {otherCategOptionButtonList.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                setOtherCate(product.price + item.pries);
                setCheckBox(item.id);
                setCheckStatus(true);
              }}
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                // paddingHorizontal: 40,
              }}>
              <MaterialIcons
                name={
                  checkStatus
                    ? checkBox === item.id
                      ? 'check-box'
                      : 'check-box-outline-blank'
                    : 'check-box-outline-blank'
                }
                size={24}
                color="black"
              />
              <Text
                style={{fontSize: 15, color: 'black', paddingHorizontal: 15}}>
                {item.title}
              </Text>
              <Text
                style={{fontSize: 15, color: 'gray', paddingHorizontal: 15}}>
                Rs: {item.pries}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderOptionSelectionOfProduct = () => {
    return (
      <>
        {product.category == 'Cake' || product.category == 'Colddrink'
          ? renderOptionButton(product.category)
          : renderOtherCateOption()}
      </>
    );
  };

  let totalAmount = product.price;
  const renderCalculateAmount = () => {
    totalAmount =
      product.category == 'Colddrink'
        ? colorId == 0
          ? totalAmount
          : colorId == 1
          ? totalAmount * (10 / 100) + totalAmount
          : colorId == 2
          ? totalAmount * (15 / 100) + totalAmount
          : colorId == 3
          ? totalAmount * (20 / 100) + totalAmount
          : colorId == 4
          ? totalAmount * (25 / 100) + totalAmount
          : colorId == 5
          ? totalAmount * (30 / 100) + totalAmount
          : colorId == 6
          ? totalAmount * (40 / 100) + totalAmount
          : totalAmount
        : product.category == 'Cake'
        ? colorId == 0
          ? totalAmount
          : colorId == 1
          ? totalAmount * (75 / 100) + totalAmount
          : colorId == 2
          ? totalAmount * (120 / 100) + totalAmount
          : colorId == 3
          ? totalAmount * (200 / 100) + totalAmount
          : colorId == 4
          ? totalAmount * (380 / 100) + totalAmount
          : colorId == 5
          ? totalAmount * (450 / 100) + totalAmount
          : totalAmount
        : otherCate;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Text style={{fontSize: vw(9), color: Colors.BLACK}}>
          {Math.round(totalAmount)}
        </Text>
      </View>
    );
  };

  return (
    <ErrorNetwork>
      <View style={styles.container}>
        <View style={styles.imageCard}>
          <View
            style={{
              position: 'absolute',
              flex: 1,
              padding: 12,
              alignSelf: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => {
                setLiked(!liked);
                setCounter(0);
              }}>
              <Ionicons
                name={
                  liked && 0 == counter
                    ? 'ios-heart-circle-outline'
                    : 'ios-heart-circle-sharp'
                }
                size={34}
                color={liked && 0 == counter ? '#F50B5C' : 'white'}
                onPress={() => {
                  setLiked(!liked);
                  setCounter(0);
                }}
              />
            </TouchableOpacity>
            <Ionicons
              style={{paddingVertical: 10}}
              name="md-arrow-redo-circle-sharp"
              size={34}
              color="white"
            />
          </View>
          <Image style={styles.imageStyle} source={{uri: data.image}} />
          <Rating Size={vw(5)} />
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.discription}>{data.description}</Text>
        <View
          style={{
            flexDirection: 'row',
            margin: 4,
          }}>
          {renderCalculateAmount()}
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  textDecorationLine: 'line-through',
                }}>
                ₹ {Math.round((totalAmount * 35) / 100 + totalAmount)}
              </Text>
              <Text style={{color: 'green'}}> (35% OFF)</Text>
            </View>
            <Text style={{fontSize: 14, color: 'black'}}>
              Inclusive all taxes
            </Text>
          </View>
        </View>
        {renderOptionSelectionOfProduct()}
        <AddProduct navigation={navigation} route={route} />
      </View>
    </ErrorNetwork>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageCard: {
    width: vw(98),
    height: vh(27),
    alignSelf: 'center',
    margin: 4,
    padding: 7,
    backgroundColor: Colors.SECONDRY_COLOR,
    borderRadius: 0,
    flexShrink: 1,
  },
  title: {
    margin: 7,
    fontSize: vw(5),
    fontWeight: '500',
    color: Colors.BLACK,
  },
  discription: {
    marginHorizontal: 7,
    fontSize: vw(4),
    fontWeight: '500',
    color: Colors.BLACK,
  },
  imageStyle: {
    alignSelf: 'center',
    width: '90%',
    height: '90%',
    resizeMode: 'center',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  navBar: {
    display: 'flex',
    // flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    height: 30,
  },
  body: {
    flex: 3,
    display: 'flex',
  },
  button: {
    width: 75,
    color: Colors.BLACK,
    padding: 7,
    fontSize: 12,
    fontWeight: '800',
    marginVertical: 4,
    marginHorizontal: 4,
    borderRadius: 5,
    borderWidth: 1,
  },

  container1: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  red: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 10,
  },
  button1: {
    width: 75,
    color: Colors.WHITE,
    backgroundColor: Colors.SECONDRY_COLOR,
    padding: 7,
    fontSize: vw(3),
    fontWeight: '800',
    marginVertical: 4,
    marginHorizontal: 4,
    borderRadius: 5,
    borderWidth: 1,
  },
  touchableButton: {
    width: vw(20),
    borderRadius: 10,
    alignItems: 'center',
    borderColor: Colors.SECONDRY_COLOR,
    borderWidth: 2,
    padding: 7,
    marginVertical: 10,
  },
  touchbleTextStyle: {
    color: Colors.BLACK,
    fontSize: 14,
    fontWeight: '600',
  },
});
