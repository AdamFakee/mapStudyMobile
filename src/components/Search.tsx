import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { color, padding, radius } from '../constants/style'
import { useDebouncedCallback } from 'use-debounce'

type Props = {
    fn: (value: string) => void;
}
const Search = ({fn}: Props) => {
    const debouncedSearch = useDebouncedCallback((value: string) => {
        fn(value);
    }, 1000);
    return (
        <View style={styles.container}>
            <TextInput 
                onChangeText={(value) => {
                    debouncedSearch(value)
                }}
                style={styles.input}
                placeholder='Nhập tên khóa học'
            />
            <Icon name='search1' color={color['primary-typo']} size={30}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.backgroundGray,
        paddingHorizontal: padding.horizon,
        borderRadius: radius.sm
    },
    input: {
        paddingVertical: 8,
        width: '90%',
        color: color['primary-typo']
    },
})

export default Search