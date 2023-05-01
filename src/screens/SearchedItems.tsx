import React, {useState} from 'react';
import {vw, vh} from 'react-native-css-vh-vw';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAppDispatch, useAppSelector} from '../hokes';
import Rating from '../components/common/Rating';
import Colors from '../theme/Colors';
import {addDetailsProduct} from '../store/redux/CartSlice';
import SearchField from '../components/common/SearchField';
import {STATUSES} from '../store/redux/ProductSlice';
import CustomeLoading from '../components/common/CustomeLoading';

interface SearchedItemsProps {
  navigation: any;
}

const SearchedItems = (props: SearchedItemsProps) => {
  const [liked, setLiked] = useState(false);
  const [counter, setCounter] = useState(-2);
  const dispatch = useAppDispatch();
  const {SearchedItems: products, status}: any = useAppSelector(
    state => state.product,
  );

  const addFunc = (item: any) => {
    dispatch(addDetailsProduct(item));
    props.navigation.navigate('Details');
  };

  const renderItem = ({item, index}) => (
    <View style={styles.contener}>
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
        <TouchableOpacity onPress={() => addFunc(item)}>
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
        </TouchableOpacity>
      </View>
      <View style={styles.titleBar}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <View
        // style={{
        //   width: '100%',
        //   backgroundColor: 'gray',
        //   flex: 1,
        //   justifyContent: 'center',
        //   alignContent: 'center',
        // }}
        >
          <SearchField navigation={props.navigation} />
        </View>
        {status !== STATUSES.LOADING ? null : (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              position: 'absolute',
              height: 650,
            }}>
            <CustomeLoading />
          </View>
        )}
        <View style={{margin: 5, zIndex: -1}}>
          <FlatList
            data={products}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItem}
            numColumns={2}
          />
        </View>
      </View>
    </>
  );
};

export default SearchedItems;

const styles = StyleSheet.create({
  container: {
    // margin: 5,
  },
  contener: {
    width: vw(100),
    flexDirection: 'column',
    flex: 1,
    zIndex: -1,
  },
  item: {
    height: undefined,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'tomato',
    margin: 2,
    width: vw(48),
    backgroundColor: Colors.SECONDRY_COLOR,
  },
  imageStyle: {
    alignSelf: 'center',
    width: vw(35),
    height: vh(15),
    resizeMode: 'center',
  },
  titleBar: {
    flexDirection: 'column',
    marginBottom: 6,
    marginHorizontal: 8,
    justifyContent: 'space-around',
    width: '95%',
  },
  title: {
    color: Colors.BLACK,
    fontSize: 13,
    fontWeight: '500',
  },
});
