import {Dimensions, StyleSheet, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const AppButton = ({title, onPress, IsDisabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnContainer}
      disabled={IsDisabled}>
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: windowWidth - 40,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    // marginTop: 20,
    backgroundColor: '#184581',
    borderRadius: 4,
  },
  btnTitle: {
    fontSize: 16,
    color: '#fefefe',
    letterSpacing: 1.2,
    fontWeight: 'bold',
  },
});
