import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {string} from 'prop-types';

export type RootStackParams = {
  Home: undefined;
  // Cart: NavigatorScreenParams<RestaurantsStackParams>;
  Cart: NavigatorScreenParams<CartItemStackPrams>;
  Profile: undefined;
  WishList: undefined;
  Restaurant: {
    name: string;
  };
};

export type RestaurantsStackParams = {
  Restaurants: undefined;
  Restaurant: {
    name: string;
  };
};

export type CartItemStackPrams = {
  Carts: undefined;
  AddProduct: {
    name: string;
  };
  Orderdetails: undefined;
  PaymentScreen: undefined;
  OrderDetails: {
    name: string;
  };
};

export type AuthStackPrams = {
  Splash: undefined;
  SigninSingup: undefined;
  Signin: undefined;
  Signup: {
    name: string;
  };
};

export type WishListStackPrams = {
  WishList: undefined;
};

export type ProfileStackPrams = {
  Profile: undefined;
  ProfileStack: undefined;
  Signup: undefined;
};

export type ExploreStackParams = {
  Homes: undefined;
  Details: undefined;
  AddCart: undefined;
  Restaurant: {
    name: string;
  };
};

export const RootStack = createBottomTabNavigator<RootStackParams>();
