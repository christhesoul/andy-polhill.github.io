import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../context/GlobalContextProvider"
import styles from "./sky.module.css"

const half_hour = 3600000 / 2;

export default function Sky() {

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

  // const classes = classNames({
  //   [styles.sky]: true,
  //   [styles.sky__night]: timeOfDay === 'night',
  //   [styles.sky__sunrise]: timeOfDay === 'sunrise',
  //   [styles.sky__sunset]: timeOfDay === 'sunset',
  // });

  console.log(state.colors);

  return (
    <Fragment>
      <defs>
        <linearGradient id="day-sky" gradientTransform="rotate(90)">
          <stop offset="5%"  stop-color={ state.colors.sky_day_light } />
          <stop offset="95%" stop-color={ state.colors.sky_day_dark } />
        </linearGradient>
      </defs>
      <rect className={ styles.sky } fill="url(#day-sky)" height="100%" width="100%"/>
    </Fragment>
  )
}

Sky.propTypes = {}

