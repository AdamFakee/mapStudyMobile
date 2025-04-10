import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { RefObject, useRef } from 'react'
import IndexCourses from './Courses';
import IndexHome from './Home';
import IndexExam from './Exam';
import IndexNews from './News';
import { BlurView } from '@react-native-community/blur';
import { DrawerLayoutAndroid, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderTabBar, { HeaderTabBarProps } from '../../components/Layouts/HeaderTabBar';
import { tabBarTitle } from '../../constants/tabBar';
import { color, tabbar } from '../../constants/style';
import SearchDrawer from '../../components/Layouts/SearchDrawer';

type BottomTabType = {
  homeTab: undefined;
  courseTab: undefined;
  examTab: undefined;
  newsTab: undefined;
}
const RootTabBar = createBottomTabNavigator<BottomTabType>();

const opts: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: color.activeTabBar,
  tabBarInactiveTintColor: color['primary-light'],
  tabBarLabel: ({ focused, children }) => {
    return (
      <Text style={{ color: focused ? color.activeTabBar : 'gray', textTransform: 'capitalize' }}>
        {children}
      </Text>
    );
  },
  // custom tabbar blur
  tabBarStyle: {
    position: 'absolute',
    height: tabbar.height,
    alignItems: 'center',
  },
  tabBarBackground: () => (
    <BlurView
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(101,92,155,0.4)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'
      }}
      blurAmount={30}
      blurType='light'
    />
  ),
  // end custom tabbar blur
};

type PropsIconUIType = {
  color: string;
  size: number;
}

const CustomIconUI = ({color, size, iconName }:  PropsIconUIType & {iconName: string}) => {
  return <Icon name={iconName} size={size} color={color} />;
};



export interface SearchDrawerRef {
  drawerRef: RefObject<DrawerLayoutAndroid> | null;
}
const Index = () => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      renderNavigationView={() => <SearchDrawer/>}
    >
      <RootTabBar.Navigator
        screenOptions={opts}
        backBehavior='history'
        layout={(props: HeaderTabBarProps) => <HeaderTabBar {...props} drawerRef={drawerRef}/>}  
      >
        <RootTabBar.Screen name={'homeTab'}  component={IndexHome} options={{
          title: tabBarTitle.home,
          tabBarIcon: (props: PropsIconUIType) => <CustomIconUI {...props} iconName = 'home'/>
        }}/>
        <RootTabBar.Screen name={'courseTab'} component={IndexCourses} options={{
          title: tabBarTitle.course,
          tabBarIcon: (props: PropsIconUIType) => <CustomIconUI {...props} iconName = 'switcher'/>
        }}/>
        <RootTabBar.Screen name={'examTab'} component={IndexExam} options={{
          title: tabBarTitle.exam,
          tabBarIcon: (props: PropsIconUIType) => <CustomIconUI {...props} iconName = 'filetext1'/>
        }}/>
        <RootTabBar.Screen name={'newsTab'} component={IndexNews} options={{
          title: tabBarTitle.news,
          tabBarIcon: (props: PropsIconUIType) => <CustomIconUI {...props} iconName = 'paperclip'/>
        }}/>
      </RootTabBar.Navigator>
    </DrawerLayoutAndroid>
  )
}

export default Index