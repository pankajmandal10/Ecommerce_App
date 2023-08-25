import React, {useEffect} from 'react';
import {View, Alert, Text, TouchableOpacity} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Colors from '../theme/Colors';
import {useAppDispatch, useAppSelector} from '../hokes';
import {
  checkoutOrderedItem,
  orderedItemPost,
} from '../store/redux/ProductSlice';
import {StackActions} from '@react-navigation/core';

const PaymentScreen = ({userDetails, grandTotal, navigation}) => {
  const {cart: cart}: any = useAppSelector(state => state.addcart);
  const dispatch = useAppDispatch();
  let totalValue = Math.round(grandTotal + 50);
  const handlePayment = () => {
    const options = {
      description: 'Payment Description', // Payment description
      image:
        'https://res.cloudinary.com/daghzwcji/image/upload/v1690634056/cakelicious_a2hqeu.png', // Your logo image URL
      currency: 'INR', // Currency code
      key: 'rzp_test_hhyUXvj0zh7AhT', // Your Razorpay API key
      amount: totalValue * 100, // Amount in paise (1 INR = 100 paise)
      name: 'Cakelicious', // Company name or app name
      prefill: {
        email: userDetails.email, // Customer email
        contact: userDetails.phone, // Customer contact number
        name: userDetails.name, // Customer name
      },
      theme: {color: Colors.SECONDRY_COLOR}, // Customize color
    };

    RazorpayCheckout.open(options)
      .then(async data => {
        // Handle success
        // console.warn('succ', data.razorpay_payment_id);
        await dispatch(orderedItemPost(cart));
        await dispatch(checkoutOrderedItem());
        navigation.dispatch(StackActions.replace('Order Successful'));
        // Alert.alert(
        //   'Payment Successful',
        //   `Payment ID: ${data.razorpay_payment_id}`,
        // );
      })
      .catch(error => {
        // Handle failure
        // console.warn('catch', error.description);
        Alert.alert('Payment Error', 'Payment Faild');
      });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePayment}
        style={{
          alignContent: 'center',
          borderRadius: 5,
          borderWidth: 1,
          paddingHorizontal: 25,
          padding: 5,
          borderColor: 'white',
          height: 40,
          top: 12,
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '600',
            top: 2,
            color: 'white',
            textAlign: 'center',
          }}>
          Pay Now
        </Text>
      </TouchableOpacity>
      {/* <Button title="Pay Now" onPress={handlePayment} /> */}
    </View>
  );
};

export default PaymentScreen;
