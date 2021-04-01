import React from "react";
import PropTypes from "prop-types";

export default function Sky({ timeOfDay, width, height }) {

  return (
    <svg id="sky" width="100%">
      <defs>
        <linearGradient id="sky-gradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor={ `var(--sky-top-${timeOfDay})` } />
          <stop offset="95%" stopColor={ `var(--sky-bottom-${timeOfDay})` } />
        </linearGradient>
      </defs>
      <rect fill="url(#sky-gradient)" height={ height } width={ width } /> 
    </svg>
  )
}

Sky.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  timeOfDay: PropTypes.string
}

