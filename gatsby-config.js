/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Andy Polhill - Engineering Manager",
    image: "./images/andy-polhill.png",
    url: "https://andy-polhill.github.io",
    twitterUsername: "andy_polhill",
    googleSiteVerification: "u9YSAtiwcwFBg-4OXo2VdosOk-8V431tQJSALmhc9Tk",
    description:
      "This is me, I'm an Engineering Manager with experience of managing managers and enabling teams",
  },
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
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          }
        ]
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-dark-mode"
  ]
};
