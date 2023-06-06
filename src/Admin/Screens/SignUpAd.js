import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import { Colors, Parameters } from '../../global/styles';
import { saveData } from '../../Backend/utility';
import Header from '../../components/Header';
import { getCurrentUserId } from '../../Backend/auth';
const SignUpAdmin = ({ navigation, props }) => {
  const [passwordFocused, setpasswordFocused] = useState(false);
  const [passwordBlured, setPasswordBlured] = useState(false);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [errorEmail, seterrorEmail] = useState('');
  const [errorPassword, seterrorPassword] = useState('');
  const [errorName, seterrorName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const signupAdmin= async () => {
    if (validation()) {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async user => {
          console.log('User account created & signed in!');
          let uid = await getCurrentUserId();
          console.log(uid);
          navigation.navigate('AdminMain')
          let obj = {
            Name: name,
            Email: email,
            Mobile: mobile,
            userId: uid,
          };
          await saveData('User', uid, obj).then(() => {
            console.log('Success');
            props.navigation.navigate('AdminMain');
          });
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
    }
  };
  const validation = () => {
    const re =
      /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    let valid = true;
    if (name === '') {
      seterrorName('Please enter name')
      valid = false;

    }
    if (name.length < 5) {
      seterrorName('Name should be 5 character long')
      valid = false;

    }
    if (email === '') {
      seterrorEmail('Please Enter Email');
      valid = false;
    }
    if (!re.test(email)) {
      seterrorEmail('Email format is invalid');
      valid = false;
    }
    if (password === '') {
      seterrorPassword('Enter your Password');
      valid = false;
    }
    if (password.length < 8) {
      seterrorPassword('Min 8 characters');
      valid = false;

    }
    else {
      return valid;
    }

  };
  return (
    <View style={styles.container}>
      <Header title="MY ACCOUNT" type="arrow-back" navigation={navigation} />

      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.view1}>
          <Text style={styles.text1}>Attract new customer to your restaurant</Text>
          <Text style={{ color: Colors.grey3, marginTop: 5 }}>Want to increase your restaurant revenue and optimize your Activity? Start Capturing more booking from diners around the corner and across the globe</Text>
        </View>


        <View style={styles.View2}>
          <View>
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="Mobile_number"
              placeholderTextColor={'#aaaa'}
              style={styles.input1}
              keyboardType="number-pad"
              autoFocus={true}
              color={Colors.grey2}
              onChangeText={text => setmobile(text)}

            />
          </View>
          <View style={styles.view6}>
            <TextInput
              placeholder="First_Name"
              placeholderTextColor={'#aaaa'}
              color={Colors.grey2}

              style={styles.input1}
              autoFocus={false}
              onChangeText={text => setname(text)}

            />
          </View>
          {errorName ? (
            <Text
              style={{
                color: 'red',
                marginLeft: responsiveWidth(9),
                marginTop: responsiveHeight(1),
              }}>
              {errorName}
            </Text>
          ) : null}
          <View style={styles.view6}>
            <TextInput
              placeholder="Last_Name"
              placeholderTextColor={'#aaaa'}
              color={Colors.grey2}

              style={styles.input1}
              autoFocus={false}


            />
          </View>

          <View style={styles.view10}>
            <View>
              <Icon
                name="email"
                style={styles.email}
                color={Colors.grey3}
                type="material"
              />
            </View>
            <View style={styles.view11}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#aaaa'}
                color={Colors.grey2}

                style={styles.input4}
                autoFocus={false}
                onChangeText={text => setemail(text)}

              />
            </View>
            {errorEmail ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: responsiveWidth(9),
                  marginTop: responsiveHeight(1),
                }}>
                {errorEmail}
              </Text>
            ) : null}
          </View>
          <View style={styles.view14}>
            <Animatable.View
              animation={passwordFocused ? 'fadeInRight' : 'fadeInLeft'}
              duration={400}>
              <Icon
                name="lock"
                color={Colors.grey3}
                type="material"
                style={{ marginRight: 10 }}
              />
            </Animatable.View>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'#aaaa'}
              color={Colors.grey2}
              secureTextEntry={passwordVisible}

              style={{ flex: 1 }}
              autoFocus={false}
              onChangeText={text => setPassword(text)}

              onFocus={() => {
                setpasswordFocused(true);
              }}
              onBlur={() => {
                setPasswordBlured(true);
              }}

            />
            <Animatable.View
              animation={passwordBlured ? 'fadeInLeft' : 'fadeInRight'}
              duration={400}>
              <Icon
                name={passwordVisible ? 'visibility-off' : 'visibility'}
                onPress={() => setPasswordVisible(!passwordVisible)}
                color={Colors.grey3}
                type="material"
                style={{}}

              />
            </Animatable.View>
          </View>
          {errorPassword ? (
            <Text
              style={{
                color: 'red',
                marginLeft: responsiveWidth(9),
                marginTop: responsiveHeight(1),
              }}>
              {errorPassword}
            </Text>
          ) : null}
          <View style={styles.view15}>
            <Text style={styles.text3}>
              By creating or Logging into an account you are
            </Text>
            <View style={styles.view16}>
              <Text style={styles.text3}>Agreeing with our</Text>
              <Text style={styles.text4}>Terms and Conditions</Text>
              <Text style={styles.text3}>and</Text>
            </View>
            <Text style={styles.text4}>Privacy Statement</Text>
          </View>
          <View style={styles.view17}>
            <View style={{ marginHorizontal: 20, marginTop: 5 }}>
              <Button
                title="Sign Up"
                buttonStyle={Parameters.Buttonstyle}
                titleStyle={Parameters.titlestyle}
                onPress={signupAdmin}
              />
            </View>
          </View>
        </View>


        <View style={styles.view18}>
          <Text style={styles.text5}>Or</Text>
        </View>
        <View style={styles.view19}>
          <View style={styles.view20}>
            <Text style={styles.text3}>
              Already have an account with FoodApp
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", marginRight: 2, }}>
            <Button
              title="Sign-In"
              titleStyle={styles.title2}
              buttonStyle={styles.button2}
              onPress={() => {
                navigation.navigate('LoginAdmin');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
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
    backgroundColor: 'white',
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
  view7: {
    marginLeft: 0,
    maxWidth: '65%',
  },
  input2: {
    fontSize: 16,
    marginLeft: 0,
    marginBottom: 0,
  },
  view8: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  view9: {
    marginLeft: 0,
    maxWidth: '65%',
  },

  input3: {
    fontSize: 16,
    marginLeft: 0,
    marginBottom: 0,
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
  view13: {
    flexDirection: 'row',
    height: 40,
  },
  view14: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.grey4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: "center",
    paddingLeft: 5,
    marginTop: 20,


  },
  view15: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text3: {
    fontSize: 13,
    color: Colors.grey2
  },
  view16: {
    flexDirection: 'row',
  },

  text4: {
    textDecorationLine: 'underline',
    color: 'green',
    fontSize: 13,
  },
  button1: {
    backgroundColor: Colors.background2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.background2,
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
  },
  title1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view17: { marginVertical: 10, marginTop: 30 },
  view18: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 15,
    alignItems: 'center',
  },
  text5: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  view19: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  view20: {
    marginTop: 5,
  },

  button2: {
    backgroundColor: Colors.cardbackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.background2,
    height: 50,
    // width: '100%',
    paddingHorizontal: responsiveHeight(5), marginTop: 5
  },
  title2: {
    color: Colors.background2,
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
});
