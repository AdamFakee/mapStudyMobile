import { View, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import InputFrame from './InputFrame'
import { color, input, padding, radius } from '../../../constants/style'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { registerError } from '../../../app/(tabBar)/auth/Register'

export interface inputType<T extends FieldValues> extends registerError {
  title: string,
  control: Control<T>,
  name: Path<T>,
  isShowRequiredIcon?: boolean,
  keyBoardType?: KeyboardTypeOptions;
  isShowTitle?: boolean,
}
const Input = <T extends FieldValues>({
  keyBoardType = 'default', ...props
}: inputType<T>) => {
  return (
    <View>
      <InputFrame title={props.title} errMessage={props.err?.message} isShowRequiredIcon={props.isShowRequiredIcon !== undefined ? props.isShowRequiredIcon : true} isShowTitle={props.isShowTitle !== undefined ? props.isShowTitle : true}>
        <Controller
          control={props.control}
          rules={{
            required: true,
          }}
          name={props.name}
          render={({ field: {onChange, value}}) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              keyboardType={keyBoardType}
              placeholder={props.title}
              style={[styles.textInput, props.err && styles.textInputError]}
            />
          )}
        />
      </InputFrame>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: input.height,
    backgroundColor: color.inActiveButton,
    paddingHorizontal: padding.horizon,
    borderRadius: radius.sm,
    color: color['primary-typo'],
    fontSize: 14,
  },
  textInputError : {
    borderWidth: 0.7,
    borderColor: 'red'
  }
})

export default Input