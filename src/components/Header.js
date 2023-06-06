import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { Colors,Parameters } from '../global/styles'
Colors
export default function Header({title,type,navigation}) {
  return (
    <View style={styles.Header}>
        <View style={{}}>
     <Icon
     type='MaterialCommunityIconMas'
     name={type}
     color={Colors.headerText}
     size={28}
     onPress={()=>{
       navigation.goBack()
     }}
     />

        </View>
        
   <View>
<Text style={styles.headertext}>{title}</Text>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
Header:{
    flexDirection:"row",
    backgroundColor:Colors.Button,
    height:Parameters.headerHeight,


},

headertext:{
    color:Colors.headerText,
    fontSize:22,
    fontWeight:"bold",
    marginLeft:40
}
})