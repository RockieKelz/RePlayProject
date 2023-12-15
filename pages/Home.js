import React, { useEffect, useState } from "react";
import { Animated, SafeAreaView,Text, StyleSheet, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

const Home = ({navigation}) => {
  {/* Disable the page's automatic header */}
  useEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Temporary View Holder for testing screen navigation */}
        <View style={{paddingTop: 200, alignItems:'center', 
                          justifyContent:'center', flex:1}}>
            <Text> Home Screen Page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  subContainer:{
    paddingRight: 15,
    paddingLeft: 15
  }
});