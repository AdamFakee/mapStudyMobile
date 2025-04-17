import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import { color, radius } from '../../../constants/style'
import { useAppSelectorCourse } from '../../../redux/store/courseTab/courseStore'

type ButtonType = {
    title :string,
    fn?: () => void,
}
const ButtonFilter = ({ title, fn}: ButtonType) => {
    const filterSubject = useAppSelectorCourse(state => state.filterCourseReducer.subjects);
    const isActive = filterSubject.length > 0;
    const customStyle = StyleSheet.create({
        container: {
            backgroundColor: isActive ? color['primary-light'] : color.backgroundGray,
        },
        title: {
            color: isActive ? color.block : color['primary-typo'],
        }
    });
    return (
        <TouchableWithoutFeedback
            onPress={fn}
        >
            <View style={[styles.container, customStyle.container]}>
                <Text style={[styles.title, customStyle.title]}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        minWidth: 80,
        width: 'auto',
        borderRadius: radius.sm,
        paddingHorizontal: 24,
        paddingVertical: 14,
        backgroundColor: color.inActiveButton,
    },
    title: {
        textAlign: 'center'
    }
})

export default ButtonFilter