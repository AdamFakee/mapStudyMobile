import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import { color, radius } from '../constants/style'
import Icon from 'react-native-vector-icons/FontAwesome6';

type ActiveButtonType = {
    title: string,
    fn?: () => void,
    isIcon?: boolean,
}
export const ActiveButton = ({title, fn, isIcon = true }: ActiveButtonType) => {
    return (
        <TouchableWithoutFeedback onPress={fn}>
            <View style={styles.container}>
                {
                    isIcon && <Icon name='key' color={color.block}/>
                }
                <Text style={styles.title}> {title} </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
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
