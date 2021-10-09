import React, { Fragment, useState } from "react";
import ThemeToggle from "./themeToggle/themeToggle";
import SEO from "./seo/seo";

import * as styles from "./page.module.css";

export default function Page({ children }) {

  return (
    <Fragment>
      <SEO />
      <main className={ styles.page }>
        { children }
        <ThemeToggle />
      </main>
    </Fragment>
  );
}
