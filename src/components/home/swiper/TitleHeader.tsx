import { View, Text, TouchableWithoutFeedback, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { color } from '../../../constants/style';

type TitleHeaderProps = {
    title: string,
    subTitle?: string,
    fnLinkTo?: () => void,
    otherStyle?: StyleProp<ViewStyle>,
}
const TitleHeader = ({ title, subTitle, fnLinkTo, otherStyle }: TitleHeaderProps) => {
    return (
        <View style={[styles.container, otherStyle]}>
            <Text style={styles.title}>{title}</Text>
            {subTitle && subTitle?.trim().length > 0 && (
                <TouchableWithoutFeedback onPress={fnLinkTo}>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        // fontWeight: 500,
        color: color.primary,
    },
    subTitle: {
        fontSize: 20,
        // fontWeight: 300,
        color: color['primary-light']
    }
})

export default TitleHeader