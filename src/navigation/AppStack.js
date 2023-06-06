import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import { Icon } from 'react-native-elements';
import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../User/Screens/AppScreens/MapScreen';
import FoodDetailScreen from '../User/Screens/AppScreens/FoodDetailScreen';
import BookingDetail from '../User/Screens/AppScreens/BookingDetail';
import { Colors } from '../global/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../User/Screens/AppScreens/HomeScreen';
import ProfileScreen from '../User/Screens/AppScreens/ProfileScreen';
import SearchScreen from '../User/Screens/AppScreens/SearchScreen';
const tabBarHeight = responsiveHeight(8);
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator(); //Notification
const SearchStack = createNativeStackNavigator(); //Member
const MainApp = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

// const MainApp = createNativeStackNavigator();
console.disableYellowBox;
const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      initialRouteName={'Home'}>
      <HomeStack.Screen name={'Home'} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Profile'}>
      <ProfileStack.Screen name={'Profile'} component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Search'}>
      <SearchStack.Screen name={'Search'} component={SearchScreen} />
    </SearchStack.Navigator>
  );
};

const MainTabScreens = props => {
  return (
    <MainTab.Navigator
      barStyle={{ backgroundColor: 'red' }}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'rgba(52,52,52,0.1)',
        inactiveTintColor: 'rgba(52,52,52,0.1)',
        allowFontScaling: true,
        style: {
          backgroundColor: 'rgba(52,52,52,0.1)',
          height: tabBarHeight,
        },
      }}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}>

      <MainTab.Screen
        name={'Home'}
        component={HomeStackScreens}
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  height: tabBarHeight,
                  justifyContent: 'flex-end',
                  width: responsiveWidth(17),
                  paddingBottom: responsiveHeight(2),
                }}>
                <Icon
                  name={'home'}
                  type={'Material'}
                  size={responsiveFontSize(3.2)}
                  color={focused ? Colors.lgSecondary : Colors.lgPrimary}
                />
              </View>
            );
          },
        })}
      />

      <MainTab.Screen
        name={'Search'}
        component={SearchStackScreen}
        options={props => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  height: tabBarHeight,
                  justifyContent: 'flex-end',
                  width: responsiveWidth(17),
                  paddingBottom: responsiveHeight(2),
                }}>
                <Icon
                  name="search"
                  type={'Feather'}
                  size={responsiveFontSize(3.1)}
                  color={focused ? Colors.lgSecondary : Colors.lgPrimary}
                />
              </View>
            );
          },
        })}
      />

      <MainTab.Screen
        name={'Profile'}
        component={ProfileStackScreens}
        options={props => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  height: tabBarHeight,
                  justifyContent: 'center',
                  width: responsiveWidth(17),
                }}>
                <Icon
                  name="person"
                  type={'MaterialIcons'}
                  size={responsiveFontSize(3.3)}
                  color={focused ? Colors.lgSecondary : Colors.lgPrimary}
                />
              </View>
            );
          },
        })}
      />
    </MainTab.Navigator>
  );
};

const App = () => {
  return (
    <MainApp.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Main'}>
      <MainApp.Screen name={'Main'} component={MainTabScreens} />
      <MainApp.Screen name={'Map'} component={MapScreen} />
      <MainApp.Screen name={'Detail'} component={FoodDetailScreen} />
      <MainApp.Screen name={'BookingDetail'} component={BookingDetail} />








    </MainApp.Navigator>
  );
};

export default App;
