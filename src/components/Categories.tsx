import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import Colors from '../theme/Colors';

interface componentNameProps {}

const Categories = (props: componentNameProps) => {
  const DATA = [
    {
      id: '1',
      title: 'Cake',
      image: require('../images/cake4.png'),
    },
    {
      id: '2',
      title: 'Burger',
      image: require('../images/burger.png'),
    },
    {
      id: '3',
      title: 'Fries',
      image: require('../images/fries.png'),
    },
    {
      id: '4',
      title: 'Sandwich',
      image: require('../images/sandwich.png'),
    },
    {
      id: '5',
      title: 'Category 5',
      image: require('../images/cake4.png'),
    },
    {
      id: '6',
      title: 'Category 5',
      image: require('../images/cake4.png'),
    },
    {
      id: '7',
      title: 'Category 5',
      image: require('../images/cake4.png'),
    },
  ];

  const Item = ({item}) => (
    <View style={styles.item}>
      <Image style={styles.imageStyle} source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    resizeMode: 'center',
    width: 50,
    height: 40,
  },
  item: {
    borderRadius: 40,
    paddingVertical: 15,
    backgroundColor: Colors.SECONDRY_COLOR,
    padding: 8,
    marginVertical: 6,
    marginHorizontal: 7,
    // opacity: 0.9,
    // borderWidth: 2,
    // borderColor: 'tomato',
  },
  title: {
    fontSize: 10,
    color: Colors.WHITE,
    textAlign: 'center',
  },
});
