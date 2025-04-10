import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { color, padding, radius } from '../../constants/style';

export interface TeacherCardType {
  id: string;
  name: string;
  thumbnail: string;
}
export const TeacherCard = ({item}: {item: TeacherCardType}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wraperImg}>
        <Image src={item.thumbnail} style={styles.img}/>
      </View>
      <Text style={styles.title}>
        {item.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  wraperImg: {
    width: '100%',
  },
  img: {
    width: '100%',
    borderRadius: radius.all,
    aspectRatio: '120/174.5',
  },
  title: {
    position: 'absolute',
    bottom: '2%',
    width: '100%',
    textAlign: 'center',
    color: color.background,
    fontSize: 20,
    paddingHorizontal: padding.horizon * 0.7,
  },
});

