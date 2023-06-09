import React, {useState} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {getAsyncItem} from '../services';
import {store} from '../store/redux';
import StackNavigation from './StackNavigation';

interface MainNavigationProps {
  props: any;
  navigation: string;
}

const MainNavigation = (props: MainNavigationProps) => {
  return (
    <Provider store={store}>
      <StackNavigation props={props.props} navigation={props.navigation} />
    </Provider>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  container: {},
});
