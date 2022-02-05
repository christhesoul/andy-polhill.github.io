import React from "react";
import ThemeToggle from "./themeToggle/themeToggle";

import * as styles from "./page.module.css";

export default function Page({ children }) {

  return (
    <main className={ styles.page }>
      { children }
      <ThemeToggle />
    </main>
  );
}
