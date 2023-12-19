import React from "react";
import { Pressable, SafeAreaView,Text, StyleSheet, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { logOut } from "../utils/spotify";

const Home = () => {
  {/* Disable the page's automatic header */}
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{paddingTop: 200, alignItems:'center', 
                          justifyContent:'center', flex:1}}>
            <Text style={styles.title}> Home Screen Page</Text>
            {/*Temporary logout button to test authorization code*/}
            <Pressable 
              style={styles.btn} 
              onPress={logOut}>
                <Text style={styles.text}>Log Out</Text>
            </Pressable>
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
  },
  title:{
    fontFamily: "Arial",
    fontSize: 38
  },
  btn: {
    width: 140,
    height: 40,
    borderRadius: 10,
    borderWidth: 3, 
    borderColor: 'green', 
    backgroundColor: 'blue',
    marginTop: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});