const fs = require('fs');
const url = require('url');
const path = require('path');
const yaml = require('js-yaml');
const jsdom = require("jsdom");
const crypto = require('crypto');
const urllib = require('urllib');

const prefixPath = '/book';
const { JSDOM } = jsdom;

const parseId = str => {
  const arr = (str || '').split('__');
  return parseInt(arr[arr.length - 1]);
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const yuqueDocDetailTemplate = path.resolve(`src/templates/yuque/docDetail.tsx`);
  const yuqueBookDetailTemplate = path.resolve(`src/templates/yuque/bookDetail.tsx`);
  const assetPath = path.resolve('static/yuque');

  const result = await graphql(`
    query YuqueQuery {
      allYuqueDocDetail {
        nodes {
          id
          slug
          status
          body_html
          book {
            slug
          }
        }
      }
      allYuqueBookDetail {
        nodes {
          id
          slug
          toc_yml
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const docs = result.data.allYuqueDocDetail.nodes;
  const books = result.data.allYuqueBookDetail.nodes;

  // create yuque docs
  docs.forEach(node => {
    const { id, slug, status, body_html, book: { slug: bookSlug } } = node;

    if (status !== 1) {
      return;
    }

    const dom = new JSDOM(body_html);

    dom.window.document.querySelectorAll('img').forEach(async img => {
      const originUrl = img.src;

      if (originUrl.startsWith('data:image')) {
        return;
      }

      const { pathname } = url.parse(originUrl);
      const { ext } = path.parse(pathname);

      const hash = crypto.createHash('sha256').update(originUrl).digest('hex');
      const target = `${hash}${ext}`;
      
      const tagetLocal =`${assetPath}/${target}`;
      const tagetPublic =`/yuque/${target}`;

      if (!fs.existsSync(tagetLocal)) {
        reporter.info(`doc:${slug}:asset from ${originUrl} to ${tagetLocal}`);
        const { data } = await urllib.request(originUrl)
        fs.writeFileSync(tagetLocal, data);
      }

      img.src = tagetPublic;
    });

    const _body_html = dom.window.document.body.innerHTML;

    createPage({
      path: `${prefixPath}/${bookSlug}/${slug}/`,
      component: yuqueDocDetailTemplate,
      context: {
        id,
        slug,
        _id: parseId(id),
        _body_html
      },
    })
  });

  // create yuque books
  books.forEach(node => {
    const { id, slug, toc_yml } = node;
    const toc = yaml.load(toc_yml);

    createPage({
      path: `${prefixPath}/${slug}/`,
      component: yuqueBookDetailTemplate,
      context: {
        id,
        toc,
        slug,
        _id: parseId(id),
      },
    })
  })
};

// ignore css order
exports.onCreateWebpackConfig = ({ stage, getConfig, actions }) => {
  if (stage === 'build-javascript' || stage === 'develop') {
    const config = getConfig();

    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );

    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }

    actions.replaceWebpackConfig(config);
  }
}