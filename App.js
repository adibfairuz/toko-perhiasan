/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import BottomTabs from './src/navigation/BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </>
  );
};

export default App;
