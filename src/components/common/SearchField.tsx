import React, {useState} from 'react';
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
  const dispatch = useAppDispatch();
  const {data: products, status}: any = useAppSelector(state => state.product);
  // const SearchedItems: any = useAppSelector(state => state.product);

  const filteredData = searchTerm
    ? products.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : null;

  // console.warn('filteredData', filteredData);

  const onItemPress = async item => {
    dispatch(fetchSearchedItems(item));
  };

  // console.warn(SearchedItems.status === 'loading');
  // if (SearchedItems.status === 'loading') {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignContent: 'center',
  //         alignSelf: 'center',
  //       }}>
  //       <CustomeLoading />
  //     </View>
  //   );
  // }

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
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
              fontSize: 16,
            }}
            value={searchTerm}
            placeholder="Search products..."
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
        }}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
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
});
