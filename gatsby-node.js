const path = require('path');

exports.onCreateNode = ({ node }) => {
  console.log(`Node created of type "${node.internal.type}"`);
};


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const sketchNoteTemplate = path.resolve(`./src/templates/sketch-note.js`)
  return graphql(`
    query loadPagesQuery ($limit: Int!) {
      allMarkdownRemark(limit: $limit) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }

    console.log(result.data);
    // console.log('page:' , edge)
    // Create blog post pages.
    // result.data.allMarkdownRemark.edges.forEach(edge => {
    //   createPage({
    //     // Path for this page — required
    //     path: `${edge.node}`,
    //     component: sketchNoteTemplate,
    //     context: {
    //       // Add optional context data to be inserted
    //       // as props into the page component.
    //       //
    //       // The context data can also be used as
    //       // arguments to the page GraphQL query.
    //       //
    //       // The page "path" is always available as a GraphQL
    //       // argument.
    //     },
    //   })
    // })
  })
}
