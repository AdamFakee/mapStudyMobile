import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { color, gap } from '../../../../constants/style'

const DescDetailTab = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image src='https://mapstudy.sgp1.digitaloceanspaces.com/teacher/6500812d4490d64f5f4aba61/thay-dang-tien-nghia-1730720187137.jpg' style={styles.img}/>
            </View>
            <Text style={styles.title}>Giao Vien Thay Tuan</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        flexDirection: 'row',
        gap: gap.all
    },
    imgContainer: {
        width: '15%'
    },
    img: {
        width: '100%',
        aspectRatio: 1/1,
        borderRadius: 999
    },
    title: {
        color: color.primary,
        fontSize: 20,
    }
})

export default DescDetailTab