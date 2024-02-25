import React, {useState, useEffect} from "react";
import { FlatList, Image, Pressable, SafeAreaView,Text, StyleSheet, View } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { fetchFeaturedPlaylists, fetchNewReleases, fetchProfile, fetchRecentlyPlayed, fetchUsersPlaylists, logOut } from "../utils/spotify";
import { SideBar } from "../components/SideBar";
import { LinearGradient } from 'expo-linear-gradient'
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Footer } from "../components/Footer";

const Home =  ({navigation}) => {
  const [recentPlays, setRecentPlays] = useState(null);
  const [user, setUser] = useState(null);
  const [newlyReleased, setNewReleases] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  const [userPlaylists, setUsersPlaylists] = useState(null);


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

      var usersPlaylistsData = await fetchUsersPlaylists();
      setUsersPlaylists({...{playlists:usersPlaylistsData.playlists.items}});

      var featuredPlaylistData = await fetchFeaturedPlaylists();
      setFeaturedPlaylists({...{playlists: featuredPlaylistData.playlists.items}});

      var newReleasesData = await fetchNewReleases();
      setNewReleases({...{newReleases: newReleasesData.albums.items}});

    } catch (error) {
      console.log(error);
    }
 };
    getUserData();
 }, []);

/* Temporary: shows the retrieved data response on console to help get the needed keywords from api response 
This use effect will be deleted once the data section is completed */
 useEffect(() => {
  if (user) {
    console.log('User: ', user)
  }
  if (recentPlays) {
    console.log('Recently Played:', recentPlays.recentlyPlayed);
  }
  if(newlyReleased){
    console.log('Users Playlist: ', userPlaylists, 
    '\n Featured Playlists: ', featuredPlaylists.playlists,
    '\n New Realeases: ', newlyReleased.newReleases)
  }
}, [recentPlays, user, userPlaylists, featuredPlaylists, newlyReleased]);

  /* create a song card that will display song's data */
  const SongCard = ({ item }) => (
    <View style={styles.card}>
      {/* song's information:
       SONG NAME as card's header*/}
      <View style={{ width: 145, height: 30 }}>
        <TextTicker /* Looping scroll for track name */
          style={styles.primaryName}
          duration={7500}
          animationType={'auto'}
          marqueeDelay={1250}
          repeatSpacer={65}
        >
          {item.track.name}
        </TextTicker>
      </View>
      {/* =========================================================
            TO DO: DISPLAY DEFAULT IMAGE FOR WHEN THERE IS NO ALBUM IMAGES
            =============================================================*/}
      {item.track.album.images[0] && (
        <Image
          source={{ uri: item.track.album.images[0].url }}
          style={styles.albumImage}
        />
      )}
      {/* Album and Artist info as subheaders*/}
      <View style={{ width: 145, flexDirection: 'row' }}>
        <Text style={styles.labelName}>Artist: </Text>
        <View style={{ width: 105 }}>
          <TextTicker /* bouncing horizontal scroll for artist(s) */
            style={styles.subName}
            duration={4500}
            animationType={'bounce'}
            marqueeDelay={1250}
            repeatSpacer={65}
          >
            {/*Check if there's multiple artists and separate their names*/}
            {item.track.artists.length > 1 ? (
              item.track.artists.map((artist, index) => (
                <Text key={index}>
                  {artist.name} {index == item.track.artists.length - 1 ? (
                    <Text> {" "} </Text>
                  ) : (
                    <Text>, </Text>
                  )}
                </Text>
              ))
            ) : (
              <Text>
                {item.track.artists[0].name}
              </Text>
            )}
          </TextTicker>
        </View>
      </View>
      <View style={{ width: 146, flexDirection: 'row' }}>
        <Text style={styles.labelName}>Album: </Text>
        <View style={{ width: 100 }}>
          <TextTicker /* bouncing horizontal scroll for artist(s) */
            style={styles.subName}
            duration={7700}
            animationType={'bounce'}
            marqueeDelay={1250}
            repeatSpacer={65}
          >
            {item.track.album.name}
          </TextTicker>
        </View>
      </View>
    </View>
  );

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
          <ScrollViewIndicator
            shouldIndicatorHide={false}
            flexibleIndicator={false}
            scrollIndicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
            >
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
                {recentPlays && recentPlays.recentlyPlayed.items ? (
                  <>
                <Text style={styles.title}>
                   Recently Played Songs
                </Text>
                {/* scroll box that will hold 2 rows of recently played song data cards*/}
                <ScrollView horizontal> 
                  <>
                    <View style={styles.cardContainer}>
                      <FlatList
                        data={recentPlays.recentlyPlayed.items}
                        renderItem={({ item }) => 
                        <SongCard item={item} />}
                        numColumns={5}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </>
                </ScrollView>
                </>
                  ) : (<></>)}
            </View>
                {/*Temporary logout button to test authorization code*/}
                <Pressable 
                  style={styles.btn} 
                  onPress={logOut}>
                <Text style={styles.logoutText}>Log Out</Text>
                </Pressable>
          
          </ScrollViewIndicator>
        </LinearGradient>
      </View>
      <View style={styles.footerLine} />
    {/*Footer area to display music player*/}      
    <Footer />      
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
    flex: 2,
    opacity: 0.85,
    maxHeight: '100%',
  },
  title:{
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: '700',
    color: 'rgba(112, 1, 177, 1)',
    tintColor: 'black',
    backgroundColor: 'rgba(50, 242, 134, 0.77)',
    minHeight: 35,
    maxHeight: 65,
    maxWidth: 275,
    minWidth: 135,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 10,
    margin: 15,
  },
  /*logout */
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
    margin:15,
  },
  /*card like views*/
  cardContainer: {
    marginBottom: 16,
    marginStart: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
    minWidth: 950
  },
  card:{
    height: 245,
    backgroundColor: 'rgba(0, 245, 255, 0.80)',
    borderRadius: 2,
    shadowColor: '#000', 
    shadowOffset: { width: 2, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
    elevation: 2, 
    padding: 12,
    margin: 10,
    alignItems: 'center', 
    justifyContent: 'space-between', 
    minWidth: 165,
  },
  labelName: {
    fontSize: 14,
    color: '#rgba(96, 68, 109, 1)',
  },
  /*song data views*/
  primaryName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: 'rgba(98, 4, 156, 1)',
    tintColor: 'black',
  },
  albumImage: {
    width: 150,
    height: 150,
    marginBottom: 4,
   },
   subName: {
    fontSize: 14,
    color: 'rgba(71, 4, 112, 1)',
    fontWeight: '600',
    marginBottom: 4,
    tintColor: 'black',
  },
  /*addt'l sections*/
   logoutText: {
    color: 'rgba(200, 245, 255,1)',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 3,
    margin: 10,
  },
  /*line that separates the bottom player from the upper components */
  footerLine:{
    borderBottomColor: "#7001b1",
    borderBottomWidth: 5,
    width: "100%",
  }
});