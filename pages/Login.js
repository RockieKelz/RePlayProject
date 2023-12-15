import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const LoginScreen= ({navigation}) =>  {

  return (
    <View style = {styles.container}>
      <Text style = {styles.titleText}>
        RePlay App
      </Text>
      {/* Button that will be used to initiate Spotify Login Authorization */}
      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => navigation.navigate('Home')}>
        {/* Text to be displayed within the 'button'. */}
        <Text 
          style={styles.btnText}>
            Login to Spotify
            </Text>
      </TouchableOpacity>
    </View>  
  )
}

export default LoginScreen

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

