import { View, StyleSheet, Button } from 'react-native'
import React from 'react'
import { ProfileStackType, ProfileTabBarProps } from '../../../navigationScreen/(tabBar)/profile'
import TabItem, { TabItemProps } from '../../../components/TabItem'
import { useNavigation } from '@react-navigation/native'
import { color } from '../../../constants/style'
import { asyncStorageService } from '../../../services/asyncStorage.service'
import { keyStore } from '../../../constants/storeData'
import { useAppDispatchGlobal } from '../../../redux/store/globalStore'
import { globalActions } from '../../../redux/slices/globalSlice'



const defaultProfileTabItem: TabItemProps<ProfileStackType>[] = [
  {
    title: 'Thông tin cá nhân',
    screen: 'aboutMe',
  },
  {
    title: 'Khóa học của tôi',
    screen: 'myCourse',
  }
]
const Profile = () => {
  const navigation = useNavigation<ProfileTabBarProps<'profile'>['navigation']>();
  const globalDispatch = useAppDispatchGlobal();
  const handleNavigation = (screen: TabItemProps<ProfileStackType>['screen']) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    asyncStorageService.removeData(keyStore.accessToken);
    asyncStorageService.removeData(keyStore.refreshToken);
    globalDispatch(globalActions.logout());
    navigation.popToTop()
  }
  return (
    <View style={styles.container}>
      <View>
        {
          defaultProfileTabItem.map((item, index) => {
            return (
              <View key={index}>
                <TabItem item={item} fn={handleNavigation}/>
              </View>
            )
          })
        }
      </View>
      <Button title='logout' onPress={() => {
        handleLogout()
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.block,
  },
})
export default Profile