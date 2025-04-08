import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Tabbar from './(tabBar)/index';

const index = () => {
  return (
    <NavigationContainer>
      <Tabbar />
    </NavigationContainer>
  )
}

export default index;