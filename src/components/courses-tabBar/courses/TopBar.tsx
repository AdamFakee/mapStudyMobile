import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import { color, gap, padding } from '../../../constants/style';
import { fetchFilterCourse, filterCourseAction } from '../../../redux/slices/filterCourse/filterCourseSlice';
import { useAppDispatchGlobal, useAppSelectorGlobal } from '../../../redux/store/globalStore';


interface Props {
    title: string;
    classNumber: string
}

const defaultItem: Props[] = [
    { title: 'Tất cả', classNumber: 'all' },
    { title: 'Lớp 12', classNumber: '3' },
    { title: 'Lớp 11', classNumber: '2' },
    { title: 'Lớp 10', classNumber: '1' },
    { title: 'Đại học', classNumber: '4' }
];
const TopBar = () => {
    const dispatch = useAppDispatchGlobal();
    const classType = useAppSelectorGlobal(state => state.courseReducer.filterCourseReducer.classType);

    const handleSetClassType = (payload: string) => {
        dispatch(filterCourseAction.setClassType(payload));
        dispatch(fetchFilterCourse())
    }
    return (
        <View style={styles.container}>
            {
                defaultItem.map((item, index) => {
                    const isChoosen = classType === item.classNumber;
                    const customStyle = StyleSheet.create({
                        itemContainer: {
                            borderBottomColor: isChoosen ? color.primary : color.gray,
                            borderBottomWidth: isChoosen ? 1.3 : 0,
                        },
                        title: {
                            color: isChoosen ? color.primary : color.gray,
                        }
                    })
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => handleSetClassType(item.classNumber)}
                        >
                            <View 
                                style={[styles.itemContainer, customStyle.itemContainer]}
                            >
                                <Text style={[customStyle.title]}>{item.title}</Text>
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
        flex: 1,
        flexDirection: 'row',
        gap: gap.all,
        flexWrap: 'wrap',
        borderBottomWidth: 0.8,
    },
    itemContainer: {
        paddingBottom: padding.horizon,
        paddingHorizontal: padding.horizon * 1.3 
    }
})

export default TopBar