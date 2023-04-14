import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../theme/Colors';
import Rating from './common/Rating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {vw, vh} from 'react-native-css-vh-vw';
import {useAppDispatch, useAppSelector} from '../hokes';
import {
  fetchProducts,
  fetchSearchProducts,
  STATUSES,
} from '../store/redux/ProductSlice';
import {addDetailsProduct} from '../store/redux/CartSlice';
import CustomeLoading from './common/CustomeLoading';
interface ItenListProps {
  navigation: any;
}

const ItenList = (props: ItenListProps) => {
  const [liked, setLiked] = useState(false);
  const [counter, setCounter] = useState(-2);

  const dispatch = useAppDispatch();
  const {Searcheddata: products, status}: any = useAppSelector(
    state => state.product,
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSearchProducts(undefined));
  }, []);

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

  const addFunc = (item: any) => {
    dispatch(addDetailsProduct(item));
    props.navigation.navigate('Details');
  };

  const renderItem = ({item, index}) => (
    <View style={styles.contener}>
      <TouchableOpacity onPress={() => addFunc(item)}>
        <View style={styles.item}>
          <TouchableOpacity
            style={{
              marginHorizontal: 8,
              marginVertical: 2,
            }}
            onPress={() => {
              setLiked(!liked);
              setCounter(index);
            }}>
            <AntDesign
              name={liked && index == counter ? 'heart' : 'hearto'}
              size={24}
              color={liked && index == counter ? 'red' : 'white'}
              onPress={() => {
                setLiked(!liked);
                setCounter(index);
              }}
            />
          </TouchableOpacity>
          <Image style={styles.imageStyle} source={{uri: item.image}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}>
            <Rating Size={14} />
            <Text
              style={{
                color: Colors.WHITE,
                backgroundColor: 'tomato',
                borderRadius: 20,
                paddingHorizontal: 4,
              }}>
              {item.price}
            </Text>
          </View>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{width: '100%'}}>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({item, index}) => renderItem({item, index})}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};

export default ItenList;

const styles = StyleSheet.create({
  contener: {
    width: vw(100),
    flexDirection: 'column',
    flex: 1,
  },
  titleBar: {
    flexDirection: 'column',
    marginBottom: 6,
    marginHorizontal: 8,
    justifyContent: 'space-around',
  },
  title: {
    color: Colors.BLACK,
    fontSize: 13,
    fontWeight: '500',
  },
  item: {
    height: undefined,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'tomato',
    margin: 2,
    backgroundColor: Colors.SECONDRY_COLOR,
  },
  imageStyle: {
    alignSelf: 'center',
    width: vw(35),
    height: vh(15),
    resizeMode: 'center',
  },
  mainContainer: {
    flex: 1,
    alignSelf: 'center',
  },

  flatlistContainer: {},
});
