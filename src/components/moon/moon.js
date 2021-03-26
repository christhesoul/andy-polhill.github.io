
import React, { useContext, useState, useEffect, Fragment } from "react";
import { scaleLinear } from "d3-scale";
import { PropTypes } from "prop-types";

import { GlobalStateContext } from "../../context/GlobalContextProvider"
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

  return (
    <g id="moon">
      <MoonTexture
          fill="var(--color-moon)"
          glow={ timeOfDay === 'night' }
          x={ xPos }
          y={ yPos }
          r={ radius }
          timeOfDay={ timeOfDay } />

      <defs>
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
              lightingColor="var(--color-moon-glow)">
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


