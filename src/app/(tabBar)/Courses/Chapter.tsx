import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { CourseTabBarProps } from '../../../navigationScreen/(tabBar)/Courses';
import { useAppSelectorGlobal } from '../../../redux/store/globalStore';
import RequireAuth from '../../../components/require/RequireAuth';

const Chapter = () => {
    const navigation = useNavigation<CourseTabBarProps<'Chapter'>['route']>();
    // const {chapterId, chapterTitle} = navigation.params;
    const { isLogin } = useAppSelectorGlobal(state => state.globalReducer);
    
    return (
        <View style={styles.container}>
            {
                isLogin === false 
                    ?  <RequireAuth/>
                    : (
                        <View><Text>xx</Text></View>
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