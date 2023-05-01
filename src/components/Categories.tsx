import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../theme/Colors';
import {useAppDispatch, useAppSelector} from '../hokes';
import {
  STATUSES,
  fetchSearchProducts,
  productSearchByCategory,
} from '../store/redux/ProductSlice';
import CustomeLoading from './common/CustomeLoading';

interface componentNameProps {}

const DATA = [
  {
    id: '0',
    status: true,
    title: 'All',
  },
  {
    id: '1',
    status: false,
    title: 'Cake',
    image: require('../images/cake4.png'),
  },
  {
    id: '2',
    status: false,
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
    status: false,
    title: 'Sandwich',
    image: require('../images/sandwich.png'),
  },
  {
    id: '5',
    status: false,
    title: 'Colddrink',
    image: require('../images/allcolddrink.png'),
  },
];

const ListItem = ({item, index, selected, onPress}) => {
  const borderColor = item.status ? 'yellow' : 'transparent';
  const dispatch = useAppDispatch();
  const {Searcheddata: products, status}: any = useAppSelector(
    state => state.product,
  );

  const onCategory = async item => {
    const category = item.title === 'All' ? '' : item.title;
    DATA.forEach(itm => {
      if (item.id === itm.id) {
        item.status = true;
      } else {
        itm.status = false;
      }
    });
    onPress(item);
    await dispatch(productSearchByCategory(category));
  };

  return (
    <View
      style={{
        borderRadius: 40,
        paddingVertical: 15,
        backgroundColor: Colors.SECONDRY_COLOR,
        padding: 10,
        borderWidth: 2,
        marginVertical: 6,
        marginHorizontal: 7,
        // flex: 1,
        borderColor: item.status ? 'yellow' : 'transparent',
      }}>
      {item.id == 0 ? (
        <TouchableOpacity
          onPress={() => onCategory(item)}
          style={{
            width: 50,
            paddingVertical: 10,
          }}>
          <Text style={styles.titleStyle}>All</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onCategory(item)}>
          <Image style={styles.imageStyle} source={item.image} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Categories = (props: componentNameProps) => {
  const [selectedItem, setSelectedItem] = useState(DATA[0]);

  const handlePress = item => {
    setSelectedItem(item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item, index}) => (
          <ListItem
            item={item}
            index={index}
            selected={selectedItem?.id === item.id}
            onPress={handlePress}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    resizeMode: 'center',
    width: 50,
    height: 40,
    flexDirection: 'row',
  },
  item: {
    borderRadius: 40,
    paddingVertical: 15,
    backgroundColor: Colors.SECONDRY_COLOR,
    padding: 8,
    marginVertical: 6,
    marginHorizontal: 7,
    ma: 30,
    flex: 1,
  },
  item1: {
    borderRadius: 40,
    paddingVertical: 15,
    backgroundColor: Colors.SECONDRY_COLOR,
    padding: 8,
    marginVertical: 6,
    marginHorizontal: 7,
    borderWidth: 2,
    borderColor: 'yellow',
    flex: 1,
  },
  title: {
    fontSize: 10,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  titleStyle: {
    fontSize: 25,
    color: Colors.WHITE,
    textAlign: 'center',
  },
});
