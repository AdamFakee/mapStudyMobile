import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, gap } from '../../constants/style'

interface props {
    title: string,
    isSelected?: boolean,
}

const arePropsEqual = (preProps: props, nextProps: props) => {
    const isReRender = preProps.isSelected === nextProps.isSelected;
    return isReRender;
}
 
const InputRatio = React.memo((props: props) => {
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    gap: gap.all,
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}
            >
                <View style={{
                    borderWidth: 1,
                    borderColor: props.isSelected ? color['primary-light'] : color['primary-typo'],
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
                            backgroundColor: props.isSelected ? color['primary-light'] : color.block,
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
}, arePropsEqual)

export default InputRatio

const styles = StyleSheet.create({})