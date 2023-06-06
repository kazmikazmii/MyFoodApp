import { Dimensions, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Button, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../global/styles'
import { getAllOfCollection } from '../../../Backend/utility'
import SearchComponent from '../../../components/SearchComponent'
import RestaurantCard from '../../../components/RestaurantCard'
import { connect, useDispatch, useSelector } from 'react-redux'
import { GetData } from '../../../redux/action'
import reducer from '../../../redux/reducer'
const SCREEN_WIDTH = Dimensions.get('window').width
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const HomeScreen = ({ navigation }) => {
  // const dispatch = useDispatch();
  // const datafromRedux = useSelector(state => state.reducer);
  // console.log('dataformapi' + JSON.stringify(datafromRedux))
  useEffect(() => {
    geturlData()
  }, [])
  const geturlData = async () => {
    // const res = await fetch('http://10.0.2.2:3000/MAP'); //http://192.168.75.224:3000/MAP
    // const data = await res.json();
    // console.warn('data' + JSON.stringify(data));
    // dispatch(GetData(data))
    try {
      const response = await fetch('http://10.0.2.2:3000/MAP');
      const map = await response.json();
      setmapData(map);
      console.warn(map);
    } catch (error) {
      console.log(error)
    }
  };

  const [HotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapData, setmapData] = useState()
  useEffect(() => {
    GetHotelImages()
  }, [])
  const GetHotelImages = () => {
    getAllOfCollection('Items').then((item) => {
      setHotelData(item)
      setLoading(false);
    })
  }
  return (
    <View style={styles.container}>
      <SearchComponent />
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)"/>

      <View style={styles.location}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='location-pin' size={20} color={"white"} />
          <Text style={{ color: Colors.primary }}>DISCOVER THE BEST TABLE ARROUND</Text>

        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.city}>Islamabad,Pakistan</Text>
        </View>
      </View>


      <ScrollView>
        <View style={styles.View1}>
          <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: Colors.primary, marginTop: 7 }}>RECENTLY VIEWED</Text>
          <View>
            {loading ?

              <FlatList

                showsHorizontalScrollIndicator={false}
                data={[1, 2, 3, 4, 5]}
                style={{ marginTop: 10, marginBottom: 10, }} horizontal={true} renderItem={({ item, index }) => {
                  return (
                    <View style={{
                      ...styles.cardView,
                      width: SCREEN_WIDTH * 0.5,
                      justifyContent: "space-between"
                    }}>
                      <ShimmerPlaceHolder style={{
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        height: 150,
                      }}
                        shimmerColors={['#b3afb1', '#5e6977', '#bdc6cf']}

                      ></ShimmerPlaceHolder>
                      <View>
                        <ShimmerPlaceHolder style={{
                          marginTop: 10,
                          height: 20,
                        }}
                          shimmerColors={['#b3afb1', '#5e6977', '#bdc6cf']}

                        ></ShimmerPlaceHolder>
                      </View>
                    </View>
                  )
                }}

              />

              :
              <FlatList
                style={{ marginTop: 10, marginBottom: 10 }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={ HotelData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index, }) => (

                  <View>

                    <RestaurantCard
                      screenWidth={SCREEN_WIDTH * 0.56}
                      images={item.urlimage}
                      Restaurantname={item.name}
                      averageReviews={item.averageReviews}
                      numberofReviews={item.numberofReviews}
                      // price={price}
                      location={item.location}

                      onpressFoodCard={() => { navigation.navigate("Detail", { id: index, restaurant: item, }) }}
                    />

                  </View>
                )}
              />

            }

          </View>
        </View>
        <View style={styles.View1}>
          <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: Colors.primary, marginTop: 7 }}>SUGGESTED RESTAURANT</Text>
          <View>
            {loading ?
              <FlatList

                showsHorizontalScrollIndicator={false}
                data={[1, 1, 1, 1, 1]}
                style={{ marginTop: 10, marginBottom: 10, }} horizontal={true} renderItem={({ item, index }) => {
                  return (
                    <View style={{
                      ...styles.cardView,
                      width: SCREEN_WIDTH * 0.5,
                      justifyContent: "space-between"
                    }}>
                      <ShimmerPlaceHolder style={{
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        height: 150,
                      }}
                        shimmerColors={['#b3afb1', '#5e6977', '#bdc6cf']}

                      ></ShimmerPlaceHolder>
                      <View>
                        <ShimmerPlaceHolder style={{
                          marginTop: 10,
                          height: 20,
                        }}
                          shimmerColors={['#b3afb1', '#5e6977', '#bdc6cf']}

                        ></ShimmerPlaceHolder>
                      </View>
                    </View>
                  )
                }}

              />
              :
              <FlatList
                style={{ marginTop: 10, marginBottom: 10 }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={HotelData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View>
                    <RestaurantCard
                      screenWidth={SCREEN_WIDTH * 0.56}
                      images={item.urlimage}
                      Restaurantname={item.name}
                      averageReviews={item.averageReviews}
                      numberofReviews={item.numberofReviews}
                      location={item.location}
                      onpressFoodCard={() => { navigation.navigate("Detail", { id: index, restaurant: item, lat: item.lat, lpng: item.long }) }}

                    />
                  </View>
                )}
              />
            }
          </View>

        </View>
        <View style={styles.View1}>
          <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: Colors.primary, marginTop: 7 }}>RESTAURANT AROUND YOUR AREA</Text>
          <View style={{ width: SCREEN_WIDTH * 0.96, paddingTop: 10 }}>
            {loading ? <View style={{ ...styles.cardView, width: SCREEN_WIDTH * 0.96 }}>
              <ShimmerPlaceHolder style={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                height: 150,
                width: '100%'
              }}
                shimmerColors={['#b3afb1', '#5e6977', '#bdc6cf']}
              ></ShimmerPlaceHolder>
              <View>
                <ShimmerPlaceHolder style={{
                  marginTop: 10,
                  height: 20,
                  width: '100%'
                }}
                  shimmerColors={['#b3afb1', '#5e6977', '#bdc6cf']}

                ></ShimmerPlaceHolder>
              </View>
            </View>
              :
              HotelData .map(item => (
                <View key={item.id} style={{ paddingBottom: 20 }}>
                   <RestaurantCard
                    ScreenWidth={SCREEN_WIDTH * 0.70}
                    images={item.urlimage}
                    Restaurantname={item.name}
                    farAway={item.faraway}
                    businessAdress={item.businesAddress}
                    averageReviews={item.averageReviews}
                    numberofReviews={item.numberofReviews}
                    location={item.location}
                  />
                 
               
                </View>
              ))
            }
           

          </View>
        </View>
      </ScrollView>
      <View style={styles.floatingButton}>
        <TouchableOpacity onPress={() => { navigation.navigate("Map") }}>
          <Icon name="location-pin" size={32} color={Colors.Button} />
          <Text color={Colors.grey2}>Map</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  Searchbar: {
    backgroundColor: Colors.lgSecondary,
    marginHorizontal: responsiveHeight(1), marginTop: 2,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: responsiveHeight(1),

  },
  location: {
    backgroundColor: "rgba(52,52,52,4.3)", marginTop: responsiveHeight(7),
    padding: responsiveHeight(1),
    margin: responsiveHeight(1)


  },
  city: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.grey4
  },
  View1: {

    backgroundColor: "rgba(52,52,52,4.3)",
    marginTop: responsiveHeight(2),
    padding: responsiveHeight(0.2),
    margin: responsiveHeight(1.0),

  },
  floatingButton: {
    position: 'absolute',
    bottom: responsiveHeight(5),
    right: 15,
    backgroundColor: 'white',
    elevation: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center"
  },
  cardView: {

  },
})