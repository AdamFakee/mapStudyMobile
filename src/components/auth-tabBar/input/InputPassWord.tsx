import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InputFrame from './InputFrame'
import { color, input, padding, radius } from '../../../constants/style'
import Icon from 'react-native-vector-icons/AntDesign';
import { inputType } from './Input';
import { Controller, FieldValues } from 'react-hook-form';
const InputPassWord = <T extends FieldValues,>(props: inputType<T>) => {
  const [isShowPass, setIsShowPass] = useState(true);

  const handleShowPass = () => {
    setIsShowPass(!isShowPass);
  };
  return (
    <View>
      <InputFrame title={props.title} errMessage={props?.err?.message} isShowRequiredIcon={props.isShowRequiredIcon  !== undefined ? props.isShowRequiredIcon : true}>
        <View style={[styles.inputContainer, props.err && styles.inputContainerError]}>
          <Controller
            render={({ field: {onChange, value}}) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder={props.title}
                style={styles.textInput}
                secureTextEntry={isShowPass}
              />
            )}
            name={props.name}
            control={props.control}
          />
          <TouchableOpacity onPress={handleShowPass}>
            <Icon
              name={isShowPass ? 'eyeo' : 'eye'}
              size={20}
              color={color.primary}
            />
          </TouchableOpacity>
        </View>
      </InputFrame>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: color.inActiveButton,
    borderRadius: radius.sm,
    alignItems: 'center'
  },
  inputContainerError : {
    borderWidth: 0.7,
    borderColor: 'red'
  },
  textInput: {
    height: input.height,
    marginHorizontal: padding.horizon,
    color: color['primary-typo'],
    fontSize: 14,
    width: '84%',
  },
})

export default InputPassWord