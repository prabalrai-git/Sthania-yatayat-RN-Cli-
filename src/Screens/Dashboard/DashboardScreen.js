import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GreatingCard from '../../Components/UI/GreatingCard'
import DashboardButton from '../../Components/UI/DashboardButton'



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
  return (
    <View style={styles.mainContainer}>
    <GreatingCard />
    <View style={styles.floatingContainer}>
      {/* <DisplayCard
        assignetotal={TodayAssignedList !== undefined ? TodayAssignedList : 0}
        totlaVehicle = {TotalVehicle !== undefined ? TotalVehicle : 0}
        ></DisplayCard> */}
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
    width: "100%",
    flex: 1,
    backgroundColor: 'red',
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