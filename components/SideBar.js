import React, {useEffect, useState} from "react";
import { FlatList, Text, StyleSheet, View, Pressable } from 'react-native';
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { LinearGradient } from 'expo-linear-gradient'
import { IoLibrary } from "react-icons/io5";
import { fetchUsersPlaylists } from "../utils/spotify";
import ScrollViewIndicator from 'react-native-scroll-indicator';


export function SideBar({navigation}) {
    const [usersPlaylists, setUsersPlaylists] = useState([]);
    useEffect(() =>  {
        const getUserPlaylistData = async () => {
            try {
                var usersPlaylistsData = await fetchUsersPlaylists();
                setUsersPlaylists({...{playlists:usersPlaylistsData.items}});
          
            } catch (err) {
                console.log(err);
            }
        };
        getUserPlaylistData();
    }, []);
    useEffect(() => {
        if (usersPlaylists) {
          console.log(usersPlaylists.playlists);
        }
      }, [usersPlaylists]);
    return (
        <LinearGradient 
            colors={["#EEEEEE", 'rgba(15,251,35,1)','#00F260', '#0575E6']}
            start={[0.5, .1]}
            end={[1, .75]}
            style={Container.linearGradient}
        >
            <ScrollViewIndicator
            shouldIndicatorHide={false}
            flexibleIndicator={false}
            scrollIndicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
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
                <Text style={Container.playlistTitleText}>
                    Playlists
                </Text>
                <View style={Container.line}/>
                {usersPlaylists && usersPlaylists.playlists ? (
                    <FlatList
                    data={usersPlaylists.playlists}
                    renderItem={({ item }) => 
                    <Pressable 
                    onPress={{}}>
                    <Text style={Container.playlistsText}>{item.name}</Text>    
                    </Pressable> }      
                    />
                    ) : (<></>)}
            </View>
            </ScrollViewIndicator>
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
    playlistTitleText:{
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
    },
    playlistsText:{
        fontWeight: '400',
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#7001b1',
        letterSpacing: 2,
        paddingTop:25,
        paddingLeft:5,
    }
});
