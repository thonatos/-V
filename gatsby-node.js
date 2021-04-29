const path = require(`path`);

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
};

exports.createPages = async ({ graphql, actions, reporter  }) => {
  // const { createPage } = actions;
  // const postTemplate = path.resolve(`src/templates/post.js`);

  const result = await graphql(`    
    query GhostQuery {
      allGhostPost(sort: {order: ASC, fields: published_at}) {
        edges {
          node {
            slug
          }
        }
      }
      allGhostTag(sort: {order: ASC, fields: name}) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostAuthor(sort: {order: ASC, fields: name}) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostPage(sort: {order: ASC, fields: published_at}) {
        edges {
          node {
            slug
            url
          }
        }
      }
    }
  `);

  reporter.info('result');

  // result.data.allSamplePages.edges.forEach(edge => {
  //   createPage({
  //     path: `${edge.node.slug}`,
  //     component: blogPostTemplate,
  //     context: {
  //       title: edge.node.title,
  //     },
  //   })
  // });
};
