import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { color, gap, padding, radius } from '../../../constants/style'
import { useAppSelectorCourse } from '../../../redux/store/courseTab/courseStore';

const Banner = () => {
    const detailCouse = useAppSelectorCourse(state => state.detailCourseReducer);
    return (
        <View style={styles.container}>
            <View style={styles.wraper}>
                <View style={styles.imgContainer}>
                    <Image src={detailCouse.detailFetch.metadata.detail_course.courseThumbnail} style={styles.img}/>
                </View>
                <Text style={styles.title}>{detailCouse.detailFetch.metadata.detail_course.courseName}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color['primary-light'],
    },
    wraper: {
        marginHorizontal: padding.horizon,
        flexDirection: 'row',
        gap: gap.all,
        alignItems: 'center',
        flex: 1
    },
    imgContainer: {
        width: 'auto',
        height: '30%',
    },
    img: {
        aspectRatio: 1/1,
        height: '100%',
        borderRadius: radius.sm
    },
    title: {
        color: color.background,
        textTransform: 'uppercase',
        flexWrap: 'wrap',
        fontSize: 18,
        width: '70%'
    }
})

export default Banner