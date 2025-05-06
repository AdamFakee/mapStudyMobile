import { View, FlatList, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CourseCard from '../../../card/CourseCard'
import { gap, padding } from '../../../../constants/style'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CourseTabBarProps } from '../../../../navigationScreen/(tabBar)/Courses'
import Loading from '../../../Loading'
import Empty from '../../../Empty'
import { Course } from '../../../../types/definition'
import { ApiResponse, callApi } from '../../../../customs/axiosLib'
import { domain } from '../../../../constants/domain'

interface resultFetch extends ApiResponse {
  metadata: {
    courses: Course[];
  };
}

const numberComlumns = 2;

const ListCourseInDetailTab = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const url = domain + '/course/filter';      
      try {
        const res = await callApi<resultFetch>({url})
        setCourses(res.metadata.courses);
      } catch {
        Alert.alert('somthing wrong');
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  },[])

  const navigation = useNavigation<CourseTabBarProps<"Course">['navigation']>();

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
              data={courses}
              ListEmptyComponent={<Empty/>}
              renderItem={({item, index}) => {
                const isLastItem = courses.length - 1 === index;
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
              numColumns={numberComlumns}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={styles.columnWrapperStyle}
              scrollEnabled={true}
              contentContainerStyle={styles.contentContainerStyle}
            />
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
    paddingRight: gap.all / numberComlumns,
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

export default ListCourseInDetailTab