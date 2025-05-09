import { Image, Modal, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { ActiveButton } from '../Button'
import { color, gap, radius } from '../../constants/style'
import { TouchableWithoutFeedback } from 'react-native'

type props = {
    fnActive: () => void,
    fnInavtive: () => void,
    title: string,
    isShow: boolean,
    otherContainerStyle?: StyleProp<ViewStyle>
}

const ComfirmPopup = (props: props) => {
    const handleClosePopUp = () => props.fnInavtive(); // click bên ngoài mainComponent thì sẽ đóng pop-up giống như click nut No
    return (
        <Modal visible={props.isShow} transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={() => handleClosePopUp()}>
                <View style={styles.wraper}>
                    {/* main component */}
                    <TouchableWithoutFeedback>
                        <View style={[styles.container, props.otherContainerStyle]}>
                            <View style={styles.imgContainer}>
                                <Image 
                                    style={styles.img}
                                    source={{
                                        uri: 'https://media.istockphoto.com/id/1221750570/vector/exclamation-mark-sign-warning-about-an-emergency.jpg?s=612x612&w=0&k=20&c=EsKL2jyoS_T06mQuX6_mbhPF6qqkrO48v9L9YsOe-Eo='
                                    }}
                                />
                            </View>
                            <Text
                                style={styles.title}
                            >{props.title}</Text>
                            <View style={styles.buttonGroup}>
                                <View style={styles.buttonContainer}>
                                    <ActiveButton title='No' otherStyle={{
                                        container: Customstyles.container,
                                        title: Customstyles.title
                                    }} fn={props.fnInavtive}/>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <ActiveButton title='Yes' fn={props.fnActive}/>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* end main component */}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ComfirmPopup

const styles = StyleSheet.create({
    wraper: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'},
    container: {
        backgroundColor: color.block,
        height: '100%',
        alignItems: 'center',
        gap: gap.all,
        justifyContent: 'center',
        shadowColor: color.gray,
        shadowOffset: {
            height: 3,
            width: 1,
        },
        elevation: 5,
        shadowOpacity: 0.7,
        shadowRadius: 5,
        borderRadius: radius.all
    },
    imgContainer: {
        height: '40%'
    },
    img: {
        height: '100%',
        aspectRatio: 1/1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: color['primary-typo'],
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    buttonContainer: {
        width: '30%',
    }
})

const Customstyles = StyleSheet.create({
    container: {
        backgroundColor: color.backgroundGray,
    },
    title: {
        color: color['primary-typo']
    },
})