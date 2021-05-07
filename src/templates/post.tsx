import React, { FC } from 'react';
import dayjs from 'dayjs';

import { Tag } from 'antd';
import { PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from '@/layouts/default';
import Detail from '@/components/page/Detail';

const PostTemplate: FC<Props> = (props) => {
  const {
    children,
    pageContext: {
      frontmatter,
    },
  } = props;

  const { title, date, category } = frontmatter;
  const dateTime = dayjs(date).format('YYYY-MM-DD HH:MM:ss');

  const tags = category.split(',').map((tag) => (<Tag color="default">{tag}</Tag>));

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
        {children}
      </Detail>
    </Layout>
  );
};

export default PostTemplate;

interface Props extends PageProps {
  children: any;
  pageContext: {
    frontmatter: {
      category: string;
      title: string;
      date: string;
    }
  }
}
