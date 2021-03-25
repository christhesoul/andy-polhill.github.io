
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
  const radius = 30;
  const shadowClass = `moon_shadow__${timeOfDay}`;

  const minY = 0;
  const maxY = height;
  const xPos = 200;

  const [yPos, setYPos] = useState(minY);

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
            r={ radius } />
        </mask>
      </defs>
    )
  }

  const moonPhases = {
    "ThirdQuarter": (
      <Fragment>
        { createMask() }
        <rect
          className={ shadowClass }
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
          className={ styles[shadowClass] }
          cx={ xPos }
          cy={ yPos }
          r={ radius }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
    "FullMoon": (null),
    "WaxingGibbous": (
      <Fragment>
        { createMask(true, 25) }
        <circle
          className={ styles[shadowClass] }
          cx={ xPos }
          cy={ yPos }
          r={ radius }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
    "FirstQuarter": (
      <Fragment>
        { createMask() }
        <rect
          className={ styles[shadowClass] }
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
          className={ styles[shadowClass] }
          cx={ xPos + 25 }
          cy={ yPos }
          r={ radius }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
    "NewMoon": (
      <circle
        className={ styles[shadowClass] }
        cx={ xPos }
        cy={ yPos }
        r={ radius } />
    ),
    "WaxingCrescent": (
      <Fragment>
        { createMask() }
        <circle
          className={ styles[shadowClass] }
          cx={ xPos - 25 }
          cy={ yPos }
          r={ radius }
          mask="url(#moonPhase)" />
      </Fragment>
    ),
  };

  return (
    <g id="moon">
      <MoonTexture
          fill={ context.colors[timeOfDay].moon }
          glow={ timeOfDay === 'night' }
          x={ xPos }
          y={ yPos }
          r={ radius }
          timeOfDay={ timeOfDay } />

      <defs>
        <linearGradient
            id="moonShadow"
            gradientTransform="rotate(90)">
          <stop
            offset="70%"
            stopColor={ context.colors[timeOfDay].skyTop } />
          <stop
            offset="90%"
            stopColor={ context.colors[timeOfDay].skyBottom } />
        </linearGradient>

        <filter
            id="cloud-inner-glow"
            x="-200%"
            y="-200%"
            width="400%"
            height="400%">
          <feSpecularLighting
              result="moon"
              in="SourceAlpha"
              specularExponent="20"
              lightingColor="#487291">
                <fePointLight
                  x={ xPos }
                  y={ yPos }
                  z="1">
               </fePointLight>

          </feSpecularLighting>
          <feComposite
              in="SourceGraphic"
              in2="moon"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="5"
              k4="0"/>
        </filter>

      </defs>

      {/* { moonPhases[context.moonPhase] } */}
    </g>
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

