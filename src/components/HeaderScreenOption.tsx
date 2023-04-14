import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Colors from '../theme/Colors';
import {
  CartItemStackPrams,
  ExploreStackParams,
  ProfileStackPrams,
} from '../route/Routing';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import AddProduct from './AddProduct';
import HeaderNavBar from '../navigator/HeaderNavBar';
import Cart from '../screens/AddedCartItem';
import HomeScreen from '../screens/HomeScreen';
import OrderDetails from '../screens/OrderDetails';
import ProfileScreen from '../screens/ProfileScreen';
import SignUp from '../screens/authStack/SignUp';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const ExploreStack = createNativeStackNavigator<ExploreStackParams>();
const ProfileStack = createNativeStackNavigator<ProfileStackPrams>();
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

      <Stack.Screen
        name="My Cart"
        component={Cart}
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
      />
      <Stack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="Order Details"
        component={OrderDetails}
      />
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
      <Stack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="Order Details"
        component={OrderDetails}
      />
    </CartItemStack.Navigator>
  );
};

export const ProfileStacks = (props: any) => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileStack"
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
      <ProfileStack.Screen
        name="ProfileStack"
        options={{headerShown: false}}
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={SignUp}
      />
    </ProfileStack.Navigator>
  );
};
