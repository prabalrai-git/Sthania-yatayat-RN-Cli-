import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../GlobalStyle';

const windowWidth = Dimensions.get('window').width;

const DisplayCard = ({assignetotal, totlaVehicle}) => {
  return (
    <View style={styles.displayCardcontainer}>
      <View style={[styles.displayCardOnecontainer, GlobalStyles.boxShadow]}>
        <Text style={[styles.count, {
          fontSize: 58,
          color: '#f7efef',
        }]}>{assignetotal}</Text>
        <Text style={styles.countTxt}>कुल तोकिएको गाडी</Text>
      </View>
      <View style={[styles.displayCardTwocontainer, GlobalStyles.boxShadow]}>
        <Text style={[styles.count, {
          fontSize: 28,
          color: '#8a7070'
        }]}>{totlaVehicle - assignetotal}</Text>
        <Text style={styles.countTxt}>बाँकी</Text>
      </View>
    </View>

  )
}

export default DisplayCard

const styles = StyleSheet.create({
  displayCardcontainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  displayCardOnecontainer: {
    width: windowWidth * 0.55,
    backgroundColor: '#011936FF',
    height: 120,
    borderRadius: 8,
    // borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  displayCardTwocontainer: {
    width: windowWidth * 0.33,
    backgroundColor: '#f5f6f8',
    height: 120,
    borderRadius: 8,
    // borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection:'column',
    justifyContent: 'flex-end'
  },
  count: {
    // fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  countTxt:{
    fontSize: 16,
    color: '#b8aeae',
  }
})