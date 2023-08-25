import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';
import Colors from '../theme/Colors';
import SearchBar from '../components/SearchBar';
import HeaderTabs from '../components/HeaderTabs';
import ItenList from '../components/ItemList';
import ErrorNetwork from '../components/common/ErrorNetwork';
import {useAppDispatch, useAppSelector} from '../hokes';
import {
  STATUSES,
  fetchProducts,
  fetchSearchProducts,
} from '../store/redux/ProductSlice';
import CustomeLoading from '../components/common/CustomeLoading';
import ChatIcon from './chatfeature/ChatIcon';
import {LoadingCartSkeleton} from '../components/common/SkeletonLoading/LoadingCartSkeleton';

// type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

const HomeScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const products: any = useAppSelector(state => state.product);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await dispatch(fetchProducts());
    await dispatch(fetchSearchProducts(''));
  };

  const categoriesdData = [
    {
      id: '0',
      status: true,
      title: 'All',
      items: products.all,
    },
    {
      id: '1',
      status: false,
      title: 'Cake',
      image: require('../images/cake4.png'),
      items: products.cake,
    },
    {
      id: '2',
      status: false,
      title: 'Burger',
      image: require('../images/burger.png'),
      items: products.burger,
    },
    {
      id: '3',
      title: 'Fries',
      image: require('../images/fries.png'),
      items: products.fries,
    },
    {
      id: '4',
      status: false,
      title: 'Sandwich',
      image: require('../images/sandwich.png'),
      items: products.sandwich,
    },
    {
      id: '5',
      status: false,
      title: 'Colddrink',
      image: require('../images/allcolddrink.png'),
      items: products.colddrink,
    },
  ];

  if (products.status === STATUSES.LOADING) {
    return (
      <LoadingCartSkeleton />
      // <View
      //   style={{
      //     flex: 1,
      //     alignContent: 'center',
      //     alignSelf: 'center',
      //   }}>
      //   <CustomeLoading />
      // </View>
    );
  }

  if (
    products.status === STATUSES.ERROR &&
    categoriesdData[0].items.length === 0
  ) {
    return (
      <Text
        style={{
          flex: 1,
          justifyContent: 'center',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          color: 'tomato',
        }}>
        Something went wrong!
      </Text>
    );
  }

  return (
    <ErrorNetwork>
      <View
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: Colors.PRIMERY_COLOR,
        }}>
        <HeaderTabs navigation={navigation} />
        <SearchBar navigation={navigation} />
      </View>
      {categoriesdData[0].items.length === 0 ? null : (
        <ItenList navigation={navigation} categoriesdData={categoriesdData} />
      )}
      <ChatIcon navigation={navigation} />
    </ErrorNetwork>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  restaurantCard: {
    backgroundColor: '#efefef',
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
  },
  screenTitle: {
    fontSize: 24,
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
