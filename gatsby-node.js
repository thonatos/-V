const path = require('path');
const yaml = require('js-yaml');

const parseId = str => {
  const arr = (str || '').split('__');
  return parseInt(arr[arr.length - 1]);
}

const prefixPath = '/book';

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  
  const yuqueDocDetailTemplate = path.resolve(`src/templates/yuque/docDetail.tsx`); 
  const yuqueBookDetailTemplate = path.resolve(`src/templates/yuque/bookDetail.tsx`);
  
  const result = await graphql(`
    query YuqueQuery {
      allYuqueDocDetail {
        nodes {
          id
          slug
          status     
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
    const { id, slug, status, book: { slug: bookSlug } } = node;

    if(status !== 1) {
      return;
    }

    createPage({
      path: `${prefixPath}/${bookSlug}/${slug}/`,
      component: yuqueDocDetailTemplate,
      context: {
        id,
        slug,
        _id: parseId(id),
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
