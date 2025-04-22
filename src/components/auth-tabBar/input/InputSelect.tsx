import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'
import React, { useState } from 'react'
import InputFrame from './InputFrame'
import { color, input, padding, radius } from '../../../constants/style'
import {Controller, FieldValues, useController } from 'react-hook-form'
import { inputType } from './Input'
import RegisterSelect, { SelectDataProps } from '../../selects/RegisterSelect'

interface inputSelectProps<T extends FieldValues> extends inputType<T>, SelectDataProps {

};
const InputSelect = <T extends FieldValues,>(props: inputSelectProps<T>) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const { field: {onChange}} = useController({
        name: props.name,
        control: props.control
    });
    return (
        <View>
            <InputFrame title={props.title} errMessage={props.err?.message} isShowRequiredIcon={props.isShowRequiredIcon !== undefined ? props.isShowRequiredIcon : true}>
                <Controller
                control={props.control}
                rules={{
                    required: true,
                }}
                name={props.name}
                render={({ field: {value}}) => (
                    <TouchableWithoutFeedback
                        onPress={() => setIsShow(!isShow)}
                    >
                        <View style={[styles.textInput, props.err && styles.textInputError]}>
                            <Text style={value ? styles.title : null}>{ value ? value :props.title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                />
            </InputFrame>
            { isShow && <RegisterSelect fnOnChange={onChange} fnSetState={setIsShow} selectData={props.selectData}/>}
        </View>
    )
}

const styles = StyleSheet.create({
  textInput: {
    height: input.height,
    backgroundColor: color.inActiveButton,
    paddingHorizontal: padding.horizon,
    borderRadius: radius.sm,
    justifyContent: 'center'
  },
  textInputError : {
    borderWidth: 0.7,
    borderColor: 'red'
  },
  title: {
    color: color['primary-typo'],
    fontSize: 14,
  }
})

export default InputSelect