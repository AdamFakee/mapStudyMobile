import { View, FlatList, StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TeacherCard, TeacherCardType } from '../card/TeacherCard';
import TitleHeader from './TitleHeader';
import { gap, padding } from '../../constants/style';
import { ApiResponse, callApi } from '../../customs/axiosLib';
import { domain } from '../../constants/domain';

const screenWidth = Dimensions.get('screen').width;
const customsStyleForTitleHeader: StyleProp<ViewStyle> = {
  paddingRight: padding.horizon,
};

interface resultFetch extends ApiResponse {
  metadata: {
    teachers: TeacherCardType[];
  };
}
const ListTeacher = () => {
  const [ teachers, setTeachers ] = useState<TeacherCardType[]>(); 
  const url: string = domain + '/teacher/getAllTeachers?limit=7';
  
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const result = await callApi<resultFetch>({ url });
        setTeachers(result.metadata.teachers);

      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };

    fetchTeachers();
  }, [url]);
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TitleHeader title="Giáo viên Mapstudy" subTitle="Xem tất cả" otherStyle={customsStyleForTitleHeader}/>
      </View>
      {/* list */}
      <View style={styles.list}>
        <FlatList
          renderItem={({item}) => 
            <View style={styles.item}>
              <TeacherCard item={item}/>
            </View>
          }
          data={teachers}
          horizontal={true}
          keyExtractor={(item) => item.id}
          contentContainerStyle = {styles.contentContainerFlatList}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerFlatList: {
    gap: gap.all,
    paddingRight: padding.horizon,
  },
  item: {
    width: (screenWidth - padding.horizon) * 0.35,
    height: 'auto',
  },
  header: {
    flex: 1,
    marginBottom: 10
  },
  list: {
    flex: 6,
  },
});
export default ListTeacher