import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Items from './Tabs/Items'
import Transaction from './Tabs/Transaction'
import Notification from './Tabs/Notification'
import AddItems from './Tabs/AddItems'
import { Colors } from '../../global/styles'
import Order from './Tabs/Order'


const AdminMain = () => {
  const [selectedTab, setSelectedTab] = useState(2)

  return (
    <View style={styles.container}>
      {
     selectedTab == 0 ? (<Items />) : 
      selectedTab == 1 ? (<Transaction />) :
      selectedTab == 2 ? (<AddItems />) :
      selectedTab == 3 ? (<Order />) :
      (<Notification/>)
    }
      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.bottomtab}  onPress={() => {setSelectedTab(0)}}>
          <Image source={require("../../assets/shopping-bag.png")} style={[styles.bottomtabimage,{tintColor:selectedTab==0?'red':'white'}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomtab} onPress={() => {setSelectedTab(1)}}>
          <Image source={require("../../assets/transaction.png")} style={[styles.bottomtabimage,{tintColor:selectedTab==1?'red':'white'}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomtab} onPress={() => {setSelectedTab(2)}}>
          <Image source={require("../../assets/plus.png")} style={[styles.bottomtabimage,{width:30,height:30}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomtab} onPress={() => {setSelectedTab(3)}}>
          <Image source={require("../../assets/order-delivery.png")} style={[styles.bottomtabimage,{tintColor:selectedTab==3?'red':'white'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomtab}  onPress={() => {setSelectedTab(4)}}>
          <Image source={require("../../assets/bell.png")} style={[styles.bottomtabimage,{tintColor:selectedTab==4?'red':'white'}]}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AdminMain

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  bottomView: {
    width: '100%',
    height: 60,
    justifyContent: 'space-evenly',
    flexDirection: "row",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.secondary,
    borderColor:'white',
    borderTopWidth:1
  },
  bottomtabimage: {
    width: 24,
    height: 24,

  },

})