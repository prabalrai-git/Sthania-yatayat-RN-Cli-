import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons'

const windowWidth = Dimensions.get('window').width;

const DashboardButton = ({title, onPress, icon, family}) => {
  // const navigation = useNavi

  return (
    <Pressable onPress={onPress} style={styles.buttonContainer}>
      <Icon
        name={icon}
        color={'red'}
        type={family}
        style={styles.icon}
        size={40}></Icon>
      <Text style={styles.titleTxt}>{title}</Text>
    </Pressable>
  );
};

export default DashboardButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: windowWidth * 0.43,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 8,
    backgroundColor: '#ffffff60',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleTxt: {
    fontSize: 16,
    fontWeight: '900',
    marginTop: 8,
    color: '#242425',
  },
});
