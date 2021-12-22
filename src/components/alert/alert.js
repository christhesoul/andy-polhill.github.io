import React from "react";
import * as styles from "./alert.module.css";

export default function Alert({ children }) {
  return <p className={ styles.alert } role="alert">{ children }</p>;
}