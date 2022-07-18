import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import DashboardScreen from '../Screens/Dashboard/DashboardScreen';
import AssignRouteScreen from '../Screens/AssignRoute/AssignRouteScreen';
import ReceiptInfoScreen from '../Screens/ReceiptInfo.js/ReceiptInfoScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import SearchVehicle from '../Screens/Search.js/SearchVehicle';
import AsyncStorage from '@react-native-async-storage/async-storage'
import QrScanner from '../Screens/CameraScreen.js/QrScanner';
const StackNaviagator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const user = useSelector(state => state.storeUserData.userData);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    // console.log("potatop pota");
    try {
      const jsonValue = await AsyncStorage.getItem('@userData')
      // console.log("json 1St value", jsonValue)
      if (jsonValue !== null) {
        dispatch(storeUserData(JSON.parse(jsonValue)))
      }
      else {
      }
    } catch (e) {
    }
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'red',
        },

      }}
    >
      {
        user === undefined ?
        // IsSignedIn === false ?
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{
              headerShown: false
            }}
          />
          :
          <>
            <Stack.Screen
              name='Dashboard'
              component={DashboardScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='AssignRouteScreen'
              component={AssignRouteScreen}
            // options={{
            //   headerShown: false
            // }}
            />
            <Stack.Screen
              name='ReceiptInfoScreen'
              component={ReceiptInfoScreen}
            // options={{
            //   headerShown: false
            // }}
            />
            <Stack.Screen
              name='SearchScreen'
              component={SearchVehicle}
            // options={{
            //   headerShown: false
            // }}
            />
             <Stack.Screen
              name='ScanScreen'
              component={QrScanner}
            // options={{
            //   headerShown: false
            // }}
            />
          </>
      }
    </Stack.Navigator>
  )
}

export default StackNaviagator

const styles = StyleSheet.create({})