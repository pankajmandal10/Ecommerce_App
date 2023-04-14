import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {vw, vh} from 'react-native-css-vh-vw';
import {useAppDispatch, useAppSelector} from '../hokes';
import {fetchSearchProducts} from '../store/redux/ProductSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();
  const {data: products, status}: any = useAppSelector(state => state.product);

  const filteredData = searchTerm
    ? products.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : null;

  const onItemPress = async () => {
    await dispatch(fetchSearchProducts(searchTerm));
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSearchTerm(item.title);
          onItemPress();
        }}>
        <Text style={styles.item}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="Search Products..."
          style={styles.input}
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
        <TouchableOpacity
          onPress={() => onItemPress()}
          style={{
            flexDirection: 'row',
            marginRight: 8,
            backgroundColor: 'white',
            padding: 9,
            borderRadius: 30,
            alignItems: 'center',
          }}>
          <AntDesign name="clockcircle" size={11} style={{marginRight: 6}} />
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          zIndex: 1,
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          marginVertical: 72,
        }}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 10,
    alignSelf: 'center',
    width: vw(95),
  },
  input: {
    flex: 1,
    height: 55,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
    color: '#A9A9A9',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
});

export default SearchBar;
