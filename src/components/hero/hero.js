import React from "react";
import PropTypes from "prop-types";

import Clouds from "../cloud/clouds";
import Sky from "../sky/sky";
import Stars from "../stars/stars";
import Moon from "../moon/moon";

import * as styles from "./hero.module.css";

export default function Hero({ timeOfDay }) {

  const viewBoxWidth = 1200;
  const viewBoxHeight = 300;

  return (
    <svg version='1.1'
      className={ styles.hero }
      preserveAspectRatio="none"
      width="100%"
      height={ viewBoxHeight }>
      <Sky timeOfDay={ timeOfDay } />
      { timeOfDay === "night" && (
        <g id="night-sky">
          <Stars
            width={ viewBoxWidth }
            height={ viewBoxHeight } />
          {/* TODO: daytime moon */}
          <Moon
            timeOfDay={ timeOfDay }
            width={ viewBoxWidth }
            height={ viewBoxHeight } />
        </g>
      )}
      <Clouds
        timeOfDay={ timeOfDay }
        width={ viewBoxWidth }
        height={ viewBoxHeight } />
    </svg>
  );
}

Hero.propTypes = {
  timeOfDay: PropTypes.string.isRequired
};
