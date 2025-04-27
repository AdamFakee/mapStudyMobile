import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Search from '../../Search'
import Subject from './Subject'
import { color, gap } from '../../../constants/style'
import ButtonFilter from './ButtonFilter'
import { fetchFilterCourse, filterCourseAction } from '../../../redux/slices/filterCourse/filterCourseSlice'
import { useAppDispatchGlobal } from '../../../redux/store/globalStore'


const Filter = () => {
    const filterDispatch = useAppDispatchGlobal();
    const handleResetFilterStore = () => {
        filterDispatch(filterCourseAction.resetStore());
        filterDispatch(fetchFilterCourse());
    };
    const handleCallApi = () => filterDispatch(fetchFilterCourse());
    const handleSearch = (value: string) => filterDispatch(filterCourseAction.setSearchValue(value)) 

    return (
        <View style={styles.container}>
            {/* search */}
            <View style={styles.search}>
                <Text style={styles.title}>Tìm kiếm</Text>
                <Search fn={handleSearch}/>
            </View>
            {/* subject */}
            <View style={styles.subject}>
                <Text style={styles.title}>Môn học</Text>
                <Subject/>
            </View>

            {/* button */}
            <View style={styles.button}>
                <ButtonFilter title='Đặt lại' fn={handleResetFilterStore}/>
                <ButtonFilter title='Lọc' fn={handleCallApi}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: gap.all
    },
    search: {
        gap: gap.all - 5
    },
    subject: {
        gap: gap.all - 5
    },
    title: {
        color: color['primary-typo'],
        fontSize: 15
    },
    button: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end'
    }
})

export default Filter