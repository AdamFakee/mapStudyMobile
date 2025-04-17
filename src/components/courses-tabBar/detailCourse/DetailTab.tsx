import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { color, gap, padding } from '../../../constants/style'
import DescDetailTab from './detailTab/DescDetailTab'
import ListLessonDetailTab from './detailTab/ListLessonDetailTab'

type headerProps = {
    title: string,
    id: number
}
const defaultHeaderProps: headerProps[] = [
    { title: 'Mô tả', id: 1},
    { title: 'Bài học', id: 2}
] 


const RenderBody = (id: number): React.ReactElement => {
    switch (id) {
        case 1: 
            return <View style={renderBodyStyles.container}>
                <DescDetailTab/>
            </View>
        case 2: 
            return <View style={renderBodyStyles.container}>
                <ListLessonDetailTab/>
            </View>
        default: 
            return <></>;
    }
}

const renderBodyStyles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const DetailTab = () => {
    const [headerTab, setHeaderTab] = useState<number>(1)
    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.headerContainer}>
                {
                    defaultHeaderProps.map(item => {
                        const isActive = headerTab === item.id;
                        const customStyles = StyleSheet.create({
                            headerTitle: {
                                color: isActive ? color['secondary-typo'] : color.gray,
                            }
                        })
                        return (
                            <TouchableWithoutFeedback key={item.title}
                                onPress={() => setHeaderTab(item.id)}
                            >
                                <View style={styles.headerItem}>
                                    <Text style={[styles.headerTitle, customStyles.headerTitle]}>{item.title}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>

            {/* body */}
            <View style={styles.renderBodyContainer}>
                {RenderBody(headerTab)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: padding.horizon,
        gap: gap.all
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.6,
        borderBottomColor: color.gray
    },
    headerItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: padding.vertical
    },
    headerTitle: {
        fontSize: 20
    },
    renderBodyContainer: {
        height: 'auto',
    }
})

export default DetailTab