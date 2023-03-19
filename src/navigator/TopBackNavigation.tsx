import React from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import BackIcon from '../../icons/BackIcon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../route/Routing';
import Colors from '../theme/Colors';

type Props = NativeStackScreenProps<RootStackParams, 'Restaurant'>;

const TopBackNavigation = ({navigation, props}: any) => {
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon color={Colors.WHITE} size={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
  },
  backButton: {
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopBackNavigation;
