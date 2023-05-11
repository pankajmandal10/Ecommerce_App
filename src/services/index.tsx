import React, {createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// helper function to set the value in async storage
export const setAsyncItem = async (key: any, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

// helper function to get the value in async storage
export const getAsyncItem = async (key: any) => {
  let item: any = await AsyncStorage.getItem(key);
  try {
    item = JSON.parse(item);
    return item;
  } catch (e) {
    return item;
  }
};

// storage.js
export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    // Clear other relevant data or tokens
    // ...
  } catch (error) {
    console.log('Error clearing user data:', error);
  }
};
