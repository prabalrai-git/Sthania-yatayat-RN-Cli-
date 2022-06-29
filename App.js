import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer'



const App = () => {
  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {

        console.log(enabled);
        // setBleOpend(Boolean(enabled));
        // setLoading(false);
      },
      err => {
        err;
      },
    );
  }, [])

  return (

    <Text>Potao</Text>

  );
};

export default App

