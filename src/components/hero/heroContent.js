import React, { Fragment } from "react";

import Clouds from "../cloud/clouds";
import Stars from "../stars/stars";
import Moon from "../moon/moon";
import ThemeContext from "../../context/ThemeContext";

export default function HeroContent({ height, width }) {

  return (
    <ThemeContext.Consumer>
      { ({ theme }) => (
        <Fragment>
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
      )}
    </ThemeContext.Consumer>
  );
}