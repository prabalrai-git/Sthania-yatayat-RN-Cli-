import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import DashboardScreen from './src/Screens/Dashboard/DashboardScreen';
import store from './src/Services/store/store';



const App = () => {
  

  return (
    <Provider store={store}>
      <>
        <NavigationContainer>
          {/* <Text>Poatato</Text> */}
          <DashboardScreen />
        </NavigationContainer>
      </>
    </Provider>

  );
};

export default App

