import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../constants/style'

type props = {
    title: string,
    label: string,
}

const TextInfor = (props: props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
        <Text style={styles.title}>{props.title || 'Chưa có thông tin'}</Text>
    </View>
  )
}

export default TextInfor

const styles = StyleSheet.create({
    container: {
        gap: 3
    },
    label: {
        color: color.gray,
        fontSize: 16
    },
    title: {
        color: color['primary-typo'],
        fontSize: 15
    }
})