import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { SideBar } from "../components/SideBar";
import { FontAwesome } from 'react-native-vector-icons';

const Search= ({navigation}) =>  {
  const [searchQuery, setSearchQuery] = useState("");

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
          {/* TEMPORARY TITLE TEXT*/}          
          <Text style={styles.title}> Search Default Page</Text>
          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <View style={styles.searchContainer}> 
              <FontAwesome 
                name="search" 
                size={20} 
                color="purple" 
                style={styles.searchIcon} />
              <TextInput 
                style={styles.searchInput} 
                placeholder="Search..." 
                value={searchQuery} 
                onChangeText={(text) => setSearchQuery(text)} /> 
            </View> 
            <View 
              style={{...styles.btnContainer, marginLeft: 'auto'}}>
                <Pressable 
                  style={styles.btn} 
                  onPress={{}}>
                      <Text style={styles.text}>Albums</Text>
                </Pressable>
                <Pressable 
                  style={styles.btn} 
                  onPress={{}}>
                      <Text style={styles.text}>Artists</Text>
                </Pressable>
                <Pressable 
                  style={styles.btn} 
                  onPress={{}}>
                      <Text style={styles.text}>Songs</Text>
                </Pressable>
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
  title:{
    maxWidth: 280,
    marginLeft: 25,
    marginTop: 65,
    fontFamily: "Segoe UI",
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#7001b1',
    backgroundColor: 'rgba(0,240,215,.25)',
    borderRadius: 13,
  },
  /*view that will hold side menu and main content*/
  subContainer:{
    display: 'flex',
    flexDirection: 'row',
    height: '85%'
  },
  /*holder for the colored background*/
  linearGradient:{
    flex: 2,
    opacity: 0.85,
    maxHeight: '100%',
  },
  /*search bar */
  searchContainer: { 
    width: '30%',
    height: 40, 
    backgroundColor: 'rgba(15,200,15,.9)', 
    borderRadius: 10, 
    paddingHorizontal: 8, 
    marginHorizontal: 25, 
    marginTop: 25, 
    justifyContent: 'center',
    alignItems: 'flex-end' ,
    flexDirection: 'row',
  }, 
  searchIcon: {
    marginHorizontal: 10,
    alignSelf: 'center',
    paddingRight: 2,
  },
  searchInput: { 
    height: 30, 
    width: '85%',
    fontSize: 16, 
    borderRadius: 5, 
    backgroundColor: "#fff", 
    paddingHorizontal: 10, 
    alignSelf: 'center',
  },
  /*category buttons*/
  btnContainer:{
    paddingTop: 20, 
    flexDirection: 'row'
  },
  btn: {
    width: 100,
    height: 40,
    borderRadius: 10,
    borderWidth: 3, 
    borderColor: '#7001b1', 
    backgroundColor: 'rgba(0,255,96,1)',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#7001b1',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  /*line that separates the bottom player from the upper components */
  footerLine:{
    borderBottomColor: "#7001b1",
    borderBottomWidth: 5,
    width: "100%",
  },
})