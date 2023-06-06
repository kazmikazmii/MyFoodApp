import { StyleSheet, View, Text, ScrollView, Modal, TouchableWithoutFeedback, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BackgroundImage } from 'react-native-elements/dist/config'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TouchableOpacity } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Material from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../../global/styles'
import { getCurrentUserId } from '../../../Backend/auth'
import { addToArray, getData } from '../../../Backend/utility'

const BookingDetail = ({ navigation, route }) => {

    const data = route.params;
    console.log('hotelid', data);
  const [myData , setMyData] = useState(false)
  useEffect(()=>{
  UserBooking()
    
  },[])
  const UserBooking=async()=>{
  
    const uid=await getCurrentUserId()
    getData('User',uid).then((item)=>{
      console.log('booking',item)
      let arr= item.Bookings
      console.log('hiuri',arr)
       let filter_arr=arr.filter((e)=>e.hotel_id!==data.hotel_id)
  if( filter_arr.length!==0){
    setMyData(true)
  }else{
    setMyData(false)
  }
  console.log(filter_arr)
    })
  }
    const BookingHotel=async()=>{
    const uid=await getCurrentUserId()
  
      console.log(uid)
      addToArray('User',uid,"Bookings",{
        userId:uid,
        Date:selectedDate,
        Time:selectedTime,
        People:selectednum,
        hotel_id:data.hotel_id,
        booking_date:12-3-4})
      //   saveData('User',uid,{
      
      // }).then(()=>{
        console.warn('successfully booked')
      // })
   }
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState("Select Date");
    const [selectedTime, setSelectedTime] = useState("Select time");
    const [selectednum, setselectednum] = useState(0)
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        const dt = new Date(date);
        const x = dt.toISOString().split("T");
        const x1 = x[0].split("-");
        console.log(x1[2] + '/' + x1[1] + '/' + x1[0])
        setSelectedDate(x1[2] + '/' + x1[1] + '/' + x1[0])
        hideDatePicker();
    };
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        const dt = new Date(date);
        const x = dt.toLocaleTimeString();
        console.log(x);
        setSelectedTime(x)
        hideTimePicker();
    };
    const { restaurant } = route.params;
    console.warn('booking', restaurant);

    return (
        <View style={styles.container}>
            <BackgroundImage
                style={styles.back_image}
                source={{ uri: restaurant.urlimage }} imagestyle={styles.image}


            >

                <View style={styles.View2}>
                    <Icon name='arrow-left' color={Colors.background2} size={20} onPress={() =>
                        navigation.goBack()
                    } />

                </View>

                <View style={styles.textView}>
                    <Text style={{ color: "#ffffff", fontWeight: '900', fontSize: 20 }}>{restaurant.name}</Text>
                </View>
            </BackgroundImage>

            <ScrollView>
                <View>
                    <View style={{ margin: responsiveHeight(4) }}>
                        <TouchableOpacity onPress={() => { showDatePicker() }}>
                            <View style={{ flexDirection: 'row', alignItems: "center", }}>

                                <Icon name='calendar' color={Colors.primary} size={20} />
                                <Text style={{ color: Colors.primary, marginLeft: 10 }}>{selectedDate}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.mainView} />
                    <View style={{ margin: responsiveHeight(4) }}>
                        <TouchableOpacity onPress={() => { showTimePicker() }}>
                            <View style={{ flexDirection: 'row', alignItems: "center", }}>

                                <Icon name='clock' color={Colors.primary} size={20} />

                                <Text style={{ color: Colors.primary, marginLeft: 10 }}>{selectedTime}</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                    />
                    <View>
                        <View style={styles.mainView} />
                        <View style={{ margin: responsiveHeight(4) }}>

                            <TouchableWithoutFeedback>
                                <Text style={{ color: Colors.primary }}>Number of people</Text>

                            </TouchableWithoutFeedback>
                            <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: 20 }}>
                                <FlatList numColumns={2} data={[
                                    2, 3, 4, 5, 6, 7, 8, 9
                                ]}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                style={[styles.numberOFpeople, { borderColor: selectednum == index ? 'orange' : 'black' }]}
                                                onPress={() => { setselectednum(index) }}
                                            >
                                                <Text style={{ color: selectednum == index ? 'orange' : 'black' }}>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />

                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.mainView} />
                <View style={{ flexDirection: 'row', alignItems: "center", margin: 20, marginTop: responsiveHeight(5), marginBottom: responsiveHeight(7) }}>
                    <Material name='message' size={25} color={'white'} />
                    <View style={styles.mesageinput}>
                        <TextInput placeholder='Special Request' style={{ paddingLeft: 10 }} placeholderTextColor={Colors.grey3} color={Colors.grey4} />
                        <View style={{ marginTop: 13, marginLeft: 20, }}>
                            <Text style={{ color: Colors.grey4 }}>Your message for the restaurant</Text>

                        </View>
                    </View>
                </View>
                <View style={styles.mainView} />

            </ScrollView>

            <View style={{ backgroundColor: 'rgba(52,52,52,0.3)', height: responsiveHeight(7.2), marginTop: responsiveHeight(3), marginBottom: responsiveHeight(6) }}>

                <View style={{ alignItems: "center", }}>
                    <Text style={{ color: Colors.primary, fontSize: 12, }}>insant confirmation.No booking fee.free cancellation</Text>

                </View>

                <View style={{ ...styles.createButton, }}>
                    <TouchableOpacity
                        disabled={myData ? true : false}
                        style={styles.titlestyle}
                        onPress={BookingHotel}
                        activeOpacity={0.5} >
                        <Text style={styles.createButtonTitle}>
                            {myData ? 'Already Booked' : 'Book Now'}
                        </Text>
                    </TouchableOpacity>


                </View>
                <View style={{ alignItems: "center", marginTop: -8 }}>
                    <Text style={{ color: Colors.primary, fontSize: 12, }}>By clicking 'Confirm your booking.I agree to app</Text>

                </View>
            </View>
        </View>
    )
}

export default BookingDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        marginTop: responsiveHeight(5)
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
    back_image: {
        height: responsiveHeight(17)
    },
    textView: {

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(52,52,52,0.1)'
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
    mainView: {
        borderBottomEndRadius: 3,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2
    },
    mesageinput: {
        height: 60,
        width: "90%",
        borderWidth: 1,
        borderColor: Colors.grey1,
        marginLeft: 8
    },
    numberOFpeople: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        borderWidth: 0.9,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'grey'
    }
})