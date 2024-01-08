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

function App () {
  const Stack = createNativeStackNavigator();

  //read and set token state using state provider with reducer
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const fetchToken = async () => {
      try { //try to get access token from async storage
        const token = await AsyncStorage.getItem("access_token");
        if (token !== null) { 
          //dispatch the action to set the token and update state
          dispatch({ type: reducerCaseActions.SET_TOKEN, token });
        }
      } catch (error) {
        console.log(error);
      }
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