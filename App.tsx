import React, { useEffect, useState } from 'react';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from './pages/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from '@react-native-async-storage/async-storage';
import LibraryScreen from './pages/Library';
import { code, saveAuthToken } from './utils/spotify';

function App () {
  const Stack = createNativeStackNavigator();

//read and set token using state provider
 const [token, setToken] = useState(null);

 useEffect(() => {
  const fetchToken = async () => {
    if (code){
      try {
        //gets and saves the access token from spotify
        await saveAuthToken()
        const storedToken = await AsyncStorage.getItem("access_token");
        setToken(storedToken);
        } catch (error) {
          console.log(error);
        }
      }
    };
      fetchToken();
   }, [code]);
  

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