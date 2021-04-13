import React from "react";
import PropTypes from "prop-types";

export default function Sky({ timeOfDay }) {

  return (
    <svg id="sky">
      <defs>
        <linearGradient id="sky-gradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor={ `var(--sky-top-${timeOfDay})` } />
          <stop offset="95%" stopColor={ `var(--sky-bottom-${timeOfDay})` } />
        </linearGradient>
      </defs>
      <rect
        fill="url(#sky-gradient)"
        height="100%"
        width="100%" /> 
    </svg>
  );
}

Sky.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  timeOfDay: PropTypes.string
};

