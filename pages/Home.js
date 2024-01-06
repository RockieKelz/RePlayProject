import React, {useState, useEffect} from "react";
import { Image, Pressable, SafeAreaView,Text, StyleSheet, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { fetchPlaylists, fetchProfile, fetchRecentlyPlayed, getRecentlyPlayed, logOut } from "../utils/spotify";
import { SideBar } from "../components/SideBar";
import { LinearGradient } from 'expo-linear-gradient'

const Home =  ({navigation}) => {
  const [recentPlays, setRecentPlays] = useState(null);
  const [user, setUser] = useState(null);

//Get the users profile and recent data from spotify
 useEffect(() => {
  const getUserData = async () => {
    try {
      var profileData = await fetchProfile();
      setUser({...user, 
        displayName: profileData.display_name, 
        userID:profileData.id, 
        profileImage: profileData.images});

      var recentData = await fetchRecentlyPlayed();
      setRecentPlays({...{recentlyPlayed: recentData}});
    } catch (error) {
      console.log(error);
    }
 };
    getUserData();
 }, []);

/* Temporary: shows the Recently Played response on console to help get the needed keywords from api response 
This use effect will be deleted once the Recently Played section is completed */
 useEffect(() => {
  if (user) {
    console.log('User: ', user)
  }
  if (recentPlays) {
    console.log('Recently Played:', recentPlays.recentlyPlayed);
  }
}, [recentPlays, user]);

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
            {/*Welcome Text*/}            
            <View style={{paddingTop: 20, alignItems:'left', 
                              justifyContent:'center', flex:1}}>
                <Text style={styles.title}> Welcome
                {/*display username is user isn't null*/}
                {user && (<>
                <Text> {user.displayName}</Text>
                </>)}
                </Text>
                {/*display recently played songs if there are any*/}
                <Text style={styles.title}>
                  Recently Played Songs
                  </Text>
                <View>{recentPlays && recentPlays.recentlyPlayed.items?.map((item, index) => (
                  <View key={index} style={{flexDirection: 'row'}}>
                    <View style={{backgroundColor: 'cyan', flexDirection: 'column'}}>
                      {/*song's information*/}
                      <Text>Song: {item.track.name}</Text>
                      <Text>Artist: <></>
                        {item.track.artists?.map((it, index) => (
                          <View key={index}>
                          <Text>{it.name} </Text>
                          </View>))}
                        </Text>
                      <Text>Album: {item.track.album.name}</Text>
                      {item.track.album.images[0] && (<>
                        <Image source={{uri: item.track.album.images[0].url}}
                        style={styles.albumImage} />
                        </>)}
                    </View>
                  </View>
           ))}</View>
                {/*Temporary logout button to test authorization code*/}
                <Pressable 
                  style={styles.btn} 
                  onPress={logOut}>
                    <Text style={styles.text}>Log Out</Text>
                </Pressable>
            </View>
          </ScrollView>
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
    fontSize: 22
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
  albumImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
   },
  /*line that separates the bottom player from the upper components */
  footerLine:{
    borderBottomColor: "#7001b1",
    borderBottomWidth: 5,
    width: "100%",
  }
});