import { Image, Text, StyleSheet, View } from 'react-native';
import TextTicker from 'react-native-text-ticker';

export const MusicCard = ({ album, artist, playlist, trackName }) => (
    <View style={styles.card}>
      {/* song's information:
       SONG NAME as card's header*/}
       {trackName && (
        <View style={{ width: 145, height: 30 }}>
          <TextTicker /* Looping scroll for track name */
            style={styles.primaryName}
            duration={7500}
            animationType={'auto'}
            marqueeDelay={1250}
            repeatSpacer={65}
          >
            {trackName}
          </TextTicker>
        </View>
      )}
      {/* =========================================================
            TO DO: DISPLAY DEFAULT IMAGE FOR WHEN THERE IS NO ALBUM IMAGES
            =============================================================*/}
        {album.image && (
        <Image
          source={{ uri: album.image.url }}
          style={styles.albumImage}
        />
      )}
      {/* Album and Artist info as subheaders*/}
      {artist && artist.name ? (
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
            <Text>{artist.name}</Text>
            </TextTicker>
            </View>
            </View>
      ) : (<>
        {artist && artist[0].name? (
        <View style={{ width: 145, flexDirection: 'row' }}>
          <>
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
              {artist.length > 1 ? (
                artist.map((artist, index) => (
                  <Text key={index}>
                    {artist.name} {index == artist.length - 1 ? (
                      <Text> {" "} </Text>
                    ) : (
                      <Text>, </Text>
                    )}
                  </Text>
                ))
              ) : (
                <Text>
                  {artist[0].name}
                </Text>
              )}
            </TextTicker>
          </View>
          </>
        </View>) : (<></>)} 
        </>)}
      {album.name && (
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
            {album.name}
          </TextTicker>
        </View>
      </View>)}
      {playlist && (
      <View style={{ width: 146, flexDirection: 'row' }}>
        <Text style={styles.labelName}>Playlist: </Text>
        <View style={{ width: 98 }}>
          <TextTicker /* bouncing horizontal scroll for artist(s) */
            style={styles.subName}
            duration={7700}
            animationType={'bounce'}
            marqueeDelay={1250}
            repeatSpacer={65}
          > {playlist.name}
          </TextTicker>
        </View>
      </View>)}
    </View>
  );

  const styles = StyleSheet.create({
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
   card:{
    height: 245,
    backgroundColor: 'rgba(0, 245, 255, 0.80)',
    borderRadius: 2,
    boxShadow: '2 4 5px rgba(0, 0, 0, 0.5)',
    elevation: 2, 
    padding: 12,
    margin: 10,
    alignItems: 'center', 
    minWidth: 165,
   },
   labelName: {
    fontSize: 14,
    color: '#rgba(96, 68, 109, 1)',
    },
   subName: {
    fontSize: 14,
    color: 'rgba(71, 4, 112, 1)',
    fontWeight: '600',
    marginBottom: 4,
    tintColor: 'black',
  },
})
