import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from './src/navigator/MainNavigation';

const Stack = createStackNavigator();
function App() {
  return <MainNavigation />;
}

export default App;
