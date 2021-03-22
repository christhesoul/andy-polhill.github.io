import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { GlobalStateContext } from "../../context/GlobalContextProvider"

export default function Sky({ timeOfDay }) {

  const { colors } = useContext(GlobalStateContext);

  return (
    <Fragment>
      <defs>
        <linearGradient id="sky" gradientTransform="rotate(90)">
          <stop offset="5%"  stopColor={ colors[timeOfDay].skyTop } />
          <stop offset="95%" stopColor={ colors[timeOfDay].skyBottom } />
        </linearGradient>
      </defs>
      <rect fill="url(#sky)" height="100%" width="100%"/> 
    </Fragment>
  )
}

Sky.propTypes = {
  timeOfDay: PropTypes.string
}

