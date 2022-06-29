import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReceiptInfo from '../Components/ReceiptInfo'
import AssignRouteScreen from '../Pages/AssignRoute/AssignRouteScreen'
import PrintScreen from '../Pages/AssignRoute/PrintScreen'
import BarCodeScannerScreen from '../Pages/BarCodeScanner/BarCodeScannerScreen'
import DashboardScreen from '../Pages/Dashboard/DashboardScreen'
import LoginScreen from '../Pages/LoginScreen/LoginScreen'
import SearchVehicle from '../Pages/SearchVehicle/SearchVehicle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeUserData } from '../Services/store/slices/profileSlice'
import { useDispatch } from 'react-redux'



const StackNavigator = () => {
  const Stack = createNativeStackNavigator()
  const dispatch = useDispatch();
  const user = useSelector(state => state.storeUserData.userData)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    // console.log("potatop pota");
    try {
      const jsonValue = await AsyncStorage.getItem('@userData')
      // console.log('json val 1st', jsonValue);
      if (jsonValue != null) {
        dispatch(storeUserData(JSON.parse(jsonValue)))
        // setIsSignedIn(true)
      }
      else {
        // null
        // setIsSignedIn(false)
      }
    } catch (e) {
    }
  }
  // console.log("user", user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: primary,
        },

      }}
    >
      {
        user === undefined ?

          <Stack.Screen
            name='Login'
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
              name='BarCodeScanner'
              component={BarCodeScannerScreen}
              options={{
                title: 'क्यूआर स्क्यान'
              }}
            />
            <Stack.Screen
              name='AssignRoute'
              component={AssignRouteScreen}
              options={{
                title: 'रुट तोक्नु'
              }}

            />
            <Stack.Screen
              name='PrintScreen'
              component={PrintScreen}
              options={{
                title: 'प्रिन्ट स्क्रिन'
              }}

            />
            <Stack.Screen
              name='Search'
              component={SearchVehicle} 
              options={{
                title:'खोज स्क्रिन'
              }}  
            />
              


            <Stack.Screen
              name='ReceiptInfo'
              component={ReceiptInfo} 
              options={{
                title:'रसिद जानकारी'
              }}    
            />


          </>
      }
    </Stack.Navigator>
  )
}

export default StackNavigator