import React, { Fragment } from "react";

import * as styles from "./themeToggle.module.css";
import ThemeContext from "../../context/ThemeContext";

export default function ThemeToggle() {

  return (
    <ThemeContext.Consumer>
      { ({ theme, setTheme }) => (
        <div className={ styles.themeControls }>
          { theme === 'dark' && (
            <Fragment>
              <a
                className={ styles.themeControls__link }
                onClick={ () => setTheme('light') }>
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
                onClick={ () => setTheme('dark') }>
                  Dark
              </a>
            </Fragment>
          ) }
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
