import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { Icon, Button, SocialIcon, Header } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import { Colors,Parameters } from '../../global/styles';
import { _storeData } from '../../Backend/AsyncFuncs';
import { getCurrentUserId } from '../../Backend/auth';

const LoginAdmin = ({ navigation }) => {

    const [textInput2Focused, settextInput2Focused] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const textInput1 = useRef(1)
    const textInput2 = useRef(2)
    const AdminLogin = async () => {
        let uid = await getCurrentUserId();
        await auth()
          .signInWithEmailAndPassword(email, password)
          .then( async() => {
            console.log('signed in!');
      
            await _storeData('userId', uid);
            navigation.navigate('AdminMain');
          })
          .catch(error => {
           if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
      
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
      
            console.error(error);
          });
      };
    return (
    
    <View style={styles.container}>

        <Header title="MY ACCOUNT" type="arrow-back" navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps='always'>
            <View>
                <Text style={styles.title}>Welcome!</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.text1}>Please enter the email and password</Text>
                <Text style={styles.text1}>Register with your account</Text>
            </View>


            <View>
          
            
         <View style={{ marginTop: 20 }}>
                    <View>
                        <TextInput style={styles.textInput1}
                            placeholder="Email"
                            color={Colors.grey2}

                            placeholderTextColor={'#aaaa'}
                            ref={textInput1}
                            onChangeText={text => setemail(text)}
                        />
                    </View>
                </View>
                <View style={styles.textInput2}>
                    <Animatable.View animation={textInput2Focused ? "" : "fadeInLeft"} duration={400}>
                        <Icon
                            type='MaterialIcons'
                            name='lock'
                            iconStyle={{ color: Colors.grey3 }}

                        />
                    </Animatable.View>
                    <TextInput placeholder="Password" color={Colors.grey2}

                        placeholderTextColor={'#aaaa'}

                        style={{ width: "80%" }} ref={textInput2}
                        onFocus={() => {
                            settextInput2Focused(false)
                        }}
                        onBlur={() => {
                            settextInput2Focused(true)
                        }}
                    
                        onChangeText={text => setPassword(text)}

                    />

                    <Animatable.View animation={textInput2Focused ? "" : "fadeInLeft"} duration={400}>
                        <Icon
                            type='MaterialIcons'
                            name={passwordVisible ? 'visibility-off' : 'visibility'}
                            onPress={() => setPasswordVisible(!passwordVisible)} iconStyle={{ color: Colors.grey3 }}
                        />
                    </Animatable.View>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                    <Button
                        title="Sign In"
                        buttonStyle={Parameters.Buttonstyle}
                        titleStyle={Parameters.titlestyle}
                        onPress={AdminLogin}

                    

                    />
                </View>
    
            </View>

            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ ...styles.text1, textDecorationLine: "underline" }}>Forgot Password!</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 30, marginBottom: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black' }}>OR</Text>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <SocialIcon
                    title='Sign In with facebook'
                    button
                    type='facebook'
                    style={styles.SocialIcon}

                    onPress={() => { }}
                />
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <SocialIcon
                    title='Sign In with Google'
                    button
                    type='google'
                    style={styles.SocialIcon}
                    onPress={() => { }}
                />
            </View>
            <View style={{ marginTop: 25, marginLeft: 20 }}>
                <Text style={{ ...styles.text1, color: "black" }}>New in this app??</Text>
            </View>
            <View style={{ alignItems: 'flex-end', marginRight: 20 }}>
                <Button
                    title="Create an Account"
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createButtonTitle}
                    onPress={() => { navigation.navigate('SignUpAdmin') }}
                />
            </View>
        </ScrollView>
    </View>
    )
}

export default LoginAdmin

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    title: {
        margin: 20, fontSize: 24, fontWeight: 'bold'


    },
    text1: {
        color: Colors.grey3,
        fontSize: 16,
    },
    textInput1: {
        borderWidth: 1,
        borderColor: '#86939e',
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        paddingLeft: 15,
    },
    textInput2: {
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        borderColor: '#86939e',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    SocialIcon: {
        borderRadius: 12,
        height: 50
    },
    createButton: {
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#3CB371",
        height: 40,
        paddingHorizontal: 20
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

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'

// const LoginAd = ({navigation}) => {
//   return (
//     <View>
//         <TouchableOpacity onPress={()=>
//             {navigation.navigate('AdminMain')}}>
//         <Text>LoginAd</Text>

//         </TouchableOpacity>
//     </View>
//   )
// }

// export default LoginAd

// const styles = StyleSheet.create({})