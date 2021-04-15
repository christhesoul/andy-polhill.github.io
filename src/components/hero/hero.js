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
      <Sky theme={ theme } />
      { theme === "dark" && (
        <g id="night-sky">
          <Stars
            width={ viewBoxWidth }
            height={ viewBoxHeight } />
          <Moon
            width={ viewBoxWidth }
            height={ viewBoxHeight } />
        </g>
      )}
      <Clouds
        theme={ theme }
        width={ viewBoxWidth }
        height={ viewBoxHeight } />
    </svg>
  );
}

Hero.propTypes = {
  theme: PropTypes.oneOf([ 'light', 'dark' ]),
};
