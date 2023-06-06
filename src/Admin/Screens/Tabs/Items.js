import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity,StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Colors } from '../../../global/styles';
const Items = () => {
  const navigation = useNavigation();
  const isFocused=useIsFocused();
  const [Items, setItems] = useState([])
  useEffect(() => {
    getItems();
  }, [isFocused])
  const getItems = () => {
    firestore()
      .collection('Items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData = []
        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID:', documentSnapshot.id, documentSnapshot.data());
          tempData.push({ id: documentSnapshot.id, data: documentSnapshot.data() });
        });
        setItems(tempData)
      });
  }
  const DeleteItem = (docid) => {
    firestore()
      .collection('Items')
      .doc(docid)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getItems()
      });
  }
  return (

    <View style={{ flex: 1,margin:2,backgroundColor:Colors.secondary,marginTop:responsiveHeight(6) }}>
      <StatusBar
  barStyle='light-content'
  backgroundColor={Colors.Button}
  />
  <ScrollView>
      <FlatList
        data={Items}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemView}>
              <Image source={{ uri: item.data.urlimage }} style={styles.image} />
              <View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.Restaurantname}>
                    {item.data.name}
                  </Text>
                  <View style={{ marginLeft: responsiveHeight(1.0) }}>
                    <Text style={{ color: Colors.grey4 }}>{item.data.location}</Text>
                    <View style={{ flexDirection: 'row', }}>
                      <Text style={{ color: 'green' }}>${item.data.price}</Text>
                      <Text style={{ marginLeft: 10, textDecorationLine: 'line-through',color:Colors.primary }}>${item.data.discount}</Text>
                    </View>

                  </View>

                </View>

              </View>
              <View style={{  justifyContent: "space-between", position:"absolute",right:0,marginVertical:14}}>
                <TouchableOpacity onPress={() => {navigation.navigate('Edit', {data:item.data, id: item.id }) }}>
                  <Icon name='edit' size={30} color={'white'} style={
                    {marginBottom:15}
                  }/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { DeleteItem(item.id) }}>
                  <Icon name='delete' size={30} color={'red'} />
                </TouchableOpacity>


              </View>
            </View>
          );

        }}
      />

</ScrollView>
    </View>
  )
}

export default Items

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: "transparent",
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    borderWidth:1,borderColor:'grey',
    elevation:1,
    marginVertical:10
    
  },
  image: {
    width: 90, height: 90, borderRadius: 10, margin: 5
  },
  Restaurantname: {
    fontSize: 17, fontWeight: "bold", color: Colors.grey4, marginTop: 20, marginLeft: 10
  },
})
