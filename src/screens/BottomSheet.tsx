import React, {useRef, ReactNode} from 'react';
import {Modal, Animated, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../theme/Colors';
import {PanGestureHandler} from 'react-native-gesture-handler';
interface MyBottomSheetProps {
  children: ReactNode;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const BottomSheet: React.FC<MyBottomSheetProps> = ({
  children,
  isVisible,
  setIsVisible,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleModalClose = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    });
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, animatedValue]);

  return (
    <Modal visible={isVisible} transparent animationType="none">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleModalClose}>
        <PanGestureHandler>
          <Animated.View
            style={[styles.bottomSheet, {transform: [{translateY}]}]}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: Colors.SECONDRY_COLOR,
    padding: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default BottomSheet;
