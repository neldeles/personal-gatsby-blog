module.exports = {
  siteMetadata: {
    title: `neldeles's personal blog/portfolio`,
    description: `Personal blog and portfolio of Noel Deles.`,
    author: `neldeles`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/Obsidian/2 - Blog Posts`,
        ignore: [
          `**/posts/Obsidian/.obsidian`,
          `**/posts/Obsidian/.trash`,
          `**/posts/Obsidian/0 - Source Notes`,
          `**/posts/Obsidian/Permanent Notes`,
          `**/posts/Obsidian/LYT Index`,
          `**/posts/Obsidian/Templates`,
          `**/posts/Obsidian/.obsidian.vimrc`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-emotion`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: `carbon`,
              lineNumbers: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-double-brackets-link`,
            options: {
              titleToURLPath: `${__dirname}/resolve-url.js`,
              stripBrackets: true,
            },
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
  ],
}
