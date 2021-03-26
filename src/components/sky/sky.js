import React, { Fragment } from "react";
import PropTypes from "prop-types";

export default function Sky({ timeOfDay }) {

  return (
    <Fragment>
      <defs>
        <linearGradient id="sky" gradientTransform="rotate(90)">
          <stop offset="5%"  stopColor={ `var(--sky-top-${timeOfDay})` } />
          <stop offset="95%" stopColor={ `var(--sky-bottom-${timeOfDay})` } />
        </linearGradient>
      </defs>
      <rect fill="url(#sky)" height="100%" width="100%"/> 
    </Fragment>
  )
}

Sky.propTypes = {
  timeOfDay: PropTypes.string
}

