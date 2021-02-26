import React, { Fragment } from "react";
import PropTypes from 'prop-types';

import styles from "./star.module.css"

export default function Star({ ...props }) {

  return (
    <Fragment>
      <circle className={ styles.star } { ...props }></circle>
    </Fragment>
  )
}

Star.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  r: PropTypes.number
}

