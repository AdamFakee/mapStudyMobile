import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { color, padding } from '../../../constants/style'
import { useNavigation } from '@react-navigation/native'
import { AuthStacktype, AuthTabBarProps } from '../../../navigationScreen/(tabBar)/auth'
import TabItem, { TabItemProps } from '../../../components/TabItem'

const listButton: TabItemProps<AuthStacktype>[] = [
    {
        title: 'Đăng nhập',
        screen: 'Login'
    },
    {
        title: 'Đăng ký',
        screen: 'Register'
    }
]
const PreAuth = () => {
    const navigation = useNavigation<AuthTabBarProps<'PreAuth'>['navigation']>();
    const handleNavigation = (screen: keyof AuthStacktype) => {
        navigation.navigate(screen);
    }
    return (
        <View style={styles.container}>
            {/* banner */}
            <View style={styles.bannerContainer}>
                <Text style={styles.bannerTitle}>Bạn chưa đăng nhập.</Text>
                <Text style={styles.bannerTitle}>Đăng nhập hoặc Đăng ký ngay hôm nay!</Text>
            </View>
            {/* button navigation */}
            <View style={styles.buttonContainer}>
               {
                listButton.map((item, index) => {
                    return (
                        <View key={index}>
                            <TabItem item={item} fn={handleNavigation}/>
                        </View>
                    )
                })
               }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bannerContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primary
    },
    bannerTitle: {
        color: color.background,
        fontSize: 14
    },
    buttonContainer: {
        paddingVertical: padding.vertical * 0.5,
        backgroundColor: color.block,
    },
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

export default PreAuth