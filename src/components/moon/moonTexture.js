
import React from "react";
import { PropTypes } from "prop-types";
import styles from "./moon.module.css"

export default function MoonTexture({ fill, x, y, r }) {

  const craters = [
    { r: 10, x: x + 20, y: y + 10 },
    { r: 18, x: x - 23, y: y - 18 },
    { r: 7, x: x + 15, y: y + 35 },
    { r: 4, x: x - 25, y: y + 30 },
    { r: 5, x: x + 20, y: y - 27 }
  ]

  return (
    <g>
      <circle
        fill={ fill }
        r={ r }
        cx={ x }
        cy={ y } />
      {
        craters.map(({r, x, y}) => (
          <circle
            className={ styles.moon_crater }
            r={ r }
            cx={ x }
            cy={ y } />
        ))
      }
    </g>
  )
}

MoonTexture.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  fill: PropTypes.string,
  r: PropTypes.number
}

