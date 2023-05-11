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
import OrderSuccessfulScreen from '../screens/OrderSuccessfulScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput, View} from 'react-native';
import SearchedItems from '../screens/SearchedItems';
import SearchField from './common/SearchField';
import ChatWithCustomer from '../screens/chatfeature/ChatScreen';
import SignIn_SingUp from '../screens/authStack/SignIn_SignUp';
import SignIn from '../screens/authStack/SignIn';

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
        name="Searched Items"
        component={SearchedItems}
        options={{headerShown: false}}
        // options={{
        //   headerTitle: () => <SearchField navigation={props.navigation} />,
        // }}
      />
      <CartItemStack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="Orderdetails"
        component={OrderDetails}
      />
      <Stack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="Order Successful"
        component={OrderSuccessfulScreen}
      />
      <Stack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="Messaging"
        component={ChatWithCustomer}
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
      <CartItemStack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="Orderdetails"
        component={OrderDetails}
      />
      {/* <Stack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="Order Successful"
        component={OrderSuccessfulScreen}
      /> */}
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
      <Stack.Screen
        options={({navigation, route}) => ({
          header: props => (
            <HeaderNavBar navigation={navigation} props={props} route={route} />
          ),
        })}
        name="Profile Details"
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={SignUp}
      />
      <Stack.Screen name="SignIn_SingUp" component={SignIn_SingUp} />
      <Stack.Screen
        name="SignIn"
        options={{headerShown: false}}
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        options={{headerShown: false}}
        component={SignUp}
      />
    </ProfileStack.Navigator>
  );
};
