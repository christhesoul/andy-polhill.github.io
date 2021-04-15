import React, { useContext, useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import PropTypes from "prop-types";
import { GlobalStateContext } from "../../context/GlobalContextProvider";

import Cloud from "./cloud";

const minClouds = 2;
const maxClouds = 15;
const cloudRange = 1200;

function generateClouds(width, height, theme, state) {

  const clouds = scaleLinear()
    .domain([0, 100])
    .rangeRound([minClouds, maxClouds])(state.cloudCover);

  const xPosScale = scaleLinear()
    .rangeRound([0, width]);

  const yPosScale = scaleLinear()
    .rangeRound([height / 4, height / 2]);

  const fillScale = scaleLinear()
    .domain([1, clouds])
    .range([
      getComputedStyle(document.documentElement)
        .getPropertyValue(`--cloud-foreground-${theme}`),
      getComputedStyle(document.documentElement)
        .getPropertyValue(`--cloud-background-${theme}`)
    ]);

  return [...new Array(clouds)].map((_, layer) => ({
    x: xPosScale(Math.random()),
    y: yPosScale((Math.random() / 2) + ((clouds - layer) / 10)),
    fill: fillScale(clouds / 1.5  - layer),
    layer,
  }));
}

export default function Clouds({ width, height, theme }) {

  const context = useContext(GlobalStateContext);

  const [clouds, setClouds] = useState([], width, height, theme, context);

  useEffect(() =>
    setClouds(generateClouds(width, height, theme, context)),
  [width, height, theme, context]
  );

  return (
    <svg
      id="clouds"
      viewBox={ `0 0 ${cloudRange} 300` }
      preserveAspectRatio="xMidYMid slice">
      <filter id="cloud-drop-shadow">
        <feOffset dx="4" dy="4" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.7"/>
        </feComponentTransfer>
        <feMerge> 
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <g filter={ theme === "dark" ? "url(#moon-lighting)" : null }>
        {
          clouds.map((props, i) =>
            <Cloud { ...props } id={ i } key={ i }></Cloud>)
        }
      </g>
    </svg>
  );
}

Clouds.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  theme: PropTypes.oneOf([ 'light', 'dark' ]),
};
