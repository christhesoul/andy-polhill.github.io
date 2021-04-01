import React from 'react'
import { scaleLinear } from "d3-scale";

import Clouds from './cloud/clouds';
import Sky from './sky/sky';
import Stars from './stars/stars';
import Moon from './moon/moon';
import { useWindowSize } from '../hooks/useWindowSize';

import styles from "./header.module.css"

const maxOffset = 130;
const minOffset = 0

export default function Header({ timeOfDay }) {

  const size = useWindowSize();
  const width = 1200;
  const height = 300;

  const offset = scaleLinear()
    .domain([320, 1200])
    .rangeRound([maxOffset, minOffset])(size.width);


  return (
    <svg version='1.1'
        className={ styles.header }
        viewBox={ `${offset} 0 ${width} ${height}` }
        preserveAspectRatio="xMidYMid meet"
        width={ width }
        height={ height }>
      <Sky timeOfDay={ timeOfDay } width={ width } height={ height }></Sky>
      { timeOfDay === 'night' && (
        <g id="night-sky">
          <Stars width={ width } height={ height } />
          {/* TODO: daytime moon */}
          <Moon timeOfDay={ timeOfDay } width={ width } height={ height } />
        </g>
      )}
      <Clouds timeOfDay={ timeOfDay } width={ width } height={ height } />
    </svg>
  )
}
