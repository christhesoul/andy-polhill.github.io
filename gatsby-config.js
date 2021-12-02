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
    googleSiteVerification: "Gx-SCWHBzUEUmE9lGm9njutzEHhiiDgLvzP0F7BgLIA",
    description:
      "This is me, I'm an Engineering Manager with experience of managing managers and enabling teams",
  },
  pathPrefix: "/",
  plugins: [
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-plausible",
      options: {
        domain: "andy-polhill.github.io"
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./README.md",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/blog/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 840,
              wrapperStyle: 'margin:0;',
            },
          },
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
  ]
};
