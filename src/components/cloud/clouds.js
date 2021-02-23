import React, { Fragment } from "react";
import { scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';

import Cloud from './cloud';

/*
TODO
Get it into percentage
Some collision detection
Styling
Do it in an acton
Sort out sinset
Use colour not alpha for clouds
*/

function generate_clouds({ width, height }) {

  const min_clouds = 5;
  const max_clouds = 10;
  const cloud_count_scale = scaleLinear()
    .rangeRound([min_clouds, max_clouds]);

  const clouds = cloud_count_scale(Math.random());

  console.log(clouds);

  const x_pos_scale = scaleLinear()
    .range([0, width]);

  const y_pos_scale = scaleLinear()
    .rangeRound([height / 4, height / 2]);

  const fill_scale = scaleLinear()
    .domain([1, clouds])
    .range(["#fff", "#89d9d9"]);

  const data = [...new Array(clouds)].map((a, i) => {
    return {
      x: x_pos_scale(Math.random()),
      y: y_pos_scale(Math.random()),
      fill: fill_scale(clouds / 1.5  - i),
    }
  });

  console.log(data);

  return data;
}

export default function Clouds({ width, height }) {

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
          generate_clouds({ width, height }).map(({ fill, x, y, opacity }, i) =>
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
