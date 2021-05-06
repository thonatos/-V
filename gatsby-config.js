const path = require('path')
const theme = require('./gastby-theme');
const dotenv = require("dotenv");

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const YUQUE_GROUP = process.env.YUQUE_GROUP;
const YUQUE_TOKEN = process.env.YUQUE_TOKEN;
const YUQUE_ENDPOINT = process.env.YUQUE_ENDPOINT

module.exports = {
  siteMetadata: {
    title: "ρV",
    description: "undefined project - ρV",
    copyright: "@2021 - implements.io",
    siteUrl: SITE_URL,
    navMenus: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Posts',
        link: '/post',
      }
    ]
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '@': path.join(__dirname, 'src'),
      }
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions: {
          modifyVars: theme,
          javascriptEnabled: true,
        },
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: 'ρV',
        short_name: 'ρV',
        start_url: `/`,
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `@ergatejs/gatsby-source-yuque`,
      options: {
        queue: {
          concurrency: 20,
        },
        yuque: {
          token: YUQUE_TOKEN,
          endpoint: YUQUE_ENDPOINT,
        },
        group: YUQUE_GROUP,
        filter: {
          type: 'Column',
          slug: 'trading'
        }
      }
    },
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
        name: `docs`,
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          docs: require.resolve("./src/templates/post.tsx"),
          default: require.resolve("./src/templates/default.tsx"),
        },
      },
    },
  ],
};
