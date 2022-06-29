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

import ReceiptPrinter from './src/ReceiptPrinter/ReceiptPrinter';



const App = () => {
  

  return (
    <>
      <ReceiptPrinter />
    </>

  );
};

export default App

