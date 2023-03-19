import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const TabIcon = ({route, focused, size, color}: any) => {
  let iconName;
  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Cart':
      iconName = focused ? 'cart' : 'cart-outline';
      break;
    case 'Profile':
      iconName = focused ? 'person' : 'person';
      break;
  }
  //   if (route.name === 'Home') {
  //     iconName = focused ? 'home' : 'home-outline';
  //   } else if (route.name === 'Settings') {
  //     iconName = focused ? 'ios-list' : 'ios-list-outline';
  //   }
  return <Ionicons name={iconName} size={size} color={color} />;
};
