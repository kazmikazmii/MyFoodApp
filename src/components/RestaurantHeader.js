import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useState } from 'react'

import { BackgroundImage } from 'react-native-elements/dist/config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { restaurant } from '../global/data';
import { Colors } from '../global/styles';
export default function RestaurantHeader({ navigation, id }) {
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
    return (
        <View style={styles.container}>
            <BackgroundImage
                style={styles.container}
                source={{ uri: restaurant[id].images }}
                imagestyle={styles.image}

            >
                <View style={styles.View1}>
                    <View style={styles.View2}>
                        <Icon name='arrow-left' color={"#000000"} size={25} onPress={() =>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 150
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