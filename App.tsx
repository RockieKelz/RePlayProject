import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./pages/Login";
import Home from "./pages/Home";

const Stack = createNativeStackNavigator();

const App = () => {
  //read and set token using state provider
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={ {headerShown: false}}
          />
          <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;