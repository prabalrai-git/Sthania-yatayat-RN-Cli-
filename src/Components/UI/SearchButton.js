import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

const SearchButton = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        width: props.width - 4,
        backgroundColor: '#184581',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#fefefe',
          fontSize: 16,
        }}>
        {props.title}
      </Text>
    </Pressable>
  );
};

export default SearchButton;

const styles = StyleSheet.create({});
