import React from "react"
import { graphql, Link } from "gatsby"

import Page from "../components/page"
import Header from "../components/header/header";

export default function Blog({ data }) {
  const { posts } = data.blog

  return (
    <Page>
      <Header />
      <h1>Blog</h1>

      { posts.map(post => (
        <article key={post.id}>
          <h2>
            <Link to={post.fields.slug}>
              {post.frontmatter.title}
            </Link>
          </h2>
          <small>{post.frontmatter.author}, {post.frontmatter.date}</small>
          <p>{post.excerpt}</p>
        </article>
      )) }
    </Page>
  )
}

export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          date(fromNow: true)
          title
          author
        }
        excerpt
        id
      }
    }
  }
`
