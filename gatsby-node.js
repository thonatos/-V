const path = require(`path`);

const parseId = str => {
  const arr = (str || '').split('__');
  return parseInt(arr[arr.length - 1]);
}

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  
  const yuqueBookTemplate = path.resolve(`src/templates/yuque/book.tsx`);
  const yuqueDocDetailTemplate = path.resolve(`src/templates/yuque/docDetail.tsx`);
  

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
        }
      }
    }
  `);

  // const result = await graphql(`
  //   query YuqueQuery {
  //     allYuqueDocDetail {
  //       nodes {
  //         id
  //         slug
  //         title
  //         cover
  //         description
  //         book_id
  //         created_at
  //         custom_description
  //         status
  //         user_id
  //         updated_at
  //         view_status
  //         word_count
  //         body
  //         body_html
  //         book {
  //           _serializer
  //           description
  //           id
  //           name
  //           namespace
  //           slug
  //           type
  //         }
  //       }
  //     }
  //     allYuqueBookDetail {
  //       nodes {
  //         id
  //         _serializer
  //         description
  //         name
  //         namespace
  //         slug
  //         toc
  //         toc_yml
  //         type
  //         updated_at
  //       }
  //     }
  //   }
  // `);

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
      path: `/book/${bookSlug}/${slug}/`,
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
    const { id, slug } = node;
    
    createPage({
      path: `/book/${slug}/`,
      component: yuqueBookTemplate,
      context: {        
        id,
        slug,
        _id: parseId(id),        
      },
    })
  })
};
