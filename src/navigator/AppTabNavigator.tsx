import React, {useEffect, useRef, useState} from 'react';
import 'react-native-gesture-handler';
import ProfileScreen from '../screens/ProfileScreen';
import {vw, vh} from 'react-native-css-vh-vw';
import Colors from '../theme/Colors';
import {
  AddedCartItemStack,
  ExploreScreenStack,
} from '../components/HeaderScreenOption';
import {RootStack} from '../route/Routing';
import {TabIcon} from '../components/common/TabBarIcon';
import {Text, View} from 'react-native';
import {useAppSelector} from '../hokes';

// export type RootStackParams = {
//   Home: undefined;
//   RestaurantsStack: NavigatorScreenParams<RestaurantsStackParams>;
//   Profile: undefined;
//   Restaurant: {
//     name: string;
//   };
// };

// const RootStack = createBottomTabNavigator<RootStackParams>();

// export type RestaurantsStackParams = {
//   Restaurants: undefined;
//   Restaurant: {
//     name: string;
//   };
// };

// export type ExploreStackParams = {
//   Home: undefined;
//   Restaurant: {
//     name: string;
//   };
// };

const MainScreen = () => {
  const [sts, setSts] = useState(false);
  const {cart: cart, status}: any = useAppSelector(state => state.cart);

  return (
    // <NavigationContainer>
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#e67a15',
        tabBarInactiveTintColor: Colors.WHITE,
        tabBarStyle: {
          backgroundColor: Colors.PRIMERY_COLOR,
          height: 45,
          bottom: 3,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
        },
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
        component={ProfileScreen}
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
