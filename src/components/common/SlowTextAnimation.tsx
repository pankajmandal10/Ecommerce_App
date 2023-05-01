// import React, {useEffect} from 'react';
// import {Text} from 'react-native';

// interface SlowTextProps {
//   speed: number;
//   text: string;
//   style: object;
// }

// export const SlowTextAnimation = (props: SlowTextProps) => {
//   const {speed, text, style} = props;
//   const [placeholder, setPlaceholder] = React.useState(text[0]);

//   const index = React.useRef(0);

//   useEffect(() => {
//     function tick() {
//       index.current++;
//       setPlaceholder((prev: string) => prev + text[index.current]);
//     }
//     if (index.current < text.length - 1) {
//       let addChar = setInterval(tick, speed);
//       return () => clearInterval(addChar);
//     }
//   }, [placeholder, speed, text]);
//   return <Text style={style}>{placeholder}</Text>;
// };

interface AnimatedTextProps {
  duration: number;
  text: string;
  style: object;
}

import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

const AnimatedText = (props: AnimatedTextProps) => {
  const {duration, text, style} = props;
  const letters = text.split('');
  const animatedValues = useRef(
    letters.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.stagger(duration || 100, [
        ...animatedValues.map((value, i) =>
          Animated.timing(value, {
            toValue: 1,
            duration: duration || 1000,
            useNativeDriver: true,
          }),
        ),
        ...animatedValues.map((value, i) =>
          Animated.timing(value, {
            toValue: 0,
            duration: duration || 1000,
            useNativeDriver: true,
          }),
        ),
      ]),
    ).start();
  }, []);

  return (
    <View style={{flexDirection: 'row'}}>
      {letters.map((letter, i) => (
        <Animated.Text key={i} style={{...style, opacity: animatedValues[i]}}>
          {letter}
        </Animated.Text>
      ))}
    </View>
  );
};

export default AnimatedText;
