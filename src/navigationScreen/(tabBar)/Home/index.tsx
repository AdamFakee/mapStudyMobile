import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import Home from '../../../app/(tabBar)/Home/Home';

export type HomeStackType = {
    Home: undefined;
}

export type HomeTabBarProps<T extends keyof HomeStackType> = NativeStackScreenProps<HomeStackType, T>;

const RootStack = createNativeStackNavigator<HomeStackType>();

const opts: NativeStackNavigationOptions = {
  headerShown: false,
};
const IndexHome = () => {
    return (
        <RootStack.Navigator initialRouteName="Home" screenOptions={opts}>
            <RootStack.Screen name="Home" component={Home} />
        </RootStack.Navigator>
    )
}

export default IndexHome;