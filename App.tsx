import React, { useEffect } from 'react';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from './pages/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Library from './pages/Library';
import { reducerCaseActions } from './utils/constants';
import { useStateProvider } from './utils/stateprovider';

function App () {
  const Stack = createNativeStackNavigator();
  
  //read and set token state using state provider with reducer
  var [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const fetchToken = async () => {
      //try to get access token from async storage
      var storedTokenState = await AsyncStorage.getItem("access_token");

      if (storedTokenState !== null) {
          //if there is already a token saved, update the state
          token = storedTokenState;
          console.log('app token: ', token)
          dispatch({ type: reducerCaseActions.SET_TOKEN, token });
        };
      };
    fetchToken();
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
              </Stack.Navigator>
            </NavigationContainer>
            :
            <Login />
  );
};

export default App;