import React from "react";
import PropTypes from "prop-types";
import Loadable from "@loadable/component";

import * as styles from "./hero.module.css";

const HeroContent = Loadable(() => import("./heroContent"));

export default function Hero({ theme }) {

  const viewBoxWidth = 1200;
  const viewBoxHeight = 300;

  return (
    <svg version='1.1'
      className={ styles.hero }
      preserveAspectRatio="none"
      width="100%"
      height={ viewBoxHeight }>
        <HeroContent 
          width={ viewBoxWidth }
          height={ viewBoxHeight }
          theme={ theme }
        />
    </svg>
  );
}

Hero.propTypes = {
  theme: PropTypes.oneOf([ 'light', 'dark' ]),
};
