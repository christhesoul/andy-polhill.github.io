import React, { useContext, useEffect, useState } from "react"
import {
  GlobalStateContext,
} from "../context/GlobalContextProvider"
import classNames from 'classnames';

import styles from "./town.module.css"

const half_hour = 3600000 / 2;

export default function Town() {

  const state = useContext(GlobalStateContext);
  const now = new Date();
  const sunrise = new Date(Date.parse(state.sunrise));
  const sunset = new Date(Date.parse(state.sunset));
  const time = new Date(now) - now.setHours(0,0,0,0);
  const ms_to_sunrise = new Date(sunrise) - sunrise.setHours(0,0,0,0);
  const ms_to_sunset = new Date(sunset) - sunset.setHours(0,0,0,0);

  const [timeOfDay, setTimeOfDay] = useState('day', ms_to_sunrise,  ms_to_sunset, time);

  useEffect(() => {
    if((time > ms_to_sunrise - half_hour) &&
      (time < ms_to_sunrise + half_hour)) {
      return setTimeOfDay('sunrise');
    }

    if((time > ms_to_sunset - half_hour) &&
      (time < ms_to_sunset + half_hour)) {
      return setTimeOfDay('sunset');
    }

    if((time > ms_to_sunset + half_hour) ||
      (time < ms_to_sunrise - half_hour)) {
      return setTimeOfDay('night');
    }

    return setTimeOfDay('day');
  }, [ms_to_sunrise, ms_to_sunset, time]);

  const classes = classNames({
    [styles.town]: true,
    [styles.town__night]: timeOfDay === 'night',
    [styles.town__sunrise]: timeOfDay === 'sunrise',
    [styles.town__sunset]: timeOfDay === 'sunset',
  });

  return (
    <div className={classes}>
      <svg version="1.1"
          width="100%" height="300"
          xmlns="http://www.w3.org/2000/svg">
      </svg>
    </div>
  )
}
