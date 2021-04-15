import React, { Fragment } from "react";
import PropTypes from "prop-types";

import * as styles from "./themeToggle.module.css";

export default function ThemeToggle({ onToggle, theme }) {

  return (
    <div className={ styles.themeControls }>
      { theme === 'dark' && (
        <Fragment>
          <a
            className={ styles.themeControls__link }
            onClick={ () => onToggle('light') }>
              Light
          </a>
          <span className={ styles.themeControls__span }>
            Dark
          </span>
        </Fragment>
      ) }

      { theme === 'light' && (
        <Fragment>
          <span className={ styles.themeControls__span }>
            Light
          </span>
          <a
            className={ styles.themeControls__link }
            onClick={ () => onToggle('dark') }>
              Dark
          </a>
        </Fragment>
      ) }
    </div>
  );
}

ThemeToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  theme: PropTypes.oneOf([ 'light', 'dark' ]).isRequired
}
