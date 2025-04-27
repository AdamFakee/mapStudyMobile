import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import Lesson from './Lesson'
import { gap } from '../../../../constants/style';
import { useAppSelectorGlobal } from '../../../../redux/store/globalStore';

const ListLessonDetailTab = () => {
  const listChapter = useAppSelectorGlobal(state => state.courseReducer.detailCourseReducer.detailFetch.metadata.detail_chapter)
  return (
    <View style={styles.container}>
      {
        listChapter.map((chapter, index) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <View style={styles.itemContainer}>
                <Lesson chapter={chapter}/>
              </View>
            </TouchableWithoutFeedback>
          )
        }) 
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    gap: gap.all,
    flex: 1
  },
  itemContainer: {
    height: 'auto'
  }
})

export default ListLessonDetailTab