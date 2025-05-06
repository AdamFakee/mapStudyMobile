import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useAppSelectorGlobal } from '../../../redux/store/globalStore';
import RequireAuth from '../../../components/require/RequireAuth';
import HeaderChapter from '../../../components/courses-tabBar/chapter/HeaderChapter';
import BodyChapter from '../../../components/courses-tabBar/chapter/BodyChapter';

const Chapter = () => {
    const { isLogin } = useAppSelectorGlobal(state => state.globalReducer);

    return (
        <View style={styles.container}>
            {
                isLogin === false 
                    ?  <RequireAuth/>
                    : (
                        <View style={{flex: 1}}>
                            <HeaderChapter/>
                            <BodyChapter/>
                        </View>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Chapter