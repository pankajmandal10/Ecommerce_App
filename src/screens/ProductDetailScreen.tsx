import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Rating from '../components/common/Rating';
import {ExploreStackParams} from '../route/Routing';
import Colors from '../theme/Colors';
import Button from '../components/common/Button';
import AddProduct from '../components/AddProduct';
import {vw, vh} from 'react-native-css-vh-vw';
import {useAppSelector} from '../hokes';
// import {Ionicons, AntDesign} from '@expo/vector-icons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<ExploreStackParams, 'Details'>;

interface ProductDetailScreenProps {
  route: any;
  navigation: any;
}

const ProductDetailScreen = ({route, navigation}: ProductDetailScreenProps) => {
  const [colorId, setColorId] = useState(1);
  const [liked, setLiked] = useState(false);
  const [counter, setCounter] = useState(-1);
  const {product: product, status}: any = useAppSelector(state => state.cart);
  const data: any = product;

  const onPress = async (id: number) => {
    setColorId(id);
  };
  return (
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={{fontSize: vw(9), color: Colors.BLACK}}>
            {Math.round(data.price)}
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 14, textDecorationLine: 'line-through'}}>
              ₹ 350
            </Text>
            <Text style={{color: 'green'}}> (15% OFF)</Text>
          </View>
          <Text style={{fontSize: 14}}>Inclusive all taxes</Text>
        </View>
      </View>
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
            Weight :
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
          <TouchableOpacity
            style={{
              ...styles.touchableButton,
              backgroundColor:
                colorId === 1 ? Colors.SECONDRY_COLOR : Colors.WHITE,
            }}
            onPress={() => onPress(1)}>
            <Text
              style={{
                ...styles.touchbleTextStyle,
                color: colorId === 1 ? Colors.WHITE : Colors.BLACK,
              }}>
              0.5Kg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.touchableButton,
              backgroundColor:
                colorId === 2 ? Colors.SECONDRY_COLOR : Colors.WHITE,
            }}
            onPress={() => onPress(2)}>
            <Text
              style={{
                ...styles.touchbleTextStyle,
                color: colorId === 2 ? Colors.WHITE : Colors.BLACK,
              }}>
              1Kg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.touchableButton,
              backgroundColor:
                colorId === 3 ? Colors.SECONDRY_COLOR : Colors.WHITE,
            }}
            onPress={() => onPress(3)}>
            <Text
              style={{
                ...styles.touchbleTextStyle,
                color: colorId === 3 ? Colors.WHITE : Colors.BLACK,
              }}>
              2Kg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.touchableButton,
              backgroundColor:
                colorId === 4 ? Colors.SECONDRY_COLOR : Colors.WHITE,
            }}
            onPress={() => onPress(4)}>
            <Text
              style={{
                ...styles.touchbleTextStyle,
                color: colorId === 4 ? Colors.WHITE : Colors.BLACK,
              }}>
              3Kg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.touchableButton,
              backgroundColor:
                colorId === 5 ? Colors.SECONDRY_COLOR : Colors.WHITE,
            }}
            onPress={() => onPress(5)}>
            <Text
              style={{
                ...styles.touchbleTextStyle,
                color: colorId === 5 ? Colors.WHITE : Colors.BLACK,
              }}>
              4Kg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.touchableButton,
              backgroundColor:
                colorId === 6 ? Colors.SECONDRY_COLOR : Colors.WHITE,
            }}
            onPress={() => onPress(6)}>
            <Text
              style={{
                ...styles.touchbleTextStyle,
                color: colorId === 6 ? Colors.WHITE : Colors.BLACK,
              }}>
              5Kg
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddProduct navigation={navigation} route={route} />
    </View>
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
    fontSize: 16,
    fontWeight: '800',
  },
});
