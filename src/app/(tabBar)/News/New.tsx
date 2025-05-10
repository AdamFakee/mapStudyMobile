import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import data from '../../../data/news.json';
import NewItem from '../../../components/new-tabbar/NewItem';
import { gap, tabbar } from '../../../constants/style';
const New = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.wraper}>
          {
            data.map((item, index) => {
              return (
                <View key={index} style={{height: 'auto', width: '100%',}}>
                  <NewItem item={item}/>
                </View>
              )
            })
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default New

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wraper: {
    flex : 1,
    gap: gap.sm * 2,
    paddingBottom: tabbar.height + 10
  },
})