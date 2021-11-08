import React from "react"
import { graphql } from "gatsby"
import Page from "../components/page"
import Hero from "../components/hero/hero"
import Post from "../components/post/post"

export default function BlogPost({ data }) {
  const post = data.markdownRemark

  return (
    <Page>
      <Hero />
      <Post>
        <h1>{post.frontmatter.title}</h1>
        <small>{post.frontmatter.date}</small>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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