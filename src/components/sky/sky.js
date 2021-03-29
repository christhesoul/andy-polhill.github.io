import React from "react";
import PropTypes from "prop-types";

export default function Sky({ timeOfDay }) {

  return (
    <g id="sky">
      <defs>
        <linearGradient id="sky-gradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor={ `var(--sky-top-${timeOfDay})` } />
          <stop offset="95%" stopColor={ `var(--sky-bottom-${timeOfDay})` } />
        </linearGradient>
      </defs>
      <rect fill="url(#sky-gradient)" height="100%" width="100%"/> 
    </g>
  )
}

Sky.propTypes = {
  timeOfDay: PropTypes.string
}

