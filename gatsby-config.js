module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        contentPath: `${__dirname}`,
        rootNote: `/home`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
  siteMetadata: {
    title: "99-yazel-note",
  },
}
