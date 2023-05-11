import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import MyModal from '../../components/modal/MyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../theme/Colors';
import {Text} from 'react-native';

interface chatPageProps {
  navigation: any;
}

const ChatIcon = (props: chatPageProps) => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleChatIconPress = () => {
    setIsChatVisible(!isChatVisible);
    props.navigation.navigate('Messaging');
  };

  const handleSignOut = async () => {
    setLoading(true);
    await AsyncStorage.removeItem('loginCredentials');
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {/* <MyModal visible={visible} onClose={handleClose} animationType="fade">
        <Text style={{fontSize: 17, color: 'black'}}>
          Chat feature will be available soon...!
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>OK</Text>
        </TouchableOpacity>
      </MyModal> */}
      <TouchableOpacity style={styles.chatIcon} onPress={handleChatIconPress}>
        <Icon name="chat" color="white" type="material" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  chatIcon: {
    borderWidth: 0.3,
    borderColor: 'yellow',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#033537',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: Colors.PRIMERY_COLOR,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    color: 'white',
    width: 90,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChatIcon;
