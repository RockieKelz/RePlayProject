import App from './App';
import React from 'react';

import { registerRootComponent } from 'expo';
import { StateProvider } from "./utils/stateprovider";
import reducer, { initialState } from "./utils/reducer";

//wrap App's root component with created state provider
const Base = () => {
  return(
  <React.StrictMode>
    {/*Use created reducer and its intial state as props for the state provider*/}
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
    )
}
export default registerRootComponent(Base)

