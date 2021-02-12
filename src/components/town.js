import React, { useContext, useEffect, useState } from "react"
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
  const after_sunrise = ms_since_midnight > new Date(sunrise) - sunrise.setHours(0,0,0,0);
  const before_sunset = ms_since_midnight < new Date(sunset) - sunset.setHours(0,0,0,0);

  const [daytime, setDaytime] = useState(true, after_sunrise,  before_sunset);

  useEffect(() => setDaytime(after_sunrise && before_sunset), [after_sunrise, before_sunset]);

  const classes = classNames({
    [styles.town]: true,
    [styles.town__night]: !daytime,
  });

  console.log(state);

  return (
    <svg version="1.1"
        width="100%" height="300"
        xmlns="http://www.w3.org/2000/svg"
        className={classes}>
    </svg>
  )
}
