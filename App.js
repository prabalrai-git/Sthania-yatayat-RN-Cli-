import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import StackNaviagator from './src/Navigation/StackNaviagator';
import DashboardScreen from './src/Screens/Dashboard/DashboardScreen';
import store from './src/Services/store/store';
// import qweqw from './src/Assets/Fonts/NotoSans.ttf';



const App = () => {
  

  return (
    <Provider store={store}>
      <>
        <NavigationContainer>
          <StackNaviagator/>
        </NavigationContainer>

      </>
    </Provider>

  );
};

export default App

