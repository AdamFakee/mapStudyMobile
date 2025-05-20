import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../constants/style';

type props = {
    thumbnail: string | null;
}
const Avatar = (props: props) => {
    const { thumbnail } = props;
    return (
        <View style={styles.container}>
            {
                thumbnail
                    ?
                        (
                            <View style={styles.imgContainer}>
                                <Image src={thumbnail} style={styles.img}/>
                            </View>
                        )
                    :
                        (
                            <View style={styles.imgContainer}>
                                <View style={styles.imgWrap}>
                                    <Text style={styles.textImg}>A</Text>
                                </View>
                            </View>
                        )
            }
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgContainer: {
        width: '100%',
        aspectRatio: 1,
    },
    imgWrap: {
        flex: 1,
        backgroundColor: color.gray,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        flex: 1,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textImg: {
        fontWeight: 'bold',
        fontSize: 70,
        color: color.block
    },
})