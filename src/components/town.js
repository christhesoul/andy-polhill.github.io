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
          <text y="55">icon: {state.icon} </text>
          <text y="75">icon_phrase: {state.icon_phrase} </text>
          <image
            href={ `https://developer.accuweather.com/sites/default/files/${ state.icon.padStart(2, '0') }-s.png` }
            x="0"
            y="75"
            height="75px"
            width="45px"/>
        </g>
    </svg>
  )
}
