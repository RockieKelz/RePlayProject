import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, View } from 'react-native';
import { BsPlayFill, BsPauseFill, BsShuffle, BsRepeat, BsRepeat1} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";

export function Footer() {    
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeating] = useState(true);
  return (
    <View style = {Container.background}>
        <LinearGradient 
            colors={['rgba(10,80,249,0.55)','rgba(12,220,116,.55)', 'rgba(12,90,249,.85)','rgba(12,220,116,.55)','#0575E6','rgba(12,220,116,.55)', 'rgba(10,80,249,0.55)']}
            start={[0, 1]}
            end={[0, 1]}
            style={Container.linearGradient} >
            <View style={Container.playerContainer}>
                {/* Playback controls*/}
                <Pressable>
                    <View style = {Container.playerIcon}>
                        <BsShuffle style = {{ fontSize: 18}}/>
                    </View>
                </Pressable>
                <Pressable>
                    <View style = {Container.playerIcon}>
                        <CgPlayTrackPrev style = {{ fontSize: 26}} />
                    </View>
                </Pressable>
                {/* Toggle play/pause based on playback*/}
                <Pressable 
                    style={Container.playButton}
                    onPress={() => setIsPlaying(!isPlaying)}>
                    <View style={Container.playIcon}>
                        {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
                    </View>
                </Pressable>
                <Pressable>
                    <View style = {Container.playerIcon}>
                        <CgPlayTrackNext style = {{ fontSize: 26}} />
                    </View>
                </Pressable>
                {/* Toggle repeat based on playback*/}
                <Pressable >
                    <View style = {Container.playerIcon}>
                        <BsRepeat style = {{ fontSize: 19}} />
                    </View>
                </Pressable>
            </View> 
        </LinearGradient>
    </View>  );
}
const Container = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
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
        paddingLeft: 3,
    },
    playerIcon: {
        color: "#7001b1",
        alignSelf: 'center',
        marginHorizontal: 15
    }
 })
