import React, { useContext, useState, useEffect } from 'react'
import Clouds from './cloud/clouds';
import Sky from './sky/sky';
import { GlobalStateContext } from "../context/GlobalContextProvider"

import styles from "./town.module.css"

const halfHour = 1800000;

export default function Town() {

  const width = 1200;
  const height = 300;

  const context = useContext(GlobalStateContext);
  const now = new Date();
  const sunrise = new Date(Date.parse(context.sunrise));
  const sunset = new Date(Date.parse(context.sunset));
  const time = new Date(now) - now.setHours(0,0,0,0);
  const msToSunrise = new Date(sunrise) - sunrise.setHours(0,0,0,0);
  const msToSunset = new Date(sunset) - sunset.setHours(0,0,0,0);

  const [timeOfDay, setTimeOfDay] = useState('day', msToSunrise,  msToSunset, time);

  useEffect(() => {
    if((time > msToSunrise - halfHour) &&
      (time < msToSunrise + halfHour)) {
      return setTimeOfDay('sunrise');
    }

    if((time > msToSunset - halfHour) &&
      (time < msToSunset + halfHour)) {
      return setTimeOfDay('sunset');
    }

    if((time > msToSunset + halfHour) ||
      (time < msToSunrise - halfHour)) {
      return setTimeOfDay('night');
    }

    return setTimeOfDay('day');
  }, [msToSunrise, msToSunset, time]);

  return (
    <div className={ styles.town }>
      <svg version='1.1'
          className={ styles.town__image }
          width={ width }
          height={ height }>
        <Sky timeOfDay={ timeOfDay }></Sky>
        <Clouds timeOfDay={ timeOfDay } width={ width } height={ height }></Clouds>
      </svg>
    </div>
  )
}
