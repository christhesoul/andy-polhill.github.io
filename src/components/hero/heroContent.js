import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Clouds from "../cloud/clouds";
import Sky from "../sky/sky";
import Stars from "../stars/stars";
import Moon from "../moon/moon";

export default function HeroContent({ height, theme, width }) {

  return (
    <Fragment>
      <Sky />
      <Stars
        width={ width }
        height={ height }
        theme={ theme } />
      <Moon
        width={ width }
        height={ height }
        theme={ theme } />
      <Clouds
        width={ width }
        height={ height }
        theme={ theme } />
    </Fragment>
  );
}

HeroContent.propTypes = {
  theme: PropTypes.oneOf([ 'light', 'dark' ]),
};
