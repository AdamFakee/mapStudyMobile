import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import Exam from '../../../app/(tabBar)/Exam/Exam';

type StackType = {
    Exam: undefined;
}

const RootStack = createNativeStackNavigator<StackType>();

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