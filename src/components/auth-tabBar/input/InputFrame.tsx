import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { color } from '../../../constants/style'
import Icon from 'react-native-vector-icons/AntDesign'
export interface inputFrameProps {
  children: React.ReactNode,
  isShowRequiredIcon: boolean,
  title: string,
  errMessage?: string,
}
const InputFrame = ({children, isShowRequiredIcon, title, errMessage}: inputFrameProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {
          isShowRequiredIcon && <Text style={styles.titleIcon}>*</Text>
        }
      </View>
      {children}
      {
        errMessage && (
          <View style={styles.errContainer}>
            <Icon name='warning' color={'red'}/>
            <Text style={styles.errTitle}>{errMessage}</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 3
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  title: {
    color: color.primary,
    fontSize: 15,
  },
  titleIcon: {
    color: 'red',
    fontSize: 15,
  },
  errContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center'
  },
  errTitle: {
    color: 'red',
    fontSize: 15
  }
})

export default InputFrame