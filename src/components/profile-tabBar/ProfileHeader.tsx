import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useAppSelectorGlobal } from '../../redux/store/globalStore'
import { gap, radius } from '../../constants/style';
import { ActiveButton } from '../Button';
import { useNavigation } from '@react-navigation/native';
import { ProfileTabBarProps } from '../../navigationScreen/(tabBar)/profile';
import Avatar from './Avatar';

const ProfileHeader = () => {
    const thumbnail = useAppSelectorGlobal(state => state.profileReducer.ProfileReducer.user.thumbnail);

    const navigation = useNavigation<ProfileTabBarProps<'aboutMe'>['navigation']>();
    const handleNavigation = () => {
        navigation.navigate('editProfile');
    }
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar thumbnail={thumbnail}/>
            </View>
            <View style={styles.buttonGroup}>
                <View style={styles.buttonContainer}>
                    <ActiveButton title='Chỉnh sửa thông tin' fn={handleNavigation} otherStyle={{
                        container: otherButtonStyles.container
                    }}/>
                </View>
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: gap.all
    },
    avatarContainer: {
        width: '30%',
        aspectRatio: 1,
    },
    buttonGroup: {
        flex: 1,
        justifyContent: 'center',
        gap: gap.sm,
    },
    buttonContainer: {
        width:'70%'
    },
})

const otherButtonStyles = StyleSheet.create({
    container: {
        borderRadius: radius.sm
    }
})