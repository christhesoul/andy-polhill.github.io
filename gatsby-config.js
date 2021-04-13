/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  pathPrefix: "/",
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./README.md",
      },
    },
    {
      resolve: "gatsby-remark-external-links",
      options: {
        target: "_self",
        rel: "nofollow"
      }
    },
    "gatsby-transformer-remark",
  ]
};
