import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import Banner from '../../../components/home/Banner';
import ListTeacher from '../../../components/swiper/ListTeacher';
import { color, gap, padding, tabbar } from '../../../constants/style';
import ListCourse from '../../../components/swiper/ListCourse';

const { height } = Dimensions.get('window');

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.wrapper}>
          {/* banner */}
          <View style={styles.banner}>
            <Banner/>
          </View>
          {/* list teacher */}
          <View style={[styles.listContainer, styles.listTeacher]}>
            <ListTeacher/>
          </View>
          {/* list course */}
          <View style={[styles.listCourse]}>
            <ListCourse isHot={false} isNew={true} title="Khóa học mới nhất"/>
          </View>
          {/* list course */}
          <View style={[styles.listCourse]}>
            <ListCourse isHot={true} isNew={false} title="Khóa học hot"/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: tabbar.height,
  },
  scroll: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    gap: gap.all,
  },
  banner: {
    height: 'auto',
    width: '100%',
    backgroundColor: 'red',
  },
  listContainer: {
    height: 'auto',
    paddingVertical: padding.vertical,
    backgroundColor: color.block,
  },
  listTeacher: {
    paddingLeft: padding.horizon,
  },
  listCourse: {
    height: 'auto',
    paddingHorizontal: padding.horizon,
    paddingVertical: padding.vertical,
    backgroundColor: color.block,
  },
});

export default Home;