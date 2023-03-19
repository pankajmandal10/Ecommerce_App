import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import TopBackNavigation from './TopBackNavigation';
import Colors from '../theme/Colors';

interface HeaderNavBarProps {
  props: any;
  navigation: any;
  route: any;
}

const HeaderNavBar = (props: HeaderNavBarProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.PRIMERY_COLOR,
        height: 50,
      }}>
      <TouchableOpacity style={{padding: 10}}>
        <TopBackNavigation navigation={props.navigation} props={props} />
      </TouchableOpacity>
      <Text
        style={{
          padding: 10,
          fontSize: 20,
          fontWeight: '600',
          textAlign: 'center',
          color: Colors.WHITE,
        }}>
        {props.route.name}
      </Text>
    </View>
  );
};

export default HeaderNavBar;

const styles = StyleSheet.create({
  container: {},
});
