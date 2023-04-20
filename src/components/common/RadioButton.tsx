import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';

const Radio = ({options, onSelect}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = option => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => handleSelect(option)}
          style={styles.optionContainer}>
          <View
            style={[
              styles.radioIcon,
              selectedOption === option && styles.radioIconSelected,
            ]}
          />
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.PRIMERY_COLOR,
    padding: 12,
  },
  radioIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.PRIMERY_COLOR,
    marginRight: 10,
  },
  radioIconSelected: {
    backgroundColor: 'tomato',
  },
  optionText: {
    fontSize: 16,
    color: '#2f4f4f',
  },
});

export default Radio;
