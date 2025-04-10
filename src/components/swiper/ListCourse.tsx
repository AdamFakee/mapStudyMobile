import { View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import TitleHeader from './TitleHeader';
import CourseCard from '../card/CourseCard';
import { getWidth } from '../../utils/demensionUtils';
import { gap, padding } from '../../constants/style';
import { Course } from '../../types/definition';
import { domain } from '../../constants/domain';
import { ApiResponse, callApi } from '../../customs/axiosLib';


interface resultFetch extends ApiResponse {
    metadata: {
        courses: Course[];
    }
}

const widthScreen = getWidth('screen');
const ListCourse = ({ isNew, isHot, title }: { isNew: boolean, isHot: boolean, title: string }) => {
    // call api
    const [ courses, setCourses ] = useState<Course[]>(); 
    const url: string = domain + `/course/filter?isNew=${isNew}&isHot=${isHot}`;
    
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const result = await callApi<resultFetch>({ url });
                console.log(result)
                setCourses(result.metadata.courses);
            } catch (error) {
                throw new Error('Fetch error: ' + error);
            }
        };

        fetchCourse();
    }, [url]);
    return (
        <View style={styles.container}>
            {/* title */}
            <View style={styles.titleHeader}>
                <TitleHeader title={title}/>
            </View>
            {/* course */}
            <View style={styles.list}>
                <FlatList
                    data={courses}
                    renderItem={({item}) => 
                        <View style={styles.item}>
                            <CourseCard item={item}/>
                        </View>
                    }
                    contentContainerStyle={styles.contentContainerFlatList}
                    scrollEnabled={false} // fix lỗi xung đột với scrollView 
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapperFlatList}
                    keyExtractor={(item) => item.courseId + ''}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainerFlatList: {
        gap: gap.all,
    },
    columnWrapperFlatList: {
        width: (widthScreen - padding.horizon * 2 - gap.all) / 2,
        gap: gap.all,
    },
    titleHeader: {
        height: 50,
    },
    list: {
        flex: 1,
    },
    item: {
        width: '100%',
        height: 'auto',
    },
});

export default ListCourse