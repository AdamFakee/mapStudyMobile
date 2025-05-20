import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../components/auth-tabBar/input/Input'
import { color, gap, padding } from '../../../constants/style'
import { ActiveButton } from '../../../components/Button'
import InputPassWord from '../../../components/auth-tabBar/input/InputPassWord'
import { ErrorOption, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { AuthTabBarProps } from '../../../navigationScreen/(tabBar)/auth'
import { loginFormProps, loginSchema } from '../../../validations/loginValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CallApiLogin, resultFetchLogin } from '../../../actionAuth/login'
import { ApiError } from '../../../customs/axiosLib'
import { useAppDispatchGlobal } from '../../../redux/store/globalStore'
import { globalActions } from '../../../redux/slices/globalSlice'
import { asyncStorageService } from '../../../services/asyncStorage.service'
import { keyStore } from '../../../constants/storeData'
import Loading from '../../../components/Loading'


const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const globalDispatch = useAppDispatchGlobal();
  const navigation = useNavigation<AuthTabBarProps<'Login'>['navigation']>();
  const { control, handleSubmit, setError, formState: {errors} } = useForm<loginFormProps>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })

  const submit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const res = await CallApiLogin<resultFetchLogin>(data);

      // save tokens and data user
      const {accessToken, refreshToken} = res.metadata.tokens;
      const dataUser = res.metadata.data;
      await asyncStorageService.setData({value:accessToken, key: keyStore.accessToken})
      await asyncStorageService.setData({value:refreshToken, key: keyStore.refreshToken})
      await asyncStorageService.setData({value: dataUser, key: keyStore.userData})
      // End save token and data user
      

      globalDispatch(globalActions.login(
        res.metadata.data
      )); // set login status
    } catch (error) {
      const responseErr = error as ApiError;
      console.log( responseErr.status)
      if(responseErr.status === 403) {
        const customsErr: ErrorOption = {
          message: 'sai tài khoản hoặc mật khẩu'
        }
        setError('email', customsErr)
      }
    } finally {
      setIsLoading(false);
    }
  });

  const handleNavigation = () => navigation.replace('Register');

  return (
    <View style={styles.container}>
      {
        isLoading === false ? (
          <View style={styles.wraper}>
            {/* title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Đăng nhập</Text>
            </View>
            {/* input */}
            <View style={styles.inputContainer}>
              <Input<loginFormProps> title='Email' control={control} name='email' err={errors.email}/>
              <InputPassWord<loginFormProps> title='Mật khẩu' control={control} name='password' err={errors.password}/>
            </View>
            {/* button */}
            <View style={styles.buttonContainer}>
              <ActiveButton title="Đăng nhập" isIcon={false} fn={submit}/>
            </View>

            {/* other way */}
            <View style={styles.otherWaycontainer}>
              <Text style={styles.otherWayTitle}>
                Chưa có tài khoản?
                <TouchableWithoutFeedback onPress={handleNavigation}>
                  <Text style={styles.otherWayTitle}> Đăng ký </Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        ) : <Loading/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.block,
  },
  wraper: {
    paddingHorizontal: padding.horizon,
    paddingTop: padding.vertical * 1.5,
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
    gap: gap.all * 0.5
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

export default Login