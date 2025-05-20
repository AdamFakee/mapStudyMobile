import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import Profile from '../../../app/(tabBar)/profile/Profile';
import AboutMe from '../../../app/(tabBar)/profile/AboutMe';
import MyCourse from '../../../app/(tabBar)/profile/MyCourse';
import EditProfile from '../../../app/(tabBar)/profile/EditProfile';

export type ProfileStackType = {
    profile: undefined;
    myCourse: undefined;
    aboutMe: undefined;
    editProfile: undefined;
}

export type ProfileTabBarProps<T extends keyof ProfileStackType> = NativeStackScreenProps<ProfileStackType, T>;

const RootStack = createNativeStackNavigator<ProfileStackType>();

const opts: NativeStackNavigationOptions = {
  headerShown: false,
};

const IndexProfile = () => {
    return (
        <RootStack.Navigator screenOptions={opts} initialRouteName="profile">
            <RootStack.Screen name="profile" component={Profile}/>
            <RootStack.Screen name="aboutMe" component={AboutMe}/>
            <RootStack.Screen name="myCourse" component={MyCourse}/>
            <RootStack.Screen name='editProfile' component={EditProfile}/>
        </RootStack.Navigator>
    )
}

export default IndexProfile;

