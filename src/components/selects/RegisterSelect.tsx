import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { color, radius } from '../../constants/style'

export interface SelectDataProps {
    selectData: string[],
}
interface RegisterSelectProps extends SelectDataProps {
    fnOnChange: (...event: unknown[]) => void,
    fnSetState: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegisterSelect = (props: RegisterSelectProps) => {
    const { fnOnChange, fnSetState, selectData } = props;
    return (
        <View style={styles.container}>
            {
                selectData.map((item, index) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [isPress, setIsPressed] = useState<boolean>(false);
                    const isLastItem = selectData.length - 1 === index;
                    if(isLastItem && selectData[selectData.length - 1] === '') {
                        return null;
                    }
                    return (
                        <TouchableWithoutFeedback 
                            key={index}
                            onPressIn={() => setIsPressed(true)}
                            onPressOut={() => setIsPressed(false)}
                            onPress={() => {
                                fnOnChange(item);
                                fnSetState(preValue => !preValue);
                            }}
                        >
                            <View style={[styles.option, isPress && styles.optionPressed]}>
                                <Text style={styles.title}>
                                    {item}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        backgroundColor: color.backgroundGray,
        borderRadius: radius.sm,
        padding: 5,
        gap: 5,
    },
    option: {
        justifyContent: 'center',
        padding: 5,
        borderRadius: radius.sm
    },
    optionPressed: {
        backgroundColor: color.gray,
    },
    title: {
        color: color.primary,
    }
})
export default RegisterSelect