import React from "react";
import { StaticQuery, graphql } from "gatsby";

import * as styles from "./about.module.css";

export default function About() {
  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          markdownRemark(frontmatter: { slug: { eq: "about" } }) {
            html
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              slug
              title
            }
          }
        }
      `}
      render={({ markdownRemark }) => (
        <section
          className={ styles.about }
          dangerouslySetInnerHTML={{ __html: markdownRemark.html }}>
        </section>
      )}
    />
  );
}
