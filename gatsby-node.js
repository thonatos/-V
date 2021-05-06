// const path = require(`path`);

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
};

exports.createPages = async ({ graphql, actions, reporter  }) => {
  // const { createPage } = actions;
  // const postTemplate = path.resolve(`src/templates/post.js`);
};
