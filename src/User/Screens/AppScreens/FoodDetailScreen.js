import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import { BackgroundImage } from 'react-native-elements/dist/config'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Image } from 'react-native-elements';
import { Colors } from '../../../global/styles';

const FoodDetailScreen = ({ navigation, route }) => {
  const index2 = 10
  const [liked, setliked] = useState(false)
  const [counter, setcounter] = useState(-2)
  const [visible, setvisible] = useState(false)
  const likehander = () => {
    if (liked == false)
      setvisible(true)
    setliked(!liked)
    setcounter(index2)
  }
  const { id, restaurant } = route.params;
  console.log('hhh', restaurant);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary, marginTop: responsiveHeight(5), }}>
      <ScrollView>
        {/* <RestaurantHeader id={id} navigation={navigation} /> */}
        <BackgroundImage
          style={styles.Topheader}
          source={{ uri: restaurant.urlimage }}
          imagestyle={styles.image}

        >
          <View style={styles.View1}>
            <View style={styles.View2}>
              <Icons name='arrow-left' color={"#000000"} size={25} onPress={() =>
                navigation.goBack()
              } />

            </View>
            <View style={styles.view3}>
              <Icon name={liked && (index2 == counter) ? "heart" : "heart-outline"}
                color={"red"} size={35}
                onPress={likehander}
              />

            </View>

          </View>


        </BackgroundImage>
        <View style={styles.mainView}>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: "bold", fontSize: 24, color: Colors.primary, marginBottom: 6 }}>
              {restaurant.name}
            </Text>

            <View style={{ flexDirection: "row", }}>
              <Icon name='location-outline' color={Colors.lgSecondary} size={25} style={{}} />
              <Text style={{ marginTop: 3, marginLeft: 7, color: Colors.primary }}>{restaurant.location}</Text>
            </View>
          </View>

        </View>
        <View style={styles.mainView}>
          <View style={{ margin: responsiveHeight(2) }}>
            <View style={styles.price}>
              <Text style={{ color: Colors.primary }}>International</Text>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 6 }}>
              <Icon name='wallet' size={29} color={Colors.primary} />
              <Text style={{ marginTop: 6, marginLeft: 7, color: Colors.primary }}>
                average price {restaurant.price}
              </Text>
            </View>
          </View>

        </View>
        <View style={styles.mainView}>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: Colors.primary, marginBottom: 6 }}>Useful Information</Text>
            <View>
              <MapView style={styles.map}
                initialRegion={{
                  latitude: 33.67421483391636,
                  longitude: 73.0763511068408,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker
                  coordinate={{ latitude: 33.67421483391636, longitude: 73.0763511068408, }}
                  title={restaurant.name}
                >
                  <Callout>
                    <Image source={{ uri: restaurant.images }} />
                    <Text>{restaurant.Restaurantname}</Text>

                  </Callout>
                </Marker>

              </MapView>

            </View>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: Colors.primary, marginBottom: 6 }}>Menu</Text>
            <View style={styles.menu}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 3, marginLeft: 3 }}>
                <Text style={{ color: Colors.primary }}>Linguine pasta with calms,artichokes and burnt leek</Text>
                <Text style={{ color: Colors.primary }}>$14</Text>
              </View>

            </View>
            <View style={styles.menu}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 3, marginLeft: 3 }}>
                <Text style={{ color: Colors.primary }}>Spagatti pasta with turnips,purple shripms tartare and anchoves</Text>
                <Text style={{ color: Colors.primary }}>$14</Text>
              </View>

            </View>
            <View style={styles.menu}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 3, marginLeft: 3 }}>
                <Text style={{ color: Colors.primary }}>parle pasta with chicory,broas bean cream and grilles olives</Text>
                <Text style={{ color: Colors.primary }}>$14</Text>
              </View>

            </View>

          </View>
          <View style={{ ...styles.createButton, backgroundColor: "transparent" }}>

            <TouchableOpacity activeOpacity={0.5} >
              <View style={{ flexDirection: "row", }}>
                <Text style={styles.createButtonTitle}>SEE FULL MENU</Text>
                <View style={{ marginLeft: 4, }}>
                  <Icon name='chevron-forward' size={20} style={{ justifyContent: "center", marginTop: -2 }} color={Colors.primary} />

                </View>
              </View>


            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.viewText}>

            <Text style={{ fontWeight: "bold", fontSize: 20, color: Colors.primary, marginBottom: 6 }}>Reviews from our diners</Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center", backgroundColor: Colors.primary, borderRadius: 20, height: 30, width: 30, }}>
                <Icon name='person' size={25} style={{ marginLeft: 2 }} />

              </View>
              <View style={{ flexDirection: "column", marginLeft: 16 }}>
                <Text style={{ color: Colors.primary }}>Syeda Neelum.</Text>
                <Text style={{ color: Colors.primary }}>May 10,2022. 24 reviews</Text>

              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      <View style={{ ...styles.createButton, }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate('BookingDetail', { id, restaurant }) }}>
          <Text style={styles.createButtonTitle}>BOOK A TABLE</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default FoodDetailScreen

const styles = StyleSheet.create({

  mainView: {
    borderBottomEndRadius: 3,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2
  },
  map: {

    width: '100%',
    height: Dimensions.get('window').height / 3,

  },
  viewText: {
    margin: responsiveHeight(2),


  },
  price: {
    backgroundColor: Colors.grey2,
    height: 30,
    width: responsiveWidth(25),
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: responsiveHeight(25 / 5),
    marginBottom: 4
  },
  createButton: {
    backgroundColor: Colors.Button,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#3CB371",
    height: 40,
    width: responsiveWidth(90),
    marginBottom: responsiveHeight(2),
    marginHorizontal: 20,
    marginTop: 10,
  },
  createButtonTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: "center",
    marginTop: -3,

  },
  menu: {
    borderBottomEndRadius: 3,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 0.7,
    paddingVertical: 10,
    marginBottom: 9,

  },
  Topheader: {
    height: 150,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  View1: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  View2: {
    margin: 10,
    width: 40,
    height: 40,
    backgroundColor: Colors.cardbackground,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,

  },
  view3: {
    marginTop: 0,
    margin: 10,
    width: 40,
    height: 40,
    backgroundColor: Colors.cardbackground,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,

  },
  View4: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center"
  }
})