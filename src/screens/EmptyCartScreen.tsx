import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Button from '../components/common/Button';
import Colors from '../theme/Colors';

interface EmptyCartScreenProps {
  navigation: any;
}

const EmptyCartScreen = (props: EmptyCartScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, textAlign: 'center', color: 'red'}}>
        OOPS!
      </Text>
      <Text style={{fontSize: 18, textAlign: 'center', color: 'black'}}>
        Looks like you have no items in your shopping cart.!
      </Text>
      <Image
        style={{
          width: 190,
          height: 190,
          alignSelf: 'center',
          resizeMode: 'center',
        }}
        source={require('../images/EmptyImg.png')}
      />
      <Text
        style={{
          fontSize: 27,
          textAlign: 'center',
          color: '#A00942',
        }}>
        YOUR SHOPPING CART IS EMPTY
      </Text>
      <Button
        onPress={() => props.navigation.navigate('Homes')}
        title="SHOP NOW"
        style={styles.button}
      />
    </View>
  );
};

export default EmptyCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  button: {
    width: 125,
    color: Colors.WHITE,
    padding: 10,
    fontSize: 12,
    fontWeight: '800',
    marginVertical: 34,
    marginHorizontal: 4,
    borderRadius: 5,
    // borderWidth: 1,
    backgroundColor: Colors.SECONDRY_COLOR,
    alignSelf: 'center',
  },
});
