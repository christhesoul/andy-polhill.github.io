import React from 'react'
import Clouds from './cloud/clouds';
import Sky from './sky/sky';

import styles from "./town.module.css"

export default function Town() {

  const width = 1200;
  const height = 300;

  return (
    <div className={ styles.town }>
      <svg version='1.1'
          className={ styles.town__image }
          width={ width }
          height={ height }>
        <Sky></Sky>
        <Clouds width={ width } height={ height }></Clouds>
      </svg>
    </div>
  )
}
