import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DateTimeBadge = ({data, nepaliDate, isActive, ReserveDays}) => {
  const newdate = data.split('T');
  return (
    <View style={styles.dateTimeBadgeContainer}>
      <Text
        style={[
          styles.badgeContainer,
          {
            backgroundColor: '#40aab8',
          },
        ]}>
        {nepaliDate}
      </Text>
      {ReserveDays ? (
        <Text
          style={[
            styles.badgeContainer,
            {
              backgroundColor: '#fc7b03',
            },
          ]}>
          {ReserveDays} दिन
        </Text>
      ) : null}

      {/* <Text style={[styles.badgeContainer, {
        backgroundColor: '#58b840'
      }]}>{newdate[1]}</Text>
      <Text style={[styles.badgeContainer, {
        backgroundColor: '#e2c130'
      }]}>{newdate[0]}</Text> */}

      {isActive ? (
        <Text
          style={[
            styles.badgeContainer,
            {
              backgroundColor: '#58b840',
            },
          ]}>
          तोकिएको
        </Text>
      ) : (
        <Text
          style={[
            styles.badgeContainer,
            {
              backgroundColor: '#e25930',
            },
          ]}>
          रद्द गरियो
        </Text>
      )}
    </View>
  );
};

export default DateTimeBadge;

const styles = StyleSheet.create({
  dateTimeBadgeContainer: {
    flexDirection: 'column',
    paddingTop: 4,
  },
  badgeContainer: {
    color: '#fefefe',
    borderRadius: 16,
    paddingHorizontal: 8,
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
});
