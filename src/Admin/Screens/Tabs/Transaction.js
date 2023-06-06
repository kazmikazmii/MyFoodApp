import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../global/styles'

const Transaction = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:"white"}}>Transaction</Text>
    </View>
  )
}

export default Transaction

const styles = StyleSheet.create({
  container:{flex:1,alignItems:"center",justifyContent:'center',backgroundColor:Colors.secondary}
})