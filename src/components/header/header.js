import { Link } from "gatsby";
import React from "react";
import * as styles from "./header.module.css";

export default function Header({}) {
  return (
    <header className={ styles.header }>
      <nav className={ styles.nav }>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/blog">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}