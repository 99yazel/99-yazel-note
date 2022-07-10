module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        rootNote: `/__index`,
        contentPath: `/`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
  siteMetadata: {
    title: "99-yazel-note",
  },
}
