import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ProfileStackType, ProfileTabBarProps } from '../../../navigationScreen/(tabBar)/profile'
import TabItem, { TabItemForVoidFunctionProps, TabItemForVoidFuntion, TabItemProps } from '../../../components/TabItem'
import { useNavigation } from '@react-navigation/native'
import { color, gap } from '../../../constants/style'
import { asyncStorageService } from '../../../services/asyncStorage.service'
import { keyStore } from '../../../constants/storeData'
import { useAppDispatchGlobal } from '../../../redux/store/globalStore'
import { globalActions } from '../../../redux/slices/globalSlice'
import { BottomTabProps } from '../../../navigationScreen/(tabBar)'



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
  const navigationTabBar = useNavigation<BottomTabProps<'courseTab'>['navigation']>();
  const globalDispatch = useAppDispatchGlobal();
  const handleNavigation = (screen: TabItemProps<ProfileStackType>['screen']) => {
    navigation.navigate(screen);
  };

  function handleLogout () {
    asyncStorageService.removeData(keyStore.accessToken);
    asyncStorageService.removeData(keyStore.refreshToken);
    globalDispatch(globalActions.logout());
    // navigation.reset()
  }
  const hanldeNavigationCourseTab = () => {
    navigationTabBar.navigate('courseTab', {
      screen: 'ActiveCourse'
    })
  }
  const defaultProfileTabItem_for_void_funtion: TabItemForVoidFunctionProps[] = [
    {
      title: 'Kích hoạt thẻ',
      fn: hanldeNavigationCourseTab
    },
    {
      title: 'Đăng xuất',
      fn: handleLogout
    }
  ]
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
      {/* border */}
      <View style={styles.border} />
      <View>
        {
          defaultProfileTabItem_for_void_funtion.map((item, index) => {
            return (
              <View key={index}>
                <TabItemForVoidFuntion title={item.title} fn={item.fn}/>
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
    backgroundColor: color.block,
    gap: gap.all * 0.8
  },
  border: {
    borderBottomWidth: 1.7,
    borderBottomColor: color.backgroundGray,
  }
})
export default Profile