import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Tabbar from './(tabBar)/index';
import { useAppDispatchGlobal, useAppSelectorGlobal } from '../redux/store/globalStore';
import { checkLogin } from '../redux/slices/globalSlice';
import Loading from '../components/Loading';

const Index = () => {
  const globalDispatch = useAppDispatchGlobal();
  const { isLoading } = useAppSelectorGlobal(state => state.globalReducer);
  useEffect(() => {
    globalDispatch(checkLogin());
  }, [globalDispatch])
  return (
    <>
      {
        isLoading === false
          ? 
            (
              <NavigationContainer>
                <Tabbar />
              </NavigationContainer>
            )
          : <Loading/>
      }
    </>
  )
}

export default Index;