import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { SideBar } from "../components/SideBar";
import { useWindowDimensions } from 'react-native';

const LibraryScreen= ({navigation}) => {
  const [selected, setSelected] = useState('Albums'); // initialize 'Albums' as defaulted selected button
  const { width } = useWindowDimensions();

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
          <Text style={styles.title}> Library Screen</Text>
          <View style={{paddingTop: 10}}>
          <View 
              style={[styles.btnContainer, {justifyContent: width <= 600 ? 'flex-start' : 'space-around'}
              ]}>
                <Pressable 
                  style={[selected === 'Albums' ? styles.selectedBtn : styles.defaultBtn]} 
                  onPress={() => setSelected('Albums')}>
                      <Text style={selected === 'Albums' ? styles.selectedText : styles.defaultText}>Albums</Text>
                </Pressable>
                <Pressable 
                  style={selected === 'Artists' ? styles.selectedBtn : styles.defaultBtn} 
                  onPress={() => setSelected('Artists')}>
                      <Text style={selected === 'Artists' ? styles.selectedText : styles.defaultText}>Artists</Text>
                </Pressable>
                <Pressable 
                  style={selected === 'Songs' ? styles.selectedBtn : styles.defaultBtn} 
                  onPress={() => setSelected('Songs')}>
                      <Text style={selected === 'Songs' ? styles.selectedText : styles.defaultText}>Songs</Text>
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
  export default LibraryScreen

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'blue',
    },
    title:{
      maxWidth: 270,
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
    /*category buttons*/
  btnContainer:{
    paddingTop: 20, 
    flexDirection: 'row',
  },
  defaultBtn: {
    width: 95,
    height: 40,
    borderRadius: 10,
    borderWidth: 3, 
    borderColor: '#7001b1', 
    backgroundColor: 'rgba(0,255,96,1)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  selectedBtn: {
    width: 95,
    height: 40,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgba(0,255,96,1)',
    backgroundColor: '#7001b1',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,

  },
  defaultText: {
    color: '#7001b1',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  selectedText: {
    color: 'rgba(0,255,96,1)',
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