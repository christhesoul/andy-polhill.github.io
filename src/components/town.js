import React, { useContext } from "react"
import {
  GlobalStateContext,
} from "../context/GlobalContextProvider"
import classNames from 'classnames';

import styles from "./town.module.css"

export default function Town() {
  const state = useContext(GlobalStateContext);

  const now = new Date();
  const sunrise = new Date(Date.parse(state.sunrise));
  const sunset = new Date(Date.parse(state.sunset));
  const ms_since_midnight = new Date(now) - now.setHours(0,0,0,0);

  let night = false;
  if(
      ms_since_midnight > new Date(sunrise) - sunrise.setHours(0,0,0,0) ||
      ms_since_midnight < new Date(sunset) - sunset.setHours(0,0,0,0)
    ) {
      night = true;
  }

  const classes = classNames({
    [styles.town]: true,
    [styles.town__night]: night,
  });

  return (
    <svg version="1.1"
        width="100%" height="300"
        xmlns="http://www.w3.org/2000/svg"
        className={classes}>
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
