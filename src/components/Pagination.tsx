import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import { color, gap } from '../constants/style'

type paginationProps ={
    totalPage: number,
    currentPage: number,
    fn: (page: number) => void,
}
const Pagination = ({totalPage = 1, fn}: paginationProps) => {
    return (
        <View style={styles.container}>
            {
                Array.from({length: totalPage}).map((_, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => fn(index + 1)}
                        >
                            <View style={[styles.item]}>
                                <Text style={[styles.title]}>{index + 1}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        gap: gap.all * 0.7
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderColor: color.primary
    },
    title: {
        color: color.primary
    }
})
export default Pagination;