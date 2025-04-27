import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { color, padding, radius } from '../../../../constants/style'
import Icon from 'react-native-vector-icons/Entypo'
import { Chapter } from '../../../../redux/slices/detailCourse/detailCourseSlice'
import { useNavigation } from '@react-navigation/native'
import { CourseTabBarProps } from '../../../../navigationScreen/(tabBar)/Courses'
const Lesson = ({chapter}: {chapter: Chapter}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigation = useNavigation<CourseTabBarProps<'Chapter'>['navigation']>();
  const handleNavigation = (props: {
    chapterId: number,
    chapterTitle: string
  }) => {
    navigation.navigate('Chapter', props);
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => {
        setIsOpen(preValue => !preValue)
      }}>
        <View style={styles.boxContainer}>
          <Text style={styles.title} numberOfLines={1}>{chapter.title}</Text>
          <Icon name='chevron-down' size={20}/>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.wraper}>
        {
          isOpen && (
              chapter.lessons.map((lesson, index) => {
                const isLast = false;
                const customStyles = StyleSheet.create({
                  item: {
                    borderBottomWidth: isLast ? 0 : 0.9,
                  }
                })
                return (
                  <TouchableWithoutFeedback key={index}
                    onPress={() => handleNavigation({chapterId: lesson.lessonId, chapterTitle: lesson.lessonTitle})}
                  >
                    <View style={[styles.item, customStyles.item]}>
                      <Text style={styles.itemTitle}>{lesson.lessonTitle}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 'auto'
  },
  boxContainer: {
    backgroundColor: color.gray,
    opacity: 0.5,
    paddingHorizontal: padding.horizon,
    paddingVertical: padding.vertical * 0.7,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: radius.sm
  },
  title: {
    color: color['primary-typo'],
    fontSize: 20,
    textTransform: 'uppercase',
    width: '80%',
  },
  wraper: {
    height: 'auto',
  },
  item: {
    paddingHorizontal: padding.horizon,
    paddingVertical: padding.vertical,
    borderColor: color.gray,
    // height: 'auto',
  },
  itemTitle: {
    color: color['primary-typo']
  }
});

export default Lesson
