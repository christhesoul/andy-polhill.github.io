import React, { Fragment } from "react";
import Hero from "./hero/hero";
import Theme from "gatsby-plugin-dark-mode/ThemeToggler";

import About from "./about/about";
import ThemeToggle from "./themeToggle/themeToggle";
import SEO from "./seo/seo";

import * as styles from "./page.module.css";

export default function Page() {

  return (
    <Fragment>
      <SEO />
      <Theme>
        {({ theme, toggleTheme }) => (
            <div className={ styles.page }>
              <Hero theme={ theme } />
              <About />
              <ThemeToggle
                theme={ theme }
                onToggle={ toggleTheme } />
          </div>
        )}
      </Theme>
    </Fragment>
  );
}
