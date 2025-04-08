import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import New from '../../../app/(tabBar)/News/New';

type StackType = {
    New: undefined;
}

const RootStack = createNativeStackNavigator<StackType>();

const opts: NativeStackNavigationOptions = {
  headerShown: false,
};
const IndexNews = () => {
    return (
        <RootStack.Navigator initialRouteName="New" screenOptions={opts}>
            <RootStack.Screen name="New" component={New} />
        </RootStack.Navigator>
    )
}

export default IndexNews;