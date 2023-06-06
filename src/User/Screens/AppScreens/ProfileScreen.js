import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { _removeItem } from '../../../Backend/AsyncFuncs'
import { getCurrentUserId, logout } from '../../../Backend/auth'
import { getData } from '../../../Backend/utility'
import { Colors } from '../../../global/styles'
import { useDispatch } from 'react-redux'
import { Logout } from '../../../redux/action'
const ProfileScreen = ({ navigation }) => {
// const dispatch=useDispatch();

  const [users, setusers] = useState('')
  const [Isdata, setIsdata] = useState('')
  useEffect(() => {
    gettingData()
  }, [])
  const gettingData = async () => {
    let uid = await getCurrentUserId()
    getData('User', uid).then((data) => {
      console.log("dataa", data)
      setusers(data)
      setIsdata(data)
    })
  }
  // const Submit=()=>{
  //   dispatch(Logout())

  // }
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 10, marginTop: responsiveHeight(7), marginBottom: -8 }}>
        <Icon name='arrow-back' color={Colors.primary} style={styles.back} size={32} />

      </View>
      <ScrollView>
        <View style={{ padding: responsiveHeight(2.5) }}>
          <View>
            <Text style={styles.top_heading}>{users.Name}</Text>
            <Text style={styles.text}>Book faster and manage your reservation more easily with an account.</Text>
          </View>
          {Isdata ?
            null :
            <View style={styles.createButton}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.createButtonTitle}>LOG IN OR SIGN UP</Text>
              </TouchableOpacity>
            </View>

          }
        </View>
        <View style={styles.mainView} />
        <View style={{ padding: responsiveHeight(2.5), paddingVertical: responsiveHeight(3) }}>
          <View style={{ flexDirection: "row", marginBottom: 35 }}>
            <Icon name='person' size={20} color={Colors.primary}
            />
            <Text style={styles.Text_s}>My Personal info</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 35 }}>
            <Icon name='menu-book' size={20} color={Colors.primary}
            />
            <Text style={styles.Text_s}>My Booking</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 35 }}>
            <Icon name='favorite' size={20} color={Colors.primary}
            />
            <Text style={styles.Text_s}>My Favourites</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 35 }}>
            <Icon name='comment' size={20} color={Colors.primary}
            />
            <Text style={styles.Text_s}>My Reviews</Text>
          </View>
          <View style={{ flexDirection: "row", }}>
            <Icon name='card-giftcard' size={20} color={Colors.primary}
            />
            <Text style={styles.Text_s}>My Gift Card</Text>
          </View>
        </View>
        <View style={styles.mainView} />
        <View style={{ padding: responsiveHeight(2.5) }}>
          <View style={{ flexDirection: "row", marginBottom: 35 }}>
            <Icon name='settings' size={20} color={Colors.primary}
            />
            <Text style={styles.Text_s}>Settings</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 35 }}>
            <Icon name='contacts' size={20} color={Colors.primary}
            />
            <Text style={styles.Text_s}>Contact us</Text>
          </View>
          <TouchableOpacity style={{ flexDirection: "row", }} 
          onPress={() => {
            logout().then(async () => {
              console.log("logout:::");
              await _removeItem('userId');

              navigation.navigate('WelcomeScreen', { screen: "SignUp" });
            })
          }}
          // onPress={Submit}
          >
            <Icon name='logout' size={20} color={Colors.primary}
            />
            <Text style={styles.Text_s}>Log out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainView} />

      </ScrollView>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    // padding: responsiveHeight(2)
  },
  back: {
    // marginLeft:5

  }, top_heading: {
    fontSize: 24, fontWeight: "bold", color: Colors.grey5, marginLeft: 2
  }, text: {
    marginTop: 5, color: Colors.grey4, marginBottom: 10
  },
  createButton: {
    backgroundColor: Colors.Button,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#3CB371",
    height: 40,
    marginBottom: responsiveHeight(2),
    marginTop: 10,
    marginBottom: 10
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
    borderBottomWidth: 1,

  },
  Text_s: {
    color: Colors.primary,
    marginLeft: 10,
  }
})