import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../global/styles'

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:'white'}}>Notification</Text>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container:{flex:1,alignItems:"center",justifyContent:'center',backgroundColor:Colors.secondary}

})