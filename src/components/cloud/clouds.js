import React, { useContext, useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import PropTypes from "prop-types";
import { GlobalStateContext } from "../../context/GlobalContextProvider";

import * as styles from "./clouds.module.css";

import Cloud from "./cloud";

const minClouds = 2;
const maxClouds = 15;
const cloudRange = 1200;

function generateClouds(width, height, state) {

  const clouds = scaleLinear()
    .domain([0, 100])
    .rangeRound([minClouds, maxClouds])(state.cloudCover);

  const xPosScale = scaleLinear()
    .rangeRound([0, width]);

  const yPosScale = scaleLinear()
    .rangeRound([height / 4, height / 2]);

  return [...new Array(clouds)].map((_, layer) => ({
    x: xPosScale(Math.random()),
    y: yPosScale((Math.random() / 2) + ((clouds - layer) / 10)),
    layer,
  }));
}

export default function Clouds({ width, height, theme }) {

  const context = useContext(GlobalStateContext);

  const [clouds, setClouds] = useState([], width, height, context);

  useEffect(() =>
    setClouds(generateClouds(width, height, context)),
  [width, height, context]
  );
  
  const fillScale = scaleLinear()
    .domain([1, clouds.length])
    .range([
      getComputedStyle(document.body)
        .getPropertyValue("--cloud-foreground"),
      getComputedStyle(document.body)
        .getPropertyValue("--cloud-background")
    ]);

  return (
    <svg
      id="clouds"
      className={ styles.clouds }
      viewBox={ `0 0 ${cloudRange} ${height}` }
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
            <Cloud
              x={ props.x }
              y={ props.y }
              layer={ props.layer }
              opacity={ props.opacity }
              fill={ fillScale(clouds.length / 1.5  - props.layer) }
              id={ i }
              key={ i }></Cloud>)
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
