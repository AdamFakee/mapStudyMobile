import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'
import { img } from '../constants/img'
import { gap } from '../constants/style'

interface emptyProps  {
    title?: string,
    subTitle?: string,
    isShowSubTitle?: boolean,
    img?: ImageSourcePropType
}

const defaultProps: emptyProps = {
    title: 'No results found.',
    subTitle: 'Try adjusting your search to find what you are looking for.',
    isShowSubTitle: true,
}

const Empty = (props: emptyProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={props.img ? props.img : img.empty} style={styles.img}/>
            </View>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, styles.titleBold]} >
                    {props.title ? props.title : defaultProps.title}
                </Text>
                {
                    props.isShowSubTitle && (
                        <Text style={[styles.title,]}>
                            {props.subTitle ? props.subTitle : defaultProps.subTitle}
                        </Text>
                    )
                }
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
        height: 200
    },
    img: {
        height: '100%',
        aspectRatio: 226/140
    },
    titleContainer: {
        width: '80%'
    },
    title: {
        textAlign: 'center',
        fontSize: 18
    },
    titleBold: {
        fontWeight: 'bold'
    }
})

export default Empty