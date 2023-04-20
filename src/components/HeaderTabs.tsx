import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {vw, vh} from 'react-native-css-vh-vw';
// import {HeaderParams} from '../route/Routing';
interface HeaderTabsProps {
  navigation: any;
}
const HeaderTabs = (props: HeaderTabsProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: vw(2),
        justifyContent: 'space-between',
      }}>
      {/* <View
        style={{
          padding: 3,
          borderColor: '#352C04',
          borderRadius: 50,
          borderWidth: 3,
        }}> */}
      <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <Ionicons name="person-circle-outline" size={50} color="#443C17" />
      </TouchableOpacity>
      {/* <Image
          style={{
            width: 45,
            height: 45,
            // alignSelf: 'center',
            // resizeMode: 'center',
          }}
          source={require('../images/user.png')}
        /> */}
      {/* </View> */}
      <TouchableOpacity
        style={{alignContent: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            backgroundColor: 'white',
            width: 17,
            height: 17,
            borderRadius: 50,
            position: 'absolute',
            flex: 1,
            top: 7,
            left: 10,
            right: 0,
            color: 'black',
            textAlign: 'center',
            zIndex: 1,
          }}>
          2
        </Text>
        <Ionicons
          style={{zIndex: -1}}
          name="notifications"
          size={30}
          color="#443C17"
        />
      </TouchableOpacity>
      {/* <HeaderButton
        text="Delivery"
        btnColor="black"
        textColor="white"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        btnColor="white"
        textColor="black"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      /> */}
    </View>
  );
};

const HeaderButton = (props: any) => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? 'black' : 'white',
      paddingVertical: 3,
      marginLeft: 10,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    onPress={() => props.setActiveTab(props.text)}>
    <Text
      style={{
        color: props.activeTab === props.text ? 'white' : 'black',
        fontSize: 13,
        fontWeight: '900',
      }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

export default HeaderTabs;
