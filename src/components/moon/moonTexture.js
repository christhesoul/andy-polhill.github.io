
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
      <defs>
        <filter id="moonGlow" x="-150%" y="-150%" width="300%" height="300%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="20 20" x="0%" y="0%" width="300%" height="300%" in="SourceGraphic" edgeMode="none" result="blur5"/>
        </filter>
      </defs>

      <circle
        className={ styles.moon_glow }
        fill={ fill }
        r={ r }
        cx={ x }
        cy={ y } />

      <circle
        className={ styles.moon }
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

