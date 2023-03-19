import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Colors from '../theme/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../route/Routing';
import SearchBar from '../components/SearchBar';
import HeaderTabs from '../components/HeaderTabs';
import HomeMainCard from '../components/HomeMainCard';
import Categories from '../components/Categories';
import ItenList from '../components/ItemList';

// type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

const HomeScreen = ({navigation}: any) => {
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

      <ScrollView style={{marginBottom: 120}}>
        <HomeMainCard />
        <Categories />
        <ItenList navigation={navigation} />
      </ScrollView>
      {/* <Counter /> */}
      {/* <View style={styles.container}>
        <ScrollView>
          <Text style={styles.screenTitle}>Restaurants gugu</Text>
          <View>
            <Text style={styles.sectionTitle}>Restaurants Near You</Text>
            <RestaurantCard
              name="Sushi restaurant"
              onPress={() => {
                navigation.push('Restaurant', {name: 'Sushi restaurant'});
                // navigation.navigate('RestaurantsStack', {
                //   screen: 'Restaurant hai',
                //   params: {name: 'Hello from explore'},
                // });
              }}
            />
            <RestaurantCard
              name="Burger restaurant"
              onPress={() => {
                navigation.push('Restaurant', {
                  // screen: 'Restaurant hai',
                  name: 'Burger restaurant',
                });
              }}
            />
            <RestaurantCard
              name="Fine dining restaurant"
              onPress={() => {
                navigation.push('Restaurant', {name: 'Fine dining restaurant'});
              }}
            />

            <Text style={styles.sectionTitle}>Most Popular Restaurants</Text>
            <RestaurantCard
              name="Sushi restaurant"
              onPress={() => {
                navigation.push('Restaurant', {name: 'Sushi restaurant'});
              }}
            />
            <RestaurantCard
              name="Burger restaurant"
              onPress={() => {
                navigation.push('Restaurant', {name: 'Burger restaurant'});
              }}
            />
          </View>
          <Menu />
        </ScrollView>
      </View> */}
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
