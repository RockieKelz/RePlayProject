import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { FontAwesome } from 'react-native-vector-icons';
import { Footer } from "../components/Footer";
import HorizontalScrollWithArrows from '../components/HorizontalScrollArrows';
import { MusicCard } from "../components/MusicCard";
import { SideBar } from "../components/SideBar";
import { reducerCaseActions } from "../utils/constants";
import { fetchCategories, fetchRecommedations, fetchSearchResults, fetchUsersTopItems } from "../utils/spotify";
import { useStateProvider } from "../utils/stateprovider";

const Search= ({navigation}) =>  {
  const [{ albums, artists, token, tracks }, dispatch] = useStateProvider();
  const [searchQuery, setSearchQuery] = useState(""); //for searching text from input field
  // consts to fill page when user is not seraching
  const [usersTopArtists, setTopArtists] = useState([]);
  const [usersTopTracks, setTopTracks] = useState([]);
  const [usersRecommendations, setRecommendations] = useState([]);
  const [browseCategories, setBrowseCategories] = useState([]);

  //set the default search category type and ability to change it.
  const [selectedCategory, setSelectedCategory] = useState('albums');
  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const getNumColumns = () => {
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = 200; // Adjust this value based on your desired card width
    return Math.floor((screenWidth*.8) / cardWidth);
  };
  const [numColumns, setNumColumns] = useState(getNumColumns());
  //function to handle fetching and dispatching search results
  async function GetSearchResult(searchQuery){
    console.log("Searching for " + searchQuery)
    try {
      var searchResultsData = await fetchSearchResults(searchQuery, token);
      dispatch({ 
        type: reducerCaseActions.SET_SEARCHRESULTS, 
        albums:searchResultsData.albums,
        artists: searchResultsData.artists,
        tracks: searchResultsData.tracks,
      });
    } catch (error) {
      console.log(error);
    }}
    /* Functions to handle fetching and dispatching browsing recomendations*/
    // Users Top Artists & Categories */
    async function GetUsersTopItems() {
      try {
        setTopArtists (await fetchUsersTopItems("artists", token));
        setTopTracks (await fetchUsersTopItems("tracks", token));
      } catch (error) {
        console.log(error);
      }
    }
    async function GetUserRecommendations() {
      try {
        const topArtistIDs = usersTopArtists?.items.slice(0, 3).map(artist => artist.id);
        const topTracksIDs = usersTopTracks?.items.slice(0, 2).map(track => track.id);
        console.log('Top IDs', topArtistIDs, topTracksIDs);
        setRecommendations(await fetchRecommedations(topArtistIDs, topTracksIDs, token));
        console.log('Recommends', usersRecommendations);
      } catch (error) {
        console.log(error);
      }
    }
    async function GetBrowseCategories() {
      try {
        setBrowseCategories(await fetchCategories(token));
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      const updateLayout = () => {
        setNumColumns(getNumColumns());
      };
      
      /* search will temporary run as the user types in the search bar
          plan to change so that click and key events trigger the function*/
      if (searchQuery && searchQuery.length > 0) {
        GetSearchResult(searchQuery)
        }
      if (usersTopArtists.length === 0) {
        GetUsersTopItems();
      }
      if (browseCategories.length === 0) {
        GetBrowseCategories();
      }
      if (usersRecommendations.length === 0 && Object.keys(usersTopArtists).length > 0 && Object.keys(usersTopTracks).length > 0) { 
        GetUserRecommendations();
      };
      /*TEMPORARY CONSOLE LOGS FOR DATA CONFIGURATION
        =============================================
        TODO:     
        ***DELETE LOGS WHEN DATA DISPLAYS APPROPRIATELY ON PAGE***
        ========================================*/ 
      if (usersTopArtists && usersTopTracks) { 
        console.log('Top Artists', usersTopArtists, 'Top Tracks', usersTopTracks);
      };
      if (usersRecommendations) {
        console.log('usersRecommendations', usersRecommendations);
      };
      if (browseCategories) {
        console.log('Browse Categories', browseCategories);
      };
      Dimensions.addEventListener('change', updateLayout);
  return () => {
    Dimensions.removeEventListener('change', updateLayout);
  }
    }, [ searchQuery, usersRecommendations, usersTopArtists, usersTopTracks, token])
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
              
          {/*search bar row*/}
          <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 30}}>
            {/*search bar*/}
            <View style={styles.searchContainer}> 
              <FontAwesome 
                icon="fa-solid fa-magnifying-glass"
                size={20} 
                color="purple" 
                onClick={{}}
                style={styles.searchIcon} />
              <TextInput 
                style={styles.searchInput} 
                placeholder="Search..." 
                value={searchQuery} 
                onChangeText={(text) => setSearchQuery(text)} /> 
            </View> 
            {/*buttons to change the selected search catergory type */}
            <View 
              style={{...styles.btnContainer, marginLeft: 'auto'}}>
                <Pressable 
                  style={[selectedCategory === 'albums' ? styles.selectedBtn : styles.defaultBtn]} 
                  onPress={() => setCategory('albums')}>
                      <Text style={selectedCategory === 'albums' ? styles.selectedText : styles.defaultText}>Albums</Text>
                </Pressable>
                <Pressable 
                  style={[selectedCategory === 'artists' ? styles.selectedBtn : styles.defaultBtn]} 
                  onPress={() => setCategory('artists')}>
                      <Text style={selectedCategory === 'artists' ? styles.selectedText : styles.defaultText}>Artists</Text>
                </Pressable>
                <Pressable 
                  style={[selectedCategory === 'tracks' ? styles.selectedBtn : styles.defaultBtn]} 
                  onPress={() => setCategory('tracks')}>
                      <Text style={selectedCategory === 'tracks' ? styles.selectedText : styles.defaultText}>Songs</Text>
                </Pressable>
            </View>
          </View>
          {/* Area to display results cards*/}

          { searchQuery && searchQuery.length > 0 ? (
            // Display search results
            <>
          {/* SHOW ALBUM SEARCH RESULTS*/}
          {selectedCategory == 'albums' && albums && albums.items ? (
            <>
              <ScrollView horizontal> 
                <>
                  <View style={styles.cardContainer}>
                    <FlatList
                      data={albums.items}
                      renderItem={({ item }) => 
                      /*Album results to display only album images and names & artist*/
                      <MusicCard 
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

          {/* SHOW ARTIST SEARCH RESULTS*/}
          {selectedCategory == 'artists' && artists && artists.items ? (
            <>
              <ScrollView horizontal> 
                <>
                  <View style={styles.cardContainer}>
                    <FlatList
                      data={artists.items}
                      renderItem={({ item }) => 
                      /*Artist results that only show artist name & image*/
                      <MusicCard 
                        album={{ image: item.images[0] }}
                        artist={item}
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

          {/* SHOW TRACK SEARCH RESULTS*/}
          {selectedCategory == 'tracks' && tracks && tracks.items ? (
            <>
              <ScrollView horizontal> 
                <>
                  <View style={styles.cardContainer}>
                    <FlatList
                      data={tracks.items}
                      renderItem={({ item }) => 
                      /*Track results show artist, album, and name data*/
                      <MusicCard 
                        trackName={item.name}
                        album={{ name: item.album.name, image: item.album.images[0] }}
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
          </>
        ) : (
          /* Display user's top artists, recommendations, and browsing categories if not searching */
          <>{/*TOP ARTISTS*/}
            {usersTopArtists && usersTopArtists.items ? (
             <View>
             <Text style={styles.sectionTitle}>Your Top Artists</Text>
             <HorizontalScrollWithArrows>
              {usersTopArtists.items.map((item, index)=> (
                <View key={index} style={styles.artistCard}>
                    <MusicCard
                      album={{ image: item.images[0] }}
                      artist={item}
                    />
                    </View>
                  ))}
                </HorizontalScrollWithArrows>
              </View>
            
            ) : (<></>)}
          {/*RECOMMENDATIONS*/}
            {usersRecommendations && usersRecommendations.tracks ? (
              <View>
              <Text style={styles.sectionTitle}>Your Recomendations</Text>
              <HorizontalScrollWithArrows>
              {usersRecommendations.tracks.map((item,index) => (
                <View key={index} style={styles.artistCard}>
                  
                    <MusicCard
                      album={{ image: item.album.images[0], name: item.album.name }}
                      artist={item.artists}
                      trackName={item.name}
                    />
                    </View>
                    ))}
            </HorizontalScrollWithArrows>
            </View>
            ) : (<></>)}
          {/*BROWSING CATERGORIES*/}
            {browseCategories && browseCategories.categories ? (
              <View style={(styles.cardContainer, {width: '110%'})}>
                <FlatList
                  data={browseCategories.categories.items}
                  renderItem={({ item }) => (
                    <MusicCard
                      album={{ image: item.icons[0]}}
                      trackName={item.name}
                    />
                  )}
                  numColumns={numColumns}
                  key={numColumns}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ) : (<></>)}
          </>)}
        </ScrollViewIndicator>
      </LinearGradient>
    </View>
    <View style={styles.footerLine} />
    {/*Footer area to display music player*/}      
    <Footer />           
  </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue',
  },
  title:{
    maxWidth: 280,
    marginLeft: 25,
    marginTop: 65,
    fontFamily: "Segoe UI",
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#7001b1',
    backgroundColor: 'rgba(0,240,215,.25)',
    borderRadius: 13,
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
  /*search bar */
  searchContainer: { 
    width: '30%',
    height: 40, 
    backgroundColor: 'rgba(15,200,15,.9)', 
    borderRadius: 10, 
    paddingHorizontal: 8, 
    marginHorizontal: 25, 
    marginTop: 25, 
    justifyContent: 'center',
    alignItems: 'flex-end' ,
    flexDirection: 'row',
  }, 
  searchIcon: {
    marginHorizontal: 10,
    alignSelf: 'center',
    paddingRight: 2,
  },
  searchInput: { 
    height: 30, 
    width: '85%',
    fontSize: 16, 
    borderRadius: 5, 
    backgroundColor: "#fff", 
    paddingHorizontal: 10, 
    alignSelf: 'center',
  },
  /*category buttons*/
  btnContainer:{
    paddingTop: 20, 
    flexDirection: 'row'
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
    margin: 5,
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
    margin: 5,

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
  /*line that separates the bottom player from the upper components */
  footerLine:{
    borderBottomColor: "#7001b1",
    borderBottomWidth: 5,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
    color: '#fff',
  },
  artistCard: {
    marginHorizontal: 5,
    marginRight: 20,
    width: 150, // Adjust this width as needed
  },
})