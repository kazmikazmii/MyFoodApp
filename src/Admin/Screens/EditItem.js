import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import { Icon, Image } from 'react-native-elements';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { Colors } from '../../global/styles';

const  EditItem = ({navigation}) => {
  const route=useRoute();
  const [name, setname] = useState(route.params.data.name);
  const [location, setlocation] = useState(route.params.data.location);
  const [price, setprice] = useState(route.params.data.price);
  const [Menu, setMenu] = useState('');
  const [imageData, setImageData] = useState({assets:[{uri:route.params.data.urlimage}]});
  const [discount,setdiscount]=useState(route.params.data.discount);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera" +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        openGallary();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallary = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (result.didCancel) {

    }
    else {
      console.log(result);
      setImageData(result)
    }
  }
  
  const updateItems = () => {
    firestore()
    .collection('Items')
    .doc(route.params.id)
    .update({
        name: name,
        location:location,
        price:price,
        discount:discount,
        Menu:Menu,
        urlimage: route.params.data.urlimage +'',
    })
    .then(() => {
      console.log('User updated!');
      navigation.goBack();
    });
  }
  return (
    <View style={{ flex: 1 ,backgroundColor:Colors.secondary}}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.view1}>
          <Text style={styles.text1}>Edit Your restaurant</Text>
          <Text style={{ color: Colors.grey4, marginTop: 5 }}>Share more details on your restaurant. This information will help our experts to assess your needs and your challenges.</Text>
        </View>
        <View style={styles.View2}>
          <View style={styles.view6}>
            <TextInput
              placeholder="First,What is the name of your restaurant?"
              placeholderTextColor={'#aaaa'}
              style={styles.input1}
              autoFocus={true}
              color={Colors.grey2}
              onChangeText={text => setname(text)}
            />
          </View>
          <View style={styles.view10}>
            <View>
              <Icon
                name="location-on"
                style={styles.email}
                color={Colors.grey3}
                type="material"
              />
            </View>
            <View style={styles.view11}>
              <TextInput
                placeholder="Street, Zip Code, City"
                placeholderTextColor={'#aaaa'}
                color={Colors.grey2}
                style={styles.input4}
                autoFocus={false}
                onChangeText={text => setlocation(text)}
              />
            </View>
          </View>
          <View style={styles.view10}>
            <View>
              <Icon
                name="rice-bowl"
                style={styles.email}
                color={Colors.grey3}
                type="MaterialCommunity"
              />
            </View>
            <Icon
              name="add"
              style={styles.email}
              color={Colors.grey4}
              type="material"
            />
            <Icon
              name="cake"
              style={styles.email}
              color={Colors.grey3}
              type="material"
            />
            <View style={styles.view11}>
              <TextInput
                placeholder="$"
                placeholderTextColor={'#aaaa'}
                color={Colors.grey2}
                style={styles.input4}
                autoFocus={false}
                onChangeText={text => setprice(text)}
              />
            </View>
          </View>
          <View style={{  marginLeft: responsiveHeight(1) }}>
            <Text style={{ color: Colors.grey4, }}>Average à la carte price is based on a three course meal: starter/main course/dessert. Drinks excluded.</Text>
          </View>
          <View style={styles.view10}>
            <View style={styles.view11}>
              <TextInput
                placeholder="Discount Price"
                placeholderTextColor={'#aaaa'}
                color={Colors.grey2}
                style={styles.input4}
                autoFocus={false}
                onChangeText={text => setdiscount(text)}
              />
            </View>
          </View>
          <View style={styles.view10}>
            <View>
              <Icons
                name="image-text"
                style={styles.email}
                color={Colors.grey3}
              />
            </View>
            <View style={styles.view11}>
              <TextInput
                placeholder="Menu"
                placeholderTextColor={'#aaaa'}
                color={Colors.grey2}

                style={styles.input4}
                autoFocus={false}
                onChangeText={text => setMenu(text)}
              />
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", marginBottom: -10 }}>
            <Text style={{color:'white',marginTop:10}}>OR</Text>
          </View>
          <View style={styles.view10}>
            <View>
              <Icons
                name="file-image"
                style={styles.email}
                color={Colors.grey3}
              />
            </View>
            <View style={styles.view11}>
              <TouchableOpacity style={{ ...styles.input4, marginTop: responsiveHeight(1.4) }} onPress={() => {
                requestCameraPermission();
              }}>
                <Text style={{ color: Colors.grey3 }}>Upload Image</Text>
              </TouchableOpacity>
          
            </View>
          </View>
        </View>
        <View>
                {imageData !== null ? (
                  <Image source={{ uri: imageData.assets[0].uri }} style={{ width: '85%', height: 100, alignSelf: 'center',margin:29,marginBottom:1 }} />
                ) : null
                }
              </View>
        <View style={styles.view17}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <Icon name='arrow-back-ios' type='material' size={15}  color={'white'}/>
            <TouchableOpacity onPress={()=>{navigation.navigate('Item')}}>
              <Text style={{ textDecorationLine: 'underline' ,color:'white'}}>
                Back
              </Text></TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-end', marginRight: 20 }}>
            <TouchableOpacity style={styles.createButton} onPress={() => {
               updateItems()
                }}>

              <Text style={styles.createButtonTitle}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default EditItem

const styles = StyleSheet.create({
  view1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: responsiveHeight(7),
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 22,
    color: Colors.Button,
    fontWeight: 'bold',
  },
  View2: {
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
  view3: {
    marginTop: 5,
    marginBottom: 10,
  },
  text2: {
    fontSize: 15,
    color: Colors.grey2,
  },
  view4: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
  },
  view5: {
    marginLeft: 30,
    maxWidth: '65%',
  },
  input1: {
    fontSize: 16,
  },
  view6: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  view10: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  email: {
    fontSize: 24,
    padding: 0,
    marginBottom: 0,
    marginTop: 11,
    marginLeft: 2,
  },
  view11: {
    marginLeft: 30,
    maxWidth: '65%',
  },
  input4: {
    fontSize: 16,
    marginLeft: -20,
    marginBottom: -10,
  },
  view17:
  {
    marginVertical: 10,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center", margin: 10
  },
  createButton: {
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3CB371",
    height: 40,
    paddingHorizontal: 20,

  },
  createButtonTitle: {
    color: "#3CB371",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: "center",
    marginTop: -3
  }
})