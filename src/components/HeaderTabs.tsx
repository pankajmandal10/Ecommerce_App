import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {vw, vh} from 'react-native-css-vh-vw';
import Colors from '../theme/Colors';
import SlowTextAnimation from './common/SlowTextAnimation';
import AnimatedText from './common/SlowTextAnimation';
import Toast from './common/toast';
import {ToastType} from './common/toast/common';
// import {HeaderParams} from '../route/Routing';
interface HeaderTabsProps {
  navigation: any;
}
const HeaderTabs = (props: HeaderTabsProps) => {
  const [showBottomToast, setShowBottomToast] = useState(false);
  const onPressShowBottomToast = (): void => {
    setShowBottomToast(showBottomToast ? false : true);
    setTimeout(() => {
      setShowBottomToast(false);
    }, 5000);
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: vw(2),
          marginVertical: vh(0),
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <Ionicons
            style={{
              elevation: 50,
              borderRadius: 100,
              backgroundColor: Colors.PRIMERY_COLOR,
            }}
            name="person-circle-outline"
            size={42}
            color="#443C17"
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Image
            style={{
              width: 45,
              height: 45,
            }}
            source={require('../images/cakelicious.png')}
          />
          <AnimatedText
            style={{
              color: '#710F0F',
              fontSize: 19,
              fontWeight: 'bold',
            }}
            text="Cakelicious"
            duration={500}
          />
        </View>
        <TouchableOpacity
          onPress={() => onPressShowBottomToast()}
          style={{alignContent: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              backgroundColor: 'tomato',
              width: 17,
              height: 17,
              borderRadius: 50,
              position: 'absolute',
              flex: 1,
              top: 5,
              left: 15,
              right: 0,
              color: '#fff',
              textAlign: 'center',
              zIndex: 1,
            }}>
            2
          </Text>
          <Ionicons
            style={{
              zIndex: -1,
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              marginVertical: 10,
            }}
            name="notifications"
            size={25}
            color="#443C17"
          />
        </TouchableOpacity>
      </View>

      {showBottomToast ? (
        <Toast
          showToast={showBottomToast}
          type={ToastType.Bottom}
          message="Very soon, you will receive a notification."
        />
      ) : null}
    </>
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
