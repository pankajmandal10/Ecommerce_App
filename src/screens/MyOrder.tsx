import React, {useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hokes';
import {STATUSES, orderedItemGet} from '../store/redux/ProductSlice';
import Colors from '../theme/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomeLoading from '../components/common/CustomeLoading';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface MyOrderProps {
  navigation: any;
}

const MyOrder = (props: MyOrderProps) => {
  const dispatch = useAppDispatch();
  const {orderedItemGet: products, status}: any = useAppSelector(
    state => state.product,
  );

  const init = async () => {
    await dispatch(orderedItemGet());
  };
  useEffect(() => {
    init();
  }, [dispatch]);

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

  const renderOrderedItems = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Order Details', {item: item});
        }}>
        <View
          style={{
            margin: 11,
            flexDirection: 'row',
            borderRadius: 7,
            padding: 10,
            borderColor: Colors.PRIMERY_COLOR,
            borderWidth: 0.5,
            justifyContent: 'space-between',
          }}>
          <View style={{width: '23%'}}>
            <Image
              style={styles.imageStyle}
              source={{uri: item.product.image}}
            />
          </View>
          <View style={{width: '70%', justifyContent: 'space-around'}}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{fontSize: 17, color: '#222'}}>
              {item.product.title}
            </Text>
            <Text style={{fontSize: 14, color: 'gray'}}>
              Seller: Cakeliciouse
            </Text>
            {/* <Text style={{fontSize: 18, color: '#222'}}>
            Rs: {Math.round(item.updatedPrice)}
            {'   '}
            <Text style={{color: 'green', paddingLeft: 15, fontSize: 15}}>
              2 Offer
            </Text>
          </Text> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Order Details', {item: item});
            }}
            style={{
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item, index}) => renderOrderedItems({item, index})}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    width: 65,
    height: 65,
    resizeMode: 'center',
    // padding: 10,
    borderRadius: 100,
    borderColor: Colors.PRIMERY_COLOR,
    borderWidth: 1,
  },
});
