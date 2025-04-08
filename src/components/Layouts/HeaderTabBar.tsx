import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { SearchDrawerRef } from '../../navigationScreen/(tabBar)';
import { BlurView } from '@react-native-community/blur';
import { color } from '../../constants/style';

export interface HeaderTabBarProps {
    children: React.ReactNode;
}
const HeaderTabBar = ({ children, drawerRef }: HeaderTabBarProps & SearchDrawerRef): React.ReactElement => {
    const handleDrawerSearch = () => {
        if(drawerRef == null) return;
        drawerRef.current?.openDrawer();
    }
    return (
        <View style={styles.container}>
            {/* blur header */}
            <BlurView
                style={styles.blurWraper}
                blurAmount={10}
                blurType='light'
            >
                <View style={[styles.headerWrapper]}>
                    <View style={styles.logo}>
                        <Image src={'https://mapstudy.edu.vn/assets/images/logo/logo-full-128.png'} style={styles.logoImage}/>
                    </View>
                    <TouchableWithoutFeedback onPress={handleDrawerSearch}>
                        <View style={styles.searchIcon}>
                            <Icon name="search" size={30} color={color['primary-light']} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </BlurView>

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
    },
    blurWraper: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: '9%',
        justifyContent: 'center',
    },
    // ----------------- header ------------------
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingVertical: 21,
        paddingHorizontal: 14,
        backgroundColor: 'transparent',
    },
    logo: {
        // height: '100%',
    },
    logoImage: {
        height: '100%',
        aspectRatio: '86/28',
    },
    searchIcon: {
        height: 'auto',
        justifyContent: 'center',
    },
    // ----------------- header ------------------
});

export default HeaderTabBar;