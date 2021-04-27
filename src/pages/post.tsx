import React, { FC } from 'react';
import dayjs from 'dayjs';
import { graphql, PageProps, Link } from 'gatsby';

import Layout from '@/layouts/default';
import PageContainer from '@/components/PageContainer';

import * as styles from './post.module.less';

interface Props extends PageProps {
  data: {
    allMdx: {
      totalCount: number;
      nodes: Array<{
        frontmatter: {
          category: string;
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
  query PostQuery {  
    allMdx {
      totalCount    
      nodes {
        id
        slug
        frontmatter {
          category
          title
          date
        }
      }    
    }
  }
`;

const PostPage: FC<Props> = (props) => {
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
                  category,
                  title,
                  date,
                },
              } = post;

              const formatDate = dayjs(date).format('YYYY-MM-DD');

              return (
                <li key={id} className={styles.post}>
                  <Link to={`/${slug}`}>
                    {formatDate}
                    {' '}
                    /
                    {' '}
                    {title}
                  </Link>
                  <span>
                    目录 /
                    {category}
                  </span>
                </li>
              );
            })
          }
        </ul>
      </PageContainer>
    </Layout>
  );
};

export default PostPage;
