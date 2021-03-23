
import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import styles from "./moon.module.css"

export default function MoonTexture({ fill, x, y, r, glow, timeOfDay }) {

  const craters = [
    { r: r / 5, x: 1, y: 1 },
    { r: r / 6, x: - 12, y: 11 },
    { r: r / 8, x: + 12, y: -15 },
    { r: r / 7, x: - 10, y: -19 },
    { r: r / 6, x: + 18, y: -5 },
  ];

  return (
    <g>
      { glow && (
        <Fragment>
          <defs>
            <filter
              id="moonGlow"
              x="-200%"
              y="-200%"
              width="400%"
              height="400%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="20 20"
                  x="0%"
                  y="0%"
                  width="300%"
                  height="300%"
                  in="SourceGraphic"
                  edgeMode="none"
                  result="blur5" />
            </filter>

            <filter
                id="moonCraterShadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%">
              <feComponentTransfer in="SourceAlpha">
                <feFuncA type="table" tableValues="1 0" />
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="0"/>
              <feOffset dx="1" dy="1" result="offsetblur"/>
              <feFlood floodColor="#c0beb3" result="color"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feComposite in2="SourceAlpha" operator="in" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode />
              </feMerge>
            </filter> 
          </defs>

          <circle
            className={ styles.moon_glow }
            fill={ fill }
            r={ r }
            cx={ x }
            cy={ y } />
        </Fragment>
      ) }

      <circle
        className={ styles[`moon__${timeOfDay}`] }
        fill={ fill }
        r={ r }
        cx={ x }
        cy={ y } />
      <g id="craters" transform={ `translate(${x},${y})` }>
        {
          craters.map(({r, x, y}, i) => (
            <circle
              key={ i }
              filter="url(#moonCraterShadow)"
              className={ styles[`moon_crater__${timeOfDay}`] }
              r={ r }
              cx={ x }
              cy={ y } />
          ))
        }
      </g>
    </g>
  )
}

MoonTexture.propTypes = {
  glow: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
  fill: PropTypes.string,
  r: PropTypes.number,
  timeOfDay: PropTypes.string
}

