import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { CourseTabBarProps } from '../../../navigationScreen/(tabBar)/Courses';
import { useRoute } from '@react-navigation/native';
import { color, padding } from '../../../constants/style';

const HeaderChapter = () => {
    const { chapterTitle } = useRoute<CourseTabBarProps<'Chapter'>['route']>().params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{chapterTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: padding.horizon,
    },
    title: {
        color: color.primary,
        fontSize: 14,
    }
})

export default HeaderChapter