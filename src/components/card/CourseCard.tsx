import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Course } from '../../types/definition'
import { color, radius } from '../../constants/style'
import Icon from 'react-native-vector-icons/Ionicons';
const CourseCard = ({ item }: { item: Course}) => {
    return (
        <View style={styles.container}>
            {/* img */}
            <View style={styles.imgWraper}>
                <Image src={item.courseThumbnail} style={styles.img}/>
            </View>
            {/* infor */}
            <View>
                {/* title */}
                <View style={styles.titleWraper}> 
                    <Text 
                        numberOfLines={2}
                        style={styles.title}
                    >{item.courseName}</Text>
                </View>
                {/* teacherName */}
                <View style={styles.teacherWraper}>
                    <Icon name='people-sharp' color={color.primary}/>
                    <Text style={styles.teacherName}> {item.teacherName} </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 8,
    },
    imgWraper: {
        width: '100%'
    },
    img: {
        aspectRatio: '1/1',
        width: '100%',
        borderRadius: radius.all,
    },
    titleWraper: {

    },
    title: {
        fontSize: 14,
        color: color.primary
    },
    teacherWraper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    teacherName: {
        color: color['primary-light']
    }
})

export default CourseCard