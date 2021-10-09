import React from "react";
import Loadable from "@loadable/component";

import * as styles from "./hero.module.css";

const HeroContent = Loadable(() => import("./heroContent"));

export default function Hero() {

  const viewBoxWidth = 1200;
  const viewBoxHeight = 200;

  return (
    <svg version='1.1'
      className={ styles.hero }
      preserveAspectRatio="none"
      width="100%"
      height={ viewBoxHeight }>
        <HeroContent 
          width={ viewBoxWidth }
          height={ viewBoxHeight }
        />
    </svg>
  );
}