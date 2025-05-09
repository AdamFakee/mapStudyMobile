import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import ListExam from '../../../components/exam/ListExam'
import { padding, tabbar } from '../../../constants/style'

const Exam = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ListExam/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding.horizon,
    paddingBottom: tabbar.height + padding.vertical,
    paddingTop: padding.vertical
  }
})

export default Exam