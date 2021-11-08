import React from "react";

import * as styles from "./post.module.css";

export default function Post({ children }) {

  return (
    <div className={ styles.post }>
      { children }
    </div>
  );
}
