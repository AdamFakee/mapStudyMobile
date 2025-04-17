import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import CourseCard from '../../card/CourseCard'
import { gap, padding } from '../../../constants/style'
import { TouchableWithoutFeedback } from 'react-native'
import { fetchFilterCourse } from '../../../redux/slices/filterCourse/filterCourseSlice'
// import Pagination from '../../Pagination'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatchCourse, useAppSelectorCourse } from '../../../redux/store/courseTab/courseStore'
import { CourseTabBarProps } from '../../../navigationScreen/(tabBar)/Courses'
import Loading from '../../Loading'
import Empty from '../../Empty'



const ListCourseFilter = () => {
  const dispatch = useAppDispatchCourse();
  const { isLoading, sectionCourse } = useAppSelectorCourse(state => state.filterCourseReducer)
  useEffect(() => {
    dispatch(fetchFilterCourse());
  },[dispatch])

  // const  = useAppSelectorCourse(state => state.filterCourseReducer.sectionCourse);
  const navigation = useNavigation<CourseTabBarProps<"Course">['navigation']>();
  // const handlePagination = (page: number) => {
    
  // }

  const handleNavigation = (courseId: number) => {
    navigation.navigate("DetailCourse", { courseId })
  };
  return (
    <View style={styles.container}>
      {
        isLoading
          ? (
            <Loading/>
          )
          : (
            <FlatList
              data={sectionCourse}
              ListEmptyComponent={<Empty/>}
              renderItem={({item, index}) => {
                const isLastItem = sectionCourse.length - 1 === index;
                return (
                  <TouchableWithoutFeedback onPress={() => handleNavigation(item.courseId)}>
                    <View style={[
                      styles.itemContainer,
                      isLastItem ? styles.lastItemContainer : null,  
                    ]}>
                    <CourseCard item={item}/>
                  </View>
                  </TouchableWithoutFeedback>
                )
              }}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapperStyle}
              scrollEnabled={false}
              contentContainerStyle={styles.contentContainerStyle}
            />
            // {/* pagination */}
            // {/* {
            //   listFilterCourses.metadata?.pagination.totalPages > 1 && (
            //     <View style={styles.paginationContainer}>
            //       <Pagination totalPage={listFilterCourses.metadata?.pagination.totalPages} currentPage={listFilterCourses.metadata.pagination.currentPage} fn={handlePagination}/>
            //     </View>
            //   )
            // } */}
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: gap.all * 1.7,
  },
  itemContainer: {
    flex: 1,
  },
  lastItemContainer: {
    maxWidth: '50%',
    paddingRight: gap.all / 2,
  },
  columnWrapperStyle: {
    gap: gap.all,
  },
  contentContainerStyle: {
    paddingTop: padding.vertical,
    gap: gap.all
  },
  paginationContainer: {
    height: 'auto'
  }
})

export default ListCourseFilter