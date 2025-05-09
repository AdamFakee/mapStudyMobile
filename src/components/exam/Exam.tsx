import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { color, padding, radius } from '../../constants/style'
import { useNavigation } from '@react-navigation/native'
import { ExamTabbarProps } from '../../navigationScreen/(tabBar)/Exam'

interface examProps {
    pos: number
}

function ExamComponent(props: examProps) {
    const navigation = useNavigation<ExamTabbarProps<'Exam'>['navigation']>();
    const handleNavigation = (examId: number) => {
        navigation.navigate('DetailExam', {
            examId: examId
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.wraper}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.pos}. Đề thi số {props.pos}</Text>
                </View>
                <View style={styles.stickerContainer}>
                    <Text style={styles.sticker}>V-ACT</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => handleNavigation(props.pos)}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>Xem</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    wraper: {
        paddingHorizontal: padding.horizon,
        paddingVertical: padding.vertical,
        backgroundColor: color.block,
        borderRadius: radius.all,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.primary,
        cursor: 'pointer',
        position: 'relative',
        flex: 1,
        shadowColor: color.gray,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 10,
        justifyContent: 'space-between'
    },
    titleContainer: {

    },
    title: {
        fontSize: 15,
        fontWeight: 'semibold',
        color: color.primary
    },
    stickerContainer: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        backgroundColor: color['primary-light'],
        borderRadius: radius.all,
        paddingHorizontal: 5,
        paddingVertical: 3
    },
    sticker: {
        fontSize: 14,
        fontWeight: 'semibold',
        color: 'red',
    },
    buttonContainer: {
        backgroundColor: '#12AD50',
        borderRadius: radius.all,
        paddingVertical: padding.horizon * 0.5,
        paddingHorizontal: padding.vertical
    },
    button: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color['primary-typo'],
        textAlign: 'center'
    }
})

export default ExamComponent