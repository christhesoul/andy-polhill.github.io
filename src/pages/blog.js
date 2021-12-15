import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";

import Page from "../components/page";

export default function Blog({ data }) {
  const { posts } = data.blog;

  return (
    <Page>
      { posts.map(post => (
        <article key={post.id}>
          <h1>
            <Link to={`/${post.frontmatter.slug}`}>
              {post.frontmatter.title}
            </Link>
          </h1>
          <small>{post.frontmatter.author}, {post.frontmatter.date}</small>
          <p>{post.excerpt}</p>
        </article>
      )) }
    </Page>
  );
}

Blog.propTypes = {
  data: PropTypes.shape({
    blog: PropTypes.shape({
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          excerpt: PropTypes.string.isRequired,
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
          }).isRequired
        })
      )
    })
  })
};


export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(blog)/"  }}) {
      posts: nodes {
        frontmatter {
          date(fromNow: true)
          title
          author
          slug
        }
        excerpt
        id
      }
    }
  }
`
