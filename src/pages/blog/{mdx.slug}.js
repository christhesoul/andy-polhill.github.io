
import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"

import Page from "../../components/page";
import Hero from "../../components/hero/hero";
import Post from "../../components/post/post";
import Comments from "../../components/comments/comments";

export default function BlogPost({ data }) {
  const { body, comments, frontmatter } = data.mdx;
  const { discussionId } = frontmatter;

  return (
    <Page>
      <Hero />
      <Post>
        <h1>{frontmatter.title}</h1>
        <small>{frontmatter.date}</small>
        <MDXRenderer>
          {body}
        </MDXRenderer>
      </Post>
      <Comments
        comments={ comments }
        discussionId={ discussionId } />
    </Page>
  );
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string, /*.isRequired,*/
        url: PropTypes.string
      })).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        discussionId: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired
  }).isRequired
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      body
      comments {
        body
        date(formatString: "MMMM DD, YYYY")
        author
        url
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        discussionId
      }
    }
  }
`