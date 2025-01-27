import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill, BsRepeat, BsShuffle, BsVolumeUp } from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { Pressable, StyleSheet, View } from 'react-native';
import { useStateProvider } from "../utils/stateprovider";

export function Footer() {    
    let [isPlaying, setIsPlaying] = useState(false); //for toggling play and pause icon
    const [volume, setVolume] = useState(50);  //for volume control slider
    const [progress, setProgress] = useState(0) //for playback progress
    const [duration, setDuration] = useState(0) //for duration of song
    const [deviceID, setDeviceId] = useState(false); //for connecting RePlay Player with Spotify player
    /*TO DO: UPDATE TO USE REDUCER & STATE INSTEAD OF RECENTLY PLAYED TRACK */
    const [currentTrack, setCurrentTrack] = useState(null); 
    const [{ token, recentlyplayed, currentlyPlaying, artists }, dispatch] = useStateProvider();
    
    useEffect(() => {
        /* TO DO: 
            CHANGE SECTION TO GET CURRENT QUEUE DATA */
        const getRecentlyPlayedTracks = async () => {
            if (token && recentlyplayed) {
                console.log(recentlyplayed);
                setCurrentTrack(recentlyplayed.items[0].track);
            }
        };
        getRecentlyPlayedTracks();
        console.log("Playing?:", isPlaying);

    }, [recentlyplayed])
    useEffect(() => {
        if (!deviceID){
        //Create web playback instance
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
            //Create the Spotify Player 
            const player = new window.Spotify.Player({
                name: 'RePlay-er',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
        
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id); 
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });
            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }
                console.log(`Player state changed: paused = ${state.paused}`);
                setIsPlaying(state.paused ? false : true);

            })); 

            player.connect().then(success => {
                if (success) {
                  console.log('The Web Playback SDK successfully connected to Spotify!');
                }
              })
        };}
    }, []);
    /* Toggle Player's Playback */
    const play = async () => {
        const newIsPlaying = !isPlaying; //immediately change isPlaying
        setIsPlaying(newIsPlaying); 
    
        if (newIsPlaying == true) {
        const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, {
            method: 'PUT',
            data: JSON.stringify({ context_uri: `spotify:album:${currentTrack.album.uri}` }), //URI for playing the current track album
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    
        if (response.ok) {
            console.log('Track is playing!');
        } else {
            console.error('Error playing track:', response);
        }
    } else {
        const response = await fetch(`https://api.spotify.com/v1/me/player/pause`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            console.log('Track is paused!');

        } else {
            console.error('Error pausing track:', response);
        }
    }
}

    return (
    <View style = {[Container.background,]}>
        <LinearGradient 
            colors={['rgba(10,80,249,0.55)','rgba(12,220,116,.55)', 'rgba(12,90,249,.85)','rgba(12,220,116,.55)','#0575E6','rgba(12,220,116,.55)', 'rgba(10,80,249,0.55)']}
            start={[0, 1]}
            end={[0, 1]}
            style={[Container.linearGradient,]} >
            <View style={[Container.playerContainer, ]}>
                {/*separate playback controls and progress into 2 levels of container*/}
                <View style={[Container.playbackContainer, ]}>
                {/* Playback controls*/}
                <View style = {[Container.playbackControlsContainer, ]}>
                    <Pressable>
                        <View style = {[Container.playerIcon, ]}>
                            <BsShuffle style = {{ fontSize: 18}}/>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View style = {[Container.playerIcon, ]}>
                            <CgPlayTrackPrev style = {{ fontSize: 26}} />
                        </View>
                    </Pressable>
                    {/* Toggle play/pause based on playback*/}
                    <Pressable 
                        style={[Container.playButton, ]}
                        onPress={() => { play() }} >
                        <View style={[Container.playIcon, ]}>
                            {!isPlaying ? <BsPlayFill /> : <BsPauseFill />}
                        </View>
                    </Pressable> 
                    <Pressable>
                        <View style = {[Container.playerIcon, ]}>
                            <CgPlayTrackNext style = {{ fontSize: 26}} />
                        </View>
                    </Pressable>
                    <Pressable >
                        <View style = {[Container.playerIcon, ]}>
                            <BsRepeat style = {{ fontSize: 19}} />
                        </View>
                    </Pressable>
                    </View>
                {/* Progress bar*/}
                <View style={[Container.progressContainer,  ]} >
                    <View style={[Container.progress, ]} >
                        <View style={[Container.progressBar, {width: `${progress/duration*100}%` }]} >
                        </View>
                    </View>
                </View>
                </View>
                {/* Volume controls*/}
                <View style = {[Container.volContainer,  ]}>
                    <Pressable style={Container.playerIcon}>
                        <BsVolumeUp style={{ marginLeft: 20, fontSize: 26 }} />
                    </Pressable>
                    <View style={[Container.sliderContainer, ]} >
                        <Slider
                            width={75}              
                            minimumValue={0}
                            maximumValue={100}
                            value={volume}
                            onValueChange={(value) => setVolume(value)}
                            minimumTrackTintColor="rgba(12,249,90,.95)"
                            maximumTrackTintColor="#7001b1"
                            thumbTintColor="rgba(0, 37, 216, .95)"
                            thumbTouchSize={{ width: 10, height: 10 }}
                            />
                    </View>
                </View>
            </View> 
        </LinearGradient>
    </View>  
    );
}
const Container = StyleSheet.create({
    background: {
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(10,80,249,0.85)'
    } ,
    linearGradient:{
        flex: 1,
        width: '99%',
        opacity: 0.75,
        justifyContent: 'center'
      },
    playerContainer: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        backgroundColor: 'rgba(0,240,215,.15)',
    },
    playbackContainer: {
        flexDirection: 'column',
        width: '70%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playbackControlsContainer: {
        alignItems: 'center',
        flexDirection:'row',
        width: '70%',
        justifyContent: 'center',
        paddingLeft: '15%'
    },
    /* Player controls*/
    playButton: { 
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "#7001b1",
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        fontSize: 26,
        color: 'rgba(12,249,90,.95)',
        alignSelf: 'center',
        paddingLeft: 2,
    },
    playerIcon: {
        color: "#7001b1",
        alignSelf: 'center',
        marginHorizontal: 15
    },
    /*playback progress*/
    progressContainer: {
        width: "25%",
        height: 5,
        marginLeft: '15%',
        paddingTop: 20,
    },
    progress: {
        width: "100%",
        height: 5,
        backgroundColor: "rgba(200, 255, 255, 0.4)",
        borderRadius: 5
    },
    progressBar:{
        width: "0%",
        height: 5,
        backgroundColor: "#7001b1",
        position: "absolute",
        left: 0,
        borderRadius: 5
    },
    /* volume controls*/
    volContainer:{
        width: "15%",
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    sliderContainer:{
        width: "75%", 
        height: 40,
    }
 })
