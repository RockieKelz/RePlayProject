import React from "react";
import { Pressable, SafeAreaView,Text, StyleSheet, View } from 'react-native';
import { logOut } from "../utils/spotify";
import { SideBar } from "../components/SideBar";
import { LinearGradient } from 'expo-linear-gradient'
import ScrollViewIndicator from 'react-native-scroll-indicator';

const Home = ({navigation}) => {
  {/* Disable the page's automatic header */}
  
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
          <ScrollViewIndicator
            shouldIndicatorHide={false}
            flexibleIndicator={false}
            scrollIndicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
            >
            {/*Temporary view that will display Home Screen's content*/}            
            <View style={{paddingTop: 200, alignItems:'center', 
                              justifyContent:'center', flex:1}}>
                <Text style={styles.title}>This is The Home Screen Page</Text>
                {/*Temporary logout button to test authorization code*/}
                <Pressable 
                  style={styles.btn} 
                  onPress={logOut}>
                    <Text style={styles.text}>Log Out</Text>
                </Pressable>
            </View>
          </ScrollViewIndicator>
        </LinearGradient>
      </View>
      <View style={styles.footerLine} />
    {/*Footer area to display music player*/}            
    </SafeAreaView>
  )
}

export default Home

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
  title:{
    fontFamily: "Arial",
    fontSize: 75
  },
  /*logout button */
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
  /*line that separates the bottom player from the upper components */
  footerLine:{
    borderBottomColor: "#7001b1",
    borderBottomWidth: 5,
    width: "100%",
  }
});