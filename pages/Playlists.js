import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from "react";
import { WiTime2 } from "react-icons/wi";
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Footer } from "../components/Footer";
import { SideBar } from "../components/SideBar";
import { reducerCaseActions } from "../utils/constants";
import { fetchPlaylist } from "../utils/spotify";
import { useStateProvider } from "../utils/stateprovider";
import { convertMS } from "../utils/utils";

const Playlists = ({navigation}) => {
    const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] = useStateProvider();
    const playlistsRef = useRef(true);

    //convert the track's ms duration to minute form
    const transformDuration  = (item) =>{
        return convertMS(item);}

    //get the selected playlist
    const renderPlaylist = async () => {
        console.log('playlistID inside: ', selectedPlaylistId);

        try{
            const response = await fetchPlaylist(selectedPlaylistId, token);
            const selectedPlaylist = {
            id: response.id,
            name: response.name,
            description: response.description.startsWith("<a")
                ? ""
                : response.description,
            image: response.images[0].url,
            tracks: response.tracks.items.map(( track ) => ({
                id: track.track.id, 
                name: track.track.name,
                artists: track.track.artists.map((artist) => artist.name),
                image: track.track.album.images[2].url,
                duration: track.track.duration_ms,
                album: track.track.album.name,
                context_uri: track.track.album.uri,
                track_number: track.track.track_number,
                })),
            };      
            console.log("playlist rendered: " , selectedPlaylist);
            dispatch({ type: reducerCaseActions.SET_SELECTED_PLAYLISTS, selectedPlaylist });
        } catch (error) {
            console.log(error);
        };
    }
    useEffect(() => {
        if (playlistsRef.current) {
            if (selectedPlaylistId) {
                renderPlaylist();
                console.log('playlistID: ', selectedPlaylistId);
                playlistsRef.current = false;
            };
        };
    }, [ ]);

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
                    <ScrollViewIndicator
                        shouldIndicatorHide={false}
                        flexibleIndicator={false}
                        scrollIndicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                        >
                    {/*display playlist information*/}
                    { selectedPlaylist && (<>
                    <View style={{flexDirection:'row', margin: 30}}>
                        {/*display playlist name, image, and description*/}
                        <Image source={{ uri: selectedPlaylist.image }} style={styles.image}/>
                        <View style={{flexDirection:'column', alignItems:'stretch', backgroundColor: 'rgba(0,240,215,.25)', borderRadius: 13, paddingEnd: 10}}>
                            <Text style={styles.title}>{selectedPlaylist.name}</Text>
                            <Text style={[styles.title, { fontFamily: "Segoe UI", fontSize: 15, marginTop: 10, fontWeight: '300',flexWrap: 'wrap'}]}>{selectedPlaylist.description}</Text>
                        </View>
                    </View>
                    {/*playlist details: HEADINGS*/}
                    <View style={{ flexDirection: 'row', marginRight: 25, marginLeft: 10, justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#fff' }}>
                        <View style={{ flexDirection: 'row'}}>
                        <Text style= {[styles.text, { fontWeight: '600'}]}>#</Text>
                        <Text style= {[styles.text, { marginRight: 0, marginLeft: 10, fontWeight: '600'}]}>TITLE</Text>
                        </View>
                        <Text style= {[styles.text, { marginRight: 30,fontWeight: '600'}]}>ALBUM</Text>
                        <WiTime2 style= {{ marginRight: 0, color: "#fff", fontWeight: '600'}} />
                    </View>
                    {/*playlist details: SONG DETAILS*/}
                    {selectedPlaylist.tracks.map((track, index) => (
                    <View key={index} style={{ flexDirection: 'row', flex:1 , justifyContent: 'space-between', padding: 10, marginLeft: 10}}>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <Text style= {[styles.text, { width: 20, textAlign: 'left', marginTop: 10 }]}>{index}</Text>
                            <View style={{ flex: 2, flexDirection: 'row'}}>
                                <Image source={{uri : track.image}} style={styles.thumbnail}/>
                                <View style={{flexDirection: 'column', flex: 1}}>
                                    <Text style= {[styles.text, { flex: 1 }]}>{track.name}</Text>
                                    <Text style= {[styles.text, { flex: 1}]}>{track.artists.join(', ')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1}}>
                            <Text style= {styles.text}>{track.album}</Text>
                        </View>
                        <Text style= {styles.text}>{transformDuration(track.duration)}</Text>
                    </View>
                    ))}
                    </>)}
                    </ScrollViewIndicator>
            </LinearGradient>
        </View>
        <Footer /> 
    </SafeAreaView>
  );
}

export default Playlists

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
        flex: 2,
        opacity: 0.85,
        maxHeight: '100%',
      },
    title:{
      marginLeft: 25,
      marginTop: 65,
      fontFamily: "Segoe UI",
      fontSize: 25,
      fontWeight: '700',
      letterSpacing: 1,
      color: '#7001b1',
    },
    text:{
        marginRight: 20, 
        color: "#fff",
        textAlign: 'left',
        flexWrap: 'wrap'
      },
    image:{
        height: 200,
        width: 200,
    },
    thumbnail:{
        height: 45,
        width: 45,
        marginRight: 5, 
    }
});