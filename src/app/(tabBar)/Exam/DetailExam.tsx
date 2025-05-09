import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QuizInfor from '../../../components/exam/QuizInfor'
import { tabbar } from '../../../constants/style'

const DetailExam = () => {
  return (
    <View style={styles.container}>
      <QuizInfor/>
    </View>
  )
}

export default DetailExam

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: tabbar.height
  }
})