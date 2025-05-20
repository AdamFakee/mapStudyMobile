import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { useAppSelectorGlobal } from '../../redux/store/globalStore'
import TextInfor from './TextInfor';
import { gap } from '../../constants/style';


const Infor = () => {
  const profile = useAppSelectorGlobal(state => state.profileReducer.ProfileReducer.user);
  const renderProfile = useCallback(() => {
    return Object.entries(profile).map(([key, value]) => (
      <TextInfor title={value} key={key} label={key}/>
    ));
  }, [profile]);
  return (
    <View style={styles.container}>
      {
        renderProfile()
      }
    </View>
  )
}

export default Infor

const styles = StyleSheet.create({
  container: {
    gap: gap.sm
  }
})