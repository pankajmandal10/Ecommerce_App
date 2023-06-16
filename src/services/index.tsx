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

// Time Format
export const currentDate = new Date();
export const year = currentDate.getFullYear();
export const month = String(currentDate.getMonth() + 1).padStart(2, '0');
export const day = String(currentDate.getDate()).padStart(2, '0');
export const todayDate = `${year}-${month}-${day}`;
export const hours = String(currentDate.getHours()).padStart(2, '0');
export const minutes = String(currentDate.getMinutes()).padStart(2, '0');
export const formattedDate = currentDate.toLocaleString('en-US', {
  month: 'short',
  day: 'numeric',
});
export const seconds = String(currentDate.getSeconds()).padStart(2, '0');
export const currentDateTime = String(
  `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
);
