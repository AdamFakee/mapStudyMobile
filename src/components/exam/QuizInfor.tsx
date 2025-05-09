import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ExamTabbarProps } from '../../navigationScreen/(tabBar)/Exam';
import { color, gap, padding, radius } from '../../constants/style';
import { ActiveButton } from '../Button';

const QuizInfor = () => {
    const route = useRoute<ExamTabbarProps<'DetailExam'>['route']>();
    const navigation = useNavigation<ExamTabbarProps<'DetailExam'>['navigation']>();
    const { examId } = route.params;

    const handleNavigation = (examId: number) => {
        navigation.navigate('StartExam', {examId})
    }
    return (
        <View style={styles.container}>
            <View style={styles.wraper}>
                <Text style={styles.mainTitle}>Đề thi số {examId}</Text>
                <View>
                    <Text style={styles.subTitle}>
                        Tổng số câu: 60
                    </Text>
                    <Text style={styles.subTitle}>
                        Thời gian làm bài: 150 phút
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ActiveButton title='Bắt đầu làm bài' isIcon={false} fn={() => handleNavigation(examId)}/>
                </View>
            </View>
        </View>
    )
}

export default QuizInfor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wraper: {
        shadowColor: color['primary-typo'],
        shadowOffset: {
            height: 1,
            width: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: color.block,
        width: '80%',
        paddingHorizontal: padding.horizon,
        paddingVertical: padding.vertical,
        borderRadius: radius.all,
        gap: gap.all
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: color.primary,
        textAlign: 'center',        
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: color['primary-typo'],
        textAlign: 'center'
    },
    buttonContainer: {
        width: '50%',
        marginHorizontal: 'auto'
    }
})