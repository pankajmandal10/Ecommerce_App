import React, {useEffect} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Colors from '../theme/Colors';
import {Text, View, StyleSheet} from 'react-native';
import OrderTracking from '../components/common/OrderTracking';
import {useAppDispatch, useAppSelector} from '../hokes';
import {orderedItemGet} from '../store/redux/ProductSlice';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';

interface OrderTrackProps {
  item: any;
}

const OrderTrack = (props: any) => {
  const {user: user, status}: any = useAppSelector(state => state.user);
  const item = props.route.params.item;
  const renderOrderedItems = () => {
    return (
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
        <View style={{width: '80%'}}>
          <Text style={{fontSize: 17, color: '#222'}}>
            {item.product.title}
          </Text>
          <Text style={{fontSize: 14, color: 'gray'}}>
            Seller: Cakeliciouse
          </Text>
          <Text style={{fontSize: 18, color: '#222'}}>
            Rs: {Math.round(item.updatedPrice + 50 + 5)}
            {'   '}
            <Text style={{color: 'green', paddingLeft: 15, fontSize: 15}}>
              2 Offer
            </Text>
          </Text>
        </View>
        <Image style={styles.imageStyle} source={{uri: item.product.image}} />
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={{margin: 11, color: 'gray'}}>Order ID: 0D32857648357</Text>
        <View style={{...styles.line, marginVertical: 0}}></View>
        {renderOrderedItems()}
        <View
          style={{
            margin: 10,
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#efdeff',
            flexDirection: 'row',
          }}>
          <Text style={{width: '67%', color: '#222', fontSize: 15}}>
            Help our delivery agent Reach you faster.
          </Text>
          <TouchableOpacity
            style={{
              flex: 1,
              alignContent: 'center',
              borderRadius: 5,
              backgroundColor: '#fff',
              justifyContent: 'center',
              paddingHorizontal: 2,
            }}>
            <Text style={{textAlign: 'center', color: '#551195', fontSize: 14}}>
              Share Location
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <OrderTracking />
        <View>
          <View style={styles.line}></View>
          <Text style={{marginHorizontal: 10, fontSize: 16, color: 'gray'}}>
            Shiping Details
          </Text>
          <View style={styles.line}></View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{fontSize: 15, color: '#222'}}>{user?.name}</Text>
            <Text style={{fontSize: 14, paddingVertical: 10, color: '#222'}}>
              {user?.address}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.line}></View>
          <Text style={{marginHorizontal: 10, fontSize: 16, color: 'gray'}}>
            Price Details
          </Text>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: 'red',
              marginVertical: 10,
            }}></View>
          <View style={{marginHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 6,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#222',
                }}>
                List Price
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: '#222',
                  textDecorationLine: 'line-through',
                }}>
                Rs:{' '}
                {Math.round(item.updatedPrice + (item.updatedPrice * 85) / 100)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 6,
              }}>
              <Text style={{fontSize: 14, color: '#222'}}>Selling</Text>
              <Text style={{fontSize: 14, color: '#222'}}>
                {Math.round(item.product.price)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 6,
              }}>
              <Text style={{fontSize: 14, color: '#222'}}>Handlling Fee</Text>
              <Text style={{fontSize: 14, color: '#222'}}>Rs: 5</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 6,
              }}>
              <Text style={{fontSize: 14, color: '#222'}}>Shiping Fee</Text>
              <Text style={{fontSize: 14, color: '#222'}}>Rs: 50</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 6,
              }}>
              <Text style={{fontSize: 16, color: '#222'}}>Tota Amount</Text>
              <Text style={{fontSize: 16, color: '#222'}}>
                Rs: {Math.round(item.updatedPrice + 50 + 5)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderTrack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageStyle: {
    width: 65,
    height: 65,
    resizeMode: 'center',
    // padding: 10,
    borderRadius: 100,
    borderColor: Colors.PRIMERY_COLOR,
    borderWidth: 1,
  },
  line: {
    width: '100%',
    marginVertical: 10,
    height: 0.3,
    backgroundColor: 'red',
  },
});
