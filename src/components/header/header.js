import React from 'react'
import { scaleLinear } from "d3-scale";

import Clouds from '../cloud/clouds';
import Sky from '../sky/sky';
import Stars from '../stars/stars';
import Moon from '../moon/moon';
import { useWindowSize } from '../../hooks/useWindowSize';

import * as styles from "./header.module.css";

const maxOffset = 130;
const minOffset = 0

export default function Header({ timeOfDay }) {

  const size = useWindowSize();
  const viewBoxWidth = 1200;
  const viewBoxHeight = 300;

  const minHeight = 200;
  const maxHeight = 300;

  const smallScreen = 320;
  const largeScreen = 1200;

  const offset = scaleLinear()
    .domain([smallScreen, largeScreen])
    .rangeRound([maxOffset, minOffset])(size.width);

  const height = scaleLinear()
    .domain([smallScreen, largeScreen])
    .rangeRound([minHeight, maxHeight])(size.width);

  return (
    <svg version='1.1'
        className={ styles.header }
        viewBox={ `${offset} 0 ${viewBoxWidth} ${viewBoxHeight}` }
        preserveAspectRatio="xMinYMin meet"
        width={ viewBoxWidth }
        height={ height }>
      <Sky
        timeOfDay={ timeOfDay }
        width={ viewBoxWidth }
        height={ viewBoxHeight } />
      { timeOfDay === 'night' && (
        <g id="night-sky">
          <Stars
            width={ viewBoxWidth }
            height={ viewBoxHeight } />
          {/* TODO: daytime moon */}
          <Moon
            timeOfDay={ timeOfDay }
            width={ viewBoxWidth }
            height={ viewBoxHeight } />
        </g>
      )}
      <Clouds
        timeOfDay={ timeOfDay }
        width={ viewBoxWidth }
        height={ viewBoxHeight } />
    </svg>
  )
}
