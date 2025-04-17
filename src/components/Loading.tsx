import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = ({size = 30}: {size?: number}) => {
    return (
        <View style={styles.container}>
            <View style={styles.bg}></View>
            <ActivityIndicator animating={true} color={'red'} size={size} style={styles.loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    bg: {
        flex: 1,
        backgroundColor: '#222100',
        opacity: 0.15,
    },
    loading: {
        position: 'absolute',
        zIndex: 99,
        top: '50%',
        left: '45%'
    }
});

export default Loading