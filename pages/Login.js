import React from "react";
import { Pressable, Text, StyleSheet, View} from 'react-native';
import { handleLoginAuth, saveAuthToken }  from "../utils/spotify";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login= () =>  {
  const handleLogin = async () => {
    handleLoginAuth(); //redirects and allows user to authorize spotify profile usage
  };

  return (
    <View style = {styles.container}>
      <Text style = {styles.titleText}>
        RePlay App
      </Text>
      {/* Button that will be used to initiate Spotify Login Authorization */}
      <Pressable 
        style={styles.btn} 
        onPress={handleLogin}>
        {/* Text to be displayed within the 'button'. */}
        <Text 
          style={styles.btnText}>
            Login to Spotify
            </Text>
      </Pressable>
    </View>  
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#02b7ff',
    flexDirection: "column",
    flex: 1,
    paddingBottom: 220,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  btn: {
    width: 160,
    height: 55,
    borderRadius: 99,
    borderWidth: 5, 
    borderColor: 'rgb(102, 10, 247)', 
    backgroundColor: '#0af76d',
    marginTop: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'rgb(152, 10, 247)',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
 },
})

