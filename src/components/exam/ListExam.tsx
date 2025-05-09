import React from 'react'
import { StyleSheet, View } from 'react-native';
import ExamComponent from './Exam';
import { gap } from '../../constants/style';

function ListExam() {
    const totalResults = 15;
    const examIdArray = Array.from({length: totalResults}, (_, index) => index + 1);

    return (
        <View style={styles.container}>
            {
                examIdArray.map((item, index) => (
                    <View key={index}>
                        <ExamComponent pos={item}/>
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: gap.all * 0.8
    }
})

export default ListExam