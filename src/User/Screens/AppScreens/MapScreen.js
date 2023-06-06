import { StyleSheet, Text, View,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {responsiveHeight } from 'react-native-responsive-dimensions'
import { Colors } from '../../../global/styles';
import { Icon } from 'react-native-elements';

const MapScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{marginTop:20,alignItems:'flex-start'}}>
      <Icon name='arrow-left' color={"#ffffff"} size={25} onPress={() =>
                            navigation.goBack()
                        } />
      </View>
    
      <GooglePlacesAutocomplete
      
  placeholder='Search'
  fetchDetails={true}
  onFail={error => console.log(error)}
  onNotFound={() => console.log('no results')}
  GooglePlacesSearchQuery={{
    rankby: "distance"
  }}
  onPress={(data, details = null) => {
    console.log(data);
    console.log(data, details);
    
  }}
  query={{
    key: 'AIzaSyBeh_lQ_iPHT5KXOklZ9D1Zx6KNYT2n4oA',
    language: 'en',
    // components: 'country:uk',
    types: ["supermarket","grocery_or_supermarket","food","store", "establishment"],
    nearbyPlacesAPI: 'GooglePlacesSearch',
    radius: 30000
  }}

  enablePoweredByContainer={false}
  styles={{
    container: {flex:0, position: 'absolute', width: '100%', zIndex: 1,marginTop:responsiveHeight(6)},
    listView: {backgroundColor:"white"}
}}
predefinedPlaces={[
  {
    type: 'favorite',
    description: 'Roman Pizza',
    geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
  },
  {
    type: 'favorite',
    description: 'Chicken Republic',
    geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
  },
  {
    type: 'favorite',
    description: 'McDonals',
    geometry: {location: {lat: 49.8496818, lng: 1.2940881}},
  },
  {
    type: 'favorite',
    description: 'KFc',
    geometry: {location: {lat: 49.8496818, lng: 1.2940881}},
  },
]}
/>
      <MapView 
    style={styles.map}  
    initialRegion={{
    latitude:33.59532164549736,
    longitude: 73.05819150334258,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
  />
 
   </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container:{
flex:1,backgroundColor:Colors.secondary
  },
  map:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    
  }
})