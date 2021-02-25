import React, { Fragment, useContext, useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import PropTypes from "prop-types";
import { GlobalStateContext } from "../../context/GlobalContextProvider"

import Cloud from "./cloud";

const min_clouds = 2;
const max_clouds = 30;

function generate_clouds(width, height, state) {

  const clouds = scaleLinear()
    .domain([0, 100])
    .rangeRound([min_clouds, max_clouds])(state.cloud_cover);

  const x_pos_scale = scaleLinear()
    .rangeRound([0, width]);

  const y_pos_scale = scaleLinear()
    .rangeRound([height / 4, height / 2]);

  const fill_scale = scaleLinear()
    .domain([1, clouds])
    .range([
      state.colors.cloud_day_foreground,
      state.colors.cloud_day_background
    ]);

  return [...new Array(clouds)].map((a, layer) => ({
    x: x_pos_scale(Math.random()),
    y: y_pos_scale((Math.random() / 2) + ((clouds - layer) / 10)),
    fill: fill_scale(clouds / 1.5  - layer),
    layer,
  }));
}

export default function Clouds({ width, height }) {

  const state = useContext(GlobalStateContext);

  const [clouds, setClouds] = useState([], width, height, state);

  useEffect(() =>
    setClouds(generate_clouds(width, height, state)),
    [width, height, state]
  );

  return (
    <Fragment>
      <filter id="drop-shadow">
        <feOffset dx="4" dy="4" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.7"/>
        </feComponentTransfer>
        <feMerge> 
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
        {
          clouds.map((props, i) =>
            <Cloud { ...props } key={ i }></Cloud>)
        }
    </Fragment>
  )
}

Clouds.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}
