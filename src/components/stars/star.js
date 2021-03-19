import React from "react";
import PropTypes from 'prop-types';

import styles from "./star.module.css"

export default function Star({ ...props }) {

  return (
    <circle className={ styles.star } { ...props }></circle>
  )
}

Star.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  r: PropTypes.number
}

