import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../global/styles'

const Order = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:"white"}}>Order</Text>
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
    container:{flex:1,alignItems:"center",justifyContent:'center',backgroundColor:Colors.secondary}

})