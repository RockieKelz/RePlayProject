import React, { useEffect, useRef } from 'react';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from './pages/Search';
import Playlists from './pages/Playlists' 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Library from './pages/Library';
import { reducerCaseActions } from './utils/constants';
import { useStateProvider } from './utils/stateprovider';
import { code, saveAuthToken } from './utils/spotify';

function App () {
  const Stack = createNativeStackNavigator();
  //read and set token state using state provider with reducer
  var [{ token }, dispatch] = useStateProvider();
  // Initialize a ref for tracking whether function is called already
  const runSaveToken = useRef(false);

  const fetchToken = async () => {
    //try to get access token from async storage
    var storedTokenState = await AsyncStorage.getItem("access_token");
    console.log('storedTokenState: ', storedTokenState)
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
      //if there is already a token saved, update the state
      token = storedTokenState;
      console.log('app token: ', token)
      dispatch({ type: reducerCaseActions.SET_TOKEN, token });
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