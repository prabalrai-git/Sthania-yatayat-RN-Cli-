import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../GlobalStyle'
import DateTimeBadge from './DateTimeBadge';
import { useNavigation } from '@react-navigation/native';

const daa = {
  "Charge": 360,
  "RId": 18,
  "ReservationDate": "2022-07-29T16:23:49",
  "ReserveNepalidate": "2079-4-13",
  "ReserverLocation": "Kama",
  "UserId": 2,
  "UserName": "anib",
  "VehicleNumber": "ग १ ख ८५३६",
  "vehicleId": 271
}
const windowWidth = Dimensions.get('window').width;

const ReservationCard = ({ data }) => {
  // console.log("data", data)
  const navigation = useNavigation()
  return (
    <>
      <Pressable onPress={() => {
        navigation.navigate('EditReservation', {
          data: data
        })
      }}
        style={[styles.cardCotnainer, GlobalStyles.boxShadow]}
      >
        <View style={styles.leftcontainer}>
          <Text style={[GlobalStyles.heading, { color: 'red' }]}>सवारी नं: {data.VehicleNumber}</Text>
          <Text style={[GlobalStyles.body, {
            color: secondary
          }]}>{`रसिद नं: ${data.RId}`}</Text>
          <Text style={[GlobalStyles.body, { color: "#525866" }]}>रुट: {data.ReserverLocation}</Text>
        </View>

        <DateTimeBadge
          data={data.ReservationDate} nepaliDate={data.ReserveNepalidate} isActive={true} />
      </Pressable>

    </>
  )
}

export default ReservationCard

const styles = StyleSheet.create({
  cardCotnainer: {
    backgroundColor: 'red',
    width: windowWidth - 16,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#fefefe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardTitle: {
    color: 'red',
  },
  leftcontainer: {
    width: windowWidth * 0.65,
  }
})