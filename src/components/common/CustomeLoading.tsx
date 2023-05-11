import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Colors from '../../theme/Colors';

class CustomeLoading extends Component {
  render() {
    return (
      // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <>
        {/* <BlurView style={styles.blur} blurType="light" blurAmount={1} /> */}
        {/* <View style={{zIndex: 2, width: '100%', backgroundColor: 'gray'}}> */}
        <PacmanIndicator color={Colors.DARK_SECONDRY_COLOR} size={90} />
        {/* </View> */}
        {/* <BlurView style={styles.blur} blurType="light" blurAmount={1} /> */}
      </>
      // </View>
    );
  }
}

export class CustomeItemLoading extends Component {
  render() {
    return <MaterialIndicator color="yellow" size={26} />;
  }
}

export class CustomeDotIndicatorLoading extends Component {
  render() {
    return <DotIndicator color="white" size={10} />;
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    width: '100%',
    height: 500,
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    zIndex: 2,
    // transform: [{translateX: -20}, {translateY: -20}],
    backgroundColor: 'gray',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default CustomeLoading;
