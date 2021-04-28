import React, { FC } from 'react';
import dayjs from 'dayjs';
import { graphql, PageProps, Link } from 'gatsby';
import { List, Tag, Divider } from 'antd';

import Layout from '@/layouts/default';
import Detail from '@/components/page/Detail';
import DeviceContext from '@/context/device';

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
        excerpt      
        timeToRead
        wordCount {
          words
        }
      }      
    }
  }
`;

const PostPage: FC<Props> = (props) => {
  const { nodes } = props.data.allMdx;

  return (
    <Layout title="Post">
      <DeviceContext.Consumer>
        {(device) => (
          <Detail>
            <List
              size="small"
              dataSource={nodes}
              itemLayout="vertical"
              renderItem={(item) => {
                const {
                  slug,

                  frontmatter: {
                    category,
                    title,
                    date,
                  },
                  excerpt,
                  timeToRead,
                  wordCount: {
                    words,
                  },
                } = item;

                const dateTime = dayjs(date).format('YYYY-MM-DD');
                const description = device === 'phone'
                  ? (<span>{dateTime}</span>)
                  : (
                    <>
                      <span>{dateTime}</span>
                      <Divider type="vertical" />
                      <span>
                        {words}
                        {' '}
                        words
                      </span>
                      <Divider type="vertical" />
                      <span>
                        {timeToRead}
                        {' '}
                        minutes
                      </span>
                    </>
                  );

                return (
                  <List.Item
                    extra={<Tag color="#adadad">{category}</Tag>}
                  >
                    <List.Item.Meta
                      title={(
                        <Link to={`/${slug}`}>
                          {title}
                        </Link>
                      )}
                      description={description}
                    />
                    <div>{excerpt}</div>
                  </List.Item>
                );
              }}
            />
          </Detail>
        )}
      </DeviceContext.Consumer>
    </Layout>
  );
};

export default PostPage;

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
        excerpt: string;
        timeToRead: number;
        wordCount: {
          words: number;
        };
      }>;
    };
  }
}
