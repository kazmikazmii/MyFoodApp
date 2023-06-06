import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from './src/global/styles';
import RootNavigation from './src/navigation/RootNavigation';
export default function App() {
  return (

    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.Button}
      />
      <RootNavigation />


    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  }
})
