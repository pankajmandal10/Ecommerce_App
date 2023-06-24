import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Colors from '../theme/Colors';
import Rating from './common/Rating';
import {vw, vh} from 'react-native-css-vh-vw';
interface componentNameProps {}

interface Item {
  id: number;
  title: string;
  image: any;
}

const data: Item[] = [
  {id: 1, title: 'Cake', image: require('../images/cake4.png')},
  {id: 2, title: 'Burger', image: require('../images/burger.png')},
  {id: 3, title: 'Fries', image: require('../images/fries.png')},
  {id: 4, title: 'Sandwich', image: require('../images/sandwich.png')},
];

const CarouselItem = ({item}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column', width: '45%'}}>
        <Text
          style={{
            color: 'white',
            fontSize: vw(5),
          }}>
          {item.title}
        </Text>
        <View style={{marginTop: 20}}>
          <Rating Size={vw(5)} />
        </View>
        <Text
          style={{
            color: 'tomato',
            paddingVertical: 2,
            fontSize: vw(5),
          }}>
          45% OFF
        </Text>
      </View>
      <Image source={item.image} style={styles.imageStyle} />
    </View>
  );
};

const HomeMainCard = (props: componentNameProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={({item}) => <CarouselItem item={item} />}
        sliderWidth={vw(100)}
        itemWidth={vh(48)}
        onSnapToItem={index => setActiveIndex(index)}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default HomeMainCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SECONDRY_COLOR,
    padding: 15,
    alignContent: 'center',
    margin: 5,
    opacity: 0.8,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 0,
  },

  imageStyle: {
    resizeMode: 'center',
    width: vw(45),
    height: vh(13),
  },
  imagecontainer: {
    width: 350,
    height: 350,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paginationContainer: {
    paddingVertical: 5,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'yellow',
  },
  inactiveDotStyle: {
    backgroundColor: 'white',
  },
});
