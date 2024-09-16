import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, View } from 'react-native';
import { BsPlayFill, BsPauseFill, BsShuffle, BsRepeat, BsVolumeDown, BsVolumeUp} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import  Slider from '@react-native-community/slider';

export function Footer() {    
    const [isPlaying, setIsPlaying] = useState(false); //for toggling play and pause icon
    const [volume, setVolume] = useState(50);  //for volume control slider
    const [progress, setProgress] = useState(0) //for playback progress
    const [duration, setDuration] = useState(0) //for duration of song

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
                        <View style = {[Container.playIcon, ]}>
                            <CgPlayTrackPrev style = {{ fontSize: 26}} />
                        </View>
                    </Pressable>
                    {/* Toggle play/pause based on playback*/}
                    <Pressable 
                        style={[Container.playButton, ]}
                        onPress={() => setIsPlaying(!isPlaying)}>
                        <View style={[Container.playIcon, ]}>
                            {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
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
