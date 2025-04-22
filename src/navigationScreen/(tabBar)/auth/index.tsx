import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import Register from '../../../app/(tabBar)/auth/Register';
import Login from '../../../app/(tabBar)/auth/Login';
import PreAuth from '../../../app/(tabBar)/auth/PreAuth';

export type AuthStacktype = {
  Login: undefined,
  Register: undefined,
  PreAuth: undefined,
};

export type AuthTabBarProps< T extends keyof AuthStacktype> = NativeStackScreenProps<AuthStacktype, T>;

const RootStack = createNativeStackNavigator<AuthStacktype>();

const opts: NativeStackNavigationOptions = {
  headerShown: false,
};

const IndexAuth = () => {
  return (
    <RootStack.Navigator initialRouteName='Register' screenOptions={opts}>
      <RootStack.Screen name='Login' component={Login}/>
      <RootStack.Screen name='Register' component={Register}/>
      <RootStack.Screen name='PreAuth' component={PreAuth}/>
    </RootStack.Navigator>
  )
}

export default IndexAuth;