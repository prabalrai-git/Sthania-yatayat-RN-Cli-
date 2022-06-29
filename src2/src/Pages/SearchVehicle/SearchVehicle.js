import { StyleSheet, View, SafeAreaView, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Filter from '../../Components/UI/Filter'
import { GetRouteDetailsByDateWisee } from '../../Services/appServices/VehicleManagementService'
import { useDispatch } from 'react-redux'
import { GlobalStyles } from '../../../GlobalStyle'
import DailyRouteCard from '../../Components/UI/DailyRouteCard'
import { useIsFocused } from '@react-navigation/native'

const windowWidth = Dimensions.get('window').width;

const SearchVehicle = () => {
  const dispatch = useDispatch()
  const [TodayRouteList, setTodayRouteList] = useState();
  const [NewTodayRouteList, setNewTodayRouteList] = useState();
  const IsSearchFocused = useIsFocused()

  useEffect(() => {
    let date = new Date();
    const newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    dispatch(GetRouteDetailsByDateWisee(newDate, (res) => {
      if (res?.DatewiseRouteDetails !== undefined) {
        setTodayRouteList(res?.DatewiseRouteDetails)
        setNewTodayRouteList(res?.DatewiseRouteDetails)
      }else{
        setTodayRouteList([])
        setNewTodayRouteList([])
      }
    }))
  }, [IsSearchFocused])

  // console.log("route list", TodayRouteList);


  const handleChange = (e) => {
    if (e === undefined || e === '') {
      setNewTodayRouteList(TodayRouteList)
    } else {
      setNewTodayRouteList(e)
    }}

  const renderItem = ({ item }) =>
  (
    <DailyRouteCard data={item} />
  )
  const handleDateChange = (e) => {
    let temp =JSON.stringify(e).split('T');
    let newDate = temp[0].replace('"', '')
    dispatch(GetRouteDetailsByDateWisee(newDate, (res) => {
      // console.log("res?.DatewiseRouteDetails", res?.DatewiseRouteDetails);
      if (res?.DatewiseRouteDetails !== undefined) {
        setTodayRouteList(res?.DatewiseRouteDetails)
        setNewTodayRouteList(res?.DatewiseRouteDetails)
      }else{
        setTodayRouteList([])
        setNewTodayRouteList([])
      }
      
    }))
  }

  // console.log("new data", NewTodayRouteList)

  return (
    <View style={GlobalStyles.mainContainer}>
      <Filter data={TodayRouteList !== undefined ? TodayRouteList : ''} returnData={handleChange} DailyRouteVehicleFilter datePicker retDate={handleDateChange}></Filter>
      <SafeAreaView style={{
        height: 450
      }}>
        {
          NewTodayRouteList != [] ?
            <FlatList
              data={NewTodayRouteList}
              keyExtractor={item => item.DId}
              renderItem={renderItem}
            ></FlatList> 
            :
            <Text> No Data Found</Text>
        }

      </SafeAreaView>
    </View>
  )
}

export default SearchVehicle

const styles = StyleSheet.create({

})