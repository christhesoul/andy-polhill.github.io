import React from "react";
import PropTypes from 'prop-types';

export default function Star({ ...props }) {

  return (
    <circle
      { ...props }
      filter="url(#starGlow)"
      fill="#fff">  
    </circle>
  )
}

Star.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  r: PropTypes.number
}

