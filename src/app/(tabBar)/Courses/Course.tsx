import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { color, gap, padding, tabbar } from '../../../constants/style';
import Filter from '../../../components/courses-tabBar/courses/Filter';
import ListCourseFilter from '../../../components/courses-tabBar/courses/ListCourseFilter';
import TopBar from '../../../components/courses-tabBar/courses/TopBar';

const Course = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.wraper}>
          {/* danh muc */}

          {/* filter */}
          <View style={styles.filter}>
            <Filter/>
          </View>

          {/* list course */}
          <View style={styles.containerCourse}>
            {/* header */}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.containerCourse_Header}>
                <TopBar/>
              </View>
            </ScrollView>
            {/* course */}
            <View style={styles.containerCourse_listCourse}>
              <ListCourseFilter/>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: tabbar.height,
    backgroundColor: color.background,
  },
  scroll: {
    paddingHorizontal: padding.horizon,
  },
  wraper: {
    gap: gap.all
  },
  filter: {
    height: 'auto'
  },
  containerCourse: {
    height: 'auto'
  },
  containerCourse_Header: {

  },
  containerCourse_listCourse: {
    // height: 'auto',
    // flex: 1,
    // backgroundColor: 'red'
  }
})

export default Course