import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { Footer } from "../components/Footer";
import { MusicCard } from "../components/MusicCard";
import { SideBar } from "../components/SideBar";
import { reducerCaseActions } from "../utils/constants";
import { fetchFollowedArtists, fetchSavedAlbums, fetchSavedTracks } from "../utils/spotify";
import { useStateProvider } from "../utils/stateprovider";

const Library= ({navigation}) => {
    const { width } = useWindowDimensions();
    //set the default search category type and ability to change it.
    const [selectedCategory, setSelectedCategory] = useState('Albums');
    const setCategory = (category) => {
      setSelectedCategory(category);
    };
    const [{ library, token}, dispatch] = useStateProvider();
    // Add a state to track the loading status
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      /*Get users saved songs, saved albums, and followed artists to create the user's library selection*/
      const getUsersLibrary= async () => {
      try {
        var userTracksLibraryData = await fetchSavedTracks(token);
        var userAlbumsLibraryData = await fetchSavedAlbums(token);
        var userArtistsLibraryData = await fetchFollowedArtists(token);
        dispatch({ 
          type: reducerCaseActions.SET_LIBRARY, 
          albums:userAlbumsLibraryData.items,
          artists: userArtistsLibraryData.artists,
          tracks: userTracksLibraryData,
        });
        // Set isLoading to false after data is fetched
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        // Set isLoading to false even if there's an error
        setIsLoading(false);
      }
    }
    
    getUsersLibrary()
    } ,[]);

  return (
    <SafeAreaView style={styles.container}>
      <View style= {styles.subContainer}>
      <SideBar navigation={navigation} />
      <LinearGradient
          colors={['rgba(0, 17, 236, 1)',"rgba(12,90,249,1)",'rgba(48,138,239,1)', 'rgba(24,198,143,1)','rgba(0,255,96,1)']} 
          start={[0.5, .02]}
          end={[.75, .75]}
          locations={[0.02, 0.27, 0.84,0.96,0.99]}
          style={styles.linearGradient}>
        <ScrollView>
          {/* TITLE */}
          <Text style={styles.title}>Your Library</Text>
          <View style={{paddingTop: 10}}>

          {/*buttons to change the selected search catergory type */}
          <View 
              style={[styles.btnContainer, {justifyContent: width <= 600 ? 'flex-start' : 'space-around'}
              ]}>
                <Pressable 
                  style={[selectedCategory === 'Albums' ? styles.selectedBtn : styles.defaultBtn]} 
                  onPress={() => setCategory('Albums')}>
                      <Text style={selectedCategory === 'Albums' ? styles.selectedText : styles.defaultText}>Albums</Text>
                </Pressable>
                <Pressable 
                  style={selectedCategory === 'Artists' ? styles.selectedBtn : styles.defaultBtn} 
                  onPress={() => setCategory('Artists')}>
                      <Text style={selectedCategory === 'Artists' ? styles.selectedText : styles.defaultText}>Artists</Text>
                </Pressable>
                <Pressable 
                  style={selectedCategory === 'Songs' ? styles.selectedBtn : styles.defaultBtn} 
                  onPress={() => setCategory('Songs')}>
                      <Text style={selectedCategory === 'Songs' ? styles.selectedText : styles.defaultText}>Songs</Text>
                </Pressable>
            </View>
        </View>

      {/*** Area to display user's library as cards***/}

          {/* SHOW ALBUMS*/}                  
          <View style={styles.cardContainer}>
          {isLoading ? (
            // Show the loading indicator while data is being fetched
            <ActivityIndicator size="large" color="#7001b1" />
        ) : (
            // Show the library data once it's fetched
            <>
          {selectedCategory == 'Albums' && library.albums?.map((item, index) =>  (
            <View key={index} style={{flexDirection: 'row'}}>
              {/*Album results to display only album images and names & artist*/}
              <MusicCard 
                album={{ name: item.album.name, image: item.album.images[0] }}
                artist={item.album.artists}
            />
            </View>
          ))}
          
          {/* SHOW ARTISTS*/}
          {selectedCategory == 'Artists' && library.artists.items?.map((item, index) =>  (
            <View key={index} style={{flexDirection: 'row'}}>
              {/*Artist results that only show artist name & image*/}
                <MusicCard 
                  album={{ image: item.images[0] }}
                  artist={item}
                  />
            </View>
          ))}

          {/* SHOW TRACKS*/}
          {selectedCategory == 'Songs' && library.tracks.items?.map((item, index) =>  (
            <View key={index} style={{flexDirection: 'row'}}>
              {/*Track results show artist, album, and name data*/}
              <MusicCard 
                trackName={item.track.name}
                album={{ name: item.track.album.name, image: item.track.album.images[0] }}
                artist={item.track.artists}
                />
            </View>
          ))}</>)}
        </View>

      </ScrollView>
      </LinearGradient>
      </View>
      <View style={styles.footerLine} />
    {/*Footer area to display music player*/}      
    <Footer /> 
    </SafeAreaView>
  )
}
  export default Library

  const styles ={
    container:{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'blue',
    },
    title:{
      maxWidth: 190,
      marginLeft: 25,
      marginTop: 65,
      fontFamily: "Segoe UI",
      fontSize: 25,
      fontWeight: '700',
      letterSpacing: 1,
      color: '#7001b1',
      backgroundColor: 'rgba(0,240,215,.25)',
      borderRadius: 13,
      paddingLeft: 15,
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
  /*card like views*/
  cardContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(50, 242, 134, 0.27)',
    borderCurve: 'circular',
    borderRadius: 4,
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'space-evenly', 
    margin: 20, 
    paddingBottom: 10,
    paddingTop:10,
    maxWidth: 1150,    
    minWidth: 250,
  },
    /*line that separates the bottom player from the upper components */
    footerLine:{
      borderBottomColor: "#7001b1",
      borderBottomWidth: 5,
      width: "100%",
    },
  }