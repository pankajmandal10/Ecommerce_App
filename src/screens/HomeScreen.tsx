import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Colors from '../theme/Colors';
import {RootStackParams} from '../route/Routing';
import SearchBar from '../components/SearchBar';
import HeaderTabs from '../components/HeaderTabs';
import HomeMainCard from '../components/HomeMainCard';
import Categories from '../components/Categories';
import ItenList from '../components/ItemList';

// type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

const HomeScreen = ({navigation}: any) => {
  const renderItem = ({item}) => (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 5,
        height: 250,
        padding: 50,
        marginLeft: 25,
        marginRight: 25,
      }}>
      <Text style={{fontSize: 30}}>{item.title}</Text>
    </View>
  );
  return (
    <View>
      <View
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: Colors.PRIMERY_COLOR,
        }}>
        <HeaderTabs />
        <SearchBar />
      </View>
      <ScrollView style={{marginBottom: 120, zIndex: -1}}>
        <HomeMainCard />
        <View>
          <Categories />
        </View>
        <ItenList navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // marginTop: 24,
  },
  restaurantCard: {
    backgroundColor: '#efefef',
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
  },
  screenTitle: {
    fontSize: 24,
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
