import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelectorGlobal } from '../../../redux/store/globalStore'
import dataExam from '../../../data/exam.json';
import { Question } from '../../../types/definition';
import { useRoute } from '@react-navigation/native';
import { ExamTabbarProps } from '../../../navigationScreen/(tabBar)/Exam';
import Empty from '../../../components/Empty';
import QuizResultItem from '../../../components/exam/QuizResultItem';
import { gap, padding, tabbar } from '../../../constants/style';

const ResultExam = () => {
  const examQuestionState = useAppSelectorGlobal(state => state.ExamReducer.ExamQuestionReducer);
  const { keyExam } = useRoute<ExamTabbarProps<'Result'>['route']>().params;
  const resultExam: Question[] = dataExam[keyExam];
  const score = resultExam.reduce((total, value) => {
    const answer = examQuestionState[value.id] || null;
    const isRight = answer === value.result;
    return isRight ? total + 1 : total;
  }, 0);
  return (
    <View style={styles.container}>
      <View style={styles.wraper}>
        
        {/* text */}
        <Text style={styles.title}>Tổng Điểm: {score}/50</Text>
        {/* list */}
        <FlatList
          data={resultExam}
          ListEmptyComponent={<Empty/>}
          renderItem={({item, index}) => {
            const answer = examQuestionState[item.id];
            return (
              <View key={index}>
                <QuizResultItem question={item} answer={answer}/>
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

export default ResultExam

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wraper: {
    flex: 1,
    paddingHorizontal: padding.horizon,
    paddingBottom: tabbar.height,
    paddingTop: padding.vertical
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20
  },
  contentContainerStyle: {
    gap: gap.sm,
    paddingBottom: 10
  }
})