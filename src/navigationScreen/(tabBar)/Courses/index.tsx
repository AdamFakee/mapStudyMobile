import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import Course from "../../../app/(tabBar)/Courses/Course";
import { Provider } from 'react-redux';
import DetailCourse from '../../../app/(tabBar)/Courses/DetailCourse';
import { CourseStore } from '../../../redux/store/courseTab/courseStore';

export type CourseStackType = {
    Course: undefined;
    DetailCourse: {
        courseId: number,
    };
}

export type CourseTabBarProps<T extends keyof CourseStackType> = NativeStackScreenProps<CourseStackType, T>;

const RootStack = createNativeStackNavigator<CourseStackType>();

const opts: NativeStackNavigationOptions = {
  headerShown: false,
};
const IndexCourses = () => {
    return (
        <Provider store={CourseStore}>
            <RootStack.Navigator initialRouteName="Course" screenOptions={opts}>
                <RootStack.Screen name="Course" component={Course}/>
                <RootStack.Screen name="DetailCourse" component={DetailCourse}/>
            </RootStack.Navigator>
        </Provider>
    )
}

export default IndexCourses;