import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from './src/navigator/MainNavigation';
import {StatusBar} from 'react-native';
import Colors from './src/theme/Colors';

const Stack = createStackNavigator();
const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Colors.PRIMERY_COLOR}
        translucent={false}
      />
      <MainNavigation props={undefined} navigation={''} />
    </>
  );
};

export default App;
