import React, { useEffect, useState } from 'react';
import Login from "./pages/Login";
import Home from "./pages/Home";
import AsyncStorage from '@react-native-async-storage/async-storage';

function App () {
  //read and set token using state provider
 const [token, setToken] = useState(null);

 useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("access_token");
        if (storedToken !== null) {
          setToken(storedToken);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchToken();
 }, []);
  return (
      token ?
            <Home />
            :
            <Login />
  );
};

export default App;