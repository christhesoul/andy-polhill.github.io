import React, { useState, useEffect, Fragment } from "react";
import { scaleLinear } from "d3-scale";
import PropTypes from 'prop-types';

const minWidth = 20;
const maxWidth = 200;

const minCircleRad = 10;
const maxCircleRad = 30;

const minRows = 2;
const maxRows = 4;

function generateCloud(layer) {

  const circles = [];

  const circleRadScale = scaleLinear()
    .rangeRound([minCircleRad, maxCircleRad]);

  const gravityScale = scaleLinear()
    .rangeRound([0, -20]);

  const width = scaleLinear()
    .rangeRound([minWidth, maxWidth])((Math.random() / 2) + (layer / 10));

  const rows = scaleLinear()
    .rangeRound([minRows, maxRows])(Math.random());

  let row = 0;
  while(row < rows) {
    let currentX = 0 + (row * circleRadScale(Math.random()));
    const rowWidth = width - (row * circleRadScale(Math.random()));

    while(currentX < rowWidth) {
      const rSeed = Math.random();
      const r = circleRadScale(rSeed + (layer / 20));

      currentX = currentX + r;
      circles.push({
        r,
        cx: currentX,
        cy: gravityScale((rSeed + Math.random()) / 2) - (row * 20),
      })
    }
    row++;
  }
  return circles;
}

export default function Cloud({ layer, ...props }) {

  const [circles, setCircles] = useState([], layer);

  useEffect(() =>
    setCircles(generateCloud(layer)), [layer]);

  return (
    <Fragment>
      <svg { ...props }
          id={ `cloud-${ props.id }`}
          overflow="visible">
        {
          circles.map((props, i) =>
            <circle filter="url(#cloud-drop-shadow)" key={ i } { ...props } />
          )
        }
      </svg>
    </Fragment>
  )
}

Cloud.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  layer: PropTypes.number,
  opacity: PropTypes.number,
  fill: PropTypes.string,
  id: PropTypes.string,
}

