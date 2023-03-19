import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RestaurantScreen from '../screens/Restaurant';
import RestaurantsScreen from '../screens/Restaurants';
import Colors from '../theme/Colors';
import {
  CartItemStackPrams,
  ExploreStackParams,
  RestaurantsStackParams,
} from '../route/Routing';
import TopBackNavigation from '../navigator/TopBackNavigation';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import AddProduct from './AddProduct';
import {Text, TouchableOpacity, View} from 'react-native';
import HeaderNavBar from '../navigator/HeaderNavBar';
import Cart from '../screens/AddedCartItem';
import HomeScreen from '../screens/HomeScreen';
import OrderDetails from '../screens/OrderDetails';

const ExploreStack = createNativeStackNavigator<ExploreStackParams>();
const RestaurantsStack = createNativeStackNavigator<RestaurantsStackParams>();
const CartItemStack = createNativeStackNavigator<CartItemStackPrams>();

export const ExploreScreenStack = (props: any) => {
  return (
    <ExploreStack.Navigator
      initialRouteName="Homes"
      screenOptions={{
        // title: props.route.name,
        headerStyle: {
          backgroundColor: Colors.PRIMERY_COLOR,
        },
        statusBarStyle: 'auto',
        headerTitleAlign: 'center',
        headerTintColor: Colors.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ExploreStack.Screen
        options={{headerShown: false}}
        name="Homes"
        component={HomeScreen}
      />
      <ExploreStack.Screen
        name="Details"
        component={ProductDetailScreen}
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
      />
      <CartItemStack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="AddProduct"
        component={AddProduct}
      />
      {/* <ExploreStack.Screen
        name="Cart"
        component={Cart}
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
      /> */}
      {/* <ExploreStack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={({navigation, route}) => ({
          // headerLeft: props => (
          //   <TopBackNavigation navigation={navigation} props={props} />
          // ),
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
      /> */}
    </ExploreStack.Navigator>
  );
};

export const AddedCartItemStack = (props: any) => {
  return (
    <CartItemStack.Navigator
      initialRouteName="Carts"
      screenOptions={{
        title: props.route.name,
        headerStyle: {
          backgroundColor: Colors.PRIMERY_COLOR,
        },
        headerTitleAlign: 'center',
        headerTintColor: Colors.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <CartItemStack.Screen
        name="Carts"
        options={({navigation, route}) => ({
          // headerLeft: props => (
          //   <TopBackNavigation navigation={navigation} props={props} />
          // ),
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        component={Cart}
      />
      <CartItemStack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="AddProduct"
        component={AddProduct}
      />
      <CartItemStack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="OrderDetails"
        component={OrderDetails}
      />
    </CartItemStack.Navigator>
  );
};

export const RestaurantScreenStack = (props: any) => {
  return (
    <RestaurantsStack.Navigator
      initialRouteName="Restaurants"
      screenOptions={{
        title: props.route.name,
        headerStyle: {
          backgroundColor: Colors.PRIMERY_COLOR,
        },
        headerTitleAlign: 'center',
        headerTintColor: Colors.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <RestaurantsStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <RestaurantsStack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="Restaurant"
        component={RestaurantScreen}
      />
    </RestaurantsStack.Navigator>
  );
};
