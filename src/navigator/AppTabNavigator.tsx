import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {vh, vw} from 'react-native-expo-viewport-units';
import Colors from '../theme/Colors';
import {
  AddedCartItemStack,
  ExploreScreenStack,
  ProfileStacks,
  WishListStacks,
} from '../components/HeaderScreenOption';
import {RootStack} from '../route/Routing';
import {TabIcon} from '../components/common/TabBarIcon';
import {Keyboard, Platform, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hokes';
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {fetchCartItems} from '../store/redux/addCartSlice';

const MainScreen = () => {
  const [keyboardOpen, setKeyboardOpen]: any = useState(false);
  const [keyboardHeight, setKeyboardHeight]: any = useState(0);
  const {cart: cart}: any = useAppSelector(state => state.addcart);
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isFocused) {
      init();
    }
  }, [isFocused]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        setKeyboardOpen(true);
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
        setKeyboardHeight(0);
      },
    );

    // Clean up listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const init = async () => {
    await dispatch(fetchCartItems());
  };

  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#e67a15',
        tabBarInactiveTintColor: Colors.WHITE,
        keyboardHidesTabBar: true, // Add this line
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          if (
            routeName === 'AddProduct' ||
            routeName === 'Orderdetails' ||
            routeName === 'Searched Items' ||
            routeName === 'Details' ||
            routeName === 'Cart' ||
            routeName === 'My Cart' ||
            routeName === 'Order Successful' ||
            routeName === 'Messaging' ||
            routeName === 'SignIn' ||
            routeName === 'SignUp' ||
            routeName === 'Order Details' ||
            routeName === 'My Order'
          ) {
            return {display: 'none'};
          }
          return {
            backgroundColor: Colors.PRIMERY_COLOR,
            paddingBottom: 3,
            height: 47,
            display: keyboardOpen ? 'none' : 'flex',
          };
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

          tabBarActiveTintColor: '#213705',
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
          tabBarActiveTintColor: '#213705',
          tabBarInactiveTintColor: 'gray',
        })}
      />

      <RootStack.Screen
        name="WishList"
        component={WishListStacks}
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
          tabBarActiveTintColor: 'red',
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
          tabBarActiveTintColor: '#213705',
          tabBarInactiveTintColor: 'gray',
        })}
      />
    </RootStack.Navigator>
  );
};

export default MainScreen;
