import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatchGlobal, useAppSelectorGlobal } from '../../../redux/store/globalStore'
import { fetchInforUser } from '../../../redux/slices/profile/profileSlice';
import Infor from '../../../components/profile-tabBar/Infor';
import ProfileHeader from '../../../components/profile-tabBar/ProfileHeader';
import { color, gap, padding } from '../../../constants/style';

const AboutMe = () => {
  const globalDispatch = useAppDispatchGlobal();
  const {isLoading} = useAppSelectorGlobal(state => state.profileReducer.ProfileReducer)
  useEffect(() => {
    const fetch = async () => {
      console.log(isLoading)
      try {
        globalDispatch(fetchInforUser());
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalDispatch])
  return (
    <View style={styles.container}>
      <View style={styles.wraper}>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <ProfileHeader/>
        <Infor/>
      </View>
    </View>
  )
}

export default AboutMe

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wraper: {
    gap: gap.all,
    paddingHorizontal: padding.horizon,
    paddingTop: padding.vertical,
  },
  title: {
    color: color.primary,
    fontSize: 18,
    fontWeight: '500'
  }
})