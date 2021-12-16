
import React, { useContext, useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { PropTypes } from "prop-types";

import { GlobalStateContext } from "../../context/GlobalContextProvider";
import MoonTexture from "./moonTexture";

export default function Moon({ height, theme }) {

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
  const x = 20;

  const [y, setY] = useState(minY);

  useEffect(() => {
    const y = scaleLinear()
      .domain([msToMoonRise, msToMoonRise])
      .rangeRound([minY, maxY])(time);

    setY(y);
  }, [msToMoonRise, msToMoonSet, time, minY, maxY]);

  return (
    <g
      id="moon"
      opacity={ theme === 'light' ? 0 : 1 }>
      <defs>
        <filter
          id="moon-lighting"
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
              x={ x }
              y={ y }
              z="0">
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

        <filter
          id="moon-glow"
          x="-200%"
          y="-200%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="20 20"
            x="0%"
            y="0%"
            width="300%"
            height="300%"
            in="SourceGraphic"
            edgeMode="none"
            result="blur5" />
        </filter>

      </defs>

      <MoonTexture
        x={ x }
        y={ y }
        r={ radius } />
    </g>
  );
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
  theme: PropTypes.oneOf([ 'light', 'dark' ]),
};


