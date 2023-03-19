import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {string} from 'prop-types';

export type RootStackParams = {
  Home: undefined;
  // Cart: NavigatorScreenParams<RestaurantsStackParams>;
  Cart: NavigatorScreenParams<CartItemStackPrams>;
  Profile: undefined;
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
  OrderDetails: {
    name: string;
  };
};

export type ExploreStackParams = {
  Homes: undefined;
  Details: undefined;
  Cart: undefined;
  Restaurant: {
    name: string;
  };
};

// export type HeaderParams = {
//   HeaderBar: undefined;
//   SearchBar: undefined;
//   text: undefined;
//   // activeTab: undefined;
//   // setActiveTab: undefined;
// };

export const RootStack = createBottomTabNavigator<RootStackParams>();
