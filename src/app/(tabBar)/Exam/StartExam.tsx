import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ExamTabbarProps } from '../../../navigationScreen/(tabBar)/Exam';
import dataExams from '../../../data/exam.json';
import { Question as QuestionType } from '../../../types/definition';
import { ActiveButton } from '../../../components/Button';
import { gap, padding, tabbar } from '../../../constants/style';
import Empty from '../../../components/Empty';
import ComfirmPopup from '../../../components/exam/ComfirmPopup';
import Question from '../../../components/exam/Question';

export type keyExam = keyof typeof dataExams
const StartExam = () => {
    const [conFirm, setConFirm] = useState<{
        isShowPopUp: boolean,
        isConfirm: boolean,
    }>({
        isConfirm: false,
        isShowPopUp: false,
    })
    const {examId} = useRoute<ExamTabbarProps<'StartExam'>['route']>().params;
    const keyInObj: keyExam = 'quizSet' + examId as keyExam;
    const listExams: QuestionType[] = dataExams[keyInObj];
    const navigation = useNavigation<ExamTabbarProps<'StartExam'>['navigation']>();

    const handleBack = () => navigation.goBack();
    const hanldeSubmit = (key: keyExam) => {
        if(conFirm.isConfirm) {
            navigation.replace('Result', {
                keyExam: key
            })
        } else {
            setConFirm(pre => ({...pre, isShowPopUp: true}))
        }
    }

    const handleCancle = () => setConFirm(_ => ({isConfirm: false, isShowPopUp: false}));
    const handleSubmit = (key: keyExam) => navigation.replace('Result', {
        keyExam: key
    });
    return (
        <View style={styles.container}>
            <View style={styles.wraper}>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <ActiveButton title='Go Back' isIcon={false} fn={handleBack}/>
                    </View>
                    <View style={styles.button}>
                        <ActiveButton title='Submit' isIcon={false} fn={() => hanldeSubmit(keyInObj)}/>
                    </View>
                </View>
                {
                    conFirm.isShowPopUp &&
                        <ComfirmPopup isShow={conFirm.isShowPopUp} fnActive={() => handleSubmit(keyInObj)} fnInavtive={handleCancle} title='Bạn chắc chắn muốn nộp bài?' otherContainerStyle={styles.confirmPopupContainer}/>
                }
                <FlatList
                    data={listExams}
                    ListEmptyComponent={<Empty/>}
                    renderItem={({item, index}) => {
                        return (
                            <View key={index}>
                                <Question props={item}/>
                            </View>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>
        </View>
    )
}

export default StartExam

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wraper: {
        paddingBottom: tabbar.height,
        paddingHorizontal: padding.horizon,
        paddingTop: padding.vertical,
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: padding.vertical
    },
    button: {
        width: '30%'
    },
    confirmPopupContainer: {
        height: '30%',
        marginVertical: 'auto',
        marginHorizontal: padding.horizon,
    },
    contentContainerStyle: {
        gap: gap.all,
        paddingBottom: 10
    }
})