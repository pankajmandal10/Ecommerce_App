import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface RatingProps {
  Size: number;
}

const Rating = (props: RatingProps) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <FontAwesome name="star" size={props.Size} color="yellow" />
      <FontAwesome name="star" size={props.Size} color="yellow" />
      <FontAwesome name="star" size={props.Size} color="yellow" />
      <FontAwesome name="star-o" size={props.Size} color="yellow" />
      <FontAwesome name="star-o" size={props.Size} color="yellow" />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {},
});
