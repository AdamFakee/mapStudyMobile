import { View, Text, StyleSheet, TextInput, FlatList, TouchableWithoutFeedback, DrawerLayoutAndroid } from 'react-native'
import React, { RefObject, useState } from 'react'
import { ApiResponse, callApi } from '../../customs/axiosLib';
import { Course } from '../../types/definition';
import { color, gap, padding, radius } from '../../constants/style';
import Icon from 'react-native-vector-icons/AntDesign'
import { domain } from '../../constants/domain';
import CourseCard from '../card/CourseCard';
import { useNavigation } from '@react-navigation/native';
import { BottomTabProps } from '../../navigationScreen/(tabBar)';
import Loading from '../Loading';
import Empty from '../Empty';

interface resultFetch extends ApiResponse {
  metadata: {
      courses: Course[];
  };
}
const SearchDrawer = ({drawerRef}: {drawerRef: RefObject<DrawerLayoutAndroid>}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Course[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchSearch = async () => {
    const url = domain + `/course/search?search=${searchValue}`;
    setIsLoading(true);
    try {
      const res: resultFetch = await callApi({ url });
      setSearchResult(res.metadata.courses);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  const navigation = useNavigation<BottomTabProps<"courseTab">['navigation']>()
  const handleNavigation = (courseId: number) => {
    navigation.navigate('courseTab', {
      params: {courseId},
      screen: 'DetailCourse'
    })
    drawerRef.current?.closeDrawer();
  }
  return (
    <View style={styles.container}>
      {
        isLoading
          ? <Loading/>
          : (
            <View style={styles.wraper}>
              {/* input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWraper}>
                  <TextInput
                    placeholder='Tìm kiếm'
                    onChangeText={(value) => setSearchValue(value)}
                    style={styles.input}
                  />
                </View>
                <Icon name='search1' color={color['primary-typo']} size={30} onPress={() => fetchSearch()}/>
              </View>
              {/* title */}
              <View>
                <Text>Hiển thị kết quả tìm kiếm:</Text>
              </View>
              {/* results */}
              <View style={styles.resultContainer}>
                <FlatList
                  data={searchResult}
                  ListEmptyComponent={<Empty/>}
                  keyExtractor={(item) => item.courseId + ''}
                  numColumns={2}
                  contentContainerStyle={styles.contentContainerStyle}
                  columnWrapperStyle={styles.columnWraperStyle}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => handleNavigation(item.courseId)}>
                      <View style={styles.itemContainer}>
                        <CourseCard item={item} />
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                />
              </View>
            </View>
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wraper: {
    flex: 1,
    paddingHorizontal: padding.horizon,
    gap: gap.all
  },
  inputContainer: {
    paddingVertical: padding.vertical,
    height: 'auto',
    borderBottomWidth: 0.7,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: gap.all,
  },
  inputWraper: {
    alignItems: 'center',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.backgroundGray,
    paddingHorizontal: padding.horizon,
    borderRadius: radius.sm,
    flex: 1,
    width: '100%',
  },
  input: {
    width: '100%',
    height: '100%',
    paddingVertical: 8,

  },
  resultContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    gap: gap.all,
  },
  columnWraperStyle: {
    gap: gap.all,
  },
  itemContainer: {
    flex: 1
  }
})

export default SearchDrawer