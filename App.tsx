import React from 'react';
import NavigationScreen from './src/navigationScreen/index';
import { SafeAreaProviderCompat } from '@react-navigation/elements';
import { Provider } from 'react-redux';
import { GlobalStore } from './src/redux/store/globalStore';
const App = () => {
  return (
    <Provider store={GlobalStore}>
      <SafeAreaProviderCompat>
        <NavigationScreen/>
      </SafeAreaProviderCompat>
    </Provider>
  )
}

export default App;