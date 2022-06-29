import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator, createSwitchNavigator } from '@react-navigation/native-stack'
import React from 'react'
import ReceiptInfo from '../Components/ReceiptInfo'
import AssignRouteScreen from '../Pages/AssignRoute/AssignRouteScreen'
import PrintScreen from '../Pages/AssignRoute/PrintScreen'
import BarCodeScannerScreen from '../Pages/BarCodeScanner/BarCodeScannerScreen'
import DashboardScreen from '../Pages/Dashboard/DashboardScreen'
import SearchVehicle from '../Pages/SearchVehicle/SearchVehicle'
import LoginScreen from '../Pages/LoginScreen/LoginScreen'



const SwitchNavigator = () => {
  const appcostiner = createAppContainer()
  const SwitchNavion = createSwitchNavigator({
    loginFlow: createNativeStackNavigator({
      Login: LoginScreen
    }),
    mainflow: createNativeStackNavigator({
      Dashboard: DashboardScreen,
      BarCodeScanner: BarCodeScannerScreen,
      AssignRoute: AssignRouteScreen,
      PrintScreen: PrintScreen,
      Search: SearchVehicle,
      ReceiptInfo: ReceiptInfo,

    })
  });
}

export default SwitchNavigator