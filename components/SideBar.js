import React, {useState} from "react";
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { LinearGradient } from 'expo-linear-gradient'
import { IoLibrary } from "react-icons/io5";

export function SideBar({navigation}) {
    
    return (
        <LinearGradient 
            colors={["#EEEEEE", 'rgba(15,251,35,1)','#00F260', '#0575E6']}
            start={[0.5, .1]}
            end={[1, .75]}
            style={Container.linearGradient}
        >
            <View style ={Container.menuList}>
                <Pressable style = {Container.rowItems}
                onPress={() => navigation.navigate('Home')}>
                    {/* Home navigation */}
                    <MdHomeFilled />
                    <Text style={Container.text}>
                        Home
                    </Text>
                </Pressable>
                <Pressable style = {Container.rowItems}
                    onPress={() => navigation.navigate('Search')}>
                    {/* Search navigation*/}
                    <MdSearch />
                    <Text style={Container.text}>
                        Search
                    </Text>
                </Pressable>
                <Pressable style = {Container.rowItems}
                onPress={() => navigation.navigate('Library')}>
                    {/* Library navigation*/}
                    <IoLibrary />
                    <Text style={Container.text}>
                        Library
                    </Text>
                </Pressable>
                <Text style={Container.playlistText}>
                    Playlists
                </Text>
                <View style={Container.line}/>
            </View>
        </LinearGradient>
        )
}

const Container = StyleSheet.create ({
    /*container to determine background colors*/
    linearGradient:{
        flex: 1,
        flexDirection: "column",
        maxHeight: '100%',
        maxWidth: 300,
        minWidth: 200,
        color: 'blue',
        opacity: 0.85,
      },
    /*base container for the side bar's items*/
    menuList:{
        marginLeft: '2%',
        flexDirection: "column",
        gap: 5,
        padding: 15,
    },
    /*container for menu's row icons and corresponding text*/
    rowItems:{
        color: '#7001b1',
        gap: 10,
        padding: 5,
        alignItems:'center',
        flexDirection: 'row',
    },
    text:{
        fontWeight: "bold",
        color: '#7001b1',
        letterSpacing: 1,
    },
    playlistText:{
        fontWeight: "bold",
        color: '#7001b1',
        letterSpacing: 2,
        paddingTop:50,
        paddingLeft:5,
    },
    /*Line that will separate playlist title from user's visible playlists*/
    line:{
        borderBottomColor: "#7001b1",
        borderBottomWidth: 2,
        borderRadius: 6,
        marginLeft: 5,
        marginRight: 10,
    }
});
const styles = StyleSheet.create({
    recentlyPlayedContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    recentlyPlayedTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    recentlyPlayedTrack: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
});