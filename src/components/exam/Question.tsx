import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo } from 'react'
import { Question as QuestionType } from '../../types/definition'
import InputRatio from './InputRatio'
import { color, gap } from '../../constants/style'
import { useAppDispatchGlobal, useAppSelectorGlobal } from '../../redux/store/globalStore'
import { ExamQuestionAction, ExamQuestionReducerChangeSelectedResultType, ExamQuestionSelector } from '../../redux/slices/exam/ExamQuestionSlice'

const Question = memo(({props}: { props: QuestionType}) => {
    const displayKeys: (keyof QuestionType)[] = ["A", "B", "C", "D"];
    const examQuestionDisPatch = useAppDispatchGlobal();
    const examQuestionState = useAppSelectorGlobal(state => ExamQuestionSelector.selectResult( state.ExamReducer.ExamQuestionReducer, props.id));
    const handleChangeSelectedResult = (props: ExamQuestionReducerChangeSelectedResultType) => {
        examQuestionDisPatch(ExamQuestionAction.changeSelectedResult(props))
    }
    return (
        <View style={styles.container}>
            <View style={styles.wraper}>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.groupInputContainer}>
                    {
                        displayKeys.map((item, index) => {
                            const isSelected = item === examQuestionState;
                            return (
                                <TouchableWithoutFeedback 
                                    onPress={() => handleChangeSelectedResult({
                                        id: props.id,
                                        answer: item,
                                    })}
                                    key={index}
                                >
                                    <View>
                                        <InputRatio title={props[item].toString()} isSelected={isSelected}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
})

export default Question

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