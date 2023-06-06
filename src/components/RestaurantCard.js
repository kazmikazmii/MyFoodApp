import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { Colors } from '../global/styles'


export default function RestaurantCard({
  onpressFoodCard,
  Restaurantname,
  location,
  price,
  images,
  averageReviews,
  numberofReviews,
  screenWidth }) {
  return (
    <TouchableOpacity onPress={onpressFoodCard}>
      <View style={{ ...styles.cardView, width: screenWidth }}>
   
        <Image style={{ ...styles.image, width: screenWidth }}
          source={{ uri: images }}
        />
        <View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.Restaurantname}>
              {Restaurantname}
            </Text>
            <View style={{ marginLeft: responsiveHeight(1.0) }}>
            <Text style={{ color: Colors.grey4 }}>{location}</Text>
            <Text style={{ color: Colors.grey4 }}>$23{price}</Text>
            
            </View>

          </View>

        </View>
      </View>


      <View style={styles.review}>

        <Text style={styles.reviewtext}>{averageReviews} </Text>
        <Text style={{ color: "white", fontSize: 12 }}>
          {numberofReviews} reviews
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 9,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grey3,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: "rgba(52,52,52,0.13)",
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 150,
  },
  Restaurantname: {
    fontSize: 17, fontWeight: "bold", color: Colors.primary, marginTop: 5, marginLeft: 10
  },
  location: {
    flex: 4, flexDirection: 'row',
    borderRightColor:
      Colors.grey4,
    paddingHorizontal: 5,
    borderRightWidth: 1,

  },
  place: {
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 5,
    color: Colors.grey5,
    // marginLeft:4

  },
  price: {
    fontSize: 12,
    paddingTop: 5,
    color: Colors.grey2,
    paddingHorizontal: 10
  },
  review: {
    position: 'absolute',
    top: 0, right: 10,
    backgroundColor: "rgba(52,52,52,0.3)",
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 12,

  },
  reviewtext: {
    color: "white",
    fontSize: 20, fontWeight: "bold",
    marginTop: -3
  }
})