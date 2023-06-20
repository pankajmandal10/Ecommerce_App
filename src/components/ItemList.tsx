import React, {useState} from 'react';
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
import HomeMainCard from './HomeMainCard';
import {addDetailsProduct} from '../store/redux/CartSlice';
import {
  STATUSES,
  addToWishListItem,
  fetchUserWishListItem,
} from '../store/redux/UserWishListSlice';
import {CustomeItemLoading} from './common/CustomeLoading';
import Toast from './common/toast';
import {ToastType} from './common/toast/common';

const ItenList = (props: any) => {
  const [clicked, setClicked] = useState(-1);
  const [showBottomToast, setShowBottomToast] = useState(false);
  const [showBottomToast1, setShowBottomToast1] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory]: any = useState(
    props.categoriesdData[0],
  );

  const {wishListItem: wishListItem, status}: any = useAppSelector(
    state => state.UserWishList,
  );

  const handleCategoryPress = category => {
    let data = category;
    let dataSource = props.categoriesdData;
    for (let i = 0; i < dataSource.length; i++) {
      if (data.id == dataSource[i].id) {
        data.status = true;
      } else {
        dataSource[i].status = false;
      }
    }
    setSelectedCategory(category);
  };

  // console.warn('props.categoriesdData', props.categoriesdData);
  const addFunc = (item: any) => {
    dispatch(addDetailsProduct(item));
    props.navigation.navigate('Details');
  };

  const wishListHandler = async item => {
    await dispatch(addToWishListItem(item));
    setShowBottomToast(false);
    setShowBottomToast1(false);
    await dispatch(fetchUserWishListItem());
  };

  const loadingAddToCart = ({item, index}) => {
    if (status === STATUSES.LOADING && index === clicked) {
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
          key={index}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            width: 30,
            marginHorizontal: 8,
            marginVertical: 2,
            // backgroundColor: 'black',
          }}
          onPress={() => {
            setClicked(index);
            let data = item;
            data.wishListStatus = data.wishListStatus ? false : true;
            if (!item.wishListStatus) {
              setShowBottomToast1(true);
            } else {
              setShowBottomToast(true);
            }
            wishListHandler(data);
            // setLiked(!liked);
            // setCounter(index);
          }}>
          <AntDesign
            style={{alignSelf: 'center'}}
            name={item.wishListStatus ? 'heart' : 'hearto'}
            size={24}
            color={item.wishListStatus ? 'red' : 'white'}
            // onPress={() => {
            //   setLiked(!liked);
            //   setCounter(index);
            // }}
          />
        </TouchableOpacity>
      );
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.contener}>
      <View style={styles.item}>
        {loadingAddToCart({item, index})}
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

  const renderCategory = ({item, index}) => {
    return (
      <View
        style={{
          borderRadius: 35,
          // height: 83,
          paddingVertical: 15,
          backgroundColor: Colors.SECONDRY_COLOR,
          padding: 10,
          borderWidth: 1,
          marginVertical: 6,
          marginHorizontal: 7,
          // flex: 1,
          borderColor: item.status ? 'yellow' : 'transparent',
        }}>
        {item.id == 0 ? (
          <TouchableOpacity
            onPress={() => handleCategoryPress(item)}
            style={{
              width: 45,
              paddingVertical: 12,
            }}>
            <Text style={styles.titleStyle}>All</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleCategoryPress(item)}>
            <Image style={styles.categoryImageStyle} source={item.image} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const UpperComponent = () => {
    return <HomeMainCard />;
  };

  return (
    <View style={{zIndex: -1, flex: 1}}>
      <View style={{}}>
        <FlatList
          data={props.categoriesdData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => renderCategory({item, index})}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View>
        <FlatList
          data={selectedCategory.items}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={UpperComponent}
          style={{marginBottom: 98}}
        />
      </View>
      <Toast
        showToast={showBottomToast}
        type={ToastType.Bottom}
        message="PRODUCT ADD TO MY WISH LIST."
      />
      <Toast
        showToast={showBottomToast1}
        type={ToastType.Bottom}
        message="PRODUCT DELETED TO MY WISH LIST."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  categoryCard: {
    height: 50,
    width: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  itemCard: {
    height: 50,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    color: 'red',
  },
  contener: {
    width: vw(100),
    flexDirection: 'column',
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    margin: 10,
  },
  card0: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 5,
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
  mainContainer: {
    flex: 1,
    alignSelf: 'center',
  },

  flatlistContainer: {},

  columnWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 3,
  },
  item1: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
    borderRadius: 5,
    margin: 10,
  },
  titleStyle: {
    fontSize: 25,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  categoryImageStyle: {
    resizeMode: 'center',
    width: 50,
    height: 40,
    flexDirection: 'row',
  },
  categoryTitle: {
    fontSize: 10,
    color: Colors.WHITE,
    textAlign: 'center',
  },
});

export default ItenList;
