import React, { useContext, useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import PropTypes from "prop-types";

import { GlobalStateContext } from "../../context/GlobalContextProvider"
import Star from "./star";

//TODO: Keep stars in the same place
const minStars = 10;
const maxStars = 30;

function generateStars(width, height) {

  const stars = scaleLinear()
    .rangeRound([minStars, maxStars])(Math.random());

  const xPosScale = scaleLinear()
    .rangeRound([0, width]);

  const yPosScale = scaleLinear()
    .rangeRound([0, height / 2]);

  const radScale = scaleLinear()
    .rangeRound([0.5, 2]);

  return [...new Array(stars)].map(() => ({
    cx: xPosScale(Math.random()),
    cy: yPosScale(Math.random()),
    r: radScale(Math.random()),
  }));
}

export default function Stars({ width, height }) {

  const context = useContext(GlobalStateContext);

  const [stars, setStars] = useState([], width, height, context);

  useEffect(() =>
    setStars(generateStars(width, height, context)),
    [width, height, context]
  );

  return (
    <g id="stars">
      <defs>
        <filter
            id="star-glow"
            filterUnits="userSpaceOnUse"
            x="-50%"
            y="-50%"
            width="500%"
            height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur2"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur3"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur4"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="19" result="blur5"/>
          <feMerge result="blurMerged">
            <feMergeNode in="blur1"/>
            <feMergeNode in="blur2"/>
            <feMergeNode in="blur3"/>
            <feMergeNode in="blur5"/>
          </feMerge>
          <feMerge>
            <feMergeNode in="blurMerged"/>
            <feMergeNode in="blur1"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      { stars.map((props, i) => <Star { ...props } key={ i }></Star>) }
    </g>
  )
}

Stars.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}
