
import React, { useContext, useState, useEffect, Fragment } from "react";
import { scaleLinear } from "d3-scale";
import { PropTypes } from "prop-types";

import { GlobalStateContext } from "../../context/GlobalContextProvider"
import styles from "./moon.module.css"
import MoonTexture from "./moonTexture";

export default function Moon({ height, timeOfDay }) {

  const context = useContext(GlobalStateContext);
  const now = new Date();
  const moonRise = new Date(Date.parse(context.moonRise));
  const moonSet = new Date(Date.parse(context.moonSet));
  const time = new Date(now) - now.setHours(0,0,0,0);
  const msToMoonRise = new Date(moonRise) - moonRise.setHours(0,0,0,0);
  const msToMoonSet = new Date(moonSet) - moonSet.setHours(0,0,0,0);

  const minY = 0;
  const maxY = height;
  const xPos = 200;

  const [yPos, setYPos] = useState(minY);

  console.log('moonPhase: ', context.moonPhase);

  useEffect(() => {
    const yPos = scaleLinear()
      .domain([msToMoonRise, msToMoonRise])
      .rangeRound([minY, maxY])(time);

    setYPos(yPos);
  }, [msToMoonRise, msToMoonSet, time, minY, maxY]);

  function createMask(inverted = false, offset = 0) {
    return (
      <defs>
        <mask id="moonPhase">
          <rect
            cx={ 0 }
            cy={ 0 }
            width="100%"
            height="100%"
            fill={ inverted ? "white" : "black" } />
          <circle
            fill={ inverted ? "black" : "white" }
            cx={ xPos + offset }
            cy={ yPos }
            r={ 50 } />
        </mask>
      </defs>
    )
  }

  const moonPhases = {
    "ThirdQuarter": (
      <Fragment>
        { createMask() }
        <rect
          className={ styles.moon_shadow }
          fill={ context.colors[timeOfDay].moonShadow }
          x={ xPos - 100 - 10 }
          y={ yPos - 50 - 10 }
          width={ 100 + 20 }
          height={ 100 + 20 } 
          rx={ 20 }
          ry={ 80 }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
    "WaningGibbous": (
      <Fragment>
        { createMask(true, -25) }
        <circle
          className={ styles.moon_shadow }
          fill={ context.colors[timeOfDay].moonShadow }
          cx={ xPos }
          cy={ yPos }
          r={ 50 }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
    "FullMoon": (null),
    "WaxingGibbous": (
      <Fragment>
        { createMask(true, 25) }
        <circle
          className={ styles.moon_shadow }
          fill={ context.colors[timeOfDay].moonShadow }
          cx={ xPos }
          cy={ yPos }
          r={ 50 }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
    "FirstQuarter": (
      <Fragment>
        { createMask() }
        <rect
          className={ styles.moon_shadow }
          fill={ context.colors[timeOfDay].moonShadow }
          x={ xPos - 5 }
          y={ yPos - 50 - 10 }
          width={ 100 + 20 }
          height={ 100 + 20 } 
          rx={ 20 }
          ry={ 80 }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
    "WaningCrescent": (
      <Fragment>
        { createMask() }
        <circle
          className={ styles.moon_shadow }
          fill={ context.colors[timeOfDay].moonShadow }
          cx={ xPos + 25 }
          cy={ yPos }
          r={ 50 }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
    "NewMoon": (
      <circle
        className={ styles.moon_shadow }
        fill={ context.colors[timeOfDay].moonShadow }
        cx={ xPos }
        cy={ yPos }
        r={ 50 } />
    ),
    "WaxingCrescent": (
      <Fragment>
        { createMask() }
        <circle
          className={ styles.moon_shadow }
          fill={ context.colors[timeOfDay].moonShadow }
          cx={ xPos - 25 }
          cy={ yPos }
          r={ 50 }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
  };

  return (
    <Fragment>
      <MoonTexture
        fill={ context.colors[timeOfDay].moon }
        x={ xPos }
        y={ yPos }
        r={ 50 } />

        { moonPhases[context.moonPhase] }
    </Fragment>
  )
}

Moon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  timeOfDay: PropTypes.string
}

