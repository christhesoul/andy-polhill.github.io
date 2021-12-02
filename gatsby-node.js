// const path = require("path");
// const { createFilePath } = require("gatsby-source-filesystem");

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === "MarkdownRemark") {
//     const slug = createFilePath({ node, getNode /*, basePath: "pages" */});

//     console.log("💥: ", slug);
//     console.log('createNodeField=====', slug);

//     createNodeField({
//       name: "slug",
//       node,
//       value: slug,
//     });
//   }
// };

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions

//   // Get all markdown blog posts sorted by date
//           // filter: {fileAbsolutePath: {regex: "/(blog)/"  }}
//   const result = await graphql(
//     `
//       {
//         allMarkdownRemark(
//           sort: { fields: [frontmatter___date], order: ASC }
//           limit: 1000
//         ) {
//           nodes {
//             id
//             frontmatter {
//               slug
//             }
//           }
//         }
//       }
//     `
//   );

//   if (result.errors) {
//     reporter.panicOnBuild(
//       "There was an error loading your blog posts",
//       result.errors
//     );
//     return;
//   }

//   const posts = result.data.allMarkdownRemark.nodes;

//   posts.forEach((post) => {

//     console.log('SLUG=====', post.frontmatter.slug);

//     createPage({
//       path: `/blog${post.frontmatter.slug}`,
//       component: path.resolve("./src/pages/post.js"),
//       context: {
//         slug: post.frontmatter.slug,
//         // title: post.fields
//       },
//     });
//   });
// };