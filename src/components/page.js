import React, { Fragment } from "react";
import ThemeToggle from "./themeToggle/themeToggle";
import Header from "./header/header";
import SEO from "./seo/seo";
import Hero from "./hero/hero";

import * as styles from "./page.module.css";

export default function Page({ children }) {

  return (
    <Fragment>
      <SEO />
      <Header />
      <Hero />
      <main className={ styles.page }>
        { children }
        <ThemeToggle />
      </main>
    </Fragment>
  );
}
