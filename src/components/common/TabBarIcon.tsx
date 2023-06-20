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
    case 'WishList':
      iconName = focused ? 'heart-sharp' : 'heart-outline';
      break;
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};
