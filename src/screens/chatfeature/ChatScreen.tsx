import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Colors from '../../theme/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Message {
  text: string;
  isSystemMessage: boolean;
  timestamp: Date;
}

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var period = hours >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  var time: any =
    hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + period;
  console.log(time);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      text: inputText.trim(),
      isSystemMessage: false,
      timestamp: time,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const sendSystemMessage = (text: string) => {
    const systemMessage: Message = {
      text,
      isSystemMessage: true,
      timestamp: time,
    };

    setMessages([...messages, systemMessage]);
  };

  // Send a welcome message as the first system message
  useEffect(() => {
    sendSystemMessage(
      'Hey there, I am herre to help you with any queries you have to make your gifting experience super cool. Hit me up!',
    );
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.isSystemMessage
                ? styles.systemMessageContainer
                : styles.userMessageContainer,
            ]}>
            {/* {!message.isSystemMessage && (
              <View style={styles.userLogoContainer}>
                <Image
                  source={require('../../images/cake1.png')} // Replace with your user logo image path
                  style={styles.logo}
                />
              </View>
            )} */}
            <View style={styles.messageContent}>
              <Text
                style={[
                  styles.messageText,
                  message.isSystemMessage
                    ? styles.systemMessageText
                    : styles.userMessageText,
                ]}>
                {message.text}
              </Text>
              <Text style={styles.timestamp}>
                {message.timestamp.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend}>
          {/* <Text style={styles.sendButtonText}>Send</Text> */}
          <MaterialCommunityIcons
            name="send-circle"
            size={44}
            color={Colors.DARK_SECONDRY_COLOR}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    // borderRadius: 5,
  },
  systemMessageContainer: {
    backgroundColor: 'lightgray',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    maxWidth: '70%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  userMessageContainer: {
    backgroundColor: 'lightblue',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    maxWidth: '70%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  logo: {
    width: 40,
    height: 40,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 14,
    color: '#222',
    padding: 5,
  },
  systemMessageText: {
    color: '#222',
  },
  userMessageText: {
    color: 'black',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 5,
    color: '#47414B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.DARK_SECONDRY_COLOR,
    borderRadius: 25,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  userLogoContainer: {
    marginRight: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
