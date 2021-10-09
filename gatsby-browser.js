import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
import { ThemeContextProvider } from "./src/context/ThemeContext";

import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => {
  return (
    <GlobalContextProvider>
      <ThemeContextProvider>
        {element}
      </ThemeContextProvider>
    </GlobalContextProvider>
  );
}
