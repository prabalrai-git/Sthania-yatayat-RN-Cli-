import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GlobalStyles } from '../../../GlobalStyle'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import Filter from '../../Components/UI/Filter'
import DailyRouteCard from '../../Components/UI/DailyRouteCard'

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