import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GlobalStyles } from '../../../GlobalStyle'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import Filter from '../../Components/UI/Filter'
import DailyRouteCard from '../../Components/UI/DailyRouteCard'
import { GetReservationDetailsByDatee } from '../../Services/appServices/VehicleManagementService'

const ReservationScreen = () => {

  const dispatch = useDispatch()
  const [TodayRouteList, setTodayRouteList] = useState();
  const [NewTodayRouteList, setNewTodayRouteList] = useState();
  const IsSearchFocused = useIsFocused()

  const handleChange = () => [

  ]

  const handleDateChange = () => {

  }
  const renderItem = ({ item }) =>
  (
    <DailyRouteCard data={item} />
  )

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

  useEffect(() => {
    const date = {
      fromdate: '2022-7-29',
      todate: '2022-7-29'
    }
    dispatch(GetReservationDetailsByDatee(date, (res) => {
      console.log("res", res?.GetReservationDetails)
    }))
  }, [])


  return (
    <View style={GlobalStyles.mainContainer}>
      <Filter
        data={TodayRouteList !== undefined ? TodayRouteList : ''}
        returnData={handleChange}
        retDate={handleDateChange}
        forReservation
      />

      <SafeAreaView style={{
        flex: 1
      }}>
        {
          NewTodayRouteList !== [] ?
            <FlatList
              data={NewTodayRouteList}
              keyExtractor={item => item.DId}
              renderItem={renderItem}
            ></FlatList>
            :
            <>
              <LoadingContainer></LoadingContainer>
            </>

        }

      </SafeAreaView>
    </View>
  )
}

export default ReservationScreen

const styles = StyleSheet.create({})