import React from 'react'
import Splash from '../Splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../User/Screens/AuthScreens/WelcomeScreen';
import LoginScreen from '../User/Screens/AuthScreens/LoginScreen';
import SignUpScreen from '../User/Screens/AuthScreens/SignUp';
import LoginAdmin from '../Admin/Screens/LoginAd';
import SignUpAdmin from '../Admin/Screens/SignUpAd';
import AdminMain from '../Admin/Screens/Main';
const AuthStack = createNativeStackNavigator();
const AuthApp = () => {
  return (
    <>
      <AuthStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"Splash"}>
        <AuthStack.Screen name={"Splash"} component={Splash} />
        <AuthStack.Screen name={"WelcomeScreen"} component={WelcomeScreen} />
        <AuthStack.Screen name={"SignIn"} component={LoginScreen} />
        <AuthStack.Screen name={"SignUp"} component={SignUpScreen} />
        <AuthStack.Screen name={"SignUpAdmin"} component={SignUpAdmin} />
        <AuthStack.Screen name={"LoginAdmin"} component={LoginAdmin} />
        <AuthStack.Screen name={"AdminMain"} component={AdminMain} />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthApp;