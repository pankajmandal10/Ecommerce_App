import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../theme/Colors';
import {vw, vh} from 'react-native-css-vh-vw';

const OrderSuccessfulScreen = props => {
  return (
    <View style={styles.container}>
      <Image source={require('../images/success.png')} style={styles.icon} />
      <Text style={{...styles.headerText, fontSize: 22}}>Order Confirmed</Text>
      <Text
        style={{
          ...styles.headerText,
          fontSize: 17,
          textAlign: 'center',
        }}>
        Thank You for your order. You will receive email confirmation shortly.
      </Text>
      <TouchableOpacity
        style={{
          ...styles.touchableButton,
          backgroundColor: Colors.WHITE,
        }}
        onPress={() => {
          props.navigation.navigate('Homes');
        }}>
        <Text
          style={{
            ...styles.touchbleTextStyle,
            color: 'green',
          }}>
          Continue Shopping
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMERY_COLOR,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 130,
    height: 130,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 7,
    color: 'white',
  },
  body: {
    marginBottom: 20,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  items: {
    fontSize: 16,
    marginBottom: 10,
  },
  total: {
    fontSize: 16,
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  touchableButton: {
    width: vw(60),
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#816F18',
    borderWidth: 2,
    padding: 8,
    marginVertical: 30,
  },
  touchbleTextStyle: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OrderSuccessfulScreen;
