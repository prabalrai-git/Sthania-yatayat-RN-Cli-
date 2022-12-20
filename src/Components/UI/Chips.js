import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

// 325 / 525 / 725 / 825 / 1025;
// data for sthaniya yatayat
// const data = [325, 525, 725, 825, 1025];

// data for pokhara yatatat

const data = [1000];

const Chips = ({ onChipClick }) => {
  return (
    <View
      style={{
        width: WIDTH * 0.88,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 4,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
      {data.map(item => {
        return (
          <TouchableOpacity
            style={{
              borderColor: '#4051f5',
              borderWidth: 1.5,
              borderRadius: 10,
              width: 63,
              padding: 4,
              paddingTop: 11,
              paddingBottom: 11,
              alignSelf: 'center',
            }}>
            <Text
              onPress={onChipClick}
              style={{ color: 'black', textAlign: 'center' }}>
              Rs.{item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Chips;
