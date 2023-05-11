import React, {FC, ReactNode} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
interface Props {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  animationType?: 'none' | 'slide' | 'fade'; // Optional prop to set the animation type
}

const MyModal: FC<Props> = ({
  visible,
  onClose,
  children,
  animationType = 'fade',
}) => {
  return (
    <Modal transparent visible={visible} animationType={animationType}>
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dialogBGStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000AA',
    padding: 40,
    height: undefined,
  },
  dialogStyle: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    elevation: 3,
  },
});
export default MyModal;
