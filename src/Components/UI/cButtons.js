import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const width = Dimensions.get('window').width;

export const PrimaryBtn = ({title, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnContainer,
        {
          backgroundColor: '#184581',
        },
      ]}>
      <Text
        style={[
          styles.btnTxt,
          {
            color: '#fefefe',
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const SecondaryBtn = ({title, onPress, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnContainer,
        {
          backgroundColor: '#fafafa57',
          borderWidth: 1,
          borderColor: primary,
        },
      ]}
      disabled={disabled}>
      <Text
        style={[
          styles.btnTxt,
          {
            color: primary,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const LoginBtn = ({title, onPress, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnContainer,
        {
          backgroundColor: '#184581',
          width: width - 20,
          marginLeft: 10,
        },
      ]}
      disabled={disabled}>
      <Text
        style={[
          styles.btnTxt,
          {
            color: '#fefefe',
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: width * 0.44,
    // borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
