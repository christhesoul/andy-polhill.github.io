import React from "react"
import { graphql } from "gatsby"

import Page from "../components/page"
import Hero from "../components/hero/hero"
import Post from "../components/post/post"

export default function BlogPost({ data }) {
  const { frontmatter, html} = data.markdownRemark

  return (
    <Page>
      <Hero />
      <Post>
        <h1>{frontmatter.title}</h1>
        <small>{frontmatter.date}</small>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Post>
    </Page>
  )
}
export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(fromNow: true)
      }
    }
  }
`
