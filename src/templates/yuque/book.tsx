import React, { FC } from 'react';
import dayjs from 'dayjs';

import { graphql, PageProps, Link } from 'gatsby';
import { List, Tag, Divider } from 'antd';

import Layout from '@/layouts/default';
import Detail from '@/components/page/Detail';
import DeviceContext from '@/context/device';

export const yuqueBookQuery = graphql`
  query($id: String!, $_id: Int!) {
    allYuqueDoc(filter: { book_id: { eq: $_id }, status: { eq: 1 } }) {
      nodes {
        id
        slug
        status
        title
        cover
        book_id
        created_at
        word_count
      }
    }
    yuqueBookDetail(id: {eq: $id }) {
      id
      name
      slug
    } 
  }
`;

const YuqueBookTemplate: FC<Props> = (props) => {
  const {
    data,
  } = props;

  const {
    nodes,
  } = data.allYuqueDoc;

  const {
    slug: bookSlug,
  } = data.yuqueBookDetail;

  return (
    <Layout title="Book">
      <DeviceContext.Consumer>
        {(device) => (
          <Detail>
            <List
              size="small"
              dataSource={nodes}
              itemLayout="vertical"
              rowKey="id"
              renderItem={(item) => {
                const {
                  title,
                  slug,
                  created_at,
                  word_count,
                  description: excerpt,
                } = item;

                const timeToRead = Math.ceil(word_count / 500);
                const dateTime = dayjs(created_at).format('YYYY-MM-DD');

                const description = device === 'phone'
                  ? (<span>{dateTime}</span>)
                  : (
                    <>
                      <span>{dateTime}</span>
                      <Divider type="vertical" />
                      <span>
                        {word_count}
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
                    extra={<Tag color="#adadad">{bookSlug}</Tag>}
                  >
                    <List.Item.Meta
                      title={(
                        <Link to={`/book/${bookSlug}/${slug}`}>
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

export default YuqueBookTemplate;

interface Props extends PageProps {
  data: {
    allYuqueDoc: {
      totalCount: number;
      nodes: Array<{
        id: number;
        slug: string;
        title: string;
        description: string;
        status: number;
        created_at: Date;
        word_count: number;
      }>
    };
    yuqueBookDetail: {
      id: string;
      slug: string;
      name: string;
    };
  }
}
