import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../theme/Colors';

interface ButtonProps {
  onPress: any;
  title: string;
  style: any;
}

const Button = (props: ButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          backgroundColor: props.style.backgroundColor,
          width: props.style.width,
          padding: props.style.padding,
          marginHorizontal: props.style.marginHorizontal,
          marginVertical: props.style.marginVertical,
          opacity: props.style.opacity,
          borderRadius: props.style.borderRadius,
          borderWidth: props.style.borderWidth,
          borderColor: props.style.borderColor,
          alignSelf: props.style.alignSelf,
        }}>
        <Text
          style={{
            ...styles.buttonTitleStyle,
            fontSize: props.style.fontSize,
            fontWeight: props.style.fontWeight,
            color: props.style.color,
          }}>
          {props.title}
          {props.onPress}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {},
  buttonTitleStyle: {
    textAlign: 'center',
  },
});
