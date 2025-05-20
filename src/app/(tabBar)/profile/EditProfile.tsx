import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { gap, padding, color, radius } from '../../../constants/style'
import Avatar from '../../../components/profile-tabBar/Avatar'
import { useAppDispatchGlobal, useAppSelectorGlobal } from '../../../redux/store/globalStore'
import { useForm } from 'react-hook-form'
import { editProfileProps, editProfileSchema } from '../../../validations/editProfileValidation'
import Input from '../../../components/auth-tabBar/input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import Icon from 'react-native-vector-icons/AntDesign'
import { ActiveButton } from '../../../components/Button'
import ImagePickerService from '../../../services/imagePicker.service'
import { ProfileAction } from '../../../redux/slices/profile/profileSlice'
import { domain } from '../../../constants/domain'
import { asyncStorageService } from '../../../services/asyncStorage.service'
import { keyStore } from '../../../constants/storeData'
import { useNavigation } from '@react-navigation/native'
import { ProfileTabBarProps } from '../../../navigationScreen/(tabBar)/profile'

const EditProfile = () => {
  const [formDataImg, setFormDataImg] = useState<FormData>();
  const navigation = useNavigation<ProfileTabBarProps<'editProfile'>['navigation']>();
  const profile = useAppSelectorGlobal(state => state.profileReducer.ProfileReducer.user);
  const dispatch = useAppDispatchGlobal();
  const { control, handleSubmit} = useForm<editProfileProps>({
    defaultValues: {
      name: profile.name,
    },
    resolver: zodResolver(editProfileSchema)
  })


  const handlePickImg = useCallback(async () => {
    const result = await ImagePickerService.pickImgFromCamera();
    const formData = ImagePickerService.convertImageByFormData(result, 'avatar');
    setFormDataImg(formData);
    dispatch(ProfileAction.setThumbnail(result?.uri || null));
  }, [dispatch]);

  const submit = handleSubmit(async (data) => {
    try {
      const formData = formDataImg || new FormData();
      formData.append('name', data.name);

      const opts = {
        url: domain + '/user/editProfile',
        method: 'PATCH',
        data: formData,
        headers: {
          'x-client-email': profile.email || null,
          'authorization': await asyncStorageService.getData({key: keyStore.accessToken}),
                // 'Content-Type': 'multipart/form-data',

        }
      }
      const res = await fetch(opts.url, {
        body: opts.data,
        headers: opts.headers,
        method: 'PATCH',
      });

      const result = await res.json();
      if(result.status === 200) {
        navigation.popTo('aboutMe');
      } else {
        Alert.alert('có lỗi xảy ra')
      }
    } catch (error) {
      console.log('err edit profile', error)
    }
  })
  return (
    <View style={styles.container}>
      <View style={styles.wraper}>
        <Text style={styles.title}>Chỉnh sửa thông tin</Text>
        <View style={styles.formContainer}>
          <View style={styles.avatarContainer}>
            <Avatar thumbnail={profile.thumbnail}/>
            <TouchableWithoutFeedback onPress={handlePickImg}>
              <View style={styles.imgPickerContainer}>
                <Icon name='edit' style={styles.icon}/>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.inputContainer}>
            <Input<editProfileProps> name='name' title='Họ và tên' control={control}/>
          </View>
          <View style={styles.buttonGroup}>
            <View style={styles.buttonContainer}>
              <ActiveButton title='Cập nhật'
                otherStyle={{
                  container: otherButtonStyles.container,
                  title: otherButtonStyles.titleSubmitButton
                }}
                fn={submit}
              />
            </View>
            <View style={styles.buttonContainer}>
              <ActiveButton title='Hủy'
                otherStyle={{
                  container: otherButtonStyles.containerCancelButton,
                  title: otherButtonStyles.titleCancelButton
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wraper: {
    gap: gap.all,
    paddingHorizontal: padding.horizon,
    paddingTop: padding.vertical,
    flex: 1
  },
  title: {
    color: color.primary,
    fontSize: 18,
    fontWeight: '500'
  },
  formContainer: {
    flex: 1,
    gap: gap.all,
    alignItems: 'center',
  },
  avatarContainer: {
    width: '40%',
    aspectRatio: 1,
    position: 'relative'
  },
  imgPickerContainer: {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    backgroundColor: color.block,
    padding: 2,
    borderRadius: radius.sm,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: color['primary-typo'],
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  icon: {
    fontSize: 30,
  },
  inputContainer: {
    width: '100%'
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: gap.all,
  },
  buttonContainer: {
    width: '30%'
  }
})

const otherButtonStyles = StyleSheet.create({
  container: {
    borderRadius: radius.sm
  },
  containerCancelButton:{
    borderRadius: radius.sm,
    backgroundColor: color.block
  },
  titleSubmitButton: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  titleCancelButton: {
    color: color['primary-typo'],
    fontWeight: 'bold',
    fontSize: 15,
  }
})