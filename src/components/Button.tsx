import { View, Text, TouchableWithoutFeedback, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import { color, radius } from '../constants/style'
import Icon from 'react-native-vector-icons/FontAwesome6';

type ActiveButtonType = {
    title: string,
    fn?: () => void,
    isIcon?: boolean,
    otherStyle?: {
        container?: StyleProp<ViewStyle>,
        title?: StyleProp<TextStyle>
    }
}
export const ActiveButton = (props: ActiveButtonType) => {
    return (
        <TouchableWithoutFeedback onPress={props.fn}>
            <View style={[styles.container, props.otherStyle?.container]}>
                {
                    props.isIcon && <Icon name='key' color={color.block}/>
                }
                <Text style={[styles.title, props.otherStyle?.title]}> {props.title} </Text>
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
