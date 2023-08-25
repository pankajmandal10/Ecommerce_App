import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface LoadingSkeletonProps {
  itemCount: number;
  renderItem: (index: number) => React.ReactNode;
  containerStyle?: ViewStyle; // New prop for container style
  itemContainerStyle?: ViewStyle;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  itemCount,
  renderItem,
  containerStyle,
  itemContainerStyle,
}) => (
  <View style={styles.container}>
    <View style={containerStyle}>
      {Array.from({length: itemCount}).map((_, index) => (
        <View style={itemContainerStyle}>{renderItem(index)}</View>
      ))}
    </View>
  </View>
);

const LoadingCartSkeleton = () => {
  const renderCartItem = index => <View style={styles.cartItemes}></View>;
  const renderCtegory = index => <View style={styles.category}></View>;

  return (
    <>
      <View style={styles.headers}>
        <View style={styles.mainHeaders}>
          <View style={styles.headerProfile}></View>
          <View style={styles.headerNotification}></View>
        </View>
        <View style={styles.inputField}></View>
      </View>
      <LoadingSkeleton
        itemCount={6}
        renderItem={renderCtegory}
        containerStyle={{
          flexDirection: 'row',
          width: '100%',
        }}
      />
      <View style={styles.slideCard}></View>
      <LoadingSkeleton
        itemCount={8}
        renderItem={renderCartItem}
        containerStyle={styles.loadingSkeleton}
        itemContainerStyle={styles.itemContainer}
      />
    </>
  );
};

const LoadingMyOrderSkeleton = item => {
  const renderCartItem = index => (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <View style={styles.cartItemName} />
        <View style={styles.cartItemPrice} />
      </View>
    </View>
  );

  return (
    <LoadingSkeleton itemCount={item.itemCount} renderItem={renderCartItem} />
  );
};

const LoadingProfileSkeleton = item => {
  const renderCartItem = index => (
    <View style={styles.cartItemContainer}>
      {/* <View style={styles.cartItemImage} /> */}
      <View style={styles.cartItemDetails}>
        <View style={styles.cartItemName} />
        <View style={styles.cartItemPrice} />
      </View>
      <View style={styles.arrowStyle}></View>
    </View>
  );

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          margin: 15,
        }}>
        <View>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 100,
              backgroundColor: '#E0E0E0',
            }}
          />
        </View>
        <View style={{width: '40%', justifyContent: 'center', marginLeft: 10}}>
          <View style={styles.profileContent} />
          <View style={styles.profileContent} />
          <View style={styles.profileContent} />
        </View>
      </View>
      <LoadingSkeleton itemCount={item.itemCount} renderItem={renderCartItem} />
      <View
        style={{
          margin: 10,
          height: 30,
          backgroundColor: '#E0E0E0',
        }}></View>
    </>
  );
};

const waveGradient = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
  colors: ['#E0E0E0', '#F0F0F0', '#E0E0E0'],
  locations: [0, 0.5, 1],
};

const styles = StyleSheet.create({
  container: {
    // Your container styles
    // width: '100%',
    // flexDirection: 'row',
  },
  itemContainer: {
    // Your item container styles
    width: '48%',
    marginBottom: 10,
  },
  cartItemContainer: {
    margin: 10,
    // Your cart item container styles
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
  },
  mainHeaders: {
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // justifyContent: 'center',
  },
  cartItemes: {
    alignSelf: 'center',
    width: '100%',
    height: 150,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
  },
  headers: {
    backgroundColor: '#E0E0E0',
    width: '100%',
    // height: 130,
  },
  profileContent: {
    backgroundColor: '#E0E0E0',
    width: '100%',
    height: 15,
    marginVertical: 5,
  },
  inputField: {
    marginHorizontal: 12,
    marginVertical: 15,
    padding: 25,
    backgroundColor: '#efefef',
    borderRadius: 25,
  },
  category: {
    margin: 8,
    height: 85,
    width: 70,
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
  },
  slideCard: {
    margin: 10,
    height: 130,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
  },
  headerProfile: {
    width: 50,
    height: 50,
    margin: 15,
    borderRadius: 50,
    backgroundColor: '#efefef',
  },
  headerNotification: {
    width: 20,
    height: 23,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#efefef',
  },
  cartItemImage: {
    // Your cart item image styles
    backgroundColor: '#E0E0E0',
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 50,
  },
  cartItemDetails: {
    // Your cart item details container styles
    flex: 1,
  },
  cartItemName: {
    // Your cart item name styles
    backgroundColor: '#E0E0E0',
    height: 20,
    marginBottom: 5,
  },
  cartItemPrice: {
    // Your cart item price styles
    backgroundColor: '#E0E0E0',
    height: 15,
  },
  loadingSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    background: waveGradient,
  },
  arrowStyle: {
    marginLeft: 70,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20 / 2,
    borderRightWidth: 20 / 2,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E0E0E0',
    transform: [{rotate: '90deg'}],
  },
  cartItemContainerGra: {
    width: '100%',
    height: 100,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden', // To clip gradient within the container
  },
});

export {LoadingCartSkeleton, LoadingMyOrderSkeleton, LoadingProfileSkeleton};
