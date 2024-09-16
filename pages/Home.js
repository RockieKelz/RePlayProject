import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Footer } from "../components/Footer";
import { MusicCard } from "../components/MusicCard";
import { SideBar } from "../components/SideBar";
import { reducerCaseActions } from "../utils/constants";
import { fetchFeaturedPlaylists, fetchNewReleases, fetchProfile, fetchRecentlyPlayed, logOut } from "../utils/spotify";
import { useStateProvider } from "../utils/stateprovider";

const Home =  ({navigation}) => {
  const [{ token, featuredPlaylists, newReleases, recentlyplayed, user }, dispatch] = useStateProvider();
  const dataRetrieval = useRef(false);

//Get the users profile and recent data from spotify
 useEffect(() => {
  const getUserData = async () => {
    if (token){
      try {
        var profileData = await fetchProfile(token);
        dispatch({ 
          type: reducerCaseActions.SET_USER, 
            displayName: profileData.display_name,
            userID:profileData.id, 
            profileImage: profileData.images,
        });

        var recentData = await fetchRecentlyPlayed(token);
        dispatch({ 
          type: reducerCaseActions.SET_RECENTLYPLAYED, 
          recentlyplayed: recentData,
        });

        var featuredPlaylistData = await fetchFeaturedPlaylists(token);
        dispatch({ 
          type: reducerCaseActions.SET_FEATURED, 
          featuredPlaylists: featuredPlaylistData,
        });
        var newReleasesData = await fetchNewReleases(token);
        dispatch({ 
          type: reducerCaseActions.SET_NEWRELEASE, 
          newReleases: newReleasesData,
        });

      } catch (error) {
        console.log(error);
      }
    }
 };
 if (dataRetrieval.current) return;
    getUserData();
    dataRetrieval.current = true
 }, []);

  /* create a song card that will display song's data */
  
  const logOutReset = () => {
    dispatch({type: reducerCaseActions.LOGOUT});
    logOut();
  }

  return (
    <SafeAreaView style={[styles.container, {flexDirection: 'column'}]}>
      <View style= {[styles.container, styles.subContainer]}>
        <SideBar navigation={navigation} />
        <LinearGradient 
              colors={['rgba(0, 17, 236, 1)',"rgba(12,90,249,1)", 'rgba(48,138,239,1)', 'rgba(24,198,143,1)','rgba(0,255,96,1)']} 
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
            <View style={[styles.text]}>
                <Text style={[styles.title]}> Welcome
                {/*display username is user isn't null*/}
                  {user && (<>
                    <Text> {user.displayName}</Text>
                  </>)}
                </Text>
                {/*display recently played songs if there are any*/}
                {recentlyplayed && recentlyplayed.items ? (
                  <>
                <Text style={[ styles.title]}>
                   Recently Played Songs
                </Text>
                {/* scroll box that will hold 2 rows of recently played song data cards*/}
                <ScrollView horizontal> 
                  <>
                    <View style={[ styles.cardContainer]}>
                      <FlatList
                        data={recentlyplayed.items}
                        renderItem={({ item }) => 
                        <MusicCard 
                          trackName={item.track.name}
                          album={{ name: item.track.album.name, image: item.track.album.images[0] }}
                          artist={item.track.artists}
                          />}
                        numColumns={5}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </>
                </ScrollView>
                </>
                  ) : (<></>)}
                  {/*display new releases if there are any*/}
                {newReleases && newReleases.albums ? (
                  <>
                <Text style={[styles.title]}>
                   New Releases
                </Text>
                {/* scroll box that will hold 2 rows of new release data cards*/}
                <ScrollView horizontal> 
                  <>
                  <View style={[ styles.cardContainer]}>
                      <FlatList
                        data={newReleases.albums.items}
                        renderItem={({ item }) => 
                        <MusicCard 
                          trackName={null}
                          album={{ name: item.name, image: item.images[0] }}
                          artist={item.artists}
                          />}
                      numColumns={5}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </>
                </ScrollView>
                </>
                  ) : (<></>)}

                {/*display featured playlists if there are any*/}
                {featuredPlaylists && featuredPlaylists.playlists ? (
                <>
                <Text style={[styles.title]}>
                   Featured Playlists
                </Text>
                {/* scroll box that will hold 2 rows of playlist data cards*/}
                <ScrollView horizontal> 
                  <>
                    <View style={[styles.cardContainer]}>
                      <FlatList
                        data={featuredPlaylists.playlists.items}
                        renderItem={({ item }) => 
                        <MusicCard           
                          album={{ image: item.images[0] }}
                          playlist={{name: item.name}}
                          />}
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
                  style={[ styles.btn]} 
                  onPress={logOutReset}>
                <Text style={[styles.logoutText]}>Log Out</Text>
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
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  /*view that will hold side menu and main content*/
  subContainer: {
    flexDirection: 'row',
    height: '85%'
  },
  /*holder for the colored background*/
  linearGradient: {
    flex: 2,
    opacity: 0.85,
    maxHeight: '100%',
  },
  title: {
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: '700',
    color: 'rgba(112, 1, 177, 1)',
    backgroundColor: 'rgba(50, 242, 134, 0.77)',
    minHeight: 35,
    maxHeight: 65,
    maxWidth: 275,
    minWidth: 135,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomLeftRadius:12,
    borderBottomRightRadius: 12,
    padding: 10,
    margin: 15,
  },
  text:{
    paddingTop: 20, 
    alignItems:'left', 
    justifyContent:'center', 
    flex:1
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
    marginTop: 14, 
    marginBottom: 16,
    marginStart: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
    minWidth: 950,
    backgroundColor: 'rgba(50, 242, 134, 0.27)',
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
  footerLine: {
    borderBottomColor: "#7001b1",
    borderBottomWidth: 5,
    width: "100%",
  },
});