import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
//State Managment based off of context and reducer
export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);