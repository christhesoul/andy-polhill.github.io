import React from "react";
import config from "../../config.json";

export const GlobalStateContext = React.createContext(config);

const GlobalContextProvider = ({ children }) => {
  return (
    <GlobalStateContext.Provider value={ config }>
      { children }
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
