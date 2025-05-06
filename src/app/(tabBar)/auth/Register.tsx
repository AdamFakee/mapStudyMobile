import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../components/auth-tabBar/input/Input'
import { color, gap, padding, tabbar } from '../../../constants/style'
import { ActiveButton } from '../../../components/Button'
import InputPassWord from '../../../components/auth-tabBar/input/InputPassWord'
import { ErrorOption, FieldError, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GenderSelectValue, registerFormProps, registerSchema } from '../../../validations/registerValidation'
import { useNavigation } from '@react-navigation/native'
import { AuthTabBarProps } from '../../../navigationScreen/(tabBar)/auth'
import InputSelect from '../../../components/auth-tabBar/input/InputSelect'
import { CallApiRegister, resultFetchRegister } from '../../../actionAuth/register'
import { asyncStorageService } from '../../../services/asyncStorage.service'
import { keyStore } from '../../../constants/storeData'
import { globalActions } from '../../../redux/slices/globalSlice'
import { useAppDispatchGlobal } from '../../../redux/store/globalStore'
import { ApiError } from '../../../customs/axiosLib'
import Loading from '../../../components/Loading'


export interface registerError {
  err?: FieldError
}
const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const globalDispatch = useAppDispatchGlobal();
  const navigation = useNavigation<AuthTabBarProps<'Login'>['navigation']>();
  const { control, handleSubmit, setError, formState: { errors } } = useForm<registerFormProps>({
    defaultValues: {
      email: '',
      password: '',
      facebook: '',
      name: '',
      birthYear: '',
      phone: '',
      confirmPassword: '',
      gender: ''
    },
    resolver: zodResolver(registerSchema)
  })
  const submit = handleSubmit(async (data) => {
    setIsLoading(true);
    console.log('data::::', data)
    try {
      const res = await CallApiRegister<resultFetchRegister>(data);
      // save tokens
      const {accessToken, refreshToken} = res.metadata.tokens;
      await asyncStorageService.setData({value:accessToken, key: keyStore.accessToken})
      await asyncStorageService.setData({value:refreshToken, key: keyStore.refreshToken})
      // End save token

      globalDispatch(globalActions.login(res.metadata.data)); // set login status
    } catch (error) {
      const responseErr = error as ApiError;
      console.log( responseErr.status)
      if(responseErr.status === 409) {
        const customsErr: ErrorOption = {
          message: 'Tài khoản đã tồn tại'
        }
        setError('email', customsErr)
      }
    } finally {
      setIsLoading(false);
    }
  });  
  const handleNavigation = () => navigation.replace('Login');
  return (
    <View style={styles.container}>
      {
        isLoading === false 
          ? 
            (
              <ScrollView>
                <View style={styles.wraper}>
                  {/* title */}
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Đăng ký</Text>
                  </View>
                  {/* input */}
                  <View style={styles.inputContainer}>
                    <Input<registerFormProps> title='Họ và tên' control={control} name='name' err={errors.name}/>
                    <Input<registerFormProps> title='Email' control={control} name='email' err={errors.email}/>
                    <InputPassWord<registerFormProps> title='Mật khẩu' control={control} name='password' err={errors.password}/>
                    <InputPassWord<registerFormProps> title='Xác nhận lại mật khẩu' control={control} name='confirmPassword' err={errors.confirmPassword}/>
                    <Input<registerFormProps> title='Số điện thoại' control={control} name='phone' err={errors.phone} keyBoardType='number-pad'/>
                    <Input<registerFormProps> title='Năm sinh' control={control} name='birthYear' err={errors.birthYear} keyBoardType='number-pad'/>
                    <Input<registerFormProps> title='Link Facebook' control={control} name='facebook' err={errors.facebook}/>
                    <InputSelect<registerFormProps> title='Giới tính' control={control} name='gender' err={errors.gender} selectData={GenderSelectValue}/>
                  </View>
                  {/* button */}
                  <View style={styles.buttonContainer}>
                    <ActiveButton title="Đăng ký" isIcon={false} fn={submit}/>
                  </View>

                  {/* other way */}
                  <View style={styles.otherWaycontainer}>
                    <Text style={styles.otherWayTitle}>
                      Chưa có tài khoản?
                      <TouchableWithoutFeedback onPress={handleNavigation}>
                        <Text style={styles.otherWayTitle}> Đăng nhập </Text>
                      </TouchableWithoutFeedback>
                    </Text>
                  </View>
                </View>
              </ScrollView>
            ) 
          : <Loading/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.block,
    paddingBottom: tabbar.height,
  },
  wraper: {
    paddingHorizontal: padding.horizon,
    paddingTop: padding.vertical * 1.5,
    paddingBottom: padding.vertical,
    gap: gap.all
  },
  titleContainer: {

  },
  title: {
    color: color.secondary,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center'
  },
  inputContainer: {
    height: 'auto',
    width: '100%',
    gap: gap.all * 0.5,
  },
  buttonContainer: {
    width: '40%',
    height: 50,
    marginHorizontal: 'auto'
  },
  otherWaycontainer: {
    alignItems: 'center'
  },
  otherWayTitle: {
    color: color.secondary,
    fontSize: 14,
  }
})

export default Register