import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Input from '../../../components/auth-tabBar/input/Input'
import { ApiResponse, callApi, CallApiType } from '../../../customs/axiosLib';
import { domain } from '../../../constants/domain';
import { useForm } from 'react-hook-form';
import { ActiveButton } from '../../../components/Button';
import { color, gap, padding, radius } from '../../../constants/style';
import { AxiosError, RawAxiosRequestHeaders } from 'axios';
import { keyStore } from '../../../constants/storeData';
import { asyncStorageService } from '../../../services/asyncStorage.service';
import { useAppSelectorGlobal } from '../../../redux/store/globalStore';
import { useNavigation } from '@react-navigation/native';
import { CourseTabBarProps } from '../../../navigationScreen/(tabBar)/Courses';

interface resultFetch extends ApiResponse {
  metadata: {
    courseId: string;
  }
}

interface formField {
  key: string
}
const ActiveCourse = () => {
  const { control, handleSubmit, formState: {errors}, setError } = useForm<formField>();
  const globalState = useAppSelectorGlobal(state => state.globalReducer);
  const navigation = useNavigation<CourseTabBarProps<'ActiveCourse'>['navigation']>();
  const submit = async (data: formField) => {
    const url = domain + '/enrollment/create';
    const headers: RawAxiosRequestHeaders = {
      'x-client-email': globalState.dataUser.email || null,
      'authorization': await asyncStorageService.getData({key: keyStore.accessToken}),
    };
    const opts: CallApiType = {
      method: 'POST',
      data: data,
      headers,
      url,
    };

    try {
      const res: resultFetch = await callApi(opts);
      if(res.status === 200) {
        navigation.replace('DetailCourse', {
            courseId: parseInt(res.metadata.courseId),
          }
        );
        return;
      }
    } catch (error) {
      if(error instanceof AxiosError) {
        const axiosErr = error as AxiosError<resultFetch>;
        const messageErr = axiosErr.response?.data.message;
        setError('key', {
          message: messageErr || 'Gặp lỗi không xác định',
        });
      } else {
        setError('key', {
          message: 'Gặp lỗi không xác định',
        });
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Nhập mã kích hoạt</Text>
        <View style={styles.containerInput}>
          <Input<formField> control={control} name="key" title="nhập mã kích hoạt" isShowTitle={false} err={errors.key}/>
        </View>
        <View style={styles.containerButton}>
          <ActiveButton fn={handleSubmit(submit)} title="Kích hoạt"/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: padding.horizon
  },
  wrapper: {
    backgroundColor: color.block,
    gap: gap.all,
    borderRadius: radius.all,
    justifyContent: 'center',
    height: '40%',
    shadowColor: '#222',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  text: {
    color: color.primary,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  containerInput : {
    width: '80%',
    marginHorizontal: 'auto',
  },
  containerButton: {
    width: '50%',
    marginHorizontal: 'auto'
  }
})

export default ActiveCourse