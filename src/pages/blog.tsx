import React, { FC } from 'react';
import dayjs from 'dayjs';
import { graphql, PageProps, Link } from 'gatsby';

import Layout from '@/layouts/default';
import PageContainer from '@/components/PageContainer';

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
  const { nodes } = props.data.allMdx;

  return (
    <Layout>
      <PageContainer>
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
      </PageContainer>
    </Layout>
  );
};

export default BlogPage;
