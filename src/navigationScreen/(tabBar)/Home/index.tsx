import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import Home from '../../../app/(tabBar)/Home/Home';

type StackType = {
    Home: undefined;
}

const RootStack = createNativeStackNavigator<StackType>();

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