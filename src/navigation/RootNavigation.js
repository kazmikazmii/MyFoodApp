import { StyleSheet, Text, StatusBar } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthApp from './authNavigation';
import App from './AppStack';
import Items from '../Admin/Screens/Tabs/Items';
import AddItems from '../Admin/Screens/Tabs/AddItems';
import EditItem from '../Admin/Screens/EditItem';
import { Colors } from '../global/styles';
import AdminMain from '../Admin/Screens/Main';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../redux/action';
import { Init } from '../redux/action';


const AppStack = createNativeStackNavigator();
const RootNavigation = () => {

  // const token=useSelector(state=>state.reducer.authToken)
  // console.log(token)
  // const dispatch=useDispatch();
  // const init=()=>{
  //   dispatch(Init())
  // }
  // useEffect(() => {
  // init()

  // }, [])

  return (

    <NavigationContainer>

      <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />

      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {/* {
        token==null?
        <AppStack.Screen name={'AuthApp'} component={AuthApp} />

        :
        <AppStack.Screen name={'App'} component={App} />

      } */}
        <AppStack.Screen name={'AuthApp'} component={AuthApp} />

        <AppStack.Screen name={'App'} component={App} />


        <AppStack.Screen name={'AdminMain'} component={AdminMain} />
        <AppStack.Screen name={'Item'} component={Items} />
        <AppStack.Screen name={'AddItem'} component={AddItems} />
        <AppStack.Screen name={'Edit'} component={EditItem} />

      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
