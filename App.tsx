import React from 'react';
import NavigationScreen from './src/navigationScreen/index';
import { SafeAreaProviderCompat } from '@react-navigation/elements';
const App = () => {
  return (
    <SafeAreaProviderCompat>
      <NavigationScreen/>
    </SafeAreaProviderCompat>
  )
}

export default App;