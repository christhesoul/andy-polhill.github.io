import React, { useContext } from "react"
import {
  GlobalStateContext,
} from "../context/GlobalContextProvider"

export default function Town() {
  const state = useContext(GlobalStateContext);

  return (
    <svg version="1.1"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">
        <g>
          <text y="15">sunrise: {state.sunrise} </text>
          <text y="35">sunset: {state.sunset} </text>
        </g>
    </svg>
  )
}
