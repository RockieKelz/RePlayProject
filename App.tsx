import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from 'react';
import Home from "./pages/Home";
import Library from './pages/Library';
import Login from "./pages/Login";
import Playlists from './pages/Playlists';
import Search from './pages/Search';
import { reducerCaseActions } from './utils/constants';
import { code, refreshAccessToken, saveAuthToken } from './utils/spotify';
import { useStateProvider } from './utils/stateprovider';

function App () {
  const currentTime = new Date().getTime();

  const Stack = createNativeStackNavigator();
  //read and set token state using state provider with reducer
  var [{ token }, dispatch] = useStateProvider();
  // Initialize a ref for tracking whether function is called already
  const runSaveToken = useRef(false);

  const fetchToken = async () => {
    //try to get access token from async storage
    var storedTokenState = await AsyncStorage.getItem("access_token");
    console.log('storedTokenState: ', storedTokenState);
    const storedRefreshToken = await AsyncStorage.getItem("refresh_token");
    const storedExpiryTime = await AsyncStorage.getItem("expiry_time");
    //retrieve a token from spotify and save it if there isn't one granted
    if  (storedTokenState == null) {
      if (code) {
        try { 
          // Check if the ref's value is true before running saveAuthToken
            await saveAuthToken();
            const token = await AsyncStorage.getItem("access_token");
            if (token !== null) { 
              //dispatch the action to set the token and update state
              dispatch({ type: reducerCaseActions.SET_TOKEN, token });
            }
          
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      //if there is already a non-expired token saved, update the state
      if (storedTokenState && storedExpiryTime && currentTime < parseInt(storedExpiryTime)) {
        token = storedTokenState;
        console.log('app token: ', token)
        dispatch({ type: reducerCaseActions.SET_TOKEN, token });
      } else if (storedRefreshToken) {
        // Token has expired, use refresh token to get a new one
        try {
          const { access_token, expires_in } = await refreshAccessToken(storedRefreshToken);
          const newExpiryTime = new Date().getTime() + expires_in * 1000;
    
          await AsyncStorage.setItem("access_token", access_token);
          await AsyncStorage.setItem("expiry_time", newExpiryTime.toString());
    
          dispatch({ type: reducerCaseActions.SET_TOKEN, token: access_token });
        } catch (error) {
          console.error("Failed to refresh token:", error);
          // Handle error, possibly redirect to login
        }
      }
    };
  };

  useEffect(() => {
    if (runSaveToken.current) return;
    fetchToken();
    runSaveToken.current = true

    if (token) {
      console.log('token: ', token)
    }
  }, []);

  return (
      token ?
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Library" component={Library} />
                <Stack.Screen name="Playlist" component={Playlists} />
              </Stack.Navigator>
            </NavigationContainer>
            :
            <Login />
  );
};

export default App;