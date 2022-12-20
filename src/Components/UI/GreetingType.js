import {Text} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../../../GlobalStyle';
import {useEffect} from 'react';
import {useState} from 'react';

export default function GreetingType() {
  const [greeting, setGreeting] = useState('');

  const today = new Date();

  let Hour = today.getHours();
  const returnGreeting = hour => {
    if (hour < 12) {
      setGreeting('शुभ-प्रभात');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('शुभ-दिवा');
    } else if (hour >= 17 && hour <= 23) {
      setGreeting('शुभ सन्ध्या');
    }
  };

  useEffect(() => {
    returnGreeting(Hour);
  }, [Hour]);

  return (
    <Text
      style={[
        GlobalStyles.title1,
        {
          color: '#f9f9f9',
          marginBottom: 4,
        },
      ]}>
      {greeting}
    </Text>
  );
}
