import React from "react";
import { scaleLinear } from "d3-scale";
import PropTypes from 'prop-types';

import styles from "./cloud.module.css"


function generate_cloud(layer) {

  const min_width = 20;
  const max_width = 200;

  const min_circle_rad = 10;
  const max_circle_rad = 30;

  const circles = [];

  const circle_rad_scale = scaleLinear()
    .rangeRound([min_circle_rad, max_circle_rad]);

  const width_scale = scaleLinear()
    .rangeRound([min_width, max_width]);

  const gravity_scale = scaleLinear()
    .rangeRound([0, -20]);

  const width = width_scale((Math.random() / 2) + (layer / 10));

  const min_rows = 2
  const max_rows = 4;

  const row_scale = scaleLinear()
    .rangeRound([min_rows, max_rows]);

  const rows = row_scale(Math.random());

  let row = 0;
  while(row < rows) {
    let current_x = 0 + (row * circle_rad_scale(Math.random()));
    const row_width = width - (row * circle_rad_scale(Math.random()));

    while(current_x < row_width) {
      const r_seed = Math.random();
      const r = circle_rad_scale(r_seed + (layer / 20));

      current_x = current_x + r;
      circles.push({
        r,
        cx: current_x,
        cy: gravity_scale((r_seed + Math.random()) / 2) - (row * 20),
      })
    }
    row++;
  }
  return circles;
}


export default function Cloud({ layer, x, y, fill }) {

  return (
    <svg data-layer={ layer } x={ x } y={ y } className={ styles.cloud } fill={ fill }  overflow="visible">
      {
        generate_cloud(layer).map((props, i) =>
           <circle className={ styles.circle } key={ i } { ...props } />
        )
      }
    </svg>
  )
}

Cloud.propTypes = {
  x: PropTypes.string,
  y: PropTypes.number,
  layer: PropTypes.number,
  opacity: PropTypes.number,
  fill: PropTypes.string,
}

