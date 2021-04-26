module.exports = {
  siteMetadata: {
    siteUrl: "https://v.implements.io",
    title: "ρV",
    description: "undefined project - ρV",
    copyright: "@2021 - implements.io",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-less`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          // posts: require.resolve("./src/layouts/post.tsx"),
          default: require.resolve("./src/layouts/default.tsx"),
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-typescript`,
    //   options: {
    //     isTSX: true,
    //     jsxPragma: `jsx`,
    //     allExtensions: true,
    //   },
    // },
  ],
};
