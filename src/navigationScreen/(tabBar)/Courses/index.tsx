import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import Course from "../../../app/(tabBar)/Courses/Course";

type StackType = {
    Course: undefined;
}

const RootStack = createNativeStackNavigator<StackType>();

const opts: NativeStackNavigationOptions = {
  headerShown: false,
};
const IndexCourses = () => {
    return (
        <RootStack.Navigator initialRouteName="Course" screenOptions={opts}>
            <RootStack.Screen name="Course" component={Course}/>
        </RootStack.Navigator>
    )
}

export default IndexCourses;