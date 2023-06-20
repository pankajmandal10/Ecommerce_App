import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hokes';
import {
  STATUSES,
  addToWishListItem,
  fetchUserWishListItem,
} from '../store/redux/UserWishListSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../theme/Colors';
import CustomeLoading, {
  CustomeItemLoading,
} from '../components/common/CustomeLoading';
import {addDetailsProduct} from '../store/redux/CartSlice';
import {WishListEmpty} from './EmptyCartScreen';

interface WishListProps {
  navigation: any;
}

const WishList = (props: WishListProps) => {
  const dispatch = useAppDispatch();
  const [clicked, setClicked] = useState(-1);
  const {wishListItem: wishListItem, status}: any = useAppSelector(
    state => state.UserWishList,
  );

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    dispatch(fetchUserWishListItem());
  };

  const removeToWishList = async item => {
    await dispatch(addToWishListItem(item));
    init();
  };

  const loadingAndRender = ({item, index}) => {
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
          onPress={() => {
            setClicked(index);
            let data = item.product;
            data.wishListStatus = false;
            removeToWishList(data);
          }}
          style={{
            justifyContent: 'center',
          }}>
          <MaterialIcons name="delete-forever" size={26} color="#6B1704" />
        </TouchableOpacity>
      );
    }
  };
  const renderWishListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(addDetailsProduct(item.product));
          props.navigation.navigate('Details');
        }}
        key={index}>
        <View
          style={{
            margin: 3,
            flexDirection: 'row',
            borderRadius: 7,
            padding: 10,
            borderColor: Colors.PRIMERY_COLOR,
            borderWidth: 0.5,
            justifyContent: 'space-between',
            backgroundColor: Colors.SECONDRY_COLOR,
          }}>
          <View style={{}}>
            <Image
              style={styles.imageStyle}
              source={{uri: item.product.image}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              justifyContent: 'space-around',
            }}>
            {loadingAndRender({item, index})}
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                dispatch(addDetailsProduct(item.product));
                props.navigation.navigate('Details');
              }}
              style={{
                justifyContent: 'center',
              }}>
              <MaterialIcons name="arrow-forward-ios" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {wishListItem.length === 0 && status === STATUSES.IDLE ? (
        <WishListEmpty navigation={props.navigation} />
      ) : (
        <FlatList
          data={wishListItem}
          renderItem={({item, index}) => renderWishListItem({item, index})}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    width: 65,
    height: 65,
    resizeMode: 'center',
    // padding: 10,
    borderRadius: 100,
    borderColor: Colors.WHITE,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
});
