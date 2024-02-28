import React, { useEffect, useState } from 'react';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from './pages/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from '@react-native-async-storage/async-storage';
import LibraryScreen from './pages/Library';
import { reducerCaseActions } from './utils/constants';
import { useStateProvider } from './utils/stateprovider';
import { code, saveAuthToken } from './utils/spotify';
import { initialState } from './utils/reducer';
import { code, saveAuthToken } from './utils/spotify';

function App () {
  const Stack = createNativeStackNavigator();
  
  //read and set token state using state provider with reducer
  var [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const fetchToken = async () => {
      //try to get access token from async storage
      var storedTokenState = await AsyncStorage.getItem("access_token");
      //retrieve a token from spotify and save it if there isn't one granted
      if  (storedTokenState == null) {
          if (code) {
            try { 
              await saveAuthToken()
              const token = await AsyncStorage.getItem("access_token");
              if (token !== null) { 
                //dispatch the action to set the token and update state
                dispatch({ type: reducerCaseActions.SET_TOKEN, token });
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          //if there is already a token saved, update the state
          token = storedTokenState;
          dispatch({ type: reducerCaseActions.SET_TOKEN, token });
        };
      };
    fetchToken();
    }, [dispatch, token]);

  return (
      token ?
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Library" component={LibraryScreen} />
              </Stack.Navigator>
            </NavigationContainer>
            :
            <Login />
  );
};

export default App;