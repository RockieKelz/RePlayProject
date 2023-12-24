import React, { useEffect } from "react";
import { Pressable, SafeAreaView,Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { SideBar } from "../components/SideBar";

const Search= ({navigation}) =>  {
  {  }
  return (
  <SafeAreaView style={styles.container}>
    <View style= {styles.subContainer}>
      <SideBar navigation={navigation} />
      <LinearGradient
          colors={['rgba(0, 17, 236, 1)',"rgba(12,90,249,1)", 'rgba(48,138,239,1)','rgba(0,255,96,1)']} 
          start={[0.5, .02]}
          end={[.75, .75]}
          locations={[0.02, 0.27, 0.84,0.96,0.99]}
          style={styles.linearGradient}>
        <ScrollView>
          <View style={{paddingTop: 200, alignItems:'center', 
                            justifyContent:'center', flex:1}}>
            <View>
              <Text> Search Screen Page</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
    <View style={styles.footerLine} />
    {/*Footer area to display music player*/}            
  </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue',
  },
  /*view that will hold side menu and main content*/
  subContainer:{
    display: 'flex',
    flexDirection: 'row',
    height: '85%'
  },
  /*holder for the colored background*/
  linearGradient:{
    flex: 1,
    opacity: 0.85,
    maxHeight: '100%',
  },
  /*line that separates the bottom player from the upper components */
  footerLine:{
    borderBottomColor: "#7001b1",
    borderBottomWidth: 5,
    width: "100%",
  },
})