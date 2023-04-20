import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SignIn from '../screens/authStack/SignIn';
import SignIn_SingUp from '../screens/authStack/SignIn_SignUp';
import SingUp from '../screens/authStack/SignUp';
import SplashScreen from '../screens/splashScreen/Splash';
import {getAsyncItem} from '../services';
import MainScreen from './AppTabNavigator';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../hokes';
import ErrorNetwork from '../components/common/ErrorNetwork';

interface StackNavigationProps {
  props: any;
  navigation: string;
}
const Stack = createStackNavigator();
const StackNavigation = (props: StackNavigationProps) => {
  const [userCradential, setUserCredential]: any = useState(null);
  const readItemFromStorage = async () => {
    const userCradential = await getAsyncItem('loginCredentials');
    setUserCredential(userCradential);
  };
  useEffect(() => {
    readItemFromStorage();
  }, []);

  if (userCradential === null) {
    return (
      <NavigationContainer>
        <ErrorNetwork>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              options={{headerShown: false}}
              component={SplashScreen}
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
              component={SingUp}
            />
            <Stack.Screen
              name="Main"
              options={{headerShown: false}}
              component={MainScreen}
            />
          </Stack.Navigator>
        </ErrorNetwork>
        {/* {isConnected === false ? <ErrorNetwork /> : null} */}
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <ErrorNetwork>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              options={{headerShown: false}}
              component={MainScreen}
            />
          </Stack.Navigator>
        </ErrorNetwork>
        {/* {isConnected === false ? <ErrorNetwork /> : null} */}
      </NavigationContainer>
    );
  }
};

export default StackNavigation;

const styles = StyleSheet.create({
  container: {},
});
