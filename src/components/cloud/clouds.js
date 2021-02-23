import React, { Fragment, useContext } from "react";
import { scaleLinear } from "d3-scale";
import PropTypes from "prop-types";
import { GlobalStateContext } from "../../context/GlobalContextProvider"

import Cloud from "./cloud";

/*
TODO
Get it into percentage
Some collision detection
Styling
Do it in an acton
Sort out sinset
Use colour not alpha for clouds
*/

function generate_clouds(width, height, cloud_cover) {

  const min_clouds = 2;
  const max_clouds = 30;
  const cloud_count_scale = scaleLinear()
    .domain([0, 100])
    .rangeRound([min_clouds, max_clouds]);

  const clouds = cloud_count_scale(cloud_cover);

  const x_pos_scale = scaleLinear()
    .range([0, width]);

  const y_pos_scale = scaleLinear()
    .rangeRound([height / 4, height / 2]);

  const fill_scale = scaleLinear()
    .domain([1, clouds])
    .range(["#fff", "#89d9d9"]);

  return [...new Array(clouds)].map((a, i) => ({
    x: x_pos_scale(Math.random()),
    y: y_pos_scale(Math.random()),
    fill: fill_scale(clouds / 1.5  - i)
  }));
}

export default function Clouds({ width, height }) {

  const state = useContext(GlobalStateContext);

  return (
    <Fragment>

    <filter id="drop-shadow">
      {/* <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>  */}
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
          generate_clouds(width, height, state.cloud_cover).map(({ fill, x, y }, i) =>
            <Cloud fill={ fill } x={ x } y={ y } key={ i } index={ i }></Cloud>)
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
