import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../hokes';
import {STATUSES, fetchSearchedItems} from '../../store/redux/ProductSlice';
import Colors from '../../theme/Colors';
import CustomeLoading from './CustomeLoading';

interface SearchFieldProps {
  navigation: any;
}

const SearchField = (props: SearchFieldProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [listHeight, setListHeight] = useState(0);
  const dispatch = useAppDispatch();
  const {data: products, status}: any = useAppSelector(state => state.product);
  // const SearchedItems: any = useAppSelector(state => state.product);
  const flatListRef = useRef(null);
  const filteredData = searchTerm
    ? products.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : null;

  const onItemPress = async item => {
    dispatch(fetchSearchedItems(item));
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          onItemPress(item.title);
          setSearchTerm('');
        }}>
        <Text key={index} style={styles.item}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 13,
          backgroundColor: Colors.PRIMERY_COLOR,
          //   alignSelf: 'center',
        }}>
        <TouchableOpacity style={{justifyContent: 'center'}}>
          <Ionicons
            name="chevron-back"
            size={29}
            color="white"
            onPress={() => props.navigation.goBack()}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            height: 45,
            flexDirection: 'row',
            paddingHorizontal: 10,
            borderColor: 'tomato',
            borderWidth: 1,
            borderRadius: 5,
            width: 260,
          }}>
          <Ionicons
            name="search"
            size={20}
            color="black"
            onPress={() => props.navigation.goBack()}
          />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="gray"
            style={styles.input}
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
          />
        </View>
      </View>
      <View
        style={{
          zIndex: 1,
          width: '90%',
          backgroundColor: 'white',
          marginVertical: 72,
          position: 'absolute',
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
          height: listHeight > 285 ? 285 : listHeight,
        }}>
        <FlatList
          ref={flatListRef}
          data={filteredData}
          renderItem={renderItem}
          onContentSizeChange={(contentWidth, contentHeight) => {
            setListHeight(contentHeight);
          }}
          keyExtractor={item => item.key}
        />
      </View>
    </>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  container: {},
  item: {
    padding: 10,
    fontSize: 17,
    color: 'black',
    flex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: '#36454F',
  },
});
