import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import { color, padding, radius } from '../constants/style'
import Icon from 'react-native-vector-icons/FontAwesome6';

type ActiveButtonType = {
    title: string,
    fn?: () => void
}
export const ActiveButton = ({title, fn }: ActiveButtonType) => {
    return (
        <TouchableWithoutFeedback onPress={fn}>
            <View style={styles.container}>
                <Icon name='key' color={color.block}/>
                <Text style={styles.title}> {title} </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
        borderRadius: radius.all,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        color: color.block
    }
})
