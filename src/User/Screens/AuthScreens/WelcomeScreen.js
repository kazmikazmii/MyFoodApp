import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Colors } from '../../../global/styles';

const WelcomeScreen = ({ navigation }) => {
    return (

        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Icon
                    name='fast-food-sharp'
                    size={responsiveHeight(10)}
                    iconStyle={{ color: Colors.primary, }} color="white"
                />
            </View>
            <View style={styles.text1}>
                <Text style={{ color: Colors.primary, fontWeight: "bold", fontSize: 18 }}>Welcome to TheFork</Text>
                <View style={{ flexDirection: 'column', marginTop: responsiveHeight(5) }}>
                    <Text style={{ color: Colors.primary, fontSize: 16 }}>
                        The leading restaurant reservation app.
                    </Text>
                    <Text style={{ color: Colors.primary, fontSize: 16 }}>
                        reinventing the way you dine in your city
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate('LoginAdmin')}}>
                <View style={styles.button}>
                    <Text style={styles.buttontext}>
                        Admin Login
                    </Text>

                </View>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('SignIn')}}
            >
                <View style={styles.button}>
                    <Text style={styles.buttontext}>
                        User Login
                    </Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Button,
        justifyContent: "center"

    },
    text1: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    button: {
        flexDirection: "row",
        backgroundColor: Colors.cardbackground,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.background2,
        height: 50,
        width: '90%',

        marginTop: responsiveHeight(5),
        alignSelf: "center"
    },
    buttontext: {
        color: Colors.background2,
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -3,
    }
})