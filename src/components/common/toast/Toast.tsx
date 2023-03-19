import React from 'react';
import {Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styles from './styles';
import {ToastType} from './common';
import Colors from '../../../theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  showToast: boolean;
  message?: string;
  type?: ToastType;
}

const Toast = ({showToast, message, type}: Props): JSX.Element => {
  const positionY = useSharedValue(type === ToastType.Top ? -100 : 100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withSpring(positionY.value)}],
    };
  });

  if (showToast) {
    if (type === ToastType.Top) {
      positionY.value = 0;
    }
    if (type === ToastType.Bottom) {
      positionY.value = -16;
    }
  }

  if (!showToast) {
    if (type === ToastType.Top) {
      positionY.value = -100;
    }
    if (type === ToastType.Bottom) {
      positionY.value = 100;
    }
  }

  return (
    <Animated.View
      style={[
        styles.commonToastStyle,
        type === ToastType.Top ? styles.topToastStyle : styles.bottomToastStyle,
        animatedStyle,
      ]}>
      <View style={{flexDirection: 'row'}}>
        <AntDesign
          style={{}}
          name="checkcircle"
          size={24}
          color={Colors.SECONDRY_COLOR}
        />
        <Text
          style={{
            fontSize: 15,
            paddingHorizontal: 15,
            fontWeight: '500',
            color: 'white',
          }}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

export default Toast;
