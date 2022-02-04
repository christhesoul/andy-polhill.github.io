import React, { Fragment } from "react";

import * as styles from "./author.module.css";

export default function Author({ author, url, date, pending }) {

  return (
    <h4 className={ styles.author }>
      { pending && <span alt="Pending">⏱</span>}
      { url && (
        <Fragment>
          <a href={ url }>{ author }</a>
          <span className={ styles.author__date }>{ date }</span>
        </Fragment>            
      )}
      { !url && (
        <Fragment>
          { author }
          <span className={ styles.author__date }>{ date }</span>
        </Fragment>
      )}
    </h4>
  );
}
