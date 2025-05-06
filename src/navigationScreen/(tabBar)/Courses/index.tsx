import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import Course from "../../../app/(tabBar)/Courses/Course";
// import { Provider } from 'react-redux';
import DetailCourse from '../../../app/(tabBar)/Courses/DetailCourse';
// import { CourseStore } from '../../../redux/store/courseTab/courseStore';
import Chapter from '../../../app/(tabBar)/Courses/Chapter';
import ActiveCourse from '../../../app/(tabBar)/Courses/ActiveCourse';

export type CourseStackType = {
    Course: undefined;
    DetailCourse: {
        courseId: number,
    };
    Chapter: {
        chapterId: number,
        chapterTitle: string,
        courseId: number
    };
    ActiveCourse: undefined,
}

export type CourseTabBarProps<T extends keyof CourseStackType> = NativeStackScreenProps<CourseStackType, T>;

const RootStack = createNativeStackNavigator<CourseStackType>();

const opts: NativeStackNavigationOptions = {
  headerShown: false,
};
const IndexCourses = () => {
    return (
        // <Provider store={CourseStore}>
            <RootStack.Navigator initialRouteName="Course" screenOptions={opts}>
                <RootStack.Screen name="Course" component={Course}/>
                <RootStack.Screen name="DetailCourse" component={DetailCourse}/>
                <RootStack.Screen name='Chapter' component={Chapter}/>
                <RootStack.Screen name='ActiveCourse' component={ActiveCourse}/>
            </RootStack.Navigator>
        // </Provider>
    )
}

export default IndexCourses;