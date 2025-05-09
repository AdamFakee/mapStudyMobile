import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Question } from '../../types/definition'
import { gap, color } from '../../constants/style'
import InputResult from './InputResult'

type props = {
    answer: string,
    question: Question,
}

const QuizResultItem = (props: props) => {
    const displayKeys: (keyof Question)[] = ["A", "B", "C", "D"];
    const { answer, question } = props;
    return (
        <View style={styles.container}>
            <View style={styles.wraper}>
                <Text style={styles.title}>{question.title}</Text>
                <View style={styles.groupInputContainer}>
                    {
                        displayKeys.map((item, index) => {
                            const isAnswer: boolean = answer === item;
                            const isRight: boolean = question.result === item;
                            return (
                                <View key={index}>
                                    <InputResult isAnswer={isAnswer} isRight={isRight} title={question[item].toString()}/>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default QuizResultItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wraper: {
        flex: 1,
        gap: gap.sm
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color['primary-typo']
    },
    groupInputContainer: {
        gap: gap.sm
    }
})