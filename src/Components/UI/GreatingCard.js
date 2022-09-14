import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import { Icon } from 'react-native-elements'
import {GlobalStyles} from '../../../GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {logout} from '../../Services/store/slices/profileSlice';
import {useSelector} from 'react-redux';
import GreetingType from './GreetingType';

const GreatingCard = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.storeUserData.userData);
  const handleAction = () => {
    Alert.alert('सतर्कता', 'के तपाई लग आउट गर्न चाहनुहुन्छ?', [
      {text: 'होइन'},
      {
        text: 'हो',
        onPress: () => {
          dispatch(logout(null));
        },
      },
    ]);
  };
  return (
    <View style={styles.geetingCardContainer}>
      <View style={styles.leftContainer}>
        <Text
          style={[
            GlobalStyles.title1,
            {
              color: '#f9f9f9',
              marginBottom: 4,
            },
          ]}>
          <GreetingType />
        </Text>
        <Text
          style={[
            GlobalStyles.body,
            {
              color: '#e6dddd',
            },
          ]}>
          {user.UserName}
        </Text>
      </View>
      <Pressable onPress={() => handleAction()}>
        <Icon
          name={'user'}
          color={'red'}
          type={'antdesign'}
          style={{
            padding: 8,
          }}
          size={20}
          borderRadius={50}
          backgroundColor={'#fefefe'}></Icon>
      </Pressable>
    </View>
  );
};

export default GreatingCard;

const styles = StyleSheet.create({
  geetingCardContainer: {
    // backgroundColor: 'green'
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // icon: {
  //   backgroundColor: '#Fefefefe',
  //   padding: 8,
  // }
});
