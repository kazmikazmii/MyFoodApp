import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Colors } from './global/styles';

const Splash = ({navigation}) => {
    useEffect(()=>{
        setTimeout(() => {
     
        navigation.navigate('WelcomeScreen')
        }, 3000);
    },[]);
  
  return (
    <View style={{flex:1,backgroundColor:Colors.Button,justifyContent:'center',alignItems:"center"}}>
            <View style={{ alignItems: "center" }}>
                <Icon
                    name='fast-food-sharp'
                    size={responsiveHeight(20)}
                    iconStyle={{ color: Colors.primary, }} color="white"
                />
            </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})