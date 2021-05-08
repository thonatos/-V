import React, { FC } from 'react';
import dayjs from 'dayjs';

import { Tag } from 'antd';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from '@/layouts/default';
import Detail from '@/components/page/Detail';

export const yuqueDocDetailQuery = graphql`
  query($id: String!) {
    yuqueDocDetail(id: {eq: $id }) {
      id
      slug
      title
      cover
      description
      book_id
      created_at
      custom_description
      status
      user_id
      updated_at
      view_status
      word_count
      body
      body_html
      book {
        _serializer
        description
        id
        name
        namespace
        slug
        type
      }
    }
  }
`;

const YuqueDocDetailTemplate: FC<Props> = (props) => {
  const {
    data,
  } = props;

  const {
    title,
    created_at,
    body_html,
    book: {
      slug: bookSlug,
    },
  } = data.yuqueDocDetail;

  const dateTime = dayjs(created_at).format('YYYY-MM-DD HH:MM:ss');

  const tags = bookSlug.split(',').map((tag) => (<Tag color="default" key={tag}>{tag}</Tag>));

  const metadata = {
    title,
    subTitle: dateTime,
    tags,
  };

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <Detail
        metadata={metadata}
      >
        <section
          className="content-body lake"
          dangerouslySetInnerHTML={{ __html: body_html }}
        />
      </Detail>
    </Layout>
  );
};

export default YuqueDocDetailTemplate;

interface Props extends PageProps {
  data: {
    yuqueDocDetail: {
      id: number;
      slug: string;
      title: string;
      created_at: Date;
      body_html: string;

      book: {
        slug: string;
      };
    }
  };
  pageContext: {
    id: string;
    slug: string;
    _id: number;
  };
}
