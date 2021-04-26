import React, { FC, useState } from 'react';
import dayjs from 'dayjs';
import { graphql, PageProps, Link } from 'gatsby';

import Layout from '../layouts/default';

import * as styles from './blog.module.less';

interface Props extends PageProps {
  data: {
    allMdx: {
      totalCount: number;
      nodes: Array<{
        frontmatter: {
          title: string;
          date: string;
        };
        id: string;
        slug: string;
      }>
    };
  }
}

export const pageQuery = graphql`
  query BlogQuery {  
    allMdx {
      totalCount    
      nodes {
        id
        slug
        frontmatter {
          title
          date
        }
      }    
    }
  }
`;

const BlogPage: FC<Props> = (props) => {
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { totalCount, nodes } = props.data.allMdx;

  console.log(totalCount, nodes);

  return (
    <Layout>
      <ul className={styles.posts}>
        {
          nodes.map((post) => {
            const {
              id, slug,
              frontmatter: {
                title,
                date,
              },
            } = post;
            return (
              <li key={id} className={styles.post}>
                <Link to={`/${slug}`}>{title}</Link>
                <span>{dayjs(date).format('YYYY-MM-DD HH:MM:ss')}</span>
              </li>
            );
          })
        }
      </ul>
    </Layout>
  );
};

export default BlogPage;
