import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { color, gap, padding, tabbar } from '../../../constants/style'
import { getHeight } from '../../../utils/demensionUtils'
import Banner from '../../../components/courses-tabBar/detailCourse/Banner';
import DetailTab from '../../../components/courses-tabBar/detailCourse/DetailTab';
import { useRoute } from '@react-navigation/native';
import { CourseTabBarProps } from '../../../navigationScreen/(tabBar)/Courses';
import { fetchDetailCourse } from '../../../redux/slices/detailCourse/detailCourseSlice';
import { useAppDispatchCourse, useAppSelectorCourse } from '../../../redux/store/courseTab/courseStore';
import Loading from '../../../components/Loading';

const heightScreen = getHeight('screen');
const DetailCourse = () => {

  const route = useRoute<CourseTabBarProps<'DetailCourse'>['route']>();
  const { courseId } = route.params;
  const dispatch = useAppDispatchCourse();
  const {isLoading} = useAppSelectorCourse(state => state.detailCourseReducer);
  useEffect(() => {
    dispatch(fetchDetailCourse({courseId}));
  }, [courseId, dispatch]);

  return (
    <View style={styles.container}>
      {
        isLoading 
          ? <Loading/>
          : (
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.wraper}>
                {/* banner title */}
                <View style={styles.bannerContainer}>
                  <Banner/>
                </View>

                {/* course detail tab */}
                <View style={styles.detailTabContainer}>
                  <DetailTab/>
                </View>
              </View>
            </ScrollView>
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingBottom: tabbar.height,
  },
  scrollContainer: {
    paddingHorizontal: padding.horizon,
  },
  wraper: {
    flex: 1, 
    gap: gap.all * 2
  },
  bannerContainer: {
    minHeight: heightScreen * 0.3,
    height: 'auto',
    marginHorizontal: -padding.horizon,
  },
  detailTabContainer: {
    minHeight: heightScreen * 0.45,
    height: 'auto',
    marginHorizontal: -padding.horizon,
    paddingBottom: padding.horizon
  }
})

export default DetailCourse