import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import Exam from '../../../app/(tabBar)/Exam/Exam';
import DetailExam from '../../../app/(tabBar)/Exam/DetailExam';
import StartExam, { keyExam } from '../../../app/(tabBar)/Exam/StartExam';
import ResultExam from '../../../app/(tabBar)/Exam/ResultExam';

export type ExamStackType = {
    Exam: undefined;
    DetailExam: {
        examId: number
    },
    StartExam: {
        examId: number,
    },
    Result: {
        keyExam: keyExam,
    }
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
            <RootStack.Screen name='DetailExam' component={DetailExam}/>
            <RootStack.Screen name='StartExam' component={StartExam}/>
            <RootStack.Screen name='Result' component={ResultExam}/>
        </RootStack.Navigator>
    )
}

export default IndexExam;