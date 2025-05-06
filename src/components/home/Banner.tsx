import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { icon } from '../../constants/icon'
import { ActiveButton } from '../Button'
import { color, padding, radius } from '../../constants/style'
import { useNavigation } from '@react-navigation/native'
import { BottomTabProps } from '../../navigationScreen/(tabBar)'

function Banner() {
    const navigation = useNavigation<BottomTabProps<'homeTab'>['navigation']>();
    const handleActiveCourse = (): void => {
        navigation.navigate('courseTab', {
            screen: 'ActiveCourse',
        });
    };
    return (
        <View style={styles.container}>
            {/* banner */}
            <View style={styles.banner}>
                <Image source={icon.bannerHome} style={styles.img}/>
            </View>
            {/* active course button */}
            <View style={styles.button}>
                <ActiveButton title={'Kích hoạt thẻ'} fn={handleActiveCourse}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.block,
        paddingVertical: padding.vertical,
        paddingHorizontal: padding.horizon,
    },
    banner: {
        flex: 4,
    },
    img: {
        height: 'auto',
        aspectRatio: '339/180',
        width: '100%',
        overflow: 'hidden',
        borderRadius: radius.all,
        resizeMode: 'stretch'
    },
    button: {
        flex: 1,
        marginTop: 20
    }
})

export default Banner