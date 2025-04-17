import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import Exam from '../../../app/(tabBar)/Exam/Exam';

export type ExamStackType = {
    Exam: undefined;
}

export type ExamTabbarProps< T extends keyof ExamStackType > = NativeStackScreenProps<ExamStackType, T>
const RootStack = createNativeStackNavigator<ExamStackType>();

const opts: NativeStackNavigationOptions = {
  headerShown: false,
};

const IndexExam = () => {
    return (
        <RootStack.Navigator initialRouteName="Exam" screenOptions={opts}>
            <RootStack.Screen name="Exam" component={Exam} />
        </RootStack.Navigator>
    )
}

export default IndexExam;