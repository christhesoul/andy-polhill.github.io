import React from "react";
import PropTypes from "prop-types";

import Clouds from "../cloud/clouds";
import Sky from "../sky/sky";
import Stars from "../stars/stars";
import Moon from "../moon/moon";

import * as styles from "./hero.module.css";

export default function Hero({ theme }) {

  const viewBoxWidth = 1200;
  const viewBoxHeight = 300;

  return (
    <svg version='1.1'
      className={ styles.hero }
      preserveAspectRatio="none"
      width="100%"
      height={ viewBoxHeight }>
      <Sky />
      <Stars
        width={ viewBoxWidth }
        height={ viewBoxHeight }
        theme={ theme } />
      <Moon
        width={ viewBoxWidth }
        height={ viewBoxHeight }
        theme={ theme } />
      <Clouds
        width={ viewBoxWidth }
        height={ viewBoxHeight }
        theme={ theme } />
    </svg>
  );
}

Hero.propTypes = {
  theme: PropTypes.oneOf([ 'light', 'dark' ]),
};
