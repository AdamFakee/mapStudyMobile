import { View, Text, TouchableWithoutFeedback, StyleSheet  } from 'react-native'
import React from 'react'
import data from '../../../data/subjects.json';
import { color, padding, radius } from '../../../constants/style';
import { Subject as SubjectType } from '../../../types/definition';
import { filterCourseAction } from '../../../redux/slices/filterCourse/filterCourseSlice';
import { useAppDispatchGlobal, useAppSelectorGlobal } from '../../../redux/store/globalStore';
const Subject = () => {
    const filterSubjects = useAppSelectorGlobal(state => state.courseReducer.filterCourseReducer).subjects;
    const filterDispatch = useAppDispatchGlobal();

    const handleAddSubject = (id: SubjectType['id']) => {
        filterDispatch(filterCourseAction.addSubject({id}));
    }
    const handleDelSubject = (id: SubjectType['id']) => {
        filterDispatch(filterCourseAction.delSubject({id}));
    }

    return (
        <View style={styles.container}>
            {
                data.map(item => {
                    const isChoosen = filterSubjects.find(el => el.id === item.id);
                    const customStyle = StyleSheet.create({
                        itemContainer: {
                            backgroundColor: isChoosen ? color['primary-light'] : color.backgroundGray,
                        },
                        title: {
                            color: isChoosen ? color.block : color['primary-typo'],
                        }
                    });
                    return (
                        <TouchableWithoutFeedback
                            key={item.id}
                            onPress={() => {
                                isChoosen ? handleDelSubject(item.id) : handleAddSubject(item.id);
                            }}
                        >
                            <View
                                style={[styles.itemContainer, customStyle.itemContainer]}
                            >
                                <Text style={[styles.title, customStyle.title]}>{item.title}</Text>

                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        gap: 15,
        flexDirection: 'row'
    },
    itemContainer: {
        backgroundColor: color.backgroundGray,
        paddingHorizontal: padding.horizon,
        paddingVertical: 8,
        borderRadius: radius.sm,
    },
    title: {
        color: color['primary-typo'],
        textAlign: 'center'
    }
})

export default Subject