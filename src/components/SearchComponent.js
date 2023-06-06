import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View, TextInput, FlatList } from 'react-native'
import React, { useState, useRef } from 'react'
import { Colors } from '../global/styles'
import { useNavigation } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Animated from 'react-native-animatable'
import Hotel from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


const SearchComponent = ({ navigation }) => {
  // const navigation=useNavigation()
  //  const [data,setdata]=useState([])
  const [modalVisible, setmodalVisible] = useState(false)
  const [textinputfocused, setTextinputFocused] = useState(true)
  const textinput = useRef(0)
  return (

    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setmodalVisible(true)}>
        <View style={styles.SearchArea}>
          <Icon name='search' style={styles.searchicon} size={25} iconstyle={{ marginleft: 5 }} />
          <Text style={{ fontSize: 14, color: Colors.primary }}>What you're looking for</Text>
          <View style={{ marginLeft: responsiveHeight(22) }} >
            <Icon2 name='my-location' color={Colors.primary} size={25} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Modal animationType='fade' transparent={false} visible={modalVisible} >
        <View style={styles.Modal}>

          <View style={styles.view1}>
            <View style={styles.textinput}>
              <Animated.View animation={textinputfocused ? "fadeInRight" : "fadeInLeft"} duration={400}>
                <Icon name={textinputfocused ? 'arrow-back' : 'search'} onPress={() => {
                  if (textinputfocused)
                    setmodalVisible(false)
                  setTextinputFocused(true)
                }}
                  style={styles.icon2}
                  iconstyle={{ marginright: 5 }}
                />
              </Animated.View>
              <Text style={{ fontSize: 18, color: Colors.primary, marginLeft: -8 }}>What</Text>

              <GooglePlacesAutocomplete 
        
                placeholder='Type of food,restauarant name'
              
                autoFocus={false}
                ref={textinput}
                fetchDetails={true}
                onFocus={() => {
                  setTextinputFocused(true)
                }}
                onBlur={() => { setTextinputFocused(false) }}
                styles={{
                  textInputContainer: { backgroundColor:Colors.secondary
                                   },
                  textInput: {
                    height: '70%',
                    color: '#5d5d5d',
                    fontSize: 16,
                    backgroundColor: Colors.secondary,
                    marginTop:7               
                    },
                  
                
                }}
              />
              <Animated.View animation={textinputfocused ? "fadeInLeft" : ""} duration={400}>
                <Icon name={textinputfocused ? "close" : null}
                  size={25}
                  style={{ marginright: -10, color: Colors.Button }}
                  onPress={() => {
                    textinput.current.clear()
                  }}
                />
              </Animated.View>
            </View>
          </View>
          <View style={styles.page_breaker} />
          <View style={styles.textinput2}>

            <Text style={{ fontSize: 18, color: Colors.primary, }}>Where</Text>

            <TextInput style={{ width: "50%",color:Colors.grey }}
              placeholder='Address,city,station...'
              placeholderTextColor={Colors.grey3}
              autoFocus={false}
             
              ref={textinput}
              onFocus={() => {
                setTextinputFocused(true)
              }}
              onBlur={() => { setTextinputFocused(false) }}
            />
             {/* <GooglePlacesAutocomplete
        placeholder="Type a place"
        onPress={(data, details = null) => console.log(data, details)}
        query={{ key: 'AIzaSyBeh_lQ_iPHT5KXOklZ9D1Zx6KNYT2n4oA',}}
        fetchDetails={true}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        predefinedPlaces={[
          {
            type: 'favorite',
            description: 'Dominos Pizza',
            geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
          },
          {
            type: 'favorite',
            description: 'Chicken Republic',
            geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
          },
          {
            type: 'favorite',
            description: 'Chicken Republic',
            geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
          },
        ]}
      /> */}
          </View>
          <View style={{ flexDirection: "row", margin: responsiveHeight(2) }}>
            <View style={styles.search_res}>

              <Icon name='search' size={23} color={Colors.primary} />
            </View>
            <View style={{ paddingLeft: 10, marginTop: 4 }}>
              <Text style={{
                color: Colors.Button
              }}>All restaurants</Text>
            </View>
          </View>
          <View style={styles.location}>
            <Text style={{ color: Colors.primary, fontWeight: "bold", fontSize: 15 }}>Suggested Search</Text>
          </View>
          <View style={{ padding: responsiveHeight(3), }}>
            <View style={{ flexDirection: "row", }}>
              <Hotel name='hotel' size={22} color={Colors.primary} style={{ ...styles.hotelicon, }} />
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <Text style={{ color: Colors.primary, fontSize: 20, fontWeight: "bold" }}>Monum</Text>
                <Text style={{ color: Colors.primary, fontSize: 12 }}>1245 Islamabad Pakistan</Text>
              </View>
              <View style={{ paddingLeft: responsiveHeight(20), marginTop: 7 }}>
                <Icon2 name='arrow-forward-ios' color={Colors.primary} size={23} />

              </View>
            </View>

          </View>
          <View style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.primary,
            marginTop: -10,
            marginEnd: 0,
            marginStart: responsiveHeight(3)
          }} />
          <View style={{ padding: responsiveHeight(3), }}>
            <View style={{ flexDirection: "row", }}>
              <Hotel name='hotel' size={22} color={Colors.primary} style={{ ...styles.hotelicon, }} />
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <Text style={{ color: Colors.primary, fontSize: 20, fontWeight: "bold" }}>Monum</Text>
                <Text style={{ color: Colors.primary, fontSize: 12 }}>1245 Islamabad Pakistan</Text>
              </View>
              <View style={{ paddingLeft: responsiveHeight(20), marginTop: 7 }}>
                <Icon2 name='arrow-forward-ios' color={Colors.primary} size={23} />

              </View>
            </View>

          </View>
          <View style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.primary,
            marginTop: -10,
            marginEnd: 0,
            marginStart: responsiveHeight(3)
          }} />
        </View>
      </Modal>
    </View>
  )
}

export default SearchComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop:responsiveHeight(5)


  },
  text1: {
    color: Colors.primary,
    fontSize: 16
  },
  page_breaker: {

    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    marginTop: -10,
    // marginHorizontal:30,
    marginEnd: 0,
    marginStart: responsiveHeight(5)
  },
  textinput: {

    marginHorizontal: 0,
    borderColor: "#869398",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: -8,
    paddingRight: 10,

  },
  textinput2: {
    marginHorizontal: 0,
    borderColor: "#869398",
    flexDirection: "row",
    // justifyContent:"space-evenly",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: responsiveHeight(6),
    paddingRight: 10,

  },
  SearchArea: {
    marginTop: 7,
    height: 40,
    width: "97%",
    backgroundColor: "rgba(52,52,52,4.3)",

    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3,

  },
  searchicon: {
    fontSize: 24,
    padding: 5,
    color: Colors.primary,
  },
  view1: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 10,

  },
  view2: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  icon2: {
    fontSize: 30,
    padding: 10,
    paddingLeft: responsiveHeight(-15),
    color: Colors.Button,

  },
  Modal: {
    flex: 1,
    backgroundColor: Colors.secondary,

  },
  search_res: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Button,
    borderRadius: 20,
    height: 30,
    width: 30,

  },
  location: {
    backgroundColor: Colors.lgSecondary,

    padding: responsiveHeight(2),



  },
  hotelicon: {
    height: responsiveHeight(5), width: responsiveWidth(10),
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 8

  }

})