import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { color, padding } from '../constants/style'

export interface TabItemProps<T> {
  title: string,
  screen: keyof T;
}

interface ItemProps<T> {
    item: TabItemProps<T>;
    fn: (screen: TabItemProps<T>['screen']) => void;
}
const TabItem = <T,>(props: ItemProps<T>) => {
    const { item, fn } = props;
    const [isPressed, setIsPressed] = useState<boolean>(false);
    return (
        <TouchableWithoutFeedback
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={() => fn(item.screen)}
        >
            <View style={[styles.button, isPressed && styles.button_Pressed]}>
                <Text style={styles.buttonTitle}>{item.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export interface TabItemForVoidFunctionProps {
    title: string,
    fn: () => void
}

export const TabItemForVoidFuntion = (props: TabItemForVoidFunctionProps) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);
    return (
        <TouchableWithoutFeedback
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={() => props.fn()}
        >
            <View style={[styles.button, isPressed && styles.button_Pressed]}>
                <Text style={styles.buttonTitle}>{props.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: padding.horizon * 1.4,
        paddingVertical: padding.vertical * 0.4,
    },
    button_Pressed: {
        backgroundColor: color.backgroundGray
    },
    buttonTitle: {
        color: color['primary-typo'],
        fontSize: 16
    }
})

export default TabItem