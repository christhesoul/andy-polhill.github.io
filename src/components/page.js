import React, { Fragment } from "react";
import ThemeToggle from "./themeToggle/themeToggle";
import Header from "./header/header";
import SEO from "./seo/seo";

import * as styles from "./page.module.css";

export default function Page({ children }) {

  return (
    <Fragment>
      <SEO />
      <Header />
      <main className={ styles.page }>
        { children }
        <ThemeToggle />
      </main>
    </Fragment>
  );
}
