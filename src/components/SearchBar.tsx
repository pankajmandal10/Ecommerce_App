import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {vh, vw} from 'react-native-expo-viewport-units';
import {useAppDispatch, useAppSelector} from '../hokes';
import {
  fetchSearchProducts,
  fetchSearchedItems,
} from '../store/redux/ProductSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface SearchBarProps {
  navigation: any;
}

const SearchBar = (props: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [listHeight, setListHeight] = useState(0);
  const dispatch = useAppDispatch();
  const {data: products, status}: any = useAppSelector(state => state.product);

  const filteredData = searchTerm
    ? products.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : null;

  const onItemPress = async item => {
    await dispatch(fetchSearchedItems(item)).then(res => {
      props.navigation.navigate('Searched Items', (item = {item}));
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSearchTerm(item);
          onItemPress(item.title);
          setSearchTerm('');
        }}>
        <Text key={index} style={styles.item}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const flatListRef = useRef(null);

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="Search Products..."
          placeholderTextColor="gray"
          style={styles.input}
          value={searchTerm}
          onChangeText={text => {
            setSearchTerm(text);
          }}
        />
        <TouchableOpacity
          onPress={() => onItemPress(searchTerm)}
          style={{
            flexDirection: 'row',
            marginRight: 8,
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 30,
            alignItems: 'center',
          }}>
          <AntDesign
            name="clockcircle"
            size={11}
            style={{marginRight: 6, color: 'gray'}}
          />
          <Text style={{color: 'gray'}}>Search</Text>
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
          height: listHeight > 285 ? 285 : listHeight,
        }}>
        <FlatList
          ref={flatListRef}
          data={filteredData}
          renderItem={({item, index}) => renderItem({item, index})}
          onContentSizeChange={(contentWidth, contentHeight) => {
            setListHeight(contentHeight);
          }}
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
    height: 50,
    marginLeft: 10,
    color: '#36454F',
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
    fontSize: 17,
    color: 'black',
    flex: 1,
  },
});

export default SearchBar;
