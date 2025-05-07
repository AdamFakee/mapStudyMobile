import { View, Alert, FlatList, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApiResponse, callApi, CallApiType } from '../../../customs/axiosLib'
import { useAppSelectorGlobal } from '../../../redux/store/globalStore';
import { RawAxiosRequestHeaders } from 'axios';
import { domain } from '../../../constants/domain';
import { keyStore } from '../../../constants/storeData';
import { asyncStorageService } from '../../../services/asyncStorage.service';
import Loading from '../../../components/Loading';
import Empty from '../../../components/Empty';
import { TouchableWithoutFeedback } from 'react-native';
import CourseCard from '../../../components/card/CourseCard';
import { color, gap, padding, tabbar } from '../../../constants/style';
import { Course } from '../../../types/definition';
import { img } from '../../../constants/img';


interface resultFetch extends ApiResponse {
  metadata: {
    courses: Course[],
  }
}

const MyCourse = () => {
  const [courses, setCourses] = useState<Course[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const globalState = useAppSelectorGlobal(state => state.globalReducer);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const url = domain + '/enrollment/courseBought';
      const headers: RawAxiosRequestHeaders = {
        'x-client-email': globalState.dataUser.email || null,
        'authorization': await asyncStorageService.getData({key: keyStore.accessToken}),
      };
      const opts: CallApiType = {
        method: 'GET',
        headers,
        url,
      };
  
      try {
        const res: resultFetch = await callApi(opts);
        setCourses(res.metadata.courses);
      } catch (error) {
        Alert.alert('something wrong');
      } finally {
        setIsLoading(false)
      }
    }
    fetch();
  }, [globalState.dataUser.email])
  return (
    <View style={styles.container}>
      {
        isLoading === true 
          ? <Loading/>
          : 
            courses?.length === 0 || !courses
              ? (
                <>
                  <Empty isShowSubTitle={false} title="Bạn chưa đăng ký khóa học nào." img={img.signup}/>
                </>
              )
              : (
                <>
                  <Text style={styles.title}>Khóa học của bạn</Text>
                  <FlatList
                    data={courses}
                    ListEmptyComponent={<Empty/>}
                    renderItem={({item, index}) => {
                      const isLastItem = courses.length - 1 === index;
                      return (
                        <TouchableWithoutFeedback>
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
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                  />
                </>
              )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: gap.all * 1.7,
    paddingBottom: tabbar.height
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: color['primary-light'],
    paddingTop: padding.vertical,
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
    // paddingBottom: tabbar.height,
    paddingHorizontal: padding.horizon,
    gap: gap.all
  },
})

export default MyCourse