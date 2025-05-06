import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { gap } from '../../constants/style'
import { ActiveButton } from '../Button'
import { useNavigation } from '@react-navigation/native'
import { CourseTabBarProps } from '../../navigationScreen/(tabBar)/Courses'
import { img } from '../../constants/img'

const RequireActiveCourse = () => {
    const navigation = useNavigation<CourseTabBarProps<'Chapter'>['navigation']>();
    const hanleNavigation = () => {
        navigation.navigate('ActiveCourse');
    }
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image
                    source={img.requireActiveCourse}
                    style={styles.img}
                />
            </View>
            <Text style={styles.text}>Bạn cần kích hoạt khoá học để tiếp tục</Text>
            <View style={styles.buttonContainer}>
                <ActiveButton fn={hanleNavigation} title="Kích hoạt ngay"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: gap.sm
    },
    imgContainer: {
        marginHorizontal: 'auto',
    },
    img: {
        aspectRatio: 1/1,
        height: 120,
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'semibold',
        opacity: 0.9,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '50%',
        marginHorizontal: 'auto'
    }
})

export default RequireActiveCourse