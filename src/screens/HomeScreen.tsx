import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Colors from '../theme/Colors';
import {RootStackParams} from '../route/Routing';
import SearchBar from '../components/SearchBar';
import HeaderTabs from '../components/HeaderTabs';
import HomeMainCard from '../components/HomeMainCard';
import Categories from '../components/Categories';
import ItenList from '../components/ItemList';
import ErrorNetwork from '../components/common/ErrorNetwork';

// type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

const HomeScreen = ({navigation}: any) => {
  return (
    <ErrorNetwork>
      <View>
        <View
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: Colors.PRIMERY_COLOR,
          }}>
          <HeaderTabs navigation={navigation} />
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
    </ErrorNetwork>
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
