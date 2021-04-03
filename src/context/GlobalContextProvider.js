import React from "react";
import PropTypes from "prop-types";

import config from "../../config.json";

export const GlobalStateContext = React.createContext(config);

export default function GlobalContextProvider({ children }) {
  return (
    <GlobalStateContext.Provider value={ config }>
      { children }
    </GlobalStateContext.Provider>
  );
}

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired 
};
