import React from 'react'
import Clouds from './cloud/clouds';
import Sky from './sky/sky';

export default function Town() {

  const width = '100%';
  const height = 300;

  return (
    <div>
      <svg version='1.1'
          width={ width }
          height={ height }>
        <Sky></Sky>
        <Clouds width={ width } height={ height }></Clouds>
      </svg>
    </div>
  )
}
