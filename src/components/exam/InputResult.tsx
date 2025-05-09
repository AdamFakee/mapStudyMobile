import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { color, gap } from '../../constants/style'

interface props {
    title: string,
    isRight: boolean,
    isAnswer: boolean,
}
 
const colorsMarkdown = {
    red: '#FF000060',
    blue: '#0030FF30',
    green: '#00FF0070',
};
const InputResult = (props: props) => {
    let bgColor = "";
    if (props.isAnswer && props.isRight) {
        bgColor = colorsMarkdown.green; // Người dùng chọn đúng
    } else if (props.isAnswer && !props.isRight) {
        bgColor = colorsMarkdown.red; // Người dùng chọn sai
    } else if (!props.isAnswer && props.isRight) {
        bgColor = colorsMarkdown.blue; // Đáp án đúng nhưng người dùng không chọn
    }

    return (
        <View >
            <View
                style={{
                    flexDirection: 'row',
                    gap: gap.all,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    backgroundColor: bgColor || 'transparent'
                }}
            >
                <View style={{
                    borderWidth: 1,
                    borderColor: props.isAnswer ? color['primary-light'] : color['primary-typo'],
                    borderRadius: 999,
                    height: 24,
                    width: 24,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: color.block
                }}>
                    <View
                        style={{
                            backgroundColor: props.isAnswer ? color['primary-light'] : 'transparent',
                            width:'90%',
                            height: '90%',
                            borderRadius: 999,
                        }}
                    />
                </View>
                <Text
                    style={{
                        color: color['primary-typo'],
                        fontSize: 16,
                        fontWeight: 'semibold',
                    }}
                >{props.title}</Text>
            </View>
        </View>
    )
}

export default InputResult

const styles = StyleSheet.create({})