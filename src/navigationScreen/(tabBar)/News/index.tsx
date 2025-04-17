import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import New from '../../../app/(tabBar)/News/New';

export type NewsStackType = {
    New: undefined;
}

export type NewsTabbarProps< T extends keyof NewsStackType > = NativeStackScreenProps<NewsStackType, T>;
const RootStack = createNativeStackNavigator<NewsStackType>();

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