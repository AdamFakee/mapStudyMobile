import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { img } from '../../constants/img'
import { color, gap } from '../../constants/style'
import { useNavigation } from '@react-navigation/native'
import { BottomTabProps } from '../../navigationScreen/(tabBar)'

const RequireAuth = () => {
    const navigation = useNavigation<BottomTabProps<'courseTab'>['navigation']>();
    const hanldeNavigation = () => {
        navigation.navigate('authTab', {
            screen: 'Login'
        })
    };
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={img.signup} style={styles.img}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.titleMain}>Bạn cần đăng nhập để tiếp tục
                </Text>
                <TouchableWithoutFeedback onPress={hanldeNavigation}>
                    <Text style={styles.textNavigation}>Đăng nhập ngay</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: gap.all,
        justifyContent: 'center',
    },
    imgContainer: {
        height: '20%',
    },
    img: {
        aspectRatio: 204/126,
        resizeMode: 'contain',
        height: '100%',
    },
    textContainer: {
        gap: gap.sm,
        alignItems: 'center'
    },
    titleMain: {
        color: color.primary,
        fontSize: 16,
        fontWeight: 'bold'
    },
    textNavigation: {
        fontSize: 14,
        color: color['secondary-typo'],
        textDecorationLine: 'underline'
    }
})

export default RequireAuth