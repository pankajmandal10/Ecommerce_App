import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from '../theme/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Rating from './common/Rating';
import {Fonts} from '../theme/FontFamily';
import {vw, vh} from 'react-native-css-vh-vw';

interface componentNameProps {}

const HomeMainCard = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column', width: '45%'}}>
        <Text
          style={{
            color: 'white',
            fontSize: vw(5),
          }}>
          Branded Cake
        </Text>
        <View style={{marginTop: 20}}>
          <Rating Size={vw(5)} />
        </View>
        <Text
          style={{
            color: 'tomato',
            paddingVertical: 2,
            fontSize: vw(5),
          }}>
          45% OFF
        </Text>
      </View>
      <Image
        style={styles.imageStyle}
        source={require('../images/cake4.png')}
      />
    </View>
  );
};

export default HomeMainCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SECONDRY_COLOR,
    padding: 15,
    alignContent: 'center',
    margin: 5,
    opacity: 0.8,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
  },

  imageStyle: {
    resizeMode: 'center',
    width: vw(45),
    height: vh(13),
  },
});
