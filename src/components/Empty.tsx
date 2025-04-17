import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { img } from '../constants/img'
import { gap } from '../constants/style'

const Empty = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={img.empty} style={styles.img}/>
            </View>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, styles.titleBold]} >
                    No results found.
                </Text>
                <Text style={[styles.title,]}>
                    Try adjusting your search
                    to find what you are looking for.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: gap.all,
    },
    imgContainer: {
        backgroundColor: '#FFFFFF', // Nền trắng cho container chứa ảnh
        borderRadius: 10, // Bo góc nhẹ giống trong hình
        padding: 20, // Khoảng cách bên trong để tạo không gian cho ảnh
        shadowColor: '#000', // Hiệu ứng bóng
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    img: {

    },
    titleContainer: {
        width: '80%'
    },
    title: {
        textAlign: 'center',
        fontSize: 16
    },
    titleBold: {
        fontWeight: 'bold'
    }
})

export default Empty