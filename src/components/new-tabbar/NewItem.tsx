import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { New } from '../../types/definition'
import { color, gap, padding } from '../../constants/style'

const NewItem = ({item}: {item: New}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wraper}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: item.thumbnail
            }}
            style={styles.img}
          />
        </View>
        <View style={styles.inforContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </View>
  )
}


export default NewItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wraper: {
    flex: 1,
    flexDirection: 'row',
    gap: gap.all,
    backgroundColor: color.block,
    padding: padding.horizon,
    shadowColor: color['primary-typo'],
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
    elevation: 1,
    shadowOpacity: 0.7,
    shadowRadius: 10
  },
  imgContainer: {
    width: '20%',
  },
  img: {
    width: '100%',
    aspectRatio: 1/1,
  },
  inforContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: gap.sm
  },
  title: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: color.primary
  },
  date: {
    color: color.gray
  }
})