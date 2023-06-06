import { StyleSheet, Text, View,FlatList,TouchableWithoutFeedback,ImageBackground,Dimensions  } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { getAllOfCollection } from '../../Backend/utility'
import { Colors } from '../../../global/styles'
import { FoodCatogory } from '../../../global/data'
import SearchComponent from '../../../components/SearchComponent'

const SCREEN_WIDTH= Dimensions.get('window').width;
const SearchScreen = (navigation) => {


  return (
    <View style={styles.container}>
<SearchComponent/>  
<View style={{marginTop:50}}>

      <FlatList
      style={{marginBottom:1}}
      data={FoodCatogory}
      keyExtractor={item=>item.id}
      renderItem={({item}) => (
<TouchableWithoutFeedback 
onPress={()=>{

}}
>

<View style={styles.imageView}>
<ImageBackground style={styles.images}
  source={{uri:item.image}}>
  
  <View style={styles.textView}>
    <Text style={{color:Colors.cardbackground}}>{item.name}</Text>
  </View>

</ImageBackground>

</View>
</TouchableWithoutFeedback>
      )}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      ListHeaderComponent={<Text style={styles.listHeader}>Top Catogory</Text>}
      ListFooterComponent= {<Footer/>}
        
  
        />
      
        </View>
  </View>
  )
}
const Footer = () => {
  return (
    <View style={{marginTop:20,marginBottom:30}}>

      <View style={{}}>
      
        <FlatList
        style={{marginBottom:1}}
        data={FoodCatogory}
        keyExtractor={item=>item.id}
        renderItem={({item}) => (
<TouchableWithoutFeedback>

<View style={styles.imageView}>
  <ImageBackground style={styles.images}
    source={{uri:item.image}}>
    
    <View style={styles.textView}>
      <Text style={{color:Colors.cardbackground}}>{item.name}</Text>
    </View>

  </ImageBackground>

</View>
</TouchableWithoutFeedback>
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={<Text style={styles.listHeader}>More Catogory</Text>}
          
    
          />
          </View>
      </View>
  )
}
export default SearchScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.secondary,
    
    },
    view1:{
      flexDirection:'row',
      margin:20,
      justifyContent:'space-between'
    },
  tex1:{
    fontWeight:"bold",
    fontSize:30,
    color:Colors.Button,
    
   
  },
  image:{
    width:responsiveWidth(100),
    height:responsiveHeight(20),
  },
 text2:{
   marginLeft:responsiveWidth(3),
   fontSize:23,
   fontWeight:'bold'
 },

 imageView:{
  borderWidth:10,
  borderColor:Colors.primary,
  justifyContent:"center",
  alignItems:"center",
  width:SCREEN_WIDTH*0.4475,
  height:SCREEN_WIDTH*0.4475,
  marginLeft:SCREEN_WIDTH*0.035,
  marginBottom:SCREEN_WIDTH*0.035,


},
images:{
  borderWidth:1,
  width:SCREEN_WIDTH*0.4475,
  height:SCREEN_WIDTH*0.4475,

},
listHeader:{
  fontSize:16,
  color:Colors.grey4,
  paddingBottom:10,
  marginLeft:12,
  marginTop:7
},
textView:{
  width:SCREEN_WIDTH*0.4475,
  height:SCREEN_WIDTH*0.4475,
  alignItems:"center",
justifyContent:"center",
backgroundColor:'rgba(52,52,52,0.3)'
},
})