import React, { useEffect } from 'react'
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native'
import Tabbar, { BottomTabType } from './(tabBar)/index';
import { useAppDispatchGlobal, useAppSelectorGlobal } from '../redux/store/globalStore';
import { checkLogin } from '../redux/slices/globalSlice';
import Loading from '../components/Loading';
import NotificationService from '../services/notification.service';

export const rootNavigationRef = createNavigationContainerRef<BottomTabType>();

const Index = () => {
  const globalDispatch = useAppDispatchGlobal();
  const { isLoading } = useAppSelectorGlobal(state => state.globalReducer);
  useEffect(() => {
    const init = async () => {
      console.log('isRede', rootNavigationRef.isReady())
      globalDispatch(checkLogin());
      await NotificationService.initialize();
            console.log('isRede  2', rootNavigationRef.isReady())

    }
    init();
  }, [globalDispatch])
  return (
    <>
      {
        isLoading === false
          ? 
            (
              <NavigationContainer ref={rootNavigationRef}>
                <Tabbar />
              </NavigationContainer>
            )
          : <Loading/>
      }
    </>
  )
}

export default Index;