import { Button, Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import DashboardButton from '../../Components/UI/DashboardButton'
import DisplayCard from '../../Components/UI/DisplayCard';
import GreatingCard from '../../Components/UI/GreatingCard';
import { useDispatch } from 'react-redux';
import { GetActiveVehicleList, GetRouteDetailsByDateWisee } from '../../Services/appServices/VehicleManagementService';

const windowWidth = Dimensions.get('window').width;

const navdata = [

  {
    id: 1,
    title: "रुट तोक्ने",
    route: 'AssignRoute',
    icon: 'directions-bus',
    iconsFamily: 'MaterialIcons'
  },
  {
    id: 2,
    title: "खोज",
    route: "Search",
    icon: "search",
    iconsFamily: 'MaterialIcons'
  },
  {
    id: 3,
    title: "स्क्यान",
    route: "BarCodeScanner",
    icon: "qr-code-scanner",
    iconsFamily: 'MaterialIcons'
  },
]

const DashboardScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [TodayAssignedList, setTodayAssignedList] = useState();
  const [TotalVehicle, setTotalVehicle] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    let date = new Date();
    const newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    dispatch(GetRouteDetailsByDateWisee(newDate, (res) => {
      if (res?.DatewiseRouteDetails.length > 0) {
        setTodayAssignedList(res?.DatewiseRouteDetails.length)
      }
    }))
    dispatch(GetActiveVehicleList(2, (res) => {
      if (res?.ActiveVehicleList.length > 0) {
        setTotalVehicle(res?.ActiveVehicleList.length);
      }
    }))
  }, [isFocused])
  return (
    <View style={styles.mainContainer}>
      <GreatingCard />
      <View style={styles.floatingContainer}>
        <DisplayCard
          assignetotal={TodayAssignedList !== undefined ? TodayAssignedList : 0}
          totlaVehicle = {TotalVehicle !== undefined ? TotalVehicle : 0}
          ></DisplayCard>
      </View>
      <View style={styles.mainDashboardCotnainer}>
        <View style={styles.dashboardCotnainer}>
          {
            navdata.map(e => (
              <DashboardButton title={e.title} onPress={() => navigation.navigate(e.route)} icon={e.icon} family={e.iconsFamily} key={e.id}></DashboardButton>
            ))
          }
        </View>
      </View>

    </View>

  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  mainContainer: {
    width: windowWidth,
    flex: 1,
    backgroundColor: primaryBkg,
    paddingTop: 30,
  },
  mainDashboardCotnainer: {
    flex: 1,
    backgroundColor: '#f9f9f9f9',
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  floatingContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  dashboardCotnainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    flexWrap: 'wrap',
    // paddingTop: 80,
  }
})