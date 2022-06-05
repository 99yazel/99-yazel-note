module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        contentPath: `${__dirname}/src/site/notes`,
        rootNote: `/home`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
  siteMetadata: {
    title: "99-yazel-note",
  },
}
