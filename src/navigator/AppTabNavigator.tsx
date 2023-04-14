import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {vw, vh} from 'react-native-css-vh-vw';
import Colors from '../theme/Colors';
import {
  AddedCartItemStack,
  ExploreScreenStack,
  ProfileStacks,
} from '../components/HeaderScreenOption';
import {RootStack} from '../route/Routing';
import {TabIcon} from '../components/common/TabBarIcon';
import {Text, View} from 'react-native';
import {useAppSelector} from '../hokes';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

const MainScreen = () => {
  const {cart: cart}: any = useAppSelector(state => state.addcart);

  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#e67a15',
        tabBarInactiveTintColor: Colors.WHITE,

        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          console.log(routeName);
          if (
            routeName === 'AddProduct' ||
            routeName === 'Order Details' ||
            routeName === 'Details' ||
            routeName === 'Cart' ||
            routeName === 'My Cart'
          ) {
            return {display: 'none'};
          }
          return {backgroundColor: Colors.PRIMERY_COLOR, height: 45, bottom: 3};
        })(route),
      })}>
      <RootStack.Screen
        name="Home"
        component={ExploreScreenStack}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return (
              <TabIcon
                route={route}
                focused={focused}
                size={size}
                color={color}
              />
            );
          },

          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      />
      <RootStack.Screen
        name="Cart"
        component={AddedCartItemStack}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}>
                <TabIcon
                  route={route}
                  focused={focused}
                  size={size}
                  color={color}
                />
                <View
                  style={{
                    width: 17,
                    height: undefined,
                    backgroundColor: '#FF5733',
                    position: 'absolute',
                    borderRadius: vw(5),
                    alignSelf: 'flex-end',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      marginVertical: -2,
                    }}>
                    {cart.length}
                  </Text>
                </View>
              </View>
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      />
      <RootStack.Screen
        name="Profile"
        component={ProfileStacks}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return (
              <TabIcon
                route={route}
                focused={focused}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      />
    </RootStack.Navigator>
  );
};

export default MainScreen;
